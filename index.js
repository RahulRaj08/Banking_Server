// import dataService file from service folder
//to use method fro, other pages use export
const dataservice = require("./service/dataService")


// import express
const express = require('express') 


//import jwt
const jwt = require('jsonwebtoken')

//create app

const app=express()

// create request

//to convert to json data
app.use(express.json())


//middleware for verification of token



    const jwtmiddleware=(req,res,next)=>{
        console.log("...........Router Specific MIddleware......");
        try{
            const token = req.headers['access-token'] //obtaining token from the client
            const data = jwt.verify(token,"secretkey123") //verify token and save in variable
            console.log(data);
            next() // to continue to next processes, else server will be stuck
        }
        
    

catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login"
    })
    
}
    }




//register

app.post('/register',(req,res)=>{

    const result=dataservice.register(req.body.acno,req.body.uname,req.body.psw)
    res.status(result.statusCode).json(result)    
    
    
})


//login

app.post('/login',(req,res)=>{

    const result=dataservice.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)    
    
    
})

//deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    const result=dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)    
    
    
})
//withdraw
app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result=dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)    
    
    
})
//transaction
app.post('/transaction',jwtmiddleware,(req,res)=>{

    const result=dataservice.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)    
    
    
})
//delete





// //GET

// app.get('/',(req,res)=>{
//     res.send('GET Method checking..........')
// })

// //post
// app.post('/',(req,res)=>{
//     res.send('POST Method checking..........')
// })

// //put
// app.put('/',(req,res)=>{
//     res.send('PUT Method checking..........')
// })
// //patch
// app.patch('/',(req,res)=>{
//     res.send('PATCH Method checking..........')
// })
// //delete
// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking..........')
// })


//set port

app.listen(3000,()=>{
    console.log("Server started at port number 3000");
})