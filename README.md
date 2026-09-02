# NEXPLACE — Interactive 3D Portfolio

An immersive, game-like portfolio for **Ahmed Irfan Akrami**, a Robotics & AI engineer. Explore a modern **Creator HQ** building from the outside, step through the front door (with a blinding white flash), and wander a full **3D warehouse workshop** containing desks, workbenches, project shelves, and a Croc OS tank — all navigated in first-person.

[Live site](https://nexplace.vercel.app/) · Built with [Three.js](https://threejs.org) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber).

---

## Features

- **Exterior scene** — square modern Creator HQ with glass-curtain facade, mullions, entrance recess, double doors, security camera, roof HVAC/solar, sign, parking, and landscaping.
- **Interior scene** — a physics-enabled 3D warehouse/workshop with:
  - Gaming workstation (3 monitors, tower with RGB glow, keyboard/mouse)
  - Paperwork desk with an interactive **resume** overlay
  - Maker bench with pegboard + tools
  - Drone table (quadcopter model)
  - Project shelf with miniature project models
  - **Croc OS** tank (chain wheels, OLED face, N20 motors)
  - NPC robot + ceiling lighting
- **Camera flow** — exterior approach → enter door → blinding white flash → interior.
- **First-person navigation** — WASD move, pointer-lock mouse look, `Space` jump, `Shift` run, `E` interact, `Esc` exit to exterior.
- **Mobile fallback** — virtual joystick + "skip to portfolio" link.
- **SEO/technical** — semantic `index.html`, Open Graph, Twitter Cards, JSON-LD structured data, `robots.txt`, `sitemap.xml`, `llms.txt`, PWA `manifest.json`, favicons, custom `404.html`.

---

## Tech Stack

| Layer | Package |
|-------|---------|
| UI | React 19 |
| Build | Vite 7 |
| 3D | three 0.185, @react-three/fiber 9, @react-three/drei 10 |
| Physics | @react-three/rapier 2 |
| Character controller | ecctrl |
| Lint | oxlint |

> **Note on Vite 8:** Vite 8 (Rolldown) previously emitted `Could not load index.html — stream did not contain valid UTF-8` on Windows. The project pins Vite **7** (esbuild-based production build) to avoid this regression. Upgrade once the upstream bug is resolved.

---

## Getting Started

```bash
# install
npm install

# dev server (http://localhost:5173)
npm run dev

# production build (→ dist/)
npm run build

# preview the production build (http://localhost:4173)
npm run preview

# lint
npm run lint
```

Node.js 18+ is recommended.

---

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move | `W` `A` `S` `D` / arrows | virtual joystick |
| Look | mouse (pointer lock) | touch drag |
| Jump | `Space` | joystick button |
| Run | `Shift` | — |
| Interact (resume) | `E` / click button | tap button |
| Exit to exterior | `Esc` / "Outside" button | "Outside" button |

---

## Project Structure

```
├── index.html            # Vite entry + SEO/meta (root)
├── vite.config.js        # build config, chunk splitting, three alias
├── public/               # static assets (favicons, robots, manifest, sw, og-image)
├── src/
│   ├── main.jsx          # React entry
│   ├── App.jsx           # exterior Creator HQ + phase/camera transitions
│   ├── Workshop.jsx      # interior workshop (physics, furniture, projects)
│   ├── Joystick.jsx      # lazy-loaded mobile joystick
│   ├── index.css         # global styles
│   ├── config.js         # site metadata
│   └── os/data.js        # portfolio data (projects, resume, awards)
│       └── (reserved project content)
└── docs/                 # UX/design research notes
```

### Code splitting

The heaviest libraries are lazy-loaded so the landing (exterior) stays light:

- `three` (~220 KB gzip) — loaded on the exterior.
- `@react-three/rapier` physics (~840 KB gzip) — split into its own chunk and loaded **only** when the workshop opens.
- `ecctrl` controller + mobile `Joystick` — lazy-loaded.

---

## 3D Assets

The scenes are authored with programmatic Three.js geometry (primitives) for reliability and a small, dependency-free bundle.

To replace or augment with real GLB models (e.g. from [Poly Pizza](https://poly.pizza) or [Sketchfab](https://sketchfab.com)):

1. Drop the `.glb` file into `public/assets/`.
2. Load it in a component:

```jsx
import { useGLTF } from "@react-three/drei"

function Desk() {
  const { scene } = useGLTF("/assets/desk.glb")
  return <primitive object={scene} scale={1} position={[0, 0.9, 0]} />
}
```

3. Wrap it in `<Suspense>` and normalize scale/position to your scene.

All exterior/interior assets are original programmatic geometry — no 2D placeholder grids are used.

---

## License

[MIT](./LICENSE) © Ahmed Irfan Akrami