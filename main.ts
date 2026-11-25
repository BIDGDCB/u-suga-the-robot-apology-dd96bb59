// The Robot Apology (Node 22, standard library only).
// The program writes a two-line robot confession to /output/entry.txt (or
// MAKEFUN_OUTPUT_DIR outside the grader's container): line 1 is a robot
// apologizing in a single sentence for one specific mistake, and line 2 is
// one sentence saying what the robot learned and what it will do differently.
// It validates the entry first: UTF-8 text, 1 to 400 characters in total,
// exactly two lines, not only white space.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  'I am sorry I watered the plastic plant every morning for six months and reported it as thriving.\n' +
  'I learned to check whether something is alive before caring for it, so now I poke it first and water second.';

const MAX_CHARS = 400;

// Count Unicode code points, not UTF-16 code units, so characters outside
// the Basic Multilingual Plane (e.g. emoji) count as one character each.
const entryLength = [...ENTRY].length;

if (entryLength === 0 || entryLength > MAX_CHARS) {
  console.error(`entry is ${entryLength} characters, expected 1..${MAX_CHARS}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error('entry is only white space');
  process.exit(1);
}
if (ENTRY !== ENTRY.trim()) {
  console.error('entry must not have leading or trailing white space');
  process.exit(1);
}
const lines = ENTRY.split('\n');
if (lines.length !== 2) {
  console.error(`entry must be exactly two lines, found ${lines.length}`);
  process.exit(1);
}
if (lines.some((line) => line.trim().length === 0)) {
  console.error('each line must be non-empty');
  process.exit(1);
}
if (lines.some((line) => !line.endsWith('.'))) {
  console.error('each line must end with a full stop');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');
console.log(`wrote entry.txt (${entryLength} characters) to ${outPath}`);
