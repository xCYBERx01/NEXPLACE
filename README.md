# NEXPLACE — Interactive 3D Portfolio

Immersive 3D portfolio for **Ahmed Irfan Akrami**, Robotics & AI engineer. Scroll through a modern **Creator HQ** exterior, step inside, and explore a physics-based workshop in first-person.

[Live site](https://nexplace.vercel.app/)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production → dist/
npm run preview  # preview the build
npm run lint
npm run test:e2e # Playwright hallway test
```

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | `W A S D` / arrows | joystick |
| Look | mouse (pointer lock) | touch drag |
| Jump / Run | `Space` / `Shift` | — |
| Resume overlay | `E` | tap button |
| Exit lab | `Esc` | Outside button |

## Stack

React 19 · Vite 7 · Three.js / R3F · Rapier physics (lab only) · Lenis + anime.js · oxlint · Playwright

## License

[MIT](./LICENSE) © Ahmed Irfan Akrami
