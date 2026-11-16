// Drapeau Gemula : damier de 5 colonnes x 3 lignes qui ondule, comme sur le logo.
// La même fonction sert au rendu statique (Astro) et à l'animation (navigateur).

export const FLAG_COLS = 5;
export const FLAG_ROWS = 3;
export const FLAG_VIEWBOX = '0 0 120 92';

const CELL = 20;
const OX = 10;
const OY = 16;
const SAMPLES = 6;

/** Position d'un point de la grille (i colonne, j ligne, valeurs décimales permises). */
function point(i: number, j: number, phase: number, amp: number): [number, number] {
  const u = i / FLAG_COLS;
  const v = j / FLAG_ROWS;
  const a = 2 * Math.PI * 0.85 * u - phase;
  const wave = Math.sin(a);
  const x = OX + CELL * i + amp * 11 * (v - 0.5) * Math.cos(a);
  const y = OY + CELL * j - amp * (8 + 5 * u) * wave * (1 - 0.35 * v);
  return [x, y];
}

function cellPath(i: number, j: number, phase: number, amp: number): string {
  const pts: [number, number][] = [];
  for (let s = 0; s < SAMPLES; s++) pts.push(point(i + s / SAMPLES, j, phase, amp));
  for (let s = 0; s < SAMPLES; s++) pts.push(point(i + 1, j + s / SAMPLES, phase, amp));
  for (let s = 0; s < SAMPLES; s++) pts.push(point(i + 1 - s / SAMPLES, j + 1, phase, amp));
  for (let s = 0; s < SAMPLES; s++) pts.push(point(i, j + 1 - s / SAMPLES, phase, amp));
  return 'M' + pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L') + 'Z';
}

/** Chemins des cases orange. phase anime l'ondulation, amp règle son ampleur (0 = drapeau plat). */
export function flagCells(phase = 1.2, amp = 1): string[] {
  const out: string[] = [];
  for (let j = 0; j < FLAG_ROWS; j++) {
    for (let i = 0; i < FLAG_COLS; i++) {
      if ((i + j) % 2 === 0) out.push(cellPath(i, j, phase, amp));
    }
  }
  return out;
}
