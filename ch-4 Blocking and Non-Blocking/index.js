const fs = require("fs");

// Sync
console.log("1");

const result = fs.readFileSync("./demo.txt","utf-8");
console.log(result);


console.log("2");


// Async
console.log("1");

const resultAsync = fs.readFile("./demo.txt", "utf-8", (err, result) => {
    if(err){
        console.log(err);
        
    }
    else{
        console.log(result);
        
    }
});

console.log("2");