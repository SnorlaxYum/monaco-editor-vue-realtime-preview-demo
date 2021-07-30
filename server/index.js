const { parse, compileScript } = require('@vue/compiler-sfc')
const express = require('express')
const server = express()

server.use(express.json())

server.post('*', async (req, res) => {
  const { body } = req
  if(!body.value) {
    res.json({ok: false, error: 'wrong format'})
  } else {
    const parsed = parse(body.value)
    const script = compileScript(parsed.descriptor, {})
    let resultObj = ''
    let members = []
    if(parsed.descriptor.scriptSetup) {
      // let, const
      // script.scriptSetupAst[0].declarations.id.name
      // script.scriptSetupAst[0].declarations.init.value
      // function 
      // script.scriptSetupAst[2].id.name
      members.push(...function() {
        const all = script.scriptSetupAst, results = []
        all.forEach(mem => {
          if(mem.type === 'FunctionDeclaration') {
            results.push(mem.id.name)
          } else {
            results.push(...mem.declarations.map(me => me.id.name))
          }
        })
        return results
      }())
      res.end(`
        <style>${parsed.descriptor.styles.map(style => style.content).join('\n')}</style>
        <div id='app'>${parsed.descriptor.template.content}</div>
        <script>
          ${parsed.descriptor.scriptSetup.content.replace(/let|const/, 'var')}
          Vue.createApp({
            data() {
              return {${members.join(', ')}}
            }
          }).mount('#app')
        </script>
        `)
    } else {
      // const properties
      resultObj = /export default[\s\S]+/.exec(parsed.descriptor.script.content)[0].replace(/export default/, '')
      const resultBefore = parsed.descriptor.script.content.replace(/export default[\s\S]+/, '').replace(/let|const/, 'var')
      res.end(`
        <style>${parsed.descriptor.styles.map(style => style.content).join('\n')}</style>
        <div id='app'>${parsed.descriptor.template.content}</div>
        <script>
          ${resultBefore}
          Vue.createApp(${resultObj}).mount('#app')
        </script>
      `)
    }
  }
  
})

server.listen(8080)

export default server