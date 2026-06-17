import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import DownloadLinks from './components/DownloadLinks.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(DownloadLinks),
    })
  },
}
