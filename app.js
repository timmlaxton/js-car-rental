const express = require('express');
const exphbs = require('express-handlebars');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	session({
		secret: 'mysecret',
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
const Contact = require('./models/contact');
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
	const newContact = {
		name: req.user._id,
		message: req.body.message
	};
	new Contact(newContact).save((err, user) => {
		if (err) {
			throw err;
		} else {
			console.log('A new meesage has been sent by user', user);
		}
	});
});
app.get('/signup', (req, res) => {
	res.render('signupForm', {
		title: 'Register'
	});
});
app.post('/signup', (req, res) => {
	console.log(req.body);
	let errors = [];
	if (req.body.password !== req.body.password2) {
		error.push({ text: 'Password does not match' });
	}
	if (req.body.password.length < 6) {
		error.push({ text: 'Password must contain at least six characters' });
	}
	if (errors.length > 0) {
		res.render('signupForm', {
			errors: errors,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password,
			password2: req.body.password2,
			email: req.body.email
		});
	} else {
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				let errors = [];
				errors.push({ text: 'Email already exists' });
				res.render('signupForm', {
					errors: errors,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					password: req.body.password,
					password2: req.body.password2,
					email: req.body.email
				});
			} else {
				let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(req.body.password, salt);

				const newUser = {
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					password: hash
				};
				new User(newUser).save((err, user) => {
					if (err) {
						throw err;
					}
					if (user) {
						console.log('New user has been created');
					}
				});
			}
		});
	}
});

app.get('/email', (req, res) => {
	res.render('loginForm');
});

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
});
