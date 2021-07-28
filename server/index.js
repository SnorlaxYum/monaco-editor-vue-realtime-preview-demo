const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const server = require('express')()

function vueTempParse(body) {
  const template = /<template>([\s\S]+)<\/template>/.exec(body)[1]
  const script = /<script>([\s\S]+)<\/script>/.exec(body)[1]
  const style = /<style>([\s\S]+)<\/style>/.exec(body)[1]
  // TODO: get members of script export default
}

server.get('*', async (req, res) => {
  const { body } = req

  const app = createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })

  const appContent = await renderToString(app)
  const html = `
  <html>
    <body>
      <h1>My First Heading</h1>
      <div id="app">${appContent}</div>
    </body>
  </html>
  `

  res.end(html)
})

server.listen(8080)