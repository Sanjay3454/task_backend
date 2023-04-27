const db = require('./db')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');



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
        const id = uuidv4();

        user.data.push({   date: date,
          taskName: taskName,
          taskData: taskData,
          id:id
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
 


   deleteTas = (taskId) => {
    return db.tuser.updateOne(
      { "data.id": taskId },
      { $pull: { data: { id: taskId } } }
    ).then((result) => {
      if (result) {
        return {
          status: true,
          message: "deleted",
          statusCode: 200,
        };
      } else {
        return {
          status: false,
          message: "error",
          statusCode: 404,
        };
      }
    });
  };






 



  editTask = (date, taskName, taskData, email, Taskid) => {
    console.log("aman",date);
    return db.tuser.findOneAndUpdate(
      { "data.id": Taskid },
      { 
        "data.$.date": date,
        "data.$.taskName": taskName,
        "data.$.taskData": taskData 
      },
     
    )
    
    .then(user => {
      console.log("man",user);
      if (user) {
      
        return {
          status: true,
          message: "Task updated successfully",
          statusCode: 200,
          user
        };
      } else {
        return {
          status: false,
          message: "Task not found",
          statusCode: 404
        };
      }
    })
    .catch(err => {
      return {
        status: false,
        message: "Error updating task",
        statusCode: 500,
        err
      };
    });
  };
  
  
  

  

  module.exports = {
    register,
    login,
    tasks,
    getTask,
    deleteTask,
    deleteTas,
    editTask
  }