import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import session from "express-session"
import User from './dbModel.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

const app = express()
const port = process.env.PORT || 9000
const JWT_SECRET = 'manthansturakhia'
app.use(express.json())
app.use(cors())

const connectionUrl = "mongodb+srv://admin:admin123@cluster0.hbt3j.mongodb.net/sysdb?retryWrites=true&w=majority"

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log(
        "DB CONNECTED"
    )
})


app.use(bodyParser.urlencoded({extended:true}))





app.get("/",(req,res) => res.status(200).send("HELLOOOO"))



app.post("/register", async(req, res) => {
    var {name, username, password, user_type, points} = req.body
    
     password = await bcrypt.hash(password,10)
     if(!username || typeof username !== 'string'){
         return res.error({status: 'error', error:'Invalid username'})
     }

     try{
        const response = await User.create({
            name,
            username,
            password,
            user_type,
            points
        })
        console.log("user created")
     }
     catch(error){
         if(error.code === 11000){
            return res.json({status:'error', error:'Username is already in use'})
         }
         console.log(error.message)
  
     }
     
})

app.post('/login', async (req,res) => {
    const {username, password} = req.body
    const user =await User.findOne({username}).lean()
   
    if(!user){
        return res.status(401).send("User not found")
        //return res.json({status:'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)){
        
        const token = jwt.sign({
            id:user._id,
             username: user.username,
             
            },JWT_SECRET)
            var data = jwt_decode(token)
            console.log("toeknnn",data)
            return res.json(data)
    }
})

app.get('/getUserDetails', async (req,res) => { 

    const username = req.query.username
    
   
    User.find({username: username}, (err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
            console.log(data);
        }
    })
   // return res.json({data: userDetails.user_type })

})

app.get('/getAllUsers', async (req,res) => { 

   
    User.find( (err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
            console.log(data);
        }
    })
   // return res.json({data: userDetails.user_type })

})

// app.post("/registerr",(req,res) => {
//     var name = req.body.name
//     var username = req.body.username
//     var password = req.body.password
//     var user_type = req.body.user_type
//     User.register(new User({username: username, name: name,user_type:user_type}), password,
//     function(err,user) {
//         if(err){
//             res.status(500).send(err)
//         }
//         passport.authenticate("local")(
//             req,res, function(){
//                 res.send("REGISTERED")
//             }
//         )
//     })
// })

app.post('/updatePoints', async (req,res) => {
    const {username, attendance, late_coming, reason, behavior, work, culture} = req.body
    console.log(req.body);
    User.updateOne({username: username},
        {
            
            points : {
                attendance: attendance,
                late_coming: late_coming,
                reason: reason,
                behavior:behavior,
                work:work,
                culture:culture
            }
 
        },
        (err,data) => {
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(data)
                console.log(data);
            }
        
        }

    )

})



app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))