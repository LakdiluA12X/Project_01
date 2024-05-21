import express from 'express';
import dotenv from 'dotenv';
import connect from './database/connection.js';
import { addUser } from './controllers/userController.js';

dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/addUser', addUser)

connect().then(()=>{
    try{
        app.listen(port, ()=>{
            console.log(`Server is lisning from ${port}`)
        })
    } catch(err){
        console.log('Server Connection Fail')
        console.log(err)
    }
}).catch(error => {
    console.log("Database Connection Failed.")
    console.log(error)
})