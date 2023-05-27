const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    res.render('login')
});

app.listen(port, ()=>{
    console.log(`Executando na porta ${port}`);
});
