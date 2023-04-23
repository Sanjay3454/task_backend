const db = require('./db')
const jwt = require("jsonwebtoken")



register = (uname, email, psw) => {
    console.log(uname,email,psw);
    today = new Date()
    //Storing the resolved output of findOne in a variable user, if present :- it returns object and if not present:- it returns null.
    return db.tuser.findOne({email}).then(user => {
      //if acno is present in db, then oject of that user gets returned else null is returned
      if (user) {
        return {
          status: false,
          message: "Account Already Present",
          statusCode: 404
        }
      }
      else {
        newUser = new db.tuser({
         uname:uname,
          email: email,
          password: psw,
          journal: []
        })
        newUser.save()
        return {
          status: true,
          message: "Account Registered Successfully",
          statusCode: 200
        }
      }
  
    })
  }


  login = (email, psw) => {

    return db.tuser.findOne({ email, password: psw }).then(user => {
      if (user) {
        //Storing Current User
        currentuser = user.email
        //Token Creation
        const token = jwt.sign({ email }, "superkey123")
        return {
          status: true,
          message: "Login Successfull",
          statusCode: 200,
          currentuser,
          token
        }
      }
      else {
        return {
          status: false,
          message: "Incorrect Account No: Or Password",
          statusCode: 404
        }
      }
    })
  
  }




  tasks = (date, taskName,taskData,email)=>{
    
    

    return  db.tuser.findOne({email}).then(user=>{
      if (user) {

        user.data.push({   date: date,
          taskName: taskName,
          taskData: taskData,
          })
            user.save()

          return {
            status: true,
            message: `stored`,
            statusCode: 200,
            user
          }

     }
     else {
       return {
         status: false,
         message: "error",
         statusCode: 404
       }
     }

    })
    
   }
  
   getTask = (email)=>{
    
    

    return  db.tuser.findOne({email}).then(user=>{
      if (user) {
        console.log(user);

          return {
            status: true,
            data: user.data,
           
            statusCode: 200,
            
          }

          
      
     }
     else {
       return {
         status: false,
         message: "error",
         statusCode: 404
       }
     }

    })
    
   }
 
   deleteTask = (email)=>{
    
    

    return  db.tuser.deleteOne({email}).then(user=>{
      if (user) {
        console.log(user);

          return {
            status: true,
            statusCode: 200,
            message:"deleted"
            
          }

          
      
     }
     else {
       return {
         status: false,
         message: "error",
         statusCode: 404
       }
     }

    })
    
   }
 













  //  editTask = (date, taskName,taskData,email)=>{
    
    

  //   return  db.tuser.updateOne(
  //     {$push: { data: { date, taskName, taskData } } } ) .then(user=>{
  //     if (user) {

  //       // user.data.push({date: date,
  //       //   taskName: taskName,
  //       //   taskData: taskData,
  //       //   })
           

  //         return {
  //           status: true,
  //           message: `stored`,
  //           statusCode: 200,
          
  //         }

  //    }
  //    else {
  //      return {
  //        status: false,
  //        message: "error",
  //        statusCode: 404
  //      }
  //    }

  //   })
    
  //  }






  
  

  

  module.exports = {
    register,
    login,
    tasks,
    getTask,
    deleteTask
    // editTask
  }