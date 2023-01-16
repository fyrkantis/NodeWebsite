"use strict";
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var port = process.env.PORT || 1337;

http.createServer(function (request, response) {
    console.log("URL: " + request.url)
    if (request.url == "/") {
        response.writeHead(308, "Permanent redirect", { "Location": "/index.html" });
        response.end();
        return;
    }
    let filePath = path.join(__dirname, "website", request.url);
    console.log(filePath)
    if (!fs.existsSync(filePath)) {
        response.writeHead(404, "Not Found");
        response.end();
        return;
    }
    try {
        let body = fs.readFileSync(filePath);
        response.writeHead(200, "OK", { "Content-Type": "text/html" });
        response.end(body);
    } catch (error) {
        response.writeHead(500, "Internal Server Error", { "Content-Type": "text/plain" });
        response.end(error);
    }
}).listen(port);
