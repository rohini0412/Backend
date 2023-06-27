const File = require("../model/File") ;
const cloudinary = require("cloudinary").v2 ;
exports.localFileUpload=async(req,res)=>{
    try{
    const file =req.files.file ;
    console.log("file aagyi" ,file) ;

    let path = __dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
    ;
    console.log(path) ;
    file.mv(path,(err)=>{
        console.log(err) ;
    })
    res.json({
        success : true ,
        message :"file is uploaded successfully" 
    })
    }
    catch(error){
      console.log("unable to upload") ;
      console.log(error);
    }
}

function isFileSupported(filetype ,supportedFile){
    return supportedFile.includes(filetype) ;
}

async function uploadToCloudinary(file , folder , quality){
   const options ={folder} ;
   options.resource_type = 'auto'
   if(quality){
    options.quality = quality
   }
    return await cloudinary.uploader.upload(file.tempFilePath,options) ;
 
}

exports.imageUpload=async(req,res)=>{
    try{  // fetch the data from request body
          const {name ,tags, email} = req.body ; 
          console.log(name ,tags , email) ;
          const file = req.files.imageFile;
          console.log(file) ;
          //validation of file
          const supportedFile = ["png" , "jpeg" , "jpg"] ;
          const fileType = file.name.split('.')[1];
          if(!isFileSupported(fileType , supportedFile)){
            res.status(400).json({
            success : false ,
            message : "file format not supported"
            })
          }

          // file supported hai 
          const response = await uploadToCloudinary(file ,"RohiniFolder") ;
          console.log(response) ;

          // entry in db
        const filedata = await File.create({
        name ,
        tags ,
        email ,
        imageUrl : response.secure_url ,
        })

          res.json({
            success : true ,
            imageUrl  : response.secure_url ,
            message : "file successfully uploaded" ,
          })
  


    }
    catch(error){

        console.log(error) ;
       res.status(400).json({
        success : false ,
        message : "file not uploaded" ,
      })
    }
}

// videoupload handler

exports.videoUpload=async(req,res)=>{
    try{  // fetch the data from request body
          const {name ,tags, email} = req.body ; 
          console.log(name ,tags , email) ;
          const file = req.files.videoFile;
          console.log(file) ;
          //validation of file
          const supportedFile = ["webm" , "mp4" , "mov"] ;
          const fileType = file.name.split('.')[1];
          if(!isFileSupported(fileType , supportedFile)){
            res.status(400).json({
            success : false ,
            message : "file format not supported"
            })
          }

          // file supported hai 
          const response = await uploadToCloudinary(file ,"RohiniFolder") ;
          console.log(response) ;

          // entry in db
        const filedata = await File.create({
        name ,
        tags ,
        email ,
        imageUrl : response.secure_url ,
        })

          res.json({
            success : true ,
            imageUrl  : response.secure_url ,
            message : "file successfully uploaded" ,
          })
  


    }
    catch(error){

        console.log(error) ;
       res.status(400).json({
        success : false ,
        message : "file not uploaded" ,
      })
    }
}

exports.imageReducerUpload=async(req,res)=>{
    try{  // fetch the data from request body
          const {name ,tags, email} = req.body ; 
          console.log(name ,tags , email) ;
          const file = req.files.imageFile;
          console.log(file) ;
          //validation of file
          const supportedFile = ["png" , "jpeg" , "jpg"] ;
          const fileType = file.name.split('.')[1];
          if(!isFileSupported(fileType , supportedFile)){
            res.status(400).json({
            success : false ,
            message : "file format not supported"
            })
          }

          // file supported hai 
          const response = await uploadToCloudinary(file ,"RohiniFolder" ,30) ;
          console.log(response) ;

          // entry in db
        const filedata = await File.create({
        name ,
        tags ,
        email ,
        imageUrl : response.secure_url ,
        })

          res.json({
            success : true ,
            imageUrl  : response.secure_url ,
            message : "file successfully uploaded" ,
          })
  


    }
    catch(error){

        console.log(error) ;
       res.status(400).json({
        success : false ,
        message : "file not uploaded" ,
      })
    }
}
