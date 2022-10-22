const express = require('express') ;
const path = require('path') ;
const port = 8000 ; 

const db = require('./config/mongoose') ; 
const Contact = require('./models/contact');
const app = express() ; 

app.set('view engine' , 'ejs') ;
app.set('views' , path.join(__dirname , 'views')) ; 
app.use(express.urlencoded()) ;
app.use(express.static('assets'))

// //middleware 1

// app.use(function(req,res,next){
// 	req.myName = 'Manit'
// 	//console.log('middleware1 called')
// 	next();
// })


// //middleware 2

// app.use(function(req,res,next){
// 	console.log('My Name from MW2', req.myName) 
// 	//console.log('middleware2  called')
// 	next();
// })


var ContactList = [
	{
		name : 'Manit',
		phone : '7840060203'
	},
	{
		name : 'Manish',
		phone : '9818162547'
	},
	{
		name : 'Pooja',
		phone : '9278308894'
	}
]

app.get('/' , function(req , res){
	// console.log('from the get route controller' , req.myName)


	Contact.find({} , function(err, contacts){
		if(err){
			console.log('Error in fetching Contacts from db');
			return;
		}

		return res.render('home' , { 
		title : 'My Contacts List' , 
		contact_list : contacts
		}) ; 


	});

});
	

app.get('/practice' , function(req , res){
	
	return res.render('practice' , { title : 'Lets play with ejs'}) ; 

});


app.post('/create-contact' , function(req , res){
	// ContactList.push({
	// 	name: req.body.name,
	// 	phone: req.body.phone
	// })

	Contact.create({
		name: req.body.name,
		phone: req.body.phone
	}, function(err,newContact){
		if(err){
			console.log('error in creating a contact!');
			return ;
		}

		console.log("*******", newContact);
		return res.redirect('back') ; 
	})
})


app.get('/delete-contact/' , function(req,res){
	// get the id from query in the ul 
	let id = req.query.id ;

	//find the contact in the database using id and delete it 
	Contact.findByIdAndDelete(id , function(err){
		if(err){
			console.log('Error in deleting an object in the database');
			return ;
		}

		return res.redirect('back') ; 
	})
	
})



app.listen(port , function(err){
	if(err){
		console.log("Error in running the server:",err);
	}
	console.log("Yup! My express server is running on port:" , port)
})