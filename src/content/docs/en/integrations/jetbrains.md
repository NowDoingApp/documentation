---
title: JetBrains integration
description: Branch switches in IntelliJ, WebStorm or PyCharm trigger the Clessira tracking prompt.
---

The **Clessira JetBrains plugin** connects IntelliJ-based IDEs to the Mac app. When you switch the Git branch in an open repository, Clessira opens its tracking prompt with the new branch name pre-filled. The IDE also shows the running activity in the status bar, and activities can be started straight from the IDE — just like the [VS Code integration](/en/integrations/vscode/), but for JetBrains IDEs.

## How to set it up

1. In the Mac app, open **Settings → Integrations → VSCode** and enable the integration — it serves all editor plugins through the same local endpoint.
2. Confirm the **"Keychain access"** notice with **Understood**, then the macOS prompt with **Always Allow**.
3. Download the plugin zip from the [GitHub releases](https://github.com/Clessira/jetbrains/releases) and install it in the IDE via **Settings → Plugins → ⚙ → Install Plugin from Disk…**.
4. Run **Test Connection** via **Find Action** (<kbd>⇧⌘A</kbd>). The status bar then shows `✓ Clessira`.

## Supported IDEs

The plugin runs in all IntelliJ-based IDEs from version **2024.2** — IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, CLion, Rider and more. It requires the Clessira Mac app; on Windows and Linux the plugin stays installable but inactive.

## Status bar in the IDE

With an active connection the plugin shows two entries:

- **`✓ Clessira`** — connection status. Clicking opens an action menu (start activity, test connection, reconnect, settings, log).
- **Current activity** — name of the running activity (marked accordingly during breaks) and the elapsed time (`<1m`, `42m`, `1h 5m`). Clicking opens the activity search.

The values are fetched from the Mac app every 10 seconds and counted up locally in between.

## Actions

All actions live under **Tools → Clessira** and are reachable via **Find Action** (<kbd>⇧⌘A</kbd>):

| Action | What it does |
| --- | --- |
| `Start Activity…` | Start an activity via search (creates a new one if needed). |
| `Test Connection` | Checks whether the Mac app is reachable. |
| `Reconnect` | New connection attempt with error reporting. |
| `Show Status Menu` | Opens the status bar action menu. |
| `Toggle Current Activity in Status Bar` | Show or hide the current activity. |
| `Toggle Elapsed Time in Status Bar` | Show or hide the elapsed time. |
| `Open Settings` | Jumps straight to the plugin settings. |
| `Show Log` | Reveals the IDE log with the plugin's diagnostic entries. |

## Plugin settings

Under **Settings → Tools → Clessira**:

| Setting | Default | Description |
| --- | --- | --- |
| Notify on branch change | on | Turns branch notifications on or off. |
| Debounce (ms) | `1500` | Quiet window after a branch change before notifying. |
| Ignore branches (regex) | empty | Branches matching the pattern never trigger a prompt — e.g. `^(main\|master\|develop)$`. |
| Show current activity | on | Show the current activity in the status bar. |
| Show elapsed time | on | Show the elapsed time in the status bar. |
| Poll interval (seconds) | `10` | How often the running activity is fetched from the Mac app. |

## Security

- The plugin finds the Mac app without any configuration via the capability file `api-endpoint.json` in the sandbox container (mode `0600`) and speaks the same local endpoint as the VS Code extension — the [HTTP API](/en/integrations/http-api/) describes the protocol in detail.
- The listener sits on a Unix domain socket inside the Mac app's sandbox container (mode `0600`, readable only by your user). No TCP port is opened.
- Every request carries an HMAC-SHA256 signature, a timestamp and a nonce. More than 60 seconds of clock drift is rejected.

## Data and privacy

Transmitted are: the repository's folder name, the absolute repository path, the new branch name and the previous branch name. No network communication takes place. The source code is open at [github.com/Clessira/jetbrains](https://github.com/Clessira/jetbrains).
