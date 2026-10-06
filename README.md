# MND demo demonstration

An independent prototype by Jordan Haigh, prepared for a conversation with MND Australia. A single React application includes **Communication tools**, **MND records**, and a **10-slide HTML presentation** adapted from Beautiful HTML Templates’ Blue Professional template.

## Run locally

Requires Node.js 22.6+ and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Build the static site with `npm run build`. Host the complete `dist/` directory on any static hosting service. Hash routes (`#communicate`, `#life`, `#presentation`) need no special SPA rewrite configuration. HTTPS is required for microphone recording outside localhost. `npm run preview` previews the production build.

## Presentation

Open the presentation at the top of Demo overview, or use `/presentation/index.html`. Arrow keys, Page Up/Down, Home/End, touch swipes and buttons navigate slides. Print / save PDF prints all ten slides. The deck links directly into both prototypes and Resources.

The Resources page (`#resources`) links to MND Australia's communication guidance, voice and message banking guide, information resources, support services, research and MiNDAus Registry.

`templates/blue-professional/` preserves the source template and its MIT license. Regenerate the adapted deck with `node scripts/build-presentation.mjs`. MND Australia-inspired colours are based on the organisation’s public stylesheet: blue `#2254a0`, light blue `#8594c6`, pale blue `#e8f3ff`, orange `#df6c32`. The app uses its own concept wordmark, not an official MND Australia logo. Inter and Space Grotesk are bundled locally to keep rendering independent of Google Fonts requests.

## Functional demonstrations

- AAC: browser speech, Stop, local phrase suggestions, editable and reorderable boards, pointer handwriting with Undo, editable simulated recognition, local recording/import/playback with IndexedDB, passport editing/printing, keyboard scanning and pointer dwell, persistent accessibility settings, guided demo.
- MND records: participant, family/historical and researcher perspectives; locally editable sourced timeline and life factors; medical file metadata archive and search; persistent granular demo consent; 2,400 generated cases across 24 regions; interactive regional maps and shared-factor case connections; cohort filtering with a small-count threshold; aggregate export and local access-request drafts; guided demos for each perspective.

## Prototype boundaries

All people, records and cohort figures are fictional. No diagnosis, prognosis, medical advice, clinical interpretation or causal exposure claims are made. Profile completion is illustrative and does not measure clinical completeness.

There is no backend, authentication system, secure clinical database or real research governance workflow. Edits and demo preferences use this browser’s localStorage; original audio uses IndexedDB. Document uploads store **metadata only**, not file contents. These mechanisms are for demonstration and must not be used to collect real health information. Reset demo data clears local demo edits and audio.

Personal voice integration is a planned server-side feature. Browser speech is never described as Margaret’s real voice. Message banking plays actual recorded or imported audio. Handwriting recognition and head/eye tracking are explicitly simulations. Switch scanning accepts Space/Enter as a keyboard demonstration; it does not claim specialist hardware compatibility.

AAC message content and audio are excluded from the records research model. Demo consent, family authority declarations and research request drafts are local illustrations, with no external submission or actual approval.

## Validation

`npm run build` checks TypeScript and produces the static bundle. `npm test` checks combined cohort filtering, consent exclusion, small-count suppression and deterministic identifier-free synthetic data. Browser QA should cover navigation, board editing/persistence, drawing, imports, tour completion, consent and mobile layouts. Microphone permission and available speech voices depend on the browser/device and must be tried on the presentation device.

## Synthetic research explorer

Switch MND records’s perspective to Researcher, then open Case explorer. Select states, regions, diagnosis periods, work categories or potential exposures. The location view shows regional counts; the connections view links fictional sample cases through shared region, occupation, recorded exposure, prior place or diagnosis year. Patterns are deliberately planted for the demonstration. Counts are not population-adjusted rates, and shared fields do not establish contact or cause. Counts below 10 are suppressed; exports contain aggregate summaries only.

The Australian outline is from [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) (public domain). Regional markers are approximate; no individual coordinates or addresses are generated.
