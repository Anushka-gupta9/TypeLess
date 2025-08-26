const user = import("../models/user"); // .. imports  parent folder 

// signup controller
const signup = async (req, res)=>{
    try{
        const {name, email, password } = req.body;
        
        const userExist = (await user).findOne({email}); // findOne() func in MongoDB retrieves docs matched with  given query 
        if (userExist) return res.status(400).json({ message : "user already exist"});

        const newUser = newUser({ name, email , password}); // creates js object

        await newUser.save(); // .save() tells mongoose -> take this obj and insert into db
        
       res.status(201).json({ message : " New User has been created", user: newUser});
    } catch(error){
        res.status(500).json({message: "server error", error : error.message});
    }
};

moodule.exports = { signup };  // to export controller func. and {} for multiple func. 
 