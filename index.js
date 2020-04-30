const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;
const dishRouter = require('./routes/dishRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json());
app.use('/dishes',dishRouter);


/* app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of the dishes: '+ req.params.dishId+' to you');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on dishes/'+req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId+' ')
    res.end('Will Update the dish: '+req.params.dishId +' with details '+ req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('Deleting dishes: '+req.params.dishId);
}); */
app.use((req,res, next) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});