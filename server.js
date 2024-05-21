import express from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import connect from './database/connection.js';
import { addUser } from './controllers/userController.js';
import * as projectController from './controllers/projectController.js';

dotenv.config();
const app = express();
const swaggerDoc = YAML.load('api-doc.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port = process.env.PORT || 5000;

app.post('/addUser', addUser);
app.post('/addProject', projectController.addProject);
app.get('/getAllProjects', projectController.getAllProjects);
app.get('/getProject/:company', projectController.getProjectByCompany);

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