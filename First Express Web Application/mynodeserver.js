const express=require("express");
const app=new express();
const Port=3000;
// map url with path and handlerequest
app.get('/temp/:location_code',function(req,res){
    const varloc=req.params.location_code;
console.log(varloc);
})
app.get('/',function(req,res){
   
console.log("here");
})
// create instance of web server that listen to request on given port number
let server=app.listen(Port,function(){
    console.log(`listen on portnumber${Port}`);
})