const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose
	.connect(keys.MongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to MongoDB...');
	})
	.catch((err) => {
		console.log(err);
	});

app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About'
	});
});

app.get('/contact', (req, res) => {
	res.render('contact', {
		title: 'Contact'
	});
});

//save constact from data
app.post('/contact', (req, res) => {
	console.log(req.body);
});
app.get('/signup', (req, res) => {
	res.render('signupForm', {
		title: 'Register'
	});
});

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
});
