/**
 * Deterministic generative cover art for projects without a screenshot.
 *
 * `coverArt(slug)` returns plain shape data on a 160×100 (16:10) canvas, so the
 * same art renders in two places: as inline SVG in <ProjectCover> (colored with
 * Nocturne utilities) and inside the Open Graph images (colored with literal
 * values, because next/og cannot read CSS variables).
 *
 * The slug seeds a small PRNG, which picks one of six line-art families and its
 * parameters. Same slug, same art, on every build. All families share the same
 * vocabulary (hairline track, violet line work, a few bright nodes, one soft
 * glow) so the set reads as one system, echoing the hero's loop motif.
 */

export const COVER_W = 160;
export const COVER_H = 100;

/** Semantic color roles. Renderers map these to tokens. */
export type CoverTone =
  | "grid" // faint structure (border)
  | "track" // secondary line work (border-strong)
  | "line" // violet line work, drawn at reduced opacity
  | "accent" // main violet line
  | "hot"; // brightest highlight (accent-hover)

export type CoverShape =
  | { kind: "path"; d: string; tone: CoverTone; width: number; opacity?: number }
  | { kind: "circle"; cx: number; cy: number; r: number; fill: "node" | "dot" | "ring"; opacity?: number };

export interface CoverArt {
  family: CoverFamily;
  /** Glow center and radius, in canvas units. */
  glow: { cx: number; cy: number; r: number };
  shapes: CoverShape[];
}

export type CoverFamily = "orbits" | "waves" | "network" | "loop" | "bars" | "rays";

const FAMILIES: CoverFamily[] = ["orbits", "waves", "network", "loop", "bars", "rays"];

/**
 * Salt mixed into the slug hash. Chosen so the six current projects land on six
 * different families. Changing it reshuffles every cover.
 */
const SALT = "nocturne-56";

type Rand = () => number;

/** FNV-1a 32-bit hash. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 PRNG: tiny, fast, deterministic. */
function prng(seed: number): Rand {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Round to 2 decimals to keep markup small and stable. */
const n = (value: number) => Math.round(value * 100) / 100;

const between = (rand: Rand, min: number, max: number) => min + rand() * (max - min);
const pick = <T>(rand: Rand, items: readonly T[]): T => items[Math.floor(rand() * items.length)];

function polyline(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`).join("");
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number, rotationDeg: number): string {
  const steps = 48;
  const rot = (rotationDeg * Math.PI) / 180;
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
  }
  return `${polyline(pts)}Z`;
}

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, rotationDeg: number, t: number) {
  const rot = (rotationDeg * Math.PI) / 180;
  const x = rx * Math.cos(t);
  const y = ry * Math.sin(t);
  return { x: cx + x * Math.cos(rot) - y * Math.sin(rot), y: cy + x * Math.sin(rot) + y * Math.cos(rot) };
}

/* ------------------------------------------------------------------------ */
/* Families                                                                  */
/* ------------------------------------------------------------------------ */

function orbits(rand: Rand): Omit<CoverArt, "family"> {
  const cx = between(rand, 70, 100);
  const cy = between(rand, 44, 58);
  const tilt = between(rand, -24, 24);
  const rings = 6;
  const shapes: CoverShape[] = [];
  const hot = 2 + Math.floor(rand() * 3);

  for (let i = 0; i < rings; i++) {
    const rx = 14 + i * 13;
    const ry = rx * 0.42;
    shapes.push({
      kind: "path",
      d: ellipsePath(cx, cy, rx, ry, tilt),
      tone: i === hot ? "accent" : i % 2 === 0 ? "track" : "line",
      width: i === hot ? 1.5 : 1,
      opacity: i === hot ? 1 : i % 2 === 0 ? 1 : 0.45,
    });
  }
  shapes.push({ kind: "circle", cx: n(cx), cy: n(cy), r: 2.2, fill: "node" });
  for (let i = 1; i < rings; i += 2) {
    const p = ellipsePoint(cx, cy, 14 + i * 13, (14 + i * 13) * 0.42, tilt, rand() * Math.PI * 2);
    shapes.push({ kind: "circle", cx: n(p.x), cy: n(p.y), r: i === hot ? 1.8 : 1.3, fill: i === hot ? "node" : "ring" });
  }
  return { glow: { cx, cy, r: 70 }, shapes };
}

function waves(rand: Rand): Omit<CoverArt, "family"> {
  const count = 9;
  const amp = between(rand, 3.5, 7);
  const freq = between(rand, 1.2, 2.2);
  const phase = rand() * Math.PI * 2;
  const shift = between(rand, 0.25, 0.55);
  const hot = 3 + Math.floor(rand() * 3);
  const shapes: CoverShape[] = [];

  for (let i = 0; i < count; i++) {
    const y0 = 10 + i * 10;
    const pts: [number, number][] = [];
    for (let x = -4; x <= COVER_W + 4; x += 4) {
      const envelope = 0.55 + 0.45 * Math.sin((x / COVER_W) * Math.PI);
      pts.push([x, y0 + amp * envelope * Math.sin((x / COVER_W) * freq * Math.PI * 2 + phase + i * shift)]);
    }
    const isHot = i === hot;
    shapes.push({
      kind: "path",
      d: polyline(pts),
      tone: isHot ? "accent" : Math.abs(i - hot) === 1 ? "line" : "track",
      width: isHot ? 1.5 : 1,
      opacity: isHot ? 1 : Math.abs(i - hot) === 1 ? 0.55 : 1,
    });
    if (isHot) {
      const x = between(rand, 96, 128);
      const y = y0 + amp * (0.55 + 0.45 * Math.sin((x / COVER_W) * Math.PI)) *
        Math.sin((x / COVER_W) * freq * Math.PI * 2 + phase + i * shift);
      shapes.push({ kind: "circle", cx: n(x), cy: n(y), r: 2, fill: "node" });
    }
  }
  return { glow: { cx: between(rand, 90, 130), cy: 10 + hot * 10, r: 60 }, shapes };
}

function network(rand: Rand): Omit<CoverArt, "family"> {
  const cols = 13;
  const rows = 9;
  const gap = 12;
  const ox = (COVER_W - (cols - 1) * gap) / 2;
  const oy = (COVER_H - (rows - 1) * gap) / 2;
  const at = (c: number, r: number): [number, number] => [ox + c * gap, oy + r * gap];
  const shapes: CoverShape[] = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const [x, y] = at(c, r);
      shapes.push({ kind: "circle", cx: n(x), cy: n(y), r: 0.55, fill: "dot" });
    }
  }

  const walk = (startRow: number): [number, number][] => {
    const pts: [number, number][] = [];
    let row = startRow;
    for (let c = 0; c < cols; c += 1 + Math.floor(rand() * 2)) {
      pts.push(at(c, row));
      // Stay within rows 1..rows-2 so the path survives the 2:1 crop on case-study pages.
      row = Math.max(1, Math.min(rows - 2, row + pick(rand, [-2, -1, 0, 1, 2])));
    }
    return pts;
  };

  const secondary = walk(1 + Math.floor(rand() * 3));
  const main = walk(3 + Math.floor(rand() * 3));
  shapes.push({ kind: "path", d: polyline(secondary), tone: "line", width: 1, opacity: 0.5 });
  shapes.push({ kind: "path", d: polyline(main), tone: "accent", width: 1.5 });
  main.forEach(([x, y], i) => {
    const isHub = i === Math.floor(main.length / 2);
    shapes.push({ kind: "circle", cx: n(x), cy: n(y), r: isHub ? 2.2 : 1.3, fill: isHub ? "node" : "ring" });
  });
  const hub = main[Math.floor(main.length / 2)];
  return { glow: { cx: hub[0], cy: hub[1], r: 60 }, shapes };
}

function loop(rand: Rand): Omit<CoverArt, "family"> {
  const [a, b] = pick(rand, [
    [1, 2],
    [3, 2],
    [2, 3],
    [3, 4],
  ] as const);
  const delta = between(rand, 0.2, 1.2);
  const cx = COVER_W / 2 + between(rand, -10, 10);
  const cy = COVER_H / 2;
  const curve = (scale: number) => {
    const pts: [number, number][] = [];
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      pts.push([cx + 62 * scale * Math.sin(a * t + delta), cy + 36 * scale * Math.sin(b * t)]);
    }
    return pts;
  };
  const shapes: CoverShape[] = [
    { kind: "path", d: polyline(curve(1.28)), tone: "track", width: 1 },
    { kind: "path", d: polyline(curve(0.72)), tone: "line", width: 1, opacity: 0.45 },
    { kind: "path", d: polyline(curve(1)), tone: "accent", width: 1.5 },
  ];
  const main = curve(1);
  const i1 = Math.floor(rand() * main.length);
  const i2 = (i1 + Math.floor(main.length / 2)) % main.length;
  shapes.push({ kind: "circle", cx: n(main[i1][0]), cy: n(main[i1][1]), r: 2.2, fill: "node" });
  shapes.push({ kind: "circle", cx: n(main[i2][0]), cy: n(main[i2][1]), r: 1.6, fill: "ring" });
  return { glow: { cx, cy, r: 64 }, shapes };
}

function bars(rand: Rand): Omit<CoverArt, "family"> {
  const rows = 8;
  const top = 14;
  const step = 10;
  const shapes: CoverShape[] = [];

  for (let x = 16; x < COVER_W; x += 16) {
    shapes.push({ kind: "path", d: `M${x} 6L${x} ${COVER_H - 6}`, tone: "grid", width: 1 });
  }
  const hot = 2 + Math.floor(rand() * 4);
  for (let r = 0; r < rows; r++) {
    const y = top + r * step;
    let x = between(rand, 4, 30);
    while (x < COVER_W - 10) {
      const w = between(rand, 14, 42);
      const end = Math.min(x + w, COVER_W + 4);
      const isHot = r === hot && x > 40 && x < 110;
      shapes.push({
        kind: "path",
        d: `M${n(x)} ${y}L${n(end)} ${y}`,
        tone: isHot ? "accent" : rand() > 0.6 ? "line" : "track",
        width: isHot ? 3 : 2.2,
        opacity: isHot ? 1 : 0.7,
      });
      if (isHot) shapes.push({ kind: "circle", cx: n(end), cy: y, r: 2.2, fill: "node" });
      x = end + between(rand, 4, 14);
    }
  }
  return { glow: { cx: between(rand, 60, 110), cy: top + hot * step, r: 60 }, shapes };
}

function rays(rand: Rand): Omit<CoverArt, "family"> {
  const ox = between(rand, -6, 24);
  const oy = COVER_H + between(rand, 2, 14);
  const shapes: CoverShape[] = [];
  const radii = [34, 62, 90, 118, 146];
  radii.forEach((radius, i) => {
    const pts: [number, number][] = [];
    for (let deg = -95; deg <= 5; deg += 3) {
      const t = (deg * Math.PI) / 180;
      pts.push([ox + radius * Math.cos(t), oy + radius * Math.sin(t)]);
    }
    shapes.push({ kind: "path", d: polyline(pts), tone: i === 2 ? "line" : "track", width: 1, opacity: i === 2 ? 0.55 : 1 });
  });

  const count = 11;
  const hot = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < count; i++) {
    const deg = -88 + (i * 84) / (count - 1);
    const t = (deg * Math.PI) / 180;
    const inner = 20;
    const outer = 170;
    const isHot = i === hot;
    shapes.push({
      kind: "path",
      d: `M${n(ox + inner * Math.cos(t))} ${n(oy + inner * Math.sin(t))}L${n(ox + outer * Math.cos(t))} ${n(oy + outer * Math.sin(t))}`,
      tone: isHot ? "accent" : "track",
      width: isHot ? 1.5 : 1,
    });
    if (isHot) {
      const r = radii[3];
      shapes.push({ kind: "circle", cx: n(ox + r * Math.cos(t)), cy: n(oy + r * Math.sin(t)), r: 2.2, fill: "node" });
      const r2 = radii[1];
      shapes.push({ kind: "circle", cx: n(ox + r2 * Math.cos(t)), cy: n(oy + r2 * Math.sin(t)), r: 1.5, fill: "ring" });
    }
  }
  return { glow: { cx: ox + 40, cy: oy - 50, r: 80 }, shapes };
}

const builders: Record<CoverFamily, (rand: Rand) => Omit<CoverArt, "family">> = {
  orbits,
  waves,
  network,
  loop,
  bars,
  rays,
};

export function coverArt(slug: string): CoverArt {
  const seed = hash(`${SALT}:${slug}`);
  const family = FAMILIES[seed % FAMILIES.length];
  const art = builders[family](prng(seed));
  return { family, ...art };
}
