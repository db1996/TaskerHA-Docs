<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '../useAppStore'

const { githubVersion, fdroidVersion, fdroidOutdated, fetchAll } = useAppStore()
import FDroidWarning from './FDroidWarning.vue'

onMounted(fetchAll)
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Source</th>
                <th>Latest Version</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://github.com/db1996/TaskerHa/releases/latest" target="_blank" rel="noreferrer">GitHub
                        Releases</a></td>
                <td>{{ githubVersion ?? '…' }}</td>
                <td>Latest version, sideload APK</td>
            </tr>
            <tr>
                <td><a href="https://f-droid.org/packages/com.github.db1996.taskerha/" target="_blank"
                        rel="noreferrer">F-Droid</a></td>
                <td :class="fdroidOutdated ? 'warning-column' : ''">
                    {{ fdroidVersion ?? '…' }}
                    <span v-if="fdroidOutdated"></span>
                </td>
                <td>Open-source store, may lag behind</td>
            </tr>
        </tbody>
    </table>
    <FDroidWarning />
</template>

<style >
    .warning-column{
        border-color: var(--vp-custom-block-warning-border); 
        color: var(--vp-custom-block-warning-text); 
        background-color: var(--vp-custom-block-warning-bg);
    }
</style>
