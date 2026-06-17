import { defineConfig } from 'vitepress'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd(), '')

async function getInstallCount(): Promise<number | null> {
  const adminKey = env.ADMIN_KEY
  const appToken = env.APP_TOKEN
  if (!adminKey || !appToken) {
    return null
  }
  try {
    const res = await fetch('https://taskerha-api.db1996-gh.com/stats', {
      headers: { 'x-admin-key': adminKey, 'x-app-token': appToken },
    })
    if (!res.ok) return null
    const data = await res.json() as { active?: number; inactive?: number; dead?: number }
    return (data.active ?? 0) + (data.inactive ?? 0) + (data.dead ?? 0)
  } catch {
    return null
  }
}

export default defineConfig(async () => {
  const installCount = await getInstallCount()

  return {
    title: 'TaskerHA - Docs',
    description: 'Full Home Assistant integration for Tasker',
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],
    vite: {
      define: {
        __INSTALL_COUNT__: JSON.stringify(installCount),
      },
    },

    themeConfig: {
      logo: '/logo.png',

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/setup' },
        { text: 'Actions', link: '/actions/call-service' },
        { text: 'Profiles', link: '/profiles/state-change' },
        { text: 'About', link: '/about' },
      ],

      sidebar: [
        {
          text: 'Getting Started',
          items: [
            { text: 'Setup', link: '/guide/setup' },
            { text: 'Instances', link: '/guide/instances' },
            { text: 'WebSocket', link: '/guide/websocket' },
            { text: 'Companion Integration', link: '/guide/companion' },
            { text: 'Backup & Restore', link: '/guide/backup-restore' },
          ],
        },
        {
          text: 'Actions',
          items: [
            { text: 'Call Service', link: '/actions/call-service' },
            { text: 'Get State', link: '/actions/get-state' },
            { text: 'Send Message to HA', link: '/actions/send-message' },
            { text: 'Test Connection', link: '/actions/test-connection' },
            { text: 'Set WebSocket Connection', link: '/actions/set-websocket-connection' },
          ],
        },
        {
          text: 'Profiles',
          items: [
            { text: 'Trigger State Change', link: '/profiles/state-change' },
            { text: 'Direct Message from HA', link: '/profiles/direct-message' },
          ],
        },
      ],

      search: {
        provider: 'local',
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/db1996/TaskerHa' },
      ],

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © db1996',
      },

      editLink: {
        pattern: 'https://github.com/db1996/TaskerHA-Docs/edit/main/:path',
        text: 'Edit this page on GitHub',
      },
    },
  }
})
