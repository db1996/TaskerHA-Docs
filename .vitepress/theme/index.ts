import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { h } from 'vue'
import DownloadLinks from './components/DownloadLinks.vue'
import DownloadCount from './components/DownloadCount.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(DownloadLinks),
    })
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('DownloadCount', DownloadCount)
  },
}
