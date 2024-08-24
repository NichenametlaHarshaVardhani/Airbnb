const Listing = require("../models/listing");

module.exports.index= async (req,res)=>{
    const allistings = await Listing.find({});
    res.render("listings/index.ejs",{allistings});
};

module.exports.renderNewForm=(req,res)=>{
    console.log(req.user);

    console.log("new list");
    res.render("./listings/new.ejs");
};

module.exports.showRoute=async (req,res)=>{
    let {id} = req.params;
    let individuallisting = await Listing.findById(id).populate({path:"reviews",populate:{ path:"author"},}).populate("owner");
    
    console.log(individuallisting);
    if(!individuallisting)
        {
            req.flash('error','Listing you requested for does not exists');
            res.redirect('/listings');
        }
        console.log(individuallisting);
    

    res.render("listings/show.ejs",{individuallisting});
};

module.exports.createRoute=async(req,res,next)=>{
    let url= req.file.path;
    let filename=req.file.filename; 
    // console.log(url," ",filename); 
    const newlisting=new Listing(req.body.listing) ;
    newlisting.owner= req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash('success','New listing created');
    res.redirect("/listings");



};


module.exports.edit=async (req,res)=>{
    let {id} = req.params;
    let editlist = await Listing.findById(id);
    if(!editlist)
        {
            req.flash('error','Listing you requested for does not exists');
            res.redirect('/listings');
        }
        let originalImage= editlist.image.url; 
    originalImage=originalImage.replace("/upload","/upload/w_250");  
    res.render("listings/edit.ejs",{editlist,originalImage});
};

module.exports.update=async (req,res)=>{
    
    let {id}= req.params;
    console.log(req.body);
    
   
  let listing= await  Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file!== "undefined"){
    let url= req.file.path;
  let filename=req.file.filename; 
  listing.image={url,filename};
  await listing.save();
  }
   req.flash('success','Listing was updated');
   res.redirect(`/listings/${id}`);

};

module.exports.delete=async (req,res)=>{
    let {id}= req.params;
   let deleted=  await Listing.findByIdAndDelete(id);
   req.flash('success','listing was deleted');
    res.redirect("/listings");
};
