
var hello = async (ctx,next)=>{
  let name = ctx.params.name;
  ctx.response.body=`<p>hello,${name}</p>`
}
module.exports = [
  {
    method:'GET',
    url:'/hello/:name',
    func:hello
  }
];