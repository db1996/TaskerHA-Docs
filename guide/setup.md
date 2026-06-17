# Setup

## Requirements

- [Tasker](https://tasker.joaoapps.com/) installed on your Android device
- A running [Home Assistant](https://www.home-assistant.io/) instance (local or remote)

## Step 1 — Create a Long-Lived Access Token

1. In Home Assistant, go to your **Profile** (bottom-left avatar).
2. Scroll down to **Long-Lived Access Tokens** and click **Create Token**.
3. Give it a name (e.g. `TaskerHA`) and copy the token — you will not be able to see it again.

<figure style="margin:16px 0;">
  <img src="/setup/long-lived-token.png" alt="HA Security tab showing the Long-Lived Access Tokens section" style="width:100%;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
  <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);text-align:center;">HA profile → Security tab → Long-Lived Access Tokens → Create token</figcaption>
</figure>

## Step 2 
<DownloadTable />

> You cannot install both versions side by side, the APK files are the exact same so if you install the GitHub version, F-Droid can update it without issues afterwards

## Step 3 — Add ards.Your First Instance

1. Open the **TaskerHA** app (not from inside Tasker).
2. Tap **Add instance** and give it a name (e.g. `Home`).
3. Enter your Home Assistant URL (e.g. `http://192.168.1.xxx:8123` or `https://ha.yourdomain.com`).
4. Paste the access token you created.
5. Tap **Test**, then **Save**.

<figure style="margin:16px auto;max-width:320px;">
  <img src="/setup/add-instance.jpeg" alt="TaskerHA Add Instance screen" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
  <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);text-align:center;">Add Instance — name, Remote URL, and Access Token</figcaption>
</figure>

That's it — you're ready to add actions and profiles in Tasker. For more advanced instance configuration (multiple servers, automatic local/remote URL switching) see the [Instances](/guide/instances) page.

## Step 4 — Add Actions or Profiles in Tasker

All functionality is available under **Plugin → TaskerHA** in Tasker.

| Feature | Type | Where to find |
|---------|------|---------------|
| Call a HA service | Action | Task → Add → Plugin → TaskerHA → HA Call Service |
| Read an entity state | Action | Task → Add → Plugin → TaskerHA → HA Get State |
| Send message to HA | Action | Task → Add → Plugin → TaskerHA → HA Send Message Back |
| React to entity changes | Profile | New Profile → Plugin → TaskerHA → HA On Trigger State |
| Receive messages from HA | Profile | New Profile → Plugin → TaskerHA → HA Direct Message |

See the individual pages for full configuration details and variable references.for full configuration details and variable references.
