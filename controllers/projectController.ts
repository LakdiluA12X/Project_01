import projectModel from "../model/projects";
import { Request, Response } from "express";
import { Project } from "../interfaces/int";
import { Model } from "mongoose";
import * as cache from '../cache/cacheHandler'

export async function getAllProjects (req:Request, res:Response): Promise<Response>{
    console.log("Getting All Projects...");
    try{
        console.log("Calling all Projects...")
        let projects = await cache.getFromCache();
        // let projects = await projectModel.find({});
        console.log(projects);
        return res.status(200).send(projects)
    } catch(err: any){
        console.log("Loading All Projects Failed.")
        console.log(err)
        return res.status(400).send({
            "message": "Cannot load All Projects",
            "error": err
        })
    }
}

export async function getProjectByCompany (req:Request, res:Response): Promise<Response> {
    console.log("Getting a Project By Name...");
    try{
        const companyName: string = req.params.company;
        console.log(`Company: ${companyName}`);
        let project = await projectModel.where("company").equals(companyName);
        console.log(project);
        return res.status(200).send(project);
    } catch (err: any) {
        console.log("Loading a Project Failed.")
        console.log(err)
        return res.status(400).send({
            "message": "Cannot load the Project",
            "error": err
        })
    }
}

export async function addProject (req: Request, res: Response): Promise<Response>{
    console.log("Adding Project....");
    try{
        const {company, country, state, credits} = req.body;
        console.log(`New Project: ${company} / ${country} / ${state} / ${credits}`);
        let newProject = await projectModel.create({
            company: company,
            country: country,
            state: state,
            credits: credits

        });
        console.log(newProject);
        let projects = await projectModel.find({});
        await cache.writeToCache(projects)
        return res.status(200).send({
            "message":"Project Added",
            "project": newProject
        })
    } catch (err: any){
        console.log("Error Occored.")
        return res.status(400).send(err)
    }
}