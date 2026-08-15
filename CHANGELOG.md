# Changelog

Per-session log of substantive doc changes. Newest on top.

## 2026-06-12 — jetbrains-plugin-page

- New page `integrations/jetbrains` (DE + EN): the JetBrains IDE plugin — setup via the shared editor integration toggle, supported IDEs (2024.2+, macOS only), status bar widgets, action table, plugin settings, security (capability-file discovery + HMAC-signed UDS requests) and transmitted data. Cross-links the VS Code and HTTP-API pages.
- `astro.config.mjs`: registered `integrations/jetbrains` (label "JetBrains") under Integrationen / Integrations, after VS Code.

## 2026-06-12 — companion-apps-page

- New page `features/companion-apps` (DE + EN): the iPhone/iPad companion app (start/stop, backfill, create/rename/pin/archive activities, edit/delete entries, per-activity stats, backups), cross-device live sessions over iCloud (live card/banner, stale-session trim sheet + "Trackst du noch?" notification), opt-in interval reminders, the Apple Watch remote-control app, and known limits. Lifts the deliberate "not documented yet" hold from 2026-05-29 — the companions now ship in the TestFlight beta.
- `astro.config.mjs`: registered `features/companion-apps` (label "iPhone, iPad & Apple Watch") under Funktionen / Features, after Widgets.
- `reference/faq` (DE + EN): platform answer rewritten — no longer "in development but not yet available"; now points to the new companion-apps page.

## 2026-05-29 — app-sync-accuracy-review

- Cross-device/iCloud-sync accuracy pass after comparing the docs against the Mac app's CHANGELOG/source (analysis + a 4-role doc review: architect / developer / user / designer). No new pages — companion iPhone/iPad and Apple Watch apps exist in the codebase but aren't released, so they are deliberately *not* documented yet.
- `reference/data-privacy` + `reference/backups` (DE + EN): rewrote the iCloud-sync conflict text to match the 2026-05-28 remote-merge fix — an incoming remote change is now merged into the in-memory state **entry by entry** (most recent edit per entry wins, deletions stay deleted) instead of clobbering local edits. Dropped the old "can produce iCloud conflicts" warning; corrected the overstated "neither Mac overwrites the other" to the accurate per-entry-LWW behaviour (different entries both survive; same entry → newest wins).
- `reference/faq` (DE + EN): platform answer no longer says iPad/iPhone/Watch are "not on the roadmap" — now "companion apps … in development but not yet available". Tightened the custom-folder (Dropbox/OneDrive) warning and contrasted it with iCloud's per-entry merge.
- `index` (DE + EN): removed the self-contradictory "no cloud / keine Cloud" claims (hero card + meta description + "what Clessira is not" bullet) now that optional iCloud sync exists; reframed as "no cloud service of our own … optional sync runs only through your own private Apple iCloud".
- `getting-started/first-run` (DE + EN): the storage step no longer suggests reaching iCloud by pointing the *custom folder* at iCloud Drive (that path is whole-file, no merge) — points to the dedicated iCloud-sync toggle instead.
- Terminology/consistency: standardized the toggle path to **Einstellungen → Speicher & Backups → „Mit iCloud synchronisieren"** / **Settings → Storage & Backups → "Sync with iCloud"** across data-privacy/backups/faq (was split between "Daten →" and "iCloud-Sync"); replaced DB-ish "Datensatz/record by record" with "Eintrag/entry by entry"; fixed DE "Telemetry" → "Telemetrie".
- Verified: `npm run build` green (77 pages); DE/EN parity preserved on every edited page.

## 2026-05-26 — activities-and-groups-rewrite

- `features/activities` (DE + EN): full rewrite to reflect the actual UI under **Einstellungen → Aktivitäten**. Added sections for the tree list (groups / ungrouped / archive), drag-and-drop, inline rename, the activity-settings sheet (general / goals / notes & billing / timer / archive), pinning, group create / edit / delete (with the ungroup-confirmation alert), and the duration field for past-day backfill. Removed the previously-claimed inline edit of an entry's start/end time and the "change activity" action — neither exists in the current UI; only delete-via-hover-trash does.
- `astro.config.mjs`: sidebar entry renamed `Aktivitäten` → `Aktivitäten & Gruppen` (EN: `Activities & groups`).

## 2026-05-26 — global-prompt-hotkeys

- `reference/keyboard-shortcuts` (DE + EN): new "Im Prompt (global)" / "In the prompt (global)" section documenting the focus-immune ⌃⌥⌘ chord (L open, J confirm, O discard, 1–9 pinned), the single-modifier variants when the prompt is frontmost (⌃Y / ⌃N / ⌃S), and the unmodified 1–9 / letter behaviour. Mentions configurability via **Einstellungen → Tastatur** / **Settings → Keyboard**. Replaced the outdated roadmap note with the actual capability; renamed the App-Menu section to disambiguate from the new global section.

## 2026-05-26 — http-api-stop-status-entries

- `integrations/http-api` (DE + EN): expanded endpoint table from five to eight (`GET /status`, `POST /activities/stop`, `POST /entries`). Added response/body samples for `/status` and `/entries`. New "Lizenz-Gate" / "License gate" section documenting **`423 Locked`** for every endpoint except `/healthcheck` when no license is installed.
- `integrations/sdks` (DE + EN): added `stopActivity` / `stop_activity`, `getStatus` / `get_status`, `logEntry` / `log_entry` to the JS and Python quickstart examples and to the API-overview table. Error table gained the `423 → ClessiraHttpError` row and the 400 cause now mentions `durationMinutes ≤ 0`.
- `integrations/applescript` (DE + EN): added error code `5` (generic internal error) to the error-code table — surfaced when the underlying service rejects with a non-domain-mapped status.

## 2026-05-26 — cli-and-applescript

- New page `integrations/cli` (DE + EN): documents the `clessira` terminal command — install path via **Settings → Integrations → CLI → Install in PATH**, the five commands (`start`, `stop`, `log`, `today`, `status`), duration shorthand (`Xm`/`Xh`/`XhYm`), pipeline-friendly output, error codes and feature scope. Explicitly does **not** mention internal Makefile targets — Mac app is closed source.
- New page `integrations/applescript` (DE + EN): documents the AppleScript scripting suite — `start tracking`, `stop tracking`, `log entry`, `today hours`, `tracking status` verbs plus the four read-only `application` properties (`is tracking`, `current activity`, `today hours`, `is on break`) and the `activity` / `time entry` classes. Includes `osascript` and Apple Shortcuts usage, Automation-permission notes, and error-code table (`1`–`5`).
- `astro.config.mjs`: added both pages to the Integrationen / Integrations sidebar group, in the order CLI → AppleScript → HTTP-API → SDKs.

## 2026-05-26 — openapi-license-popover-focus

- New page `integrations/specs` (DE + EN): integrator's reference for the `openapi.yaml` (OpenAPI 3.1) and `data-schema.json` (JSON Schema 2020-12) files. Covers what each spec describes, render + client-generation snippets via `@redocly/cli` and `openapi-generator-cli`, `ajv-cli` save-file validation, a GitHub Actions CI snippet that lints the OpenAPI and validates `data.json` fixtures, and the per-spec versioning rules. Links to specs at `clessira.app/specs/*`.
- New page `reference/license` (DE + EN): the Ed25519-signed license system — activation window with paste + drag-and-drop, the Settings → Lizenz hero card with badges (Aktiv / Lifetime / N-Tage / max version), license payload fields, invalidation reasons (expiry / version cap / bad signature), what's blocked while locked (menu bar, hotkey, right-click menu, HTTP API, Shortcuts/AppleScript via `licenseLocked`, macOS Services), and the local UserDefaults storage location.
- Updated `features/prompt-popover` (DE + EN, `.mdx`): added a "Fokus beim Öffnen" / "Focus on open" section describing the new hotkey-only focus-steal behavior — popover takes key focus, digits/letters reach it directly, and the previously frontmost app is restored on close. Menu-bar clicks and scheduled prompts remain non-activating.
- `astro.config.mjs`: registered `integrations/specs` (Spezifikationen / Specs) under Integrationen and `reference/license` (Lizenz / License) under Referenz.

## 2026-05-25 — prompt-popover-page

- New page `features/prompt-popover` (DE + EN, `.mdx`): annotated walkthrough of the prompt UI — headline (with daily-target / branch-hint variants), pinned quick-picks with 1–9 keyboard binding, search/create combobox, optional note (default-note + branch prefill), and the three-button action bar (Discard / Snooze / Confirm) with local + global shortcuts. Includes a keyboard-cheat-sheet table and a "When the popover appears" section covering interval-end, on-demand, and the sleep-prompt variant.
- `astro.config.mjs`: added `features/prompt-popover` to the Funktionen / Features sidebar, slotted between `day-view` and `prompt-display`.
- Cross-linked `features/prompt-display` (DE + EN) intro to the new page so the two pages reference each other (settings ↔ UI).
- Screenshot expected at `src/assets/prompt-popover/prompt-popover.png` (directory created; PNG to be dropped by the user).

## 2026-05-25 — settings-general-page

- New page `reference/settings-general` (DE + EN, `.mdx`): hotspot-annotated walkthrough of the General settings tab — Tracking (Abfrage-Intervall, Snooze-Dauer, Anzeige-Modus, Menüleisten-Anzeige, Tag-Ansicht, Standard-Pausenlänge), Benachrichtigungen, Spotlight, and Automatischer Start. Cross-links to `features/tracking-interval`, `features/prompt-display`, `features/menu-bar`, `features/timeline`, `features/breaks`, and `integrations/spotlight`.
- New asset `src/assets/settings/settings-general.png`: screenshot of the General tab, used by both locales via the existing `Hotspots` component.
- `astro.config.mjs`: added `reference/settings-general` to the Referenz / Reference sidebar, right after the existing `reference/settings` overview.

## 2026-05-25 — day-view-page

- New page `features/day-view` (DE + EN, `.mdx`): annotated walkthrough of the popover's grouped day view — date navigation, group/activity rows with progress bars, weekly-goal donut + warning, daily target bar, day metrics (total / first start / last end / location), and the control bar (record, break, pin, menu, plus). Links to `features/timeline` for the alternative view modes.
- New component `src/components/Hotspots.astro`: simple image overlay with absolutely-positioned numbered markers in %-coordinates; consumed by the new day-view page and reusable for future annotated screenshots.
- `astro.config.mjs`: added `features/day-view` to the Funktionen / Features sidebar, slotted right after `features/menu-bar`.
- `Hotspots.astro` is keyboard-toggleable (`aria-pressed`, `aria-controls`, focus-visible outline) and falls back to high-contrast canvas tokens under `forced-colors: active`; markers are `aria-hidden` so screen readers read the explicit legend instead. Toggle label switches DE/EN based on URL prefix.
- Screenshot: `src/assets/day-view/day-view-popover.png`.

## 2026-05-25 — menubar-display-modes

- `features/menu-bar` (DE + EN): replaced the "Live-Label" section with an "Anzeigemodus" / "Display mode" section that documents the four modes (Nur Icon / Icon + Text / Icon + Zeit / Icon + Text + Zeit) as a table.
- `reference/settings` (DE + EN): General-tab entry renamed from "Live Label" to "Menüleisten-Anzeige" / "Menu bar display", links to the menu-bar page.
- `reference/faq` (DE + EN): rewrote the "disable live label" Q&A to point at the new picker and the **Nur Icon** / **Icon only** value.

## 2026-05-25 — http-api-and-sdks

- New page `integrations/http-api` (DE + EN): documents the opt-in loopback HTTP listener — how to enable it in **Einstellungen → Integrationen → HTTP-API**, the port (default `39847`), the shared token, the five endpoints, and HMAC/nonce/rate-limit semantics.
- New page `integrations/sdks` (DE + EN): introduces `@clessira/sdk` (npm, TS, Node ≥ 20 / Bun / Deno) and `clessira-sdk` (PyPI, sync + async, `httpx`). Covers install, quickstart per language, the shared API surface, and the typed error hierarchy. Links to the npm page and the [`Clessira/sdk`](https://github.com/Clessira/sdk) monorepo.
- `astro.config.mjs`: added both pages to the Integrationen / Integrations sidebar group.

## 2026-05-25 — vscode-uds-rewrite

- Rewrote `integrations/vscode` (DE + EN) to match the shipped extension: setup steps, status-bar readout (connection / current activity / elapsed time), toggle commands, and current settings (`showCurrentActivity`, `showElapsedTime`, `currentPollSeconds`).
- Dropped references to the obsolete `clessira.port` setting and the `Set Token` command.
- Privacy paragraph now mentions the Unix-domain-socket transport instead of a TCP port.

## 2026-05-24 — first-run-rewrite

- Rewrote `getting-started/first-run` (DE + EN) as `.mdx` to match the shipped eight-step welcome wizard: Welcome, Interval (default 45 min), Display & break, Workdays + holidays, Integrations (Spotlight + VS Code), Privacy + storage location, Import, Finish + autostart. Replaced the older five-section how-to that no longer matched the real onboarding flow.
- Added inline screenshots for every step, embedded via `astro:assets` `Image`.
- Normalized `src/assets/welcome-screen/` filenames to `welcome-step{1..8}-{slug}.png` (verified step numbers by counting active dots in the wizard footer; the user-supplied names were partly off-by-one).
- New pages (DE + EN) for every feature surfaced in the wizard:
  - `features/prompt-display` — popover vs centered, menu-bar mode, default day view, sound, global shortcut.
  - `features/working-hours` — active weekdays, weekly target (0–80 h), holiday mode with country picker.
  - `features/breaks` — manual pause, default duration (5–120 min in 5-min steps), behavior in the Timesheet.
  - `features/recurring` — work-in-progress page; documents intent + UI location, fuller walkthrough deferred until the feature stabilizes.
  - `features/import` — Jira / CSV / Markdown / plain-text formats, dedup behavior, what is *not* imported (times, Jira API, attachments).
  - `integrations/spotlight` — what gets indexed, where the index lives, enable/disable, privacy.
- Updated `features/tracking-interval` (DE + EN): default 20 min → **45 min**, expanded interval table, example uses 45-min cadence.
- Sidebar in `astro.config.mjs` extended with all six new pages under Funktionen / Integrationen.
- Added cross-links from `first-run.mdx` (DE + EN) into the new feature pages.

## 2026-05-24 — data-privacy-and-faq-refresh

- `reference/data-privacy` (DE + EN): documented two opt-in mechanisms previously omitted — custom storage location ("Eigener Ordner wählen") and iCloud sync ("Mit iCloud synchronisieren"). Added a TestFlight section clarifying that beta builds inherit Apple's crash/usage reporting (App Store build sends nothing). Refined the "what Clessira does not do" list so opt-ins are honestly disclosed (iCloud, loopback listener, TestFlight). Sandbox section now notes the security-scoped bookmark for custom folders.
- `reference/faq` (DE + EN): updated "Was kostet Clessira?" to point to clessira.app instead of mentioning subscriptions; softened the platform answer (iPad/iPhone/Watch are conceivable but not on the roadmap); rewrote the sync FAQ — iCloud sync is now built in, custom folder is the alternative for Dropbox/OneDrive setups.

## 2026-05-24 — vscode-integration-refresh

- Rewrote `integrations/vscode` (DE + EN) to match the shipped extension: corrected default port to `39847`, real settings path **Einstellungen → Integrationen → VSCode**, actual Command Palette commands (`Set Token`, `Test Connection`, `Reconnect`, `Start Activity`, `Show Output Log`, `Open Settings`), real config keys (`clessira.enabled`, `clessira.port`, `clessira.debounceMs`), HMAC/timestamp/nonce details, token storage in Keychain + SecretStorage.
- Removed invented options that don't exist in the extension (`clessira.sharedSecret`, `clessira.branchAsActivity`) and the inaccurate "branch appended as note" behavior — branch switches open the tracking prompt with the branch prefilled.
- Added a dedicated "Schlüsselbund-Zugriff" / "Keychain access" section explaining the two-step prompt on first enable (Clessira info dialog → macOS Keychain prompt → "Always Allow") and the "Schlüsselbund-Fehler" status if denied.
