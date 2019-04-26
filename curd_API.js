//This is joi, joi allows you to create blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.
const Joi = require('joi');
//The require() method is used to load and cache JavaScript modules. So, if you want to load a local,
//relative JavaScript module into a Node.js application, you can simply use the require() method.
//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
const express = require('express');
const app = express();

const fs = require('fs');
const read = fs.readFileSync(__dirname+'/data.json');
const readjson = JSON.parse(read);

app.use(express.json());

app.get('/api/courses/',(req,res)=>{
	res.send(readjson);
});

app.get('/api/courses/:id',(req,res)=>{
	const course = readjson.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send("The course with the given ID was not found.");
    res.send(course);
});

app.post('/api/courses',(req,res) => {
	const {error} = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message)

 	const course={
		id: readjson.length+1,
		name:req.body.name,
		description:req.body.description
	};
	readjson.push(course);
	fs.writeFileSync(__dirname +"/data.json", JSON.stringify(readjson,null,4));
	res.json(readjson);
});

app.put('/api/courses/:id',(req,res)=>{
	const course = readjson.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send("The course with the given ID was not found.");
	
	const {error} = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message)
	
	course.name = req.body.name;
	course.description = req.body.description;
	res.send(course);
});

app.delete('/api/courses/:di',(req,res) => {
	const course = readjson.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send("The course with the given ID was not found.");

	const index = readjson.indexOf(course);
	readjson.splice(index, 1);

	res.send(course);
});

function validateCourse(course){
	const schema ={
		name: Joi.string().min(3).required(),
		description:Joi.string().min(15).required()	
	};
	return Joi.validate(course, schema);
}

app.listen(4030,()=> console.log('listeing port 4030.......'));
