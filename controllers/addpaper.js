
const mysql = require('../connnect_db')
var addpaper = async (ctx,next)=>{
  let datas  = await mysql.query();
  let id = datas.length;
  let data = await mysql.insertSubs(ctx.request.body.subs,id);
  ctx.response.body={
    'errcode':0,
    'errstr':'',
    'data':data
  }
}
module.exports=[
  {
    method:'POST',
    url:'/paper/add',
    func:addpaper,
  }
]