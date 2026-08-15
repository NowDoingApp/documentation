---
title: JetBrains Integration
description: Branch-Wechsel in IntelliJ, WebStorm oder PyCharm lösen den Clessira-Erfassungsdialog aus.
---

Das **Clessira JetBrains-Plugin** verbindet IntelliJ-basierte IDEs mit der Mac-App. Wenn du in einem geöffneten Repository den Git-Branch wechselst, öffnet Clessira den Erfassungsdialog mit dem neuen Branch-Namen vorausgefüllt. Die IDE zeigt zusätzlich die laufende Aktivität in der Statusleiste an, und Aktivitäten lassen sich direkt aus der IDE starten — wie mit der [VS Code Integration](/integrations/vscode/), nur für JetBrains-IDEs.

## So richtest du es ein

1. Öffne in der Mac-App **Einstellungen → Integrationen → VSCode** und aktiviere die Integration — sie versorgt alle Editor-Plugins über denselben lokalen Endpunkt.
2. Bestätige den Hinweis **„Schlüsselbund-Zugriff"** mit **Verstanden**, dann den macOS-Prompt mit **Immer erlauben**.
3. Lade das Plugin-Zip von den [GitHub-Releases](https://github.com/Clessira/jetbrains/releases) und installiere es in der IDE über **Einstellungen → Plugins → ⚙ → Install Plugin from Disk…**.
4. Führe über **Find Action** (<kbd>⇧⌘A</kbd>) **Test Connection** aus. Die Statusleiste zeigt dann `✓ Clessira`.

## Unterstützte IDEs

Das Plugin läuft in allen IntelliJ-basierten IDEs ab Version **2024.2** — IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, CLion, Rider und weitere. Es setzt die Clessira Mac-App voraus; unter Windows und Linux bleibt das Plugin installierbar, aber inaktiv.

## Statusleiste in der IDE

Bei aktiver Verbindung zeigt das Plugin zwei Einträge:

- **`✓ Clessira`** — Verbindungsstatus. Klick öffnet ein Aktionsmenü (Aktivität starten, Verbindung testen, neu verbinden, Einstellungen, Log).
- **Aktuelle Aktivität** — Name der laufenden Aktivität (bei Pausen entsprechend markiert) und die verstrichene Zeit (`<1m`, `42m`, `1h 5m`). Klick öffnet die Aktivitätssuche.

Die Werte werden alle 10 Sekunden bei der Mac-App abgefragt und zwischendurch lokal hochgezählt.

## Aktionen

Alle Aktionen liegen unter **Tools → Clessira** und sind über **Find Action** (<kbd>⇧⌘A</kbd>) erreichbar:

| Aktion | Was sie macht |
| --- | --- |
| `Start Activity…` | Aktivität per Suche starten (legt bei Bedarf eine neue an). |
| `Test Connection` | Prüft die Erreichbarkeit der Mac-App. |
| `Reconnect` | Neuer Verbindungsversuch und Fehleranzeige. |
| `Show Status Menu` | Öffnet das Aktionsmenü der Statusleiste. |
| `Toggle Current Activity in Status Bar` | Aktuelle Aktivität ein-/ausblenden. |
| `Toggle Elapsed Time in Status Bar` | Verstrichene Zeit ein-/ausblenden. |
| `Open Settings` | Springt direkt zu den Plugin-Einstellungen. |
| `Show Log` | Zeigt das IDE-Log mit den Diagnose-Einträgen des Plugins. |

## Einstellungen des Plugins

Unter **Einstellungen → Tools → Clessira**:

| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| Benachrichtigung bei Branch-Wechsel | an | Schaltet die Branch-Benachrichtigungen ein oder aus. |
| Debounce (ms) | `1500` | Ruhezeit nach einem Branch-Wechsel, bevor benachrichtigt wird. |
| Branches ignorieren (Regex) | leer | Branches, die auf das Muster passen, lösen keinen Dialog aus — z. B. `^(main\|master\|develop)$`. |
| Aktuelle Aktivität anzeigen | an | Aktuelle Aktivität in der Statusleiste anzeigen. |
| Verstrichene Zeit anzeigen | an | Verstrichene Zeit in der Statusleiste anzeigen. |
| Abfrage-Intervall (Sekunden) | `10` | Wie oft die laufende Aktivität von der Mac-App abgefragt wird. |

## Sicherheit

- Das Plugin findet die Mac-App ohne Konfiguration über die Capability-Datei `api-endpoint.json` im Sandbox-Container (Modus `0600`) und spricht denselben lokalen Endpunkt wie die VS Code Extension — die [HTTP-API](/integrations/http-api/) beschreibt das Protokoll im Detail.
- Der Listener liegt auf einem Unix-Domain-Socket im Sandbox-Container der Mac-App (Modus `0600`, nur für deinen Benutzer lesbar). Es wird kein TCP-Port geöffnet.
- Jede Anfrage trägt eine HMAC-SHA256-Signatur, einen Zeitstempel und eine Nonce. Mehr als 60 Sekunden Zeitabweichung werden abgewiesen.

## Daten und Datenschutz

Übertragen werden: der Ordnername des Repositories, der absolute Repository-Pfad, der neue Branch-Name und der vorherige Branch-Name. Es findet keine Netzwerkkommunikation statt. Der Quellcode liegt offen unter [github.com/Clessira/jetbrains](https://github.com/Clessira/jetbrains).
