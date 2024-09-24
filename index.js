const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM books'
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        res.render('home', { books })
    })
})

app.get('/edit/:id',(req,res)=>{
    const id = req.params.id
    const sql = 'SELECT * FROM books WHERE id = ?'

    conn.query(sql, id,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('edit',{book})
    })
})

app.get('/book/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ?`
    conn.query(sql,id,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const book = data[0]      
        res.render('book', {book})
    })
})

app.get('/create', (req, res) => {
    res.render('cadastro')
})

app.post('/insertbook', (req, res) => {
    const title = req.body.title
    const qtpages = req.body.qtpages

    const sql = `INSERT INTO books (??, ??) VALUES (?,?)`
    const data = ['title','qtpages',title, qtpages]
    conn.query(sql, data, (err) => {
        console.log(err)
    })
    res.redirect('/')
})

app.post('/editbook',(req,res)=>{
    const id = req.body.id
    const title = req.body.title
    const qtpages = req.body.qtpages

    const sql = `UPDATE books SET ?? = ? , ?? = ? WHERE ?? = ?`
    const data = ['title',title,'qtpages',qtpages,'id',id]
    conn.query(sql,data,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.post('/deletebook/:id',(req, res)=>{
    const id = req.params.id
    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.listen(3000)
