<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '../useAppStore'

const { fdroidVersion, githubVersion, fdroidOutdated, fetchAll } = useAppStore()

onMounted(fetchAll)
</script>

<template>
    <div v-if="fdroidOutdated" class="custom-block warning" style="margin:12px 0;">
        <p class="custom-block-title">F-Droid version outdated</p>
        <p>
            F-Droid is on <strong>{{ fdroidVersion }}</strong> while the latest release is
            <strong>{{ githubVersion }}</strong>. F-Droid updates lag behind GitHub by a few days.
            For the latest version, <a href="https://github.com/db1996/TaskerHa/releases/latest">download the APK from
                GitHub Releases</a>. You can update directly from the GitHub APK if you already have the F-Droid version installed.
        </p>
    </div>
</template>
