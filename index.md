---
layout: home

hero:
  name: TaskerHA
  text: Home Assistant + Tasker
  tagline: Call services, read states, and react to entity changes — all from Tasker automations.
  image:
    src: /logo.png
    alt: TaskerHA
  actions:
    - theme: brand
      text: Get Started
      link: /guide/setup
    - theme: alt
      text: View on GitHub
      link: https://github.com/db1996/TaskerHa

features:
  - icon: 🔁
    title: Call any HA service
    details: Trigger any Home Assistant service from a Tasker action, with entity pickers and optional data fields.
  - icon: 📡
    title: Read entity states
    details: Fetch the current state and attributes of any entity and use them as Tasker variables.
  - icon: ⚡
    title: React to state changes
    details: Use websockets to trigger Tasker profiles the moment an entity (or attribute) changes in Home Assistant.
  - icon: 💬
    title: Bidirectional messaging
    details: Send custom events from Tasker to HA and back using the Direct Message system.
---

## Quick Install

## Download

<div style="display:flex;">

<a  href="https://github.com/db1996/TaskerHa/releases/latest">
<img width="150" height="auto" src="https://user-images.githubusercontent.com/69304392/148696068-0cfea65d-b18f-4685-82b5-329a330b1c0d.png"
alt="Download from GitHub releases" /></a>
<a  href="https://f-droid.org/packages/com.github.db1996.taskerha/">
<img width="150" height="auto" src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"  alt="Download from fdroid" /></a>

</div>

<script setup>
const installCount = __INSTALL_COUNT__
</script>

<div v-if="installCount !== null" style="margin-top:12px;font-size:14px;color:var(--vp-c-text-2);">
  Total installs: <strong style="color:var(--vp-c-text-1);">{{ installCount.toLocaleString() }}</strong>
</div>


### 1. Install the Android App

1. [Download the APK from GitHub Releases](https://github.com/db1996/TaskerHa/releases/latest) or install via [F-Droid](https://f-droid.org/packages/com.github.db1996.taskerha/).
2. Open TaskerHA and enter your Home Assistant URL (e.g. `http://192.168.1.x:8123` or `https://ha.yourdomain.com`).
3. [Create a Long-Lived Access Token](https://www.home-assistant.io/docs/authentication/) in your HA user profile and paste it into the app.
4. Tap **Test** to verify the connection, then **Save**.

> **Tip:** Enable **WebSocket** in the app if you plan to use state-change profiles or direct messaging. Android will prompt you to disable battery optimization — allow it so the connection stays alive in the background.

### 2. Install the Home Assistant Integration (Optional)

The companion HACS integration adds a TaskerHA device to Home Assistant.
The app will use this to get labels, areas and devices from your instance. This allows targeting to work similarly to Home Assistant itself. It also gives you easy to use actions and triggers for direct messages back and forth

[Check the full companion documentation for the benefits](/guide/companion.md)

**Via HACS (recommended)**

1. Make sure [HACS](https://hacs.xyz/docs/setup/download) is installed.
2. [![Open HACS repository](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=db1996&repository=taskerha-hacs&category=integration)  
   Click the badge above → **Add** → **Install**.
3. Restart Home Assistant.
4. Go to **Settings → Integrations** and add **TaskerHA Companion**.

**Manual**

1. Copy the `custom_components/taskerha_companion/` folder from the [HACS repo](https://github.com/db1996/taskerha-hacs) into your HA `config/custom_components/` directory.
2. Restart Home Assistant.
3. Add the integration under **Settings → Integrations**.

---

Once both are set up, head to the [Setup guide](/guide/setup) for a full walkthrough.
