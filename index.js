const express = require('express')
const { engine } = require('express-handlebars')
const mysql = require('mysql')
const { createConnection } = require('net')


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'sandra',
    password: '',
    database: 'loginSystem'
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }
    else
        console.log('Conectado ao MySQL')
 
})

const app = express()
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/cadastro', (req, res) => { 
    let nome = req.body.nome
    let email  = req.body.email
    let senha = req.body.senha
    let lembrete = req.body.lembrete
    conn.query(
        `insert into login value ('${nome}', '${email}', md5('${senha}'), '${lembrete}');`,
        (err, result, fields) => {
            if (err) {
               console.log(err) 
               res.send('Erro no Cadastro'); 
            }
            else
            res.send('Cadastro Realizado');
        }
    )
})

app.post('/login', (req, res) => { 
    let email  = req.body.email
    let senha = req.body.senha
    conn.query(
        `select nome from login where email = '${email}' and senha = md5('${senha}')`,
        (err, result, fields) => {
            if (err) {
               console.log(err) 
               res.send('Falha no login'); 
            }
            else
            res.json(result);   
        }
    )
})


app.listen(8080)

