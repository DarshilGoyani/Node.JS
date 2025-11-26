const fs = require("fs");



// write function overwrites the string in the file
// sync
fs.writeFileSync("./demo.txt", "Hello World");

// async
fs.writeFile("./lo.txt", "Hello Async world", (err) => {
    if(err){
        console.log(err);
    }
})




// file ma data add karva mate
// sync
fs.appendFileSync("./userLog.txt", new Date().toLocaleString() + "\n");

// Async
fs.appendFile("./userLog.txt", new Date().toLocaleString() + "\n", (err) => {});




// file ne read karva mate
// sync
const result = fs.readFileSync("./userLog.txt", "utf-8");//  utf-8 .txt file nu encoder che
console.log(result);

// Async
fs.readFile("./userLog.txt", "utf-8", (err, result) => {
    if(err){
        console.log(err);
        
    }
    else{
        console.log("Async Read := ",result);
        
    }
});

// file ne delete karva mate
fs.unlinkSync("./userLog.txt");


