import express, {Express} from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import connect from './database/connection';
import { addUser } from './controllers/userController.js';
import * as projectController from './controllers/projectController';
import projectModel from './model/projects';
import * as cache from './cache/cacheHandler'

dotenv.config();
const app: Express = express();
const swaggerDoc: any = YAML.load('api-doc.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port: any = process.env.PORT || 5000;

app.post('/addUser', addUser);
app.post('/addProject', projectController.addProject);
app.get('/getAllProjects', projectController.getAllProjects);
app.get('/getProject/:company', projectController.getProjectByCompany);

connect().then(()=>{
    try{
        app.listen(port, async ()=>{
            console.log(`Server is lisning from ${port}`)
            console.log("Calling init Data");
            let projects = await projectModel.find({});
            console.log(projects);
            console.log("Writeing to cache.."); 
            let result = cache.writeToCache(projects)
            console.log(`Writing Cache ${result}`)
        })
    } catch(err: any){
        console.log('Server Connection Fail')
        console.log(err)
    }
}).catch((error: any)=> {
    console.log("Database Connection Failed.")
    console.log(error)
})