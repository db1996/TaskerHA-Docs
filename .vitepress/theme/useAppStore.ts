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

    const result = await fetch("https://taskerha-api.db1996-gh.com/data", {
        headers: { "x-app-token": import.meta.env.VITE_APP_TOKEN ?? "" },
      })
      .then((r) => r.json() as Promise<{
        github_version?: string;
        fdroid_version?: string;
        install_count?: { active?: number; inactive?: number };
      }>)
      .catch(() => null);

    githubVersion.value = result?.github_version ?? null;
    fdroidVersion.value = result?.fdroid_version ?? null;
    activeInstalls.value = result?.install_count?.active ?? 0;
    inactiveInstalls.value = result?.install_count?.inactive ?? 0;

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
