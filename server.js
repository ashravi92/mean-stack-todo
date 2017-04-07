var express=require('express');
var app=express();
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');


//connecting to the local mongodb
mongoose.connect('mongodb://localhost/meanstack');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.listen(8080);
console.log("App listening on port 8080");


//Mongoose Model
var Todo=mongoose.model('Todo',{
text: String
});

//Routes

//api
//get all Todo
app.get('/api/todos',function(req,res){
Todo.find(function(err,todos){
    if(err)
    res.send(err);
    res.json(todos);
});
});

//create todos
app.post('/api/todos',function(req,res){
Todo.create({
    text:req.body.text,
    done:false
},function(err,todo){
    if (err) res.send(err);
    Todo.find(function(err,todos){
      if(err)res.send(err);
      res.json(todos);
    });
});
});

//delete a todo
app.delete('/api/todos/:todo_id',function(req,res){
Todo.remove({
    _id:req.params.todo_id        
},function(err,todo){
if(err) res.send(err);
Todo.find(function(err,todos){
if(err) res.send(err);
res.json(todos);
});
})
});

//front end connection
app.get('*',function(req,res){
res.sendFile('./public/index.html');
});