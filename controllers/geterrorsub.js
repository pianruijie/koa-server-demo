
const mysql = require('../connnect_db')
let getErrorSub = async (ctx,next)=>{
  let datas = await mysql.queryErrSub();
  ctx.response.body={
    'errcode':0,
    'errstr':'',
    'data':datas
  }
}
module.exports=[
  {
    method:'POST',
    url:'/paper/err_sub',
    func:getErrorSub,
  }
]