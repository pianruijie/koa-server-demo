
var mysql = require('mysql');
var config = require('./dbConfig');

var pool = mysql.createPool({
  host:config.database.HOST,
  user:config.database.USERNAME,
  password:config.database.PASSWORD,
  database:config.database.DATABASE
})
class Mysql{
  constructor(){

  }
  getTime()
  {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds())
    return Y+M+D+h+m+s;
  }
  query(){
    return new Promise((resolve,reject)=>{
      pool.query('select * from subs',function(err,results,fields) {
        if (err) {
          throw err
        }
        resolve(results)
      })
    })
  }
  queryPages(){
    return new Promise((resolve,reject)=>{
      pool.query('select * from paper',function(err,results,fields) {
        if (err) {
          throw err
        }
        resolve(results)
      })
    })
  }
  insertSubs(datas,id){
    let subid = id;
    let sql = `insert into subs VALUES`
    datas.forEach((item)=>{
      sql = sql+`(${++subid},"${item.content}",1,${Number(item.answer)},${Number(item.currAnswer)},now(),${Number(item.right)}),`
    })
    sql = sql.substring(0,sql.length-1)+";"
    console.log(sql)
    return new Promise((resolve,reject)=>{
      pool.query(sql,function(err,results,fields) {
        if (err) {
          throw err
        }
        resolve(results)
      })
    })
  }
  insertPaper(datas,id){
    let paperid = id;
    let sql = `insert into papers VALUES`
    datas.forEach((item)=>{
      sql = sql+`(${++paperid},"${item.deg}",${item.maxData},${item.minData},${item.duration},${item.subNum},now()),`
    })
    sql = sql.substring(0,sql.length-1)+";"
    console.log(sql)
    return new Promise((resolve,reject)=>{
      pool.query(sql,function(err,results,fields) {
        if (err) {
          throw err
        }
        resolve(results)
      })
    })
  }
  queryErrSub(){
    let sql = `select * from subs where right=0`
    return new Promise((resolve,reject)=>{
      pool.query(sql,function(err,results,fields) {
        if (err){
          throw err
        }
        resolve(results)
      })
    })
  }
}
module.exports=new Mysql();