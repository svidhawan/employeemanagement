const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const  app  = express();
const mysql = require('mysql2'); 
app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})


 app.use(cors());
 app.use(bodyparser.json());

const db= mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'root',
        database: 'employee',
        port:3306

    }
)
db.connect(err=>{
    if(err){
        console.log('err');
    }
    console.log("database connected");
})

app.get('/emp',(req,res)=>
{
  console.log("get users");

  let qr= "select emp.id,username,Address,mobile,email,status from emp_details  JOIN emp where emp.id=emp_details.id";
  
  db.query(qr,(err,result)=>
  {
     if(err){
         console.log('err',err);
     }
     if(result.length>0) 
     {
      console.log("get employees");

       res.send({
           message:"all user data",
           data: result
       })
     }
  }
)
})

app.get('/emp/:id',(req,res)=>{

     let eid = req.params.id;

    let qr=  `select * from emp where id = ${eid}`;
    
  db.query(qr,(err,result)=>
  {
     if(err){
         console.log('err',err);
     }
     if(result.length>0) 
     {
      console.log("get employees");

       res.send({
           message:"all user data",
           data: result
       })
     }
  }
)
})

app.post('/emp',(req,res)=>{

    console.log("New user being created",req.body);
    let id= req.body.id;
    let uname= req.body.username;
    let pass= req.body.password;
    let created= req.body.createdAt;
    let stat= 'active';
          
   let qr= `insert into emp(id,username,password,created_at,status) values('${id}','${uname}','${pass}','${created}','${stat}')`;

//    let qr=  `select * from emp where id = ${eid}`;
   
  db.query(qr,(err,result)=>
 {
     if(err){
         console.log('err',err);
     }
     console.log("result",result);
    
         console.log("result",result);
      console.log("employee inserted");

      res.send({
           message:" data inserted"
       })
    }
     )

})

app.put('/emp',(req,res)=>
{
    console.log(" user details being modified",req.body);
    
    let eid = req.body.id;
    let uname = req.body.username;
    let pass = req.body.password;
    let created = req.body.created_at;
    let stat = req.body.status;

    let qr= `update emp set username ='${uname}' ,password='${pass}',created_at='${created}',status='${stat}' 
            where id=${eid}`;

            db.query(qr,(err,result)=>
            {
                if(err){
                    console.log('err',err);
                }
                console.log("result",result);
                if(result)
                {
                    console.log("result",result);
                 console.log("employee inserted");
           
                 res.send({
                      message:" data inserted"
                  })
                }
        
           }
           )
    

})

app.delete('/emp/:id',(req,res)=>
{
    console.log("Request body=>",req.body);
   let eid= req.params.id;

   let qr= ` delete from emp where id=${eid}`;

   db.query(qr,(err,result)=>{
     
    if(err){
        console.log('err',err);
    }
    console.log("result",result);
    if(result)
    {
        console.log("result",result);
     console.log("employee deleted");

     res.send({
          message:" succesful operation"
      })
    }

   }
   )


}
)
