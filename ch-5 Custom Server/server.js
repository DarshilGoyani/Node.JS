const http = require('http');

const server = http.createServer((req,res) => {
    res.write("<h1>Server is live</h1>");
    res.end();
})

server.listen(8000,(err) =>{
    if (err) {
        console.log("server not started due to some error", err);
        return false;
    }
    console.log("server started");
    
})