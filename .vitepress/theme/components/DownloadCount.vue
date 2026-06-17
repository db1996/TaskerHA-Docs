<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '../useAppStore'

const { activeInstalls, inactiveInstalls, totalInstalls, fetchAll } = useAppStore()

onMounted(fetchAll)
</script>

<template>
  <div v-if="totalInstalls > 0" style="margin-top:12px;font-size:14px;color:var(--vp-c-text-2);">
    Total installs: <strong style="color:var(--vp-c-text-1);">{{ totalInstalls.toLocaleString() }}</strong>
    ({{ activeInstalls.toLocaleString() }} active, {{ inactiveInstalls.toLocaleString() }} inactive)
  </div>
</template>
