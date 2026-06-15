# Call Service

**Action → Plugin → TaskerHA → HA Call Service**

Calls any Home Assistant service from a Tasker task.

## How to use

1. In Tasker, open a task and tap **+** → **Plugin** → **TaskerHA** → **HA Call Service**.
2. Tap the pencil icon to open the configuration.
3. Pick a **domain** to narrow down the list, then select a **service**.
4. Fill in any required fields. If an `entity_id` is needed, an entity picker with domain filtering and fuzzy search will appear.
5. Optional data fields (e.g. `brightness`, `transition`) can be toggled on or off with checkboxes. Fields that are turned off are not sent to Home Assistant at all.

<div style="display:flex;gap:16px;margin:24px 0;align-items:flex-start;">
  <figure style="flex:1;margin:0;text-align:center;">
    <img src="/call-service/service-domain-picker.jpeg" alt="Service and domain picker" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
    <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);">Pick a domain and service</figcaption>
  </figure>
  <figure style="flex:1;margin:0;text-align:center;">
    <img src="/call-service/target-picker.jpeg" alt="Entity / target picker" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
    <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);">Add target entities, devices, areas and/or labels</figcaption>
  </figure>
  <figure style="flex:1;margin:0;text-align:center;">
    <img src="/call-service/optional-fields.jpeg" alt="Optional service data fields" style="width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.25);" />
    <figcaption style="margin-top:8px;font-size:13px;color:var(--vp-c-text-2);">Toggle optional fields on or off</figcaption>
  </figure>
</div>

## Tasker variables

You can use Tasker variables (anything starting with `%`) in any text field. They are substituted before the service call is made.

## Example — Turn on a light

| Field | Value |
|-------|-------|
| Service | `light.turn_on` |
| Entity | `light.living_room` |
| brightness | `200` |

## Variables set after the action

| Variable | Description |
|----------|-------------|
| `%ha_data` | Full API response from Home Assistant (JSON). Usually contains the updated entity state, but this is not guaranteed by HA. |
| `%err` | Error code. `0` means success. See [Error codes](#error-codes) below. |
| `%errmsg` | Human-readable error message, often followed by a Java exception for details. |

## Error codes

| Code | Description |
|------|-------------|
| `0` | No error. |
| `1` | Cannot connect to Home Assistant. The app could not reach the host — check your URL, network, and token. |
| `2` | Invalid input. Domain or service field is empty. |
| `3` | Service call failed. HA was reachable but rejected the call. Check `%errmsg` for details. |
| `9999` | Unknown error. Check `%errmsg` for the Java exception. |

::: tip Continue after error
By default, an error will also fail the Tasker task. Enable **Continue after error** on the action if you want to handle errors yourself by reading `%err`.
:::
