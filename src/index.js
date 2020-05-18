import {h, render} from 'preact'
import {useState} from 'preact/hooks'

import {lookup} from './trie'

import './style.css'

import wordlist_trie from '../data/wordlist.trie.json'

/**
Special characters:
U+2713 (CHECK MARK):       ✓
U+2714 (HEAVY CHECK MARK): ✔
U+2717 (BALLOT X):         ✗
U+2718 (HEAVY BALLOT X):   ✘
*/
function successMessage(success) {
  if (success) {
    return '✓ is a word'
  }
  if (success === false) {
    return '✗ not a word'
  }
  return 'enter a word...'
}

function definitionLink(word) {
  return `https://en.wiktionary.org/wiki/${word}`
}

function successName(success) {
  if (success) {
    return 'success'
  }
  if (success === false) {
    return 'failure'
  }
  return 'empty'
}

function WordLookup() {
  const [word, setWord] = useState('')
  const onChange = ev => {
    const new_word = ev.target.value.toLowerCase()
    setWord(new_word)
  }
  // skip lookup if word is empty
  const success = word ? lookup(word, wordlist_trie) : null
  return (
    <main id="app" className={successName(success)}>
      <h1>
        <code>{word}</code>
      </h1>
      <h2>
        {successMessage(success)}
        <small>
          <a href={definitionLink(word)} target="_new" rel="noopener">define</a>
        </small>
      </h2>
      <div>
        <input type="text" onKeyUp={onChange} value={word} autofocus />
      </div>
    </main>
  )
}

const appNode = document.getElementById('app')
const containerNode = appNode.parentNode //=> document.body
render(<WordLookup />, containerNode, appNode)
