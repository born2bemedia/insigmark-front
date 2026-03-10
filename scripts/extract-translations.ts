import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const outputFile = path.resolve('messages/en.json');

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = {
  [namespace: string]: {
    [key: string]: TranslationValue;
  };
};

const translations: Translations = {};

// Recursively walks through all files in the src directory
function walk(dirPath: string): void {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (/\.(js|ts|jsx|tsx)$/.test(file)) {
      extractFromFile(fullPath);
    }
  }
}

// Extract translation keys and fallbacks from a single file
function extractFromFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find all useTranslations/getTranslations with their positions (for multi-namespace files)
  const namespaceRegex =
    /(?:useTranslations|getTranslations)\(\s*["'`]([\w.-]+)["'`]\s*\)/g;
  const namespaces: { name: string; index: number }[] = [];
  let nsMatch;
  while ((nsMatch = namespaceRegex.exec(content))) {
    namespaces.push({ name: nsMatch[1], index: nsMatch.index });
  }
  if (namespaces.length === 0) return;

  // Match t("key", { fallback: "value" }) pattern
  // This regex properly handles quotes inside strings by:
  // 1. Capturing the quote type used for the key
  // 2. Capturing the quote type used for the fallback value
  // 3. Matching content until the matching closing quote (handling escaped quotes)
  // 4. \}[\s,]*\) allows trailing comma in object (e.g. { fallback: "x", })
  const tRegex =
    /t\(\s*(['"`])([\w.-]+)\1\s*,\s*\{[\s\S]*?fallback:\s*(['"`])((?:(?!\3)[^\\]|\\.)*?)\3[\s\S]*?\}[\s,]*\)/g;

  let match;
  while ((match = tRegex.exec(content))) {
    const key = match[2];
    const fallback = match[4];
    const tIndex = match.index;
    if (!key || !fallback) continue;

    // Find the namespace that applies to this t() call (most recent useTranslations before it)
    const applicableNs =
      namespaces
        .filter((ns) => ns.index < tIndex)
        .pop() || namespaces[0];

    const namespaceParts = applicableNs.name.split('.');

    // Unescape the fallback string
    const unescapedFallback = fallback
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, '`')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');

    const keyParts = key.split('.');

    // Combine namespace and key path
    const fullPathParts = [...namespaceParts, ...keyParts];

    const fullPath = fullPathParts.join('.');
    setNestedKey(translations, fullPath, unescapedFallback);
  }
}

// Builds nested translation keys (e.g., 'menu.title' becomes { menu: { title: "..." } })
function setNestedKey(
  obj: { [key: string]: TranslationValue },
  keyPath: string,
  value: string
): void {
  const keys = keyPath.split('.');
  let current = obj;

  keys.forEach((key: string, index: number) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] === 'string') {
        current[key] = {};
      }
      current = current[key] as { [key: string]: TranslationValue };
    }
  });
}

// Execute the extraction process
walk(srcDir);

// Ensure the messages folder exists and write the output
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf8');
console.log(`✅ Translations written to ${outputFile}`);
