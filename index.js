
const koa = require('koa2')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const cros =require('koa2-cors')

const app = new koa();
app.use(bodyParser())
app.use(cros());

//理解中间件的概念，next是注册的下一个异步函数
// app.use(async (ctx,next)=>{
//   console.log(`${ctx.request.method},${ctx.request.url}`);
//   await next();
// })
// app.use(async (ctx,next)=>{
//   let start = new Date().getTime();
//   await next();
//   let time = new Date().getTime()-start;
//   console.log(`Time:${time}ms`)
// })
// app.use(async (ctx,next)=>{
//   await next();
//   ctx.response.type='text/html';
//   ctx.response.body='<p>hello world</p>'
// })


//查找controllers下所有接口
function addControllers(){
  var files = fs.readdirSync(__dirname+'/controllers');
  var js_files = files.filter((item)=>{
    return item.endsWith('.js')
  })
  for (var f of js_files){
    console.log(f)
    let mapping = require(__dirname+'/controllers/'+f);
    console.log(mapping)
    addMapping(mapping)
  }
}
function addMapping(mapping){
  mapping.forEach((item)=>{
    switch (item.method){
      case 'GET':
        router.get(item.url,item.func)
        console.log(`register url: GET${item.url}`)
        break;
      case 'POST':
        router.post(item.url,item.func)
        console.log(`register url: POST${item.url}`)
        break;
      default:
        break;
    }
  })
}
addControllers();
app.use(router.routes());
console.log(JSON.stringify(router))
app.listen(3333);