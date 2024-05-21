import projectModel from "../model/projects.js";

export async function getAllProjects (req, res){
    console.log("Getting All Projects...");
    try{
        const projects = await projectModel.find({});
        console.log(projects);
        return res.status(200).send(projects)
    } catch(err){
        console.log("Loading All Projects Failed.")
        console.log(err)
        return res.status(400).send({
            "message": "Cannot load All Projects",
            "error": err
        })
    }
}

export async function getProjectByCompany (req, res) {
    console.log("Getting a Project By Name...");
    try{
        const companyName = req.params.company;
        console.log(`Company: ${companyName}`);
        const project = await projectModel.where("company").equals(companyName);
        console.log(project);
        return res.status(200).send(project);
    } catch (err) {
        console.log("Loading a Project Failed.")
        console.log(err)
        return res.status(400).send({
            "message": "Cannot load the Project",
            "error": err
        })
    }
}

export async function addProject (req, res){
    console.log("Adding Project....");
    try{
        const {company, country, state, credits} = req.body;
        console.log(`New Project: ${company} / ${country} / ${state} / ${credits}`);
        const newProject = await projectModel.create({
            company: company,
            country: country,
            state: state,
            credits: credits

        });
        console.log(newProject);
        return res.status(200).send({
            "message":"Project Added",
            "project": newProject
        })
    } catch (err){
        console.log("Error Occored.")
        return res.status(400).send(err)
    }
}