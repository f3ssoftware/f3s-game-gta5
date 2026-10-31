# @f3s/game-gta5

Open-source **GTA V** game vertical for [F3S](https://github.com/f3ssoftware): weekly bonuses, today snapshot, RP server directory, and trending vehicles.

The catalog host [`f3sNextjsSite`](https://github.com/f3ssoftware/f3sNextjsSite) mounts this package behind `/{locale}/games/gta5` and keeps Twitch, Convex catalog, and auth on the host.

## Integration model

**Approach C — published npm package** (pilot for [issue #22](https://github.com/f3ssoftware/f3sNextjsSite/issues/22)).

- Host owns URL, SEO metadata, Convex header DTO, Twitch proxy, NextAuth.
- This repo owns vertical UI, domain services, and BFF handler implementations.
- Host re-exports API handlers at `/api/gta-v/*` (same-origin; no secrets in this repo).

See [`docs/HOST_REMOTE_CONTRACT.md`](./docs/HOST_REMOTE_CONTRACT.md).

## Scripts

```bash
npm install
npm run build      # TypeScript check (host transpilePackages consumes src/)
npm run typecheck  # alias of build
```

This package ships TypeScript/CSS source. `f3sNextjsSite` compiles it via `transpilePackages` — there is no separate `dist/` emit.

## Develop with the host

```bash
# sibling checkout
git clone https://github.com/f3ssoftware/f3s-game-gta5.git
git clone https://github.com/f3ssoftware/f3sNextjsSite.git

cd f3sNextjsSite
npm install
# optional local override: npm install ../f3s-game-gta5
npm run dev
open http://localhost:3000/en/games/gta5
```

## Package API smoke tests (via host)

- `GET /api/gta-v/weekly-bonuses`
- `GET /api/gta-v/today`
- `GET /api/gta-v/rp-servers`
- `GET /api/gta-v/vehicles?category=drift`

## What must not land here

- Twitch client secrets
- Convex admin / membership secrets
- Keycloak / NextAuth credentials
- Any `NEXT_PUBLIC_*` secret

## License

MIT
