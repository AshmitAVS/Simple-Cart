import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController{
    getRegister(req,res){
        res.render("register");
    }

    getLoginPage(req,res){
        res.render("login",{errorMessage:null});
    }

    postRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.addUser(name,email,password);
        res.render("login",{errorMessage:null});
    }

    postLogin(req,res){
        const {email,password}=req.body;
        const loginUser=UserModel.isValidUser(email,password);
        if(!loginUser){
            return res.render("login",{errorMessage:"Invalid Credentials !"});
        }
        req.session.userEmail=email;
        var products = ProductModel.getAll();
        res.render('index', { products ,userEmail:req.session.userEmail});
    }

    logout(req,res){
    //On logout, destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/login");
            }
        });    
    }
}