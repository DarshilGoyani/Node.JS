const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    if (req.url === '/favicon.ico') {
        return;
    }

    const msg = `New USer ${new Date()} IP Adress := ${req.socket.remoteAddress}\n`

    fs.appendFile('userLog.txt',msg, (err) => {})
    console.log(req.url);

    let fileName = "";

    switch (req.url) {
        case '/':
            fileName = "index.html"
            break;

        case '/contact':
            fileName = "contact.html"
            break;

        case '/blog':
            fileName = "blog.html"
            break;

        case '/gallary':
            fileName = "gallary.html"
            break;
    
        default:
            fileName = "404.html"
            break;
    }

    fs.readFile(fileName,(err,result) => {
        if (err) {
            console.log(err);
            
        }
        res.end(result);
    })

})

server.listen(8000,(err) =>{
    if (err) {
        console.log("server not started due to some error", err);
        return false;
    }
    console.log("server started");
    
})