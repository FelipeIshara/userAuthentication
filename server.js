const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())

const users = []

app.get('/users', (req,res) => res.json(users))

app.post('/users', async (req,res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user != null){
        return res.send("este usuário já existe") 
    } else {
        try {
            hashedPassword = await bcrypt.hash(req.body.password, 10)
            console.log(hashedPassword)
            const user = {name: req.body.name, password:hashedPassword}
            users.push(user)
            res.status(201).send()
        } catch (err) {
            res.status(500)
            console.log(err)
        }
    }
    
}) 

//users login request
app.post('/users/login', async (req,res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null){
        return res.status(400).send('Usuário não existe')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Logado')
        } else{
            res.send('Senha incorreta')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.listen(3000) 