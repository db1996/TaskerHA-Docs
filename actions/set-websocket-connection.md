# Set WebSocket Connection

**Action → Plugin → TaskerHA → HA Set WebSocket Connection**

Starts or stops the WebSocket connection from a Tasker task. Useful for switching which Home Assistant instance is active, or for pausing the connection when it is not needed.

## How to use

1. In Tasker, open a task and tap **+** → **Plugin** → **TaskerHA** → **HA Set WebSocket Connection**.
2. Choose **Start** or **Stop**.
3. If **Start** is selected, choose the instance to connect to.
4. Tap **Done**.

## Start

Connects to the selected instance and starts the WebSocket service. If a different instance is already active, a warning is shown in the configuration screen — the existing connection will be replaced when the action runs.

## Stop

Stops the WebSocket service entirely. Profiles that rely on the WebSocket (Trigger State Change, Direct Message from HA) will stop firing until the connection is started again — either manually in the app or via another **Set WebSocket Connection** action.

## Example — Switch instance based on location

Use a **Tasker location profile** (or a WiFi SSID profile) to automatically switch to a different Home Assistant instance when you arrive at a second location:

1. Profile fires on entry.
2. **Set WebSocket Connection** → Start → select the second instance.

On exit, a second profile switches back to the primary instance.

## Screenshots

<div style="display:flex;gap:16px;margin:24px 0;align-items:flex-start;">
  <figure style="flex:1;margin:0;text-align:center;">
    <img src="/set-websocket-connection/turn-on-switch.jpeg" alt="Set WebSocket Connection — Start mode with instance selector" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
    <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);">Start — select which instance to connect to</figcaption>
  </figure>
  <figure style="flex:1;margin:0;text-align:center;">
    <img src="/set-websocket-connection/turn-off.jpeg" alt="Set WebSocket Connection — Stop mode" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
    <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);">Stop — disconnects the active WebSocket</figcaption>
  </figure>
</div>
