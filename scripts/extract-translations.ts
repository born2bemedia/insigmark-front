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

  // Find all useTranslations/getTranslations with variable name and namespace
  // Matches: const t = useTranslations("ns") | const settingsT = useTranslations("account") | const t = await getTranslations(...)
  const namespaceRegex =
    /(?:const|let|var)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*["'`]([\w.-]+)["'`]\s*\)/g;
  const namespaces: { varName: string; name: string; index: number }[] = [];
  let nsMatch;
  while ((nsMatch = namespaceRegex.exec(content))) {
    namespaces.push({
      varName: nsMatch[1],
      name: nsMatch[2],
      index: nsMatch.index,
    });
  }
  if (namespaces.length === 0) return;

  // Build regex to match any translation variable: t("key", ...) or settingsT("key", ...)
  // Escape special regex chars in var names and join with |
  const varNamesPattern = namespaces
    .map((ns) => ns.varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .filter((v, i, a) => a.indexOf(v) === i) // unique
    .join('|');

  // Match varName("key", { fallback: "value" }) pattern
  const tRegex = new RegExp(
    `(${varNamesPattern})\\s*\\(\\s*(['"\`])([\\w.-]+)\\2\\s*,\\s*\\{[\\s\\S]*?fallback:\\s*(['"\`])((?:(?!\\4)[^\\\\]|\\\\.)*?)\\4[\\s\\S]*?\\}[\\s,]*\\)`,
    'g'
  );

  let match;
  while ((match = tRegex.exec(content))) {
    const key = match[3];
    const fallback = match[5];
    const tIndex = match.index;
    if (!key || !fallback) continue;

    // Find the namespace that applies (most recent useTranslations before this call)
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
