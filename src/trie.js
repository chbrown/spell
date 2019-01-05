export function create(words) {
  const trie = {}
  let cursor
  for (const word of words) {
    cursor = trie
    for (const letter of word) {
      if (!(letter in cursor)) {
        cursor[letter] = {}
      }
      cursor = cursor[letter]
    }
    cursor['$'] = 1
  }
  return trie
}

export function lookup(word, trie) {
  let cursor = trie
  for (const letter of word) {
    if (!(letter in cursor)) {
      return false
    }
    cursor = cursor[letter]
  }
  return cursor['$'] === 1
}
