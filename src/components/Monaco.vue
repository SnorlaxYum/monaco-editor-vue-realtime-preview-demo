<template>
  <div ref='leftRef'>
    <div ref="editorRef" id='textarea'></div>
    <div ref='buttonsRef'>
      <input ref="loadRef" type="file" @change="load" />
      <button @click="save">Save</button>
      <button @click="preview">Preview</button>
    </div>
  </div>
  <iframe id="preview" ref="previewRef" :srcdoc="previewTemp" />
</template>

<script setup>
import { defineProps, reactive, ref, nextTick } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const previewTemp = `<html><head></head><body></body></html>`

defineProps({
  msg: String
})

const state = reactive({ count: 0, editorLoaded: false })
const leftRef = ref()
const loadRef = ref()
const editorRef = ref()
const previewRef = ref()
const buttonsRef = ref()
let editorNow

function load(e) {
  const file = new FileReader()
  file.readAsText(e.target.files[0])
  file.onload = e => {
    // console.log(e.target.result)
    editorNow.setValue(e.target.result)
  }
}

function save(e) {
  const a = document.createElement('a')
  console.log(loadRef)
  const file = new Blob([editorNow.getValue()])
  a.href = URL.createObjectURL(file)
  a.download = loadRef.value.files.length ? loadRef.value.files[0].name : ''
  a.click()
}

async function preview(e) {
  const value = editorNow.getValue()
  const result = await fetch('/preview', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({value})
    }
    ).then(res => res.ok ? res.text() : 'error')
  if(!previewRef.value.contentWindow.Vue) {
    const vueScr = document.createElement('script')
    vueScr.addEventListener('load', async e => {
      console.log('Vue loaded.')
      const final = new Range().createContextualFragment(result)
      for(const child of [...previewRef.value.contentDocument.body.childNodes]) {
        previewRef.value.contentDocument.body.removeChild(child)
      }
      previewRef.value.contentDocument.body.appendChild(final)
    })
    vueScr.src = `https://unpkg.com/vue@next`
    console.log(previewRef.value.contentDocument.head)
    previewRef.value.contentDocument.head.appendChild(vueScr)
  } else {
    const final = new Range().createContextualFragment(result)
    for(const child of [...previewRef.value.contentDocument.body.childNodes]) {
      previewRef.value.contentDocument.body.removeChild(child)
    }
    previewRef.value.contentDocument.body.appendChild(final)
  }
}


nextTick(async () => {
  if(state.editorLoaded) {
    console.log('editor loaded')
  } else {
    const defaultCode = `<template>
      <div id='user'>Current user is: {{ user }}</div>
  </template>
  <script>
  export default {
      data() {
          return {
              user: 'John Doe'
          }
      }
  }
  \<\/script\>
  <style>
      div#user {
          color: white;
          background: black;
      }
  </style>`
  console.log(parseInt(getComputedStyle(leftRef.value).height) - parseInt(getComputedStyle(buttonsRef.value).height))
    editorRef.value.style.height = `${parseInt(getComputedStyle(leftRef.value).height) - parseInt(getComputedStyle(buttonsRef.value).height)}px`
    editorNow = monaco.editor.create(editorRef.value, {
      value: defaultCode,
      language: 'vue',
      theme: 'vs-dark'
    });
    await preview()
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}
#textarea {
  text-align: left;
}
#buttons {
  height: 2em;
}
#preview {
  grid-column: auto/span 1fr;
  text-align: left;
  overflow: auto;
  width: 99.2%;
  height: 99.2%;
}
</style>
