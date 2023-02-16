const express = require('express')
const app = express()

app.use(express.json())

const usersDB=[]
let baseId=1

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Server OK'
    })
})
//Mostrar usuario
app.get('/users',(req,res)=>{
    res.json(usersDB)
})
//crear nuevo usuario
app.post('/users',(req,res)=>{
    const data = req.body
        const newUser={
            id: baseId++,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            age: data.age
        }
        usersDB.push(newUser)
        res.status(201).json(newUser)   
})
//Buscar por ID
app.get('/users/:id',(req,res)=>{
    const id=Number(req.params.id) 
    const data=usersDB.find(item =>id===item.id)
       
       if(data){
        res.json(data)
       }else{
        res.status(404).json({
            message:'Invalid ID'
        })
       }
    })

app.listen(9000,()=>{
    console.log('Server started at: http://localhost:9000');
})
module.exports = app
