import { User } from "../entities/user-identify";
import { Request , Response } from "express";
import bcrypt from "bcrypt"
import { databaseConnection } from "../database/db";
import { sendMessageToUser } from "../socket/serve.soket";



    interface UserRegister {
        name     : string;
        email    : string;
        password : string;
        image    : string;
    }

    interface UserLogin {
        email : string,
        password : string;
    }


export const RegisterUser =  async (req: Request , res: Response) => {
    const { name , email , password , image }: UserRegister = req.body;

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password  , salt)

        const userAdded = new User();
        userAdded.name = name;
        userAdded.email = email;
        userAdded.password = hashPassword;
        userAdded.image = image;
     

        const userRepository = databaseConnection.getRepository(User)
        await userRepository.save(userAdded)
        
        return res.status(200).json({msg : "register successfully bro!" , userId:  userAdded.id})
        
    } catch (error) {
        return res.status(500).json({msg : "internal server error" , error})
    }
}



export const LoginUser =  async (req : Request , res : Response) => {
    const { email, password } : UserLogin = req.body;


    try {

        const userRepository  = databaseConnection.getRepository(User)
        
        const existingUser = await userRepository.findOne({where : { email }})
    

        if (!existingUser?.password) {
            return res.status(400).json({msg : "password not is set"})
        }
    
        const isPasswordValid = await bcrypt.compare(  password , existingUser.password )
        console.log(isPasswordValid);
        
    
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }
    
        sendMessageToUser(existingUser.id , "Welcome your are log in " , existingUser.email)

        console.log({userId : existingUser?.id});
        

        return res.status(200).json({ msg : "login successfully bro!" , userId:  existingUser?.id})
    } catch (error) {
        return res.status(500).json({msg : "internal server error" , error})        
    }

}

export const sendMessage = async (req: Request , res: Response) => {
    const {userId , message , email } = req.body

    sendMessageToUser(userId , message , email)

    return res.status(200).json({msg : "message sent successfully bro!"})

}