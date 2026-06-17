
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const githubVersion = ref('')
const fdroidVersion = ref('')

const fdroidLabel = computed(() => {
  if (!fdroidVersion.value || !githubVersion.value) return fdroidVersion.value
  return fdroidVersion.value !== githubVersion.value
    ? `${fdroidVersion.value} - pending`
    : fdroidVersion.value
})

onMounted(async () => {
  const [gh, fd] = await Promise.allSettled([
    fetch('https://api.github.com/repos/db1996/TaskerHa/releases/latest')
      .then(r => r.json() as Promise<{ tag_name?: string }>)
      .then(d => d.tag_name ?? ''),
    fetch('https://taskerha-api.db1996-gh.com/fdroid-version')
      .then(r => r.json() as Promise<{ version?: string }>)
      .then(d => d.version ?? ''),
  ])

  githubVersion.value = gh.status === 'fulfilled' ? gh.value : ''
  fdroidVersion.value = fd.status === 'fulfilled' ? fd.value : ''
})
</script>
<template>
  <div class="download-links">
    <p class="download-links__title">Download</p>
    <ul>
      <li>
        <a href="https://github.com/db1996/TaskerHa/releases/latest" target="_blank" rel="noreferrer">
          GitHub {{ githubVersion }}
        </a>
      </li>
      <li>
        <a href="https://f-droid.org/packages/com.github.db1996.taskerha/" target="_blank" rel="noreferrer">
          F-Droid {{ fdroidLabel }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.download-links {
  padding: 0 12px 16px;
}

.download-links__title {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0 8px;
  margin: 0;
}

.download-links ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.download-links li {
  margin: 4px 0;
}

.download-links a {
  display: block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition: background 0.2s, color 0.2s;
}

.download-links a:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
</style>
