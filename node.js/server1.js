const http = require ('http'); 
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req , res) => {
// console.log(req.url , req.method);
//lodash
const num = _.random(0,20);
console.loq(num);

const greet = _.once( () => {
    console.log('hello') ;
});
greet();
greet();
// set header content typy 
res.setHeader('content-type','text/html');

let path = './views/';
switch(req.url) {
    case '/' :
        path += 'index.html';
        res.statusCode =200;
        break ; 
    case '/about' :
        path += 'index.html';   
        res.statusCode =200;
        break ; 
        case '/about-blah' :
            path += 'index.html';   
            res.statusCode =301;
            res.setHeader('location' , '/about');
            break ; 
    default:
        path +='404.html';
        res.statusCode =404;
        break ; 

}

// send an html file 

fs.readFile(path , (err , data )=>{
  if (err) {
    console.log(err);
    res.end();
} else {
    
    res.end(data);
}
})
});
server.listen(8180,'localhost', () =>{
console.log ( 'listening for requests on port 8180');
});
