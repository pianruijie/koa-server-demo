
const mysql = require('../connnect_db')
var fn_index = async (ctx, next) => {
  let data = await mysql.query();
  ctx.response.body={
    'errcode':0,
    'errstr':'good',
    'data':data,
  }
};


module.exports = [
  {
    method:'GET',
    url:'/users',
    func:fn_index
  }
]