const express = require('express');
const app = express();

const fs = require('fs');

app.get('/api/courses',(req,res)=>{
	fs.readFile(__dirname+'/data.json',(err,data)=>{
		if(err){
			console.log('something went wrong');
		}
		else{
			var Data = JSON.parse(data.toString())
			return res.json(Data);
		}
	})
});	

// or

const read= fs.readFileSync(__dirname+'/data.json');
const readjson = JSON.parse(read)


app.get('/api/courses/',(req,res)=>{
	res.send(readjson);
});


app.get('/api/courses/:id',(req,res)=>{
	const course = readjson.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send("The course with the given ID was not found.");
    res.send(course);
});

app.listen(3000,() => console.log("Listening port 3000........\n\nlocalhost:3000/api/courses/\nor\nhttp://localhost:3000/api/courses/"));
