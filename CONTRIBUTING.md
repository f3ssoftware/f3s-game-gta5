# Contributing to f3s-game-gta5

## Add or change a section

1. Domain types → `src/types.ts`
2. Service (+ fixtures if needed) → `src/services/`, `src/fixtures/`
3. API handler → `src/api/<name>.ts` and ask the host to re-export at `/api/gta-v/...`
4. UI section → `src/sections/` using `GameVerticalSection` + `InsightCard`
5. Wire into `GtaVVerticalView`
6. Add `GTA_*` i18n keys on the **host** (`f3sNextjsSite` message catalogs)

## Add a brand-new game vertical (other titles)

Do **not** fork domain logic into this repo. Instead:

1. Fork the template / copy this repo as `f3s-game-{slug}`
2. Rename package to `@f3s/game-{slug}`
3. Replace domain, fixtures, sections, and contract constants
4. Register the slug on the host (`GAME_VERTICAL_REGISTRY`, `SPECIAL_GAMES`, thin `page.tsx` + API re-exports)
5. Keep Twitch / Convex / auth on the host; pass header + Twitch as slots

Full guide: host doc `docs/ADDING_OPEN_SOURCE_GAME_VERTICAL.md`.

## Local typecheck

```bash
npm install
npm run typecheck
```

## PR expectations

- No secrets in source or `.env` committed here
- Keep public API route shapes stable unless coordinated with the host
- Prefer fixture → live provider swaps inside `services/` only
