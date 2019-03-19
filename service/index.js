const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
  
;(async () =>{
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName:'3454545466',password:'4535363'})
  oneUser.save().then(()=>{
      console.log('插入成功')
  })
})()
app.use(async (ctx) => {
  ctx.body = '<h1>你好</h1>'
})

app.listen(3000, () => {
  console.log('3000');
})

