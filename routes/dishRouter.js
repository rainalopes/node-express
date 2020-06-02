const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"node",
  port: "3800"
});

con.connect(function(err) {
 if (err) throw err;
  console.log("Connected!");
});

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:4200', 'http://127.0.0.1:9000', 'http://localhost:9000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
    next();
})
.get((req,res,next)=>{

    con.query('Select * from dishes',(err,rows,fields)=>{
        if(!err){
        console.log(rows);
       // res.end(JSON.stringify(rows));
        res.send(rows);
    }
        //res.send(rows);
       // console.log(rows);
        else
        console.log(err);
        
    });
    
   
})
.post((req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name+ ' with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on dishes');
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.end('Deleting all the dishes');
});


dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end('Will send details of the dishes: '+ req.params.dishId+' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on dishes/'+req.params.dishId);
})
.put((req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId+' ')
    res.end('Will Update the dish: '+req.params.dishId +' with details '+ req.body.description);
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.end('Deleting dish: '+req.params.dishId);
});

module.exports = dishRouter;