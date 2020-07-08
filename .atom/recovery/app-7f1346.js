var fs=require('fs');
/*reading files asynchronuosly
fs.readFile('./txt/one.txt','utf8',function(err,data){
  fs.readFile('./txt/two.txt','utf8',function(err,data2){
    fs.writeFile('./txt/three.txt',data2+data+"",err=>{
      return ;
    });
  });
});
*/
//creating a web server//
/*
var http=require('http');
var server=http.createServer((res,req) =>{
  res.end("hello world");
});
server.listen(8000,'127.0.0.1',() =>{
  console.log('listening to port 8000');
});*/
//modules//
var express=require('express');
var http=require('http');
var url = require('url');
var app=express();

const tempProduct=fs.readFileSync('./starter/templates/product.html','utf8');
const tempOverview=fs.readFileSync('./starter/templates/template-overview.html','utf8');
const tempCard=fs.readFileSync('./starter/templates/template-card.html','utf8');

const data=fs.readFileSync('./final/dev-data/data.json','utf8');
const dataObj=JSON.parse(data);

//function replace//
function replaceTemplate(temp,product){
  let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
     output = output.replace(/{%IMAGE%}/g,product.image);
     output = output.replace(/{%PRICE%}/g,product.price);
     output = output.replace(/{%FROM%}/g,product.from);
     output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
     output = output.replace(/{%QUANTITY%}/g,product.quantity);
     output = output.replace(/{%DESCRIPTION%}/g,product.description);
     output = output.replace(/{%ID%}/g,product.id);

     if(!product.organinc)output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
     return output;
};

app.get('/',(req,res) =>{
  res.writeHead(200,{'Content-type':'text/html'});
  const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join(' ');
  const output=tempOverview.replace(/{%PRODUCT_CARDS%}/,cardsHtml);
  res.end(output);

});
app.get('/product',(req,res) =>{
  res.writeHead(200,{'Content-type':'text/html'});
  res.end(tempProduct);
});
app.get('/api',(req,res)=>{
  res.writeHead(200,{'Content-type':'application/json'});
  res.end(data);
})

app.listen(8000);
