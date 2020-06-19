module.exports.counter=function(arr){
return "the length of array is "+arr.length+" elements";
};
module.exports.multiply=function(a,b){
  return `the product of ${a} and ${b} is ${a*b}`;
};
var t=1;
var token =function(){
  return t++;
};
module.exports.ant=token;
