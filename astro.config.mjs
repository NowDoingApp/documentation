// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.clessira.app',
  integrations: [
    // Emit /sitemap-index.xml + /sitemap-0.xml covering every doc page.
    // Starlight already injects per-page hreflang alternates into <head>.
    sitemap(),
    starlight({
      title: 'Clessira',
      description:
        'Dokumentation für Clessira — die schlanke macOS-Menüleisten-App für ehrliche Zeiterfassung.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/theme.css'],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Deutsch', lang: 'de' },
        en: { label: 'English', lang: 'en' },
      },
      social: [
        {
          icon: 'external',
          label: 'clessira.app',
          href: 'https://clessira.app',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Clessira',
        },
        {
          icon: 'external',
          label: 'mattes.dev',
          href: 'https://mattes.dev',
        },
      ],
      sidebar: [
        {
          label: 'Einstieg',
          translations: { en: 'Getting started' },
          items: [
            { label: 'Willkommen', translations: { en: 'Welcome' }, slug: 'getting-started/welcome' },
            { label: 'Installation', translations: { en: 'Install' }, slug: 'getting-started/install' },
            { label: 'Erste Schritte', translations: { en: 'First run' }, slug: 'getting-started/first-run' },
          ],
        },
        {
          label: 'Funktionen',
          translations: { en: 'Features' },
          items: [
            { label: 'Menüleiste & Popover', translations: { en: 'Menu bar & popover' }, slug: 'features/menu-bar' },
            { label: 'Tag-Ansicht', translations: { en: 'Day view' }, slug: 'features/day-view' },
            { label: 'Prompt-Popover', translations: { en: 'Prompt popover' }, slug: 'features/prompt-popover' },
            { label: 'Prompt-Anzeige', translations: { en: 'Prompt display' }, slug: 'features/prompt-display' },
            { label: 'Aktivitäten & Gruppen', translations: { en: 'Activities & groups' }, slug: 'features/activities' },
            { label: 'Aktivitäten importieren', translations: { en: 'Import activities' }, slug: 'features/import' },
            { label: 'Wiederkehrende Aktivitäten', translations: { en: 'Recurring activities' }, slug: 'features/recurring' },
            { label: 'Tagesleiste & Ansichten', translations: { en: 'Timeline & views' }, slug: 'features/timeline' },
            { label: 'Stundenzettel-Fenster', translations: { en: 'Timesheet window' }, slug: 'features/stundenzettel' },
            { label: 'Statistik', translations: { en: 'Insights' }, slug: 'features/insights' },
            { label: 'Tracking-Intervall', translations: { en: 'Tracking interval' }, slug: 'features/tracking-interval' },
            { label: 'Intelligenz', translations: { en: 'Intelligence' }, slug: 'features/intelligenz' },
            { label: 'Arbeitszeiten & Wochenziel', translations: { en: 'Working hours & target' }, slug: 'features/working-hours' },
            { label: 'Pausen', translations: { en: 'Breaks' }, slug: 'features/breaks' },
            { label: 'Widgets', slug: 'features/widgets' },
            { label: 'iPhone, iPad & Apple Watch', slug: 'features/companion-apps' },
            { label: 'CSV-Export', translations: { en: 'CSV export' }, slug: 'features/csv-export' },
            { label: 'Export-Skripte', translations: { en: 'Export scripts' }, slug: 'features/export-scripts' },
          ],
        },
        {
          label: 'Integrationen',
          translations: { en: 'Integrations' },
          items: [
            { label: 'VS Code', slug: 'integrations/vscode' },
            { label: 'JetBrains', slug: 'integrations/jetbrains' },
            { label: 'Spotlight', slug: 'integrations/spotlight' },
            { label: 'App Intents & Dienste', translations: { en: 'App Intents & Services' }, slug: 'integrations/app-intents' },
            { label: 'CLI', slug: 'integrations/cli' },
            { label: 'AppleScript', slug: 'integrations/applescript' },
            { label: 'HTTP-API', translations: { en: 'HTTP API' }, slug: 'integrations/http-api' },
            { label: 'SDKs', slug: 'integrations/sdks' },
            { label: 'Spezifikationen', translations: { en: 'Specs' }, slug: 'integrations/specs' },
          ],
        },
        {
          label: 'Referenz',
          translations: { en: 'Reference' },
          items: [
            { label: 'Einstellungen', translations: { en: 'Settings' }, slug: 'reference/settings' },
            { label: 'Einstellungen · Allgemein', translations: { en: 'Settings · General' }, slug: 'reference/settings-general' },
            { label: 'Tastaturkürzel', translations: { en: 'Keyboard shortcuts' }, slug: 'reference/keyboard-shortcuts' },
            { label: 'Daten & Datenschutz', translations: { en: 'Data & privacy' }, slug: 'reference/data-privacy' },
            { label: 'Backups & Wiederherstellung', translations: { en: 'Backups & restore' }, slug: 'reference/backups' },
            { label: 'Sprache & Lokalisierung', translations: { en: 'Language & localization' }, slug: 'reference/localization' },
            { label: 'Barrierefreiheit', translations: { en: 'Accessibility' }, slug: 'reference/accessibility' },
            { label: 'Lizenz', translations: { en: 'License' }, slug: 'reference/license' },
            { label: 'FAQ', slug: 'reference/faq' },
          ],
        },
      ],
      components: {
        // Inject OG/Twitter social cards + per-page TechArticle JSON-LD.
        Head: './src/components/Head.astro',
      },
      editLink: {
        baseUrl: 'https://github.com/Clessira/documentation/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
    }),
  ],
});
