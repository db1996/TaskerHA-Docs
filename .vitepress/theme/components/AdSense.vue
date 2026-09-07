<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import { useRoute } from 'vitepress'

// Fill these in with your own AdSense values.
const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'
const AD_SLOT = 'XXXXXXXXXX'

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
                :data-ad-client="AD_CLIENT"
                :data-ad-slot="AD_SLOT"
                data-ad-format="auto"
                data-full-width-responsive="true"
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
