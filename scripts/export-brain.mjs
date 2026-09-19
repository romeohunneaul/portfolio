/**
 * Export curated brain content into the chat corpus.
 *
 *   npm run brain:sync
 *
 * Reads ONLY the files listed in scripts/brain-allowlist.json (paths relative
 * to the brain root), removes <!-- private --> … <!-- /private --> sections,
 * then scans what remains against the denylist. One hit and NOTHING is
 * written: the sync fails and prints every offending line — it blocks, it
 * never masks silently. On success it writes src/data/brain-extract.json,
 * which is committed and reviewed like any other change.
 *
 * The name denylist is itself confidential, so it lives in the PRIVATE brain
 * repo: _brain/projects/portfolio/brain-denylist.json — { "patterns": [...] },
 * matched case-insensitively. Generic financial/contact patterns are built in.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url, "file:").pathname);
const BRAIN = process.env.BRAIN_DIR ?? path.join(homedir(), "Desktop/Projects/_brain");
const OUT = path.join(ROOT, "../src/data/brain-extract.json");

const GENERIC = [
  [/\b\d[\d\s,.]*\s?(?:k€|K€|M€|€|keur)/u, "montant en euros"],
  [/\bMRR\b|\bARR\b|chiffre d'affaires|\bmarge\b/iu, "indicateur financier"],
  [/[\w.+-]+@[\w-]+\.[a-z]{2,}/iu, "adresse e-mail"],
  [/(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}/u, "numéro de téléphone"],
  [/notion\.so|docs\.google\.com|drive\.google\.com/iu, "URL interne"],
];

const allowlist = JSON.parse(readFileSync(path.join(ROOT, "brain-allowlist.json"), "utf8"));
const denyPath = path.join(BRAIN, "projects/portfolio/brain-denylist.json");
const names = existsSync(denyPath) ? JSON.parse(readFileSync(denyPath, "utf8")).patterns : [];
if (!existsSync(denyPath)) console.warn(`⚠ denylist absente (${denyPath}) — seuls les motifs génériques s'appliquent`);

const stripPrivate = (text) =>
  text.replace(/<!--\s*private\s*-->[\s\S]*?(<!--\s*\/private\s*-->|$)/g, "");

const hits = [];
const documents = [];

for (const rel of allowlist) {
  const file = path.join(BRAIN, rel);
  if (!existsSync(file)) {
    hits.push({ file: rel, line: 0, reason: "fichier introuvable dans le brain" });
    continue;
  }
  const raw = stripPrivate(readFileSync(file, "utf8"));
  raw.split("\n").forEach((line, i) => {
    for (const name of names) {
      if (line.toLowerCase().includes(String(name).toLowerCase()))
        hits.push({ file: rel, line: i + 1, reason: `denylist « ${name} »`, excerpt: line.trim().slice(0, 80) });
    }
    for (const [re, label] of GENERIC) {
      if (re.test(line)) hits.push({ file: rel, line: i + 1, reason: label, excerpt: line.trim().slice(0, 80) });
    }
  });
  const title = raw.match(/^#\s+(.+)$/m)?.[1] ?? raw.match(/^title:\s*"?([^"\n]+)"?$/m)?.[1] ?? rel;
  documents.push({ path: rel, title: title.trim(), content: raw.trim() });
}

if (hits.length > 0) {
  console.error(`✗ Export refusé — ${hits.length} occurrence(s) sensibles. Rien n'a été écrit.\n`);
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.reason}${h.excerpt ? `\n    → ${h.excerpt}` : ""}`);
  console.error("\nCorrige le fichier, entoure la section de <!-- private --> … <!-- /private -->, ou retire-le de l'allowlist.");
  process.exit(1);
}

// Pas d'horodatage : la sortie est déterministe, le diff ne montre que le contenu.
writeFileSync(OUT, JSON.stringify({ documents }, null, 2) + "\n");
console.log(`✓ ${documents.length} document(s) → src/data/brain-extract.json — relis le diff avant de pousser :\n  git diff src/data/brain-extract.json`);
