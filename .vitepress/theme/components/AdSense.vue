<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import { useRoute } from 'vitepress'

const AD_CLIENT = 'ca-pub-7855784500793275'
const AD_SLOT = '4686323181'
const AD_LAYOUT_KEY = '-gw-3+1f-3d+2z'

const route = useRoute()
// Bump the key on every navigation so Vue mounts a fresh <ins>. AdSense refuses
// to fill an <ins> it has already touched, so re-using the element does nothing.
const adKey = ref(0)

function pushAd() {
    try {
        // @ts-expect-error injected by the AdSense loader script
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
        // AdSense not loaded (e.g. blocked, or localhost) - ignore.
    }
}

onMounted(() => nextTick(pushAd))

watch(
    () => route.path,
    () => {
        adKey.value++
        nextTick(() => setTimeout(pushAd, 100))
    },
)
</script>

<template>
    <ClientOnly>
        <div class="adsense-slot">
            <ins
                :key="adKey"
                class="adsbygoogle"
                style="display: block"
                data-ad-format="fluid"
                :data-ad-layout-key="AD_LAYOUT_KEY"
                :data-ad-client="AD_CLIENT"
                :data-ad-slot="AD_SLOT"
            />
        </div>
    </ClientOnly>
</template>

<style scoped>
.adsense-slot {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--vp-c-divider);
    min-height: 100px;
    text-align: center;
}
</style>
