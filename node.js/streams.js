const fs = require ('fs');
 
const readstream = fs.createReadStream('./docs/blog3.txt',{encoding: 'utf-8'});
 const writestream = fs.createWriteStream('./docs/blog4.txt');
readstream.on ('data' , (chunk) =>{
    console.log('-------- new chunk--------');
    console.log(chunk);
    writestream.write('\n new chunk\n');
    writestream.write(chunk);
})
//piping 
readstream.pipe(writestream);