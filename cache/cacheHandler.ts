import { json } from 'express';
import fs from 'fs';

const cachePath: string = './cache/cache.json';

export function getFromCache () {
    try {
        let data = fs.readFileSync(cachePath, 'utf8');
        console.log(JSON.parse(data));
    } catch (err:any){
        console.log("Faild to load cache")
        return {
            "Error" : "Faild to load cache"
        }
    }
}

export function writeToCache (data: any) {
    try {
        console.log("Writing.........")
        var state:boolean = true
        fs.writeFileSync(cachePath, JSON.stringify(data), 'utf8');
        console.log(state)
        return state
    } catch (err:any){
        console.log("Faild to write to cache")
        console.log(err)
        return {
            "Error" : "Faild to write to cahce"
        }
    }
}