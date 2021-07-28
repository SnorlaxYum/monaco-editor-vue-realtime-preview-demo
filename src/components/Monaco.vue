<template>
  <div ref='leftRef'>
    <div ref="editorRef" id='textarea'></div>
    <div ref='buttonsRef'>
      <input ref="loadRef" type="file" @change="load" />
      <button @click="save">Save</button>
      <button @click="preview">Preview</button>
    </div>
  </div>
  <div id='preview' ref='previewRef'></div>
</template>

<script setup>
import { defineProps, reactive, nextTick, onBeforeMount, ref } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

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

nextTick(() => {
  if(state.editorLoaded) {
    console.log('editor loaded')
  } else {
    const defaultCode = `<div>vue on the fly</div>`
    editorRef.value.style.height = `${parseInt(getComputedStyle(leftRef.value).height) - parseInt(getComputedStyle(buttonsRef.value).height)}px`
    editorNow = monaco.editor.create(editorRef.value, {
      value: defaultCode,
      language: 'vue',
      theme: 'vs-dark'
    });
    const final = new Range().createContextualFragment(defaultCode)
    
    previewRef.value.appendChild(final)
  }
})

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

function preview(e) {
  const value = editorNow.getValue()
  const final = new Range().createContextualFragment(value)
  for(const child of [...previewRef.value.childNodes]) {
    previewRef.value.removeChild(child)
  }
  previewRef.value.appendChild(final)
}

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
}
</style>
