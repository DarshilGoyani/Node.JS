// these are global objects
/*
__filename := uses to get file Path
__dirname := uses to get folder path
setTimeout() : perticular secund ke baad ek baar run karta he 
setInterval() : perticular secund ke baad baar baar run karta he 
*/

console.log("File Path := ",__filename);
console.log("Folder Path := ",__dirname);

setTimeout(() => {
    console.log("Darshil Goyani");
},50000);
let i = 0;
setInterval(() => {
    
    console.log(`5 * ${i} = ${5 * i++}`)
}, 1000);