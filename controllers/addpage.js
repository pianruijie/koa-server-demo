
const mysql = require('../connnect_db')
var addpage = async (ctx,next)=>{
  let datas  = await mysql.queryPages();
  let id = datas.length;
  let data = await mysql.insertPaper(ctx.request.body.subs,id);
  ctx.response.body={
    'errcode':0,
    'errstr':'',
    'data':data
  }
}
module.exports=[
  {
    method:'POST',
    url:'/page/add',
    func:addpage,
  }
]