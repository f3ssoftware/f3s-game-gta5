# Host ↔ remote contract (GTA V pilot)

## Decision (Phase 0)

| Question | Decision |
|----------|----------|
| Integration | **C — npm package** `@f3s/game-gta5` (transpile via host `transpilePackages`) |
| Pilot vertical | **gta5** |
| BFF URLs | Host mounts same-origin `/api/gta-v/*`; handlers imported from this package |
| Auth | Host NextAuth / Keycloak session only; remote has no Keycloak client |
| Open-source | Public MIT repo from day one; secrets never shipped here |
| Naming | `f3s-game-{slug}` / `@f3s/game-{slug}` |
| Future | Multi-zone (A) remains an option once cookie/SEO playbooks exist |

## URL

- Canonical: `/{locale}/games/gta5`
- Legacy host redirects: `/games/gta-v` → `/games/gta5`

## DTO: `VerticalGameHeader`

Loaded by host (`loadVerticalGameHeader`). Remote consumes read-only props.

## Slots the host must supply

| Slot | Owner | Why |
|------|-------|-----|
| `header` | Host | Shared `GamePageHeader` + Convex image/SEO fields |
| `twitch` | Host | Twitch API secrets stay on host (`ReactNode` slot) |

## i18n

Remote uses `next-intl` keys with `GTA_*` (and shared directory keys such as `TIBIA_OT_*` where reused). Dictionaries live on the host.

## Feature flag

Host env `NEXT_PUBLIC_GTA5_FROM_PACKAGE` (default `true`). When `false`, host may fall back only if an in-tree stub remains — production should keep the package path.
