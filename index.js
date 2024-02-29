const http = require('http');
const fs = require('fs');
var requests = require("requests")
const home = fs.readFileSync("home.html", "utf-8");


const replaceval = (tempval,val)=>{
    let temp = tempval.replace('{%tempval%}',val.main.temp);
    temp = temp.replace('{%tempmin%}',val.main.temp_min);
    temp = temp.replace('{%tempmax%}',val.main.temp_max);
    temp = temp.replace('{%location%}',val.name);
    return temp;
};

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=34ea2ebb18c5476a8a209cda6ca75339')
            .on('data', function (chunk) {
                const objdata= JSON.parse(chunk);
                const arr = [objdata];
                //console.log(arr);
                const realtime = arr.map((val) => replaceval(home, val)).join("");
                res.write(realtime);
                //console.log(realtime)
                
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});

server.listen(3000,'127.0.0.1');