const User = require("../models/user"); // .. imports  parent folder 

// signup controller
const signup = async (req, res)=>{
    try{
        const {name, email, password } = req.body;
        
        const userExist = await User.findOne({ email }); // findOne() func in MongoDB retrieves docs matched with  given query 
        if (userExist) return res.status(400).json({ message : "user already exist"});

        const newUser = new User({ name, email , password}); // creates js object

        await newUser.save(); // .save() tells mongoose -> take this obj and insert into db
        
       res.status(201).json({ message : " New User has been created", user: newUser});
    } catch(error){
        res.status(500).json({message: "server error", error : error.message});
    }
};


// login controller

const login = async(req,res)=>{
    try{
        const {email, name, password }= req.body;

        //check if user exist
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({message: "user not found!"});

        if(user.password !== password){
            return res.status(400).json({message: "incorrect password"});
        }

        res.status(200).json({message: "login successful", user});
    }catch(error){
        res.status(500).json({message: " Server error "});
    }
};

module.exports = { signup, login };  // to export controller func. and {} for multiple func. 
 