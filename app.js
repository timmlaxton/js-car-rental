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
	res.render('home', {
		title: 'Home'
	});
});

app.listen(port, () => {
	console.log(`Server running on port` + port);
});
