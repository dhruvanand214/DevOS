export function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;

  text = text.toLowerCase();
  query = query.toLowerCase();

  let textIndex = 0;
  let queryIndex = 0;

  while (textIndex < text.length && queryIndex < query.length) {
    if (text[textIndex] === query[queryIndex]) {
      queryIndex++;
    }
    textIndex++;
  }

  return queryIndex === query.length;
}
