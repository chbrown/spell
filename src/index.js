import {h, render, Component} from 'preact'
import bind from 'bind-decorator'

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

class WordLookup extends Component {
  constructor() {
    super()
    this.state = {word: ''}
  }
  @bind
  onChange(ev) {
    const word = ev.target.value.toLowerCase()
    this.setState({word})
  }
  render(props, {word}) {
    // skip lookup if word is empty
    const success = word ? lookup(word, wordlist_trie) : null
    return (
      <main className={successName(success)}>
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
          <input type="text" onKeyUp={this.onChange} value={word} autofocus />
        </div>
      </main>
    )
  }
}

const containerNode = document.body
const appNode = document.getElementById('app')
render(<WordLookup />, containerNode, appNode)
