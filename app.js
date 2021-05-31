const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

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
app.get('/signup', (req, res) => {
	res.render('signupForm', {
		title: 'Register'
	});
});

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
});
