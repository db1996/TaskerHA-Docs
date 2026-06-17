import { ref, computed, readonly } from "vue";

const githubVersion = ref<string | null>(null);
const fdroidVersion = ref<string | null>(null);
const activeInstalls = ref(0);
const inactiveInstalls = ref(0);
const fetched = ref(false);
const fetching = ref(false);

export const totalInstalls = computed(
  () => activeInstalls.value + inactiveInstalls.value,
);

export const fdroidOutdated = computed(() => {
  if (!githubVersion.value || !fdroidVersion.value) return false;
  const parse = (v: string) => v.replace(/^v/, "").split(".").map(Number);
  const g = parse(githubVersion.value);
  const f = parse(fdroidVersion.value);
  for (let i = 0; i < Math.max(g.length, f.length); i++) {
    if ((f[i] ?? 0) < (g[i] ?? 0)) return true;
    if ((f[i] ?? 0) > (g[i] ?? 0)) return false;
  }
  return false;
});

export function useAppStore() {
  async function fetchAll() {
    if (fetched.value || fetching.value) return;
    fetching.value = true;

    const [gh, fd, installs] = await Promise.allSettled([
      fetch("https://api.github.com/repos/db1996/TaskerHa/releases/latest")
        .then((r) => r.json() as Promise<{ tag_name?: string }>)
        .then((d) => d.tag_name ?? null),
      fetch("https://taskerha-api.db1996-gh.com/fdroid-version")
        .then((r) => r.json() as Promise<{ version?: string }>)
        .then((d) => d.version ?? null),
      fetch("https://taskerha-api.db1996-gh.com/install-count").then(
        (r) => r.json() as Promise<{ active?: number; inactive?: number }>,
      ),
    ]);

    githubVersion.value = gh.status === "fulfilled" ? gh.value : null;
    fdroidVersion.value = fd.status === "fulfilled" ? fd.value : null;
    if (installs.status === "fulfilled") {
      activeInstalls.value = installs.value.active ?? 0;
      inactiveInstalls.value = installs.value.inactive ?? 0;
    }

    fetched.value = true;
    fetching.value = false;
  }

  return {
    githubVersion: readonly(githubVersion),
    fdroidVersion: readonly(fdroidVersion),
    activeInstalls: readonly(activeInstalls),
    inactiveInstalls: readonly(inactiveInstalls),
    totalInstalls,
    fdroidOutdated,
    fetchAll,
  };
}
