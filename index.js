const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//PAGINA DE LOGIN
app.get('/login', (req,res)=>{
    res.render('login',{
        title:'Login',
        style:'login.css'

    });
});

//PAGINA DE REGISTRO
app.get('/register', (req, res)=>{
   res.render('register',{
    title:'Register',
    style:'register.css'
   }); 
});

app.listen(port, ()=>{
    console.log(`Executando na porta ${port}`);
});
