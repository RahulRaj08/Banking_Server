//import jwt

const jwt = require('jsonwebtoken')




userDetails = {
    1000: { acno: 1000, username: "rahul", password: 123, balance: 0, transaction:[] },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction:[] },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction:[] },
    1003: { acno: 1003, username: "gwen", password: 123, balance: 0, transaction:[] },
    1004: { acno: 1004, username: "MJ", password: 123, balance: 0, transaction:[] },
  }


//register



register=(acno, uname, psw)=> {   //*arrow function required 


    if (acno in userDetails) {
      return {
        statusCode:401,
        status:false,
        message:"user already exsist"
      }

    }
    else {
      userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
    
      return {
        statusCode:200,
        status:true,
        message:"Registration Success"
      }
    }
  }


  



login =(acno, psw)=> {



    

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        const token = jwt.sign({currentAcno:acno},'secretkey123')
    
        return {
            statusCode:200,
            status:true,
            message:"Login Success",
            token
          }
      }
      else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Password"
          }
      }
    }
    else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Acno"
          }
    }

  }


deposit=(acno, password, amount) => {
    
    var amnt = parseInt(amount) //converting to interger type

    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        userDetails[acno]["balance"] += amnt
        userDetails[acno]["transaction"].push({ type: 'CREDIT', amount: amnt })
        
        return {
            statusCode:200,
            status:true,
            message: userDetails[acno]["balance"]
          }
      }
      else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Password"
          }
      }
    }
    else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Acno"
          }
    }
  }


withdraw=(acno, password, amount) => {
    
    var amnt = parseInt(amount)

    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        if (amnt <= userDetails[acno]["balance"]) {

          userDetails[acno]["balance"] -= amnt
          userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: amnt })
          
          return {
            statusCode:200,
            status:true,
            message: userDetails[acno]["balance"]
          }

        }
        else {
            return {
                statusCode:401,
                status:false,
                message:"Insufficient Balance"
              }
        }

      }
      else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Password"
          }
      }

    }
    else {
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Acno"
          }
    }

  }  


getTransaction=(acno) => {
    if(acno in userDetails){
        return {
            statusCode:200,
            status:true,
            message: userDetails[acno]["transaction"]
          }

    }
    else{
        return {
            statusCode:401,
            status:false,
            message:"Incorrect Acno"
          }
    }
  }



  module.exports={ //to use method in other pages
    register,
    login,
    deposit,
    withdraw,
    getTransaction

  }

  