const User = require("../models/user");

module.exports.renderSignupform=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postRoute=async(req,res)=>{
    try{
        let  {username,email,password}= req.body;
    const newUser= new User({
        email,username
    });
    let registereduser= await User.register(newUser,password);
    console.log(registereduser);
    req.login(registereduser,(err)=>{
        if(err)
            {
                next(err);
            }
            req.flash('success','welcome to wanderlust');
            res.redirect("/listings");
        
    });

   
    }catch(e){
       req.flash('error',e.message);
       res.redirect('/signup'); 
    }

};



module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash('success','Welcome back to Wanderlust');
   let redirecturl= res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);

};


module.exports.delete=(req,res,next)=>{
    req.logOut((err)=>{
        if(err)
            {
               return next(err);
            }
        req.flash('success','You are logged out!');
        res.redirect('/listings');
    });
};
