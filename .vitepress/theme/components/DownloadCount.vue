<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const activeInstalls = ref(0)
const inactiveInstalls = ref(0)
const totalInstalls = computed(() => activeInstalls.value + inactiveInstalls.value)

onMounted(async () => {
  const res = await fetch('https://taskerha-api.db1996-gh.com/install-count')
    .then(r => r.json() as Promise<{ active?: number; inactive?: number }>)
    .catch(() => ({ active: 0, inactive: 0 }))

  activeInstalls.value = res.active ?? 0
  inactiveInstalls.value = res.inactive ?? 0
})
</script>

<template>
  <div v-if="totalInstalls > 0" style="margin-top:12px;font-size:14px;color:var(--vp-c-text-2);">
    Total installs: <strong style="color:var(--vp-c-text-1);">{{ totalInstalls.toLocaleString() }}</strong>
    ({{ activeInstalls.toLocaleString() }} active, {{ inactiveInstalls.toLocaleString() }} inactive)
  </div>
</template>
