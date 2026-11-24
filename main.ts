// Everyday Things, Two Lines, Longer Run
// Writes one two-line explanation to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default ./entry.txt). Deterministic: no clock, randomness, network,
// or environment secrets — the text is a fixed constant.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Line 1 explains one everyday thing to a 10-year-old in a single vivid
// sentence built on one analogy. Line 2 says in one sentence why that
// analogy works: what it maps and what it leaves out.
const ENTRY_LINES: readonly string[] = [
  "A zipper is a tiny railway that lets two rows of teeth hold hands and pull your coat shut.",
  "It maps how the slider joins the teeth one by one, but it leaves out that the teeth never move on their own and that one bent tooth can jam the whole coat.",
];

// The gate allows 1 to 400 Unicode code points, not whitespace-only.
const ENTRY_TEXT: string = ENTRY_LINES.join("\n");

const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? process.cwd();

// Fail loudly instead of writing a bad entry: the gate needs exactly two
// non-empty lines inside 1 to 400 Unicode code points.
const codePoints: number = [...ENTRY_TEXT].length;
if (ENTRY_LINES.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${ENTRY_LINES.length}`);
}
for (const line of ENTRY_LINES) {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
}
if (codePoints < 1 || codePoints > 400) {
  throw new Error(`entry is ${codePoints} code points, gate allows 1 to 400`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY_TEXT, "utf8");
