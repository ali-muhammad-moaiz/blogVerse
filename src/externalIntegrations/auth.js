import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";

class AuthService {
    client;
    account;

    constructor(){
        this.client = new Client()
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId);  

        this.account = new Account(this.client);
    }

    async getLoggedInUser(){
        try{
            return await this.account.get();
        }catch(exception){
            console.log("AuthService :: getLoggedInUser :: exception ", exception)
        }
    }

    async registerUser({email, password, name}){
        try{
            var registeredUser = await this.account.create(
                ID.unique(), 
                email, 
                password,
                name
            );
            if(registeredUser)
                return this.loginUser({email, password});
            else
                return registeredUser;
            
        }catch(exception){
            console.log("AuthService :: registerUser :: exception ", exception)
        }
    }

    async loginUser({email, password}){
        try{
            const user = this.account.createEmailSession(email, password);
            if(user)
                return user;
        }catch(exception){
            console.log("AuthService :: loginUser :: exception ", exception);
        }
        return null;
    }

    async logoutUser(){
        try{
            const loggedOutUser = await this.account.deleteSession(
                'current'
            );
            return loggedOutUser;
        }catch(exception){
            console.log("AuthService :: logoutUser :: exception ", exception);
        }
    }
}

const authService = new AuthService();
export default authService;