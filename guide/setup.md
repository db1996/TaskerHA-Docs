# Setup

## Requirements

- [Tasker](https://tasker.joaoapps.com/) installed on your Android device
- A running [Home Assistant](https://www.home-assistant.io/) instance (local or remote)

## Step 1 — Create a Long-Lived Access Token

1. In Home Assistant, go to your **Profile** (bottom-left avatar).
2. Scroll down to **Long-Lived Access Tokens** and click **Create Token**.
3. Give it a name (e.g. `TaskerHA`) and copy the token — you will not be able to see it again.

## Step 2 — Install the App

Download TaskerHA from one of these sources:

| Source | Notes |
|--------|-------|
| [GitHub Releases](https://github.com/db1996/TaskerHa/releases/latest) | Latest version, sideload APK |
| [F-Droid](https://f-droid.org/packages/com.github.db1996.taskerha/) | Open-source store, may lag behind |

> You cannot install both versions side by side — uninstall one before switching sources. Your tasks and profiles will survive, but you will need to re-enter your server settings.

## Step 3 — Add a Home Assistant Instance

TaskerHA supports multiple Home Assistant instances. Each action and profile in Tasker is bound to a specific instance.

1. Open the **TaskerHA** app (not from inside Tasker).
2. Tap **Add instance** and give it a name (e.g. `Home`).
3. Enter the **URL** of your Home Assistant instance:
   - Local: `http://192.168.1.xxx:8123`
   - Remote: `https://ha.yourdomain.com`
   - Do **not** add a trailing slash.
   - Include the port only if needed (reverse proxies usually do not require one).
4. Paste the **Long-Lived Access Token** you created.
5. Tap **Test** — a success message confirms the connection works.
6. Tap **Save**.

Repeat for any additional instances you want to add.

### Automatic URL switching

Each instance can be configured with both a **local URL** and a **remote URL**. TaskerHA will automatically switch between them based on which Wi-Fi network your phone is connected to.

- Set the **local URL** (e.g. `http://192.168.1.xxx:8123`) and the **Wi-Fi SSID(s)** of your home network.
- Set the **remote URL** (e.g. `https://ha.yourdomain.com`) as the fallback.
- When your phone is on a matching Wi-Fi network, the local URL is used. On any other connection, the remote URL is used.

This means you don't need separate tasks or profiles for home vs. away — TaskerHA handles the switch automatically.

### WebSocket and multiple instances

The WebSocket connection (used by state-change and direct-message profiles) can only be **active on one instance at a time**. You can designate which instance is the active WebSocket instance in the app.

Actions (Call Service, Get State, Send Message) do **not** require a WebSocket connection and work on all configured instances regardless of which one is active.

### WebSocket setup

Enable the **WebSocket** toggle on an instance if you want to use:
- [Trigger State Change profile](/profiles/state-change)
- [Direct Message from HA profile](/profiles/direct-message)

When you enable it, Android will ask you to disable battery optimization for TaskerHA. **Allow it.** Without this, Android may kill the background connection and your profiles will stop firing.

> Disabling WebSocket means all state-change and direct-message profiles will never fire, even if they are active in Tasker.

## Step 4 — Add Actions or Profiles in Tasker

All functionality is available under **Plugin → TaskerHA** in Tasker. When configuring each action or profile, you will be able to select which instance it should run against.

| Feature | Type | Where to find |
|---------|------|---------------|
| Call a HA service | Action | Task → Add → Plugin → TaskerHA → HA Call Service |
| Read an entity state | Action | Task → Add → Plugin → TaskerHA → HA Get State |
| Send message to HA | Action | Task → Add → Plugin → TaskerHA → HA Send Message Back |
| React to entity changes | Profile | New Profile → Plugin → TaskerHA → HA On Trigger State |
| Receive messages from HA | Profile | New Profile → Plugin → TaskerHA → HA Direct Message |

See the individual pages for full configuration details and variable references.
