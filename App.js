const http = require('http');
const fs = require('fs');
const path = require('path');
http.createServer((req, res) => {
    const {
        url
    } = req;
    console.log(url,typeof url);
    if(url==='/'){
        console.log("came inside")
        res.writeHead(200, { 'content-type': 'text/html' });
        const html = fs.readFileSync('./HTML/Sample.html');
        res.end(html);
    }
    else{
        const assetPattern = '/^/assets/[a-zA-Z]+.[a-zA-Z]+/';
        const filePath = `./${url}`;
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        staticFileHandler(req, res, filePath, contentType);
    }
   
   

}).listen(3010, () => {
    console.log("listening")
})
console.log("saf")
const staticFileHandler = (req, res, filePath, contentType) => {
	console.log('filePath ', filePath);
	fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(500);
			res.end(`Sorry, check with the site admin for error: ${err.code}`)
		} else {
			res.writeHead(200, {
				'Content-Type': contentType
			}); // indicate the request was successful
			res.end(content, 'utf-8');
		}
	})
}