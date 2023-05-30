const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./bd');

const app = express();
const port = 3000;

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado!');
    }
})

// bd connection
/* conn.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Conectado');
    }
}) */

//ler o body
app.use(express.json());

app.use(
    express.urlencoded({
        extended:false,
    }),
)

//carregando arquivos estaticos
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//INDEX
app.get('/', (req,res)=>{
    res.render('index',{
        title:'index',
        style:'index.css'
    });
});

//PAGINA DE REGISTRO
app.get('/register', (req, res)=>{
   res.render('register',{
    title:'Register',
    style:'register.css'
   });

   
});

app.post('/cad', (req,res)=>{

    const regfiles = {
        email: req.body.email,
        nome: req.body.name,
        senha: req.body.pass,
        username: req.body.username
    }

    res.redirect('/login')

})

//PAGINA DE LOGIN
app.get('/login', (req,res)=>{
    res.render('login', {
        title:'Login',
        style:'login.css',
        js:'scriptlogin.js'
    });
});

//autenticação misericordia

app.post('/auth', (req,res)=>{

    res.redirect('login');

})

app.listen(port, ()=>{
    console.log(`Executando na porta ${port}`);
});
