/**
 *  P512
 *  ÁÄÌì·þÎñÆ÷
 */
var http = require('http');

var clientui = require('fs').readFileSync("chatclient.html");
var emulation = require('fs').readFileSync("EventSourceEmulation.js");

var clients = [];

setInterval(function () {
    clients.forEach(function (client) {
        client.write(":ping?n");
    });
}, 20000);

var server = new http.Server();

server.on("request", function (request, response) {
    var url = require('url').parse(request.url);

    if (url.pathname === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<script>" + emulation + "</script>");
        response.write(clientui);
        response.end();
        return;
    }
    else if (url.pathname !== "/client") {
        response.writeHead(404);
        response.end();
        return;
    }
    if (request.method === "POST") {
        response.setEncoding("utf-8");
        var body = "";
        request.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            response.writeHead(200);
            response.end();

            message = 'data:' + body.replace('\n', '\ndata:') + "\r\n\r\n";
            clients.forEach(function (client) {
                client.write(message);
            });
        });
    }
    else {
        response.writeHead(200, {"Content-Type": "text/event-stream"});
        response.write("data:Connected\n\n");

        request.connection.on("end", function () {
            clients.splice(clients.indexOf(response), 1);
            response.end();
        });
    }
});
server.listen(8000);