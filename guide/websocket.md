# WebSocket

TaskerHA uses a persistent WebSocket connection to receive real-time events from Home Assistant. This connection powers the two profile types:

- [Trigger State Change](/profiles/state-change) — fires when an entity changes state
- [Direct Message from HA](/profiles/direct-message) — fires when HA sends a message to Tasker

Actions (Call Service, Get State, Send Message) do **not** use the WebSocket and work regardless of its status.

## Enabling WebSocket

1. Open the **TaskerHA** app and go to the instance settings.
2. Enable the **WebSocket** toggle.
3. Android will prompt you to disable battery optimization for TaskerHA — **allow it**.

Without disabling battery optimization, Android may suspend the app in the background and kill the connection. When that happens, profiles silently stop firing with no error.

## Active instance

Only **one instance** can hold the active WebSocket connection at a time. Profiles always fire from whichever instance is currently active.

If you have multiple instances, you can switch which one is active in the app. Actions on non-active instances are unaffected — they still work normally.

## Connection behaviour

- TaskerHA will attempt to reconnect automatically if the connection drops (e.g. after a network change or phone sleep).
- The connection status is visible in the app's main screen.
- If profiles stop firing unexpectedly, check the connection status in the app first. A common cause is battery optimization being re-enabled by Android after an OS update.

## Troubleshooting

| Symptom | Likely cause |
|---------|-------------|
| Profiles never fire | WebSocket is disabled on the active instance |
| Profiles stopped firing after a while | Battery optimization is on — disable it again |
| Profiles stopped after switching networks | Reconnection in progress — usually self-resolves within seconds |
| Only some profiles fire | Check that all profiles are bound to the active WebSocket instance |
