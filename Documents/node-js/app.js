function greeting(){
  console.log("hi");
}
greeting();
let bye=function(){
  console.log("bye");
}
bye();
function welcome(fun){
  fun();
}
welcome(bye);
