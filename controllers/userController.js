import user from '../model/users.js'

export async function addUser (req, res){
    console.log("Adding User....");
    console.log(req.body)
    try{
        const {name, role, credits} = req.body;
        console.log(`New User: ${name} / ${role} / ${credits}`);
        const newUser = await user.create({
            name: name,
            role: role,
            credits: credits
        });
        console.log(newUser);
        return res.status(200).send("User Added")
    } catch (err){
        console.log("Error Occored.")
        return res.status(400).send(err)
    }
}