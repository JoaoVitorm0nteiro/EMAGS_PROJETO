const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./bd');

const app = express();
const port = 3000;

//conexao com o banco
conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado!');
    }
})

//ler o body
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
)

//carregando arquivos estaticos
app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//INDEX
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Emag',
        style: 'index.css'
    });
});

//PAGINA DE REGISTRO
app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Emag - Register',
        style: 'register.css'
    });


});

//inserindo dados do cadastro do usuario no banco
app.post('/cad', (req, res) => {

    const query = `INSERT INTO USER_REG (NOME, EMAIL, USERNAME, SENHA) 
    VALUES 
    ('${req.body.name}', '${req.body.email}', '${req.body.username}', '${req.body.pass}')`;

    conn.query(query, (err) => {
        if (err) console.log(err);
        console.log('OK!');
        res.redirect('login')
    })

})

app.get('/profile', (req,res)=>{

    res.render('profile', {
        title:'Profile',
        style:'profile.css'
    })
})

//PAGINA DE LOGIN
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Emag - Login',
        style: 'login.css'
    });
});

//autenticação misericordia
app.post('/auth', (req, res) => {
    const query = `SELECT * FROM USER_REG WHERE EMAIL = '${req.body.email}' AND SENHA = '${req.body.pass}'`;
    conn.query(query, (err, data) => {
        if(err) console.log(err);
        if(data.length>0) res.render('profile');

        //renderizando a pagina de login novamente no caso da senha estar errada
        //carrega um script js junto com um window.alert dizendo que a senha esta errada
        res.render('login',{
            title:'Login Incorreto',
            style:'login.css',
            js:'scriptlogin.js'
        });  
    })
})

app.listen(port, () => {
    console.log(`Executando na porta ${port}`);
});
