//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const User = require('../models/userSchema');
const Genres = require('../models/genresSchema');
const upload = require('../fileupload/multer');
const cloudinary = require('../fileupload/cloudinary');
const path = require('path');

//========================== Load Modules End =============================

//============================= Register =============================

router.post('/signUp', async (req,res) => {
 
    const {firstName, lastName, email , bio, username, password} = req.body.values;
    const genres = req.body.genres;
    const role = "Artist";

    try {
        const emailExist = await User.findOne({email: email});
    
        const UsernameExist = await User.findOne({username: username});
        
        if(emailExist || UsernameExist) {
            return res.status(400).send({error: 'User Already Exist!'});
        }
        else {
        
            //============================= Save Register User =============================
            await new User({firstName, lastName, email , bio, username, password, role}).save();
        
            await User.updateOne({username: username}, {$push: {genres: genres}});

            res.send({msg:"User Register Successfully!"});

        }
    }
    catch(err){
        //============================= Error Message =============================
        res.send(err)
    }
});


//============================= Login =============================

router.post('/signIn', async (req,res) => {
   
    try {
        let token;

        const {username, password } = req.body;

        //============================= User Exist =============================
        const userLogin = await User.findOne({ username: username});

        if(userLogin){
           //============================= Login User PassWord Matching=============================
           const isMatch = await bcrypt.compare(password, userLogin.password);
            
           if(!isMatch){
            res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("audioNft", token , {
                    expires: new Date(Date.now() + 3600000),
                });
                //============================= Send Login User =============================
                res.send({msg: "User Login Successfully!"});
            }
        }
        else{
            //============================= Send Response =============================
            res.status(400).send({ error: "Invalid Username Or Password!"});
        }  
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
})


//============================= Get LoginUser Profile =============================

router.get('/adminProfile', authenticate, async (req,res) => {
    try{

        //============================= Get LoginUser =============================
        const LoginUser = req.authenticateUser;
        
        //============================= Send Login User =============================
        res.send(LoginUser);
        
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Create Genres =============================

router.post('/createGenres', authenticate, async (req,res) => {
    try{

        const {title, description} = req.body;

        const TitleExist = await Genres.findOne({title: title});
        
        if(TitleExist) {
            res.send({error: 'Genres Already Exist!'})
        }
        else {
            
            await new Genres({title, description}).save();
            
            //============================= Send Login User =============================
            res.send({msg: "Create genres!"});
        }
        
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Get All Artists =============================

router.get('/getAllArtists', async (req,res) => {
    try{

        const Page = req.query.Page;
        const Limit = 2;
        let skip = (Page-1) * Limit;

        //============================= Count Total Documents =============================
        const total = await User.countDocuments({});
        
        //============================= Count Total Pages =============================
        let totalPage = Math.ceil((total - 1) /Limit);
        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $match: {
                    role: 'Artist'
                }
            },
            {
                $sort: { createAt: -1}
            },
            //============================= Pagination =============================
            {
                $skip: skip
            },
            {
                $limit: Limit
            }  
        )
        const artists = await User.aggregate([aggregateQuery]);
        
        res.send({artists, totalPage})
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Get All Genres =============================

router.get('/getAllGenres', async (req,res) => {
    try{

        const Page = req.query.Page;
        const Limit = 5;
        let skip = (Page-1) * Limit;
        let aggregateQuery = [];

        //============================= Count Total Documents =============================
        const total = await Genres.countDocuments({});
        
        //============================= Count Total Pages =============================
        let totalPage = Math.ceil(total/Limit);

        if(Page === "") {
            const genres = await Genres.find();

            res.send({genres})
        }
        else {
            aggregateQuery.push(
                {
                    $sort: { createAt: -1}
                },
                //============================= Pagination =============================
                {
                    $skip: skip
                },
                {
                    $limit: Limit
                }  
            );  
            
            const genres = await Genres.aggregate([aggregateQuery]);
        
            res.send({genres, totalPage});
        }
        
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Change Password =============================

router.post('/changePassword', authenticate, async (req,res) => {
    try{

        const {newPassword, oldPassword} = req.body;
        
        const user = req.authenticateUser;

        const MatchPassword = bcrypt.compare(oldPassword, user.password);
        
        if(MatchPassword){
            password = await bcrypt.hash(newPassword, 10);

            await User.findOneAndUpdate({username: user.username}, password);

            res.send({msg: "Password Change Successfully!"})
        }
        else{
            res.send({error: "Old Password Is Not Correct!"})
        }
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err);
        res.send({error: "Old Password Is Not Correct!"})
    }
});


//============================= Edit Admin =============================

router.put('/editAdmin', authenticate, async (req,res) => {
    try{

        //============================= Save Employee Updated Details =============================
        await User.findOneAndUpdate({username: req.authenticateUser.username}, req.body, {
            new: false
        });

        res.send({msg: 'Admin Profile Updated!'});

    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Edit Genres =============================

router.put('/editGenres', authenticate, async (req,res) => {
    try{
        const Id = req.query.Id;
        
        //============================= Save Employee Updated Details =============================
        await Genres.findOneAndUpdate({_id: Id}, req.body, {
            new: false
        });

        res.send({msg: 'Genres Updated!'})
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Delete Genres =============================

router.delete('/deleteGenres', authenticate, async (req,res) => {
    try{

       //============================= Delete Article Data =============================
       await Genres.findByIdAndDelete(req.query.Id);

        //============================= Send Response =============================
        res.send({msg: "Genres Deleted Successfully!"})
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Get Count Of Artist And Genres =============================
 
router.get('/getCountArtistGenres', authenticate, async (req,res) => {
    try{
        const aggregateQuery = [];

        aggregateQuery.push(
            {
                $match: {
                    role: "Artist"
                }
            }
        )

        const artists = await User.aggregate([aggregateQuery]);

        const ArtistCount = artists.length;

        const genres = await Genres.find();
        const GenresCount = genres.length;
        
        res.send({ArtistCount, GenresCount});
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Get PlayList =============================

router.get('/playList', async (req,res) => {
    try{

        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $unwind: "$NFT"
            },
            {
                $sort: {
                    "NFT.createAt": -1
                }
            }
        );

        const playList = await User.aggregate([aggregateQuery]);

        res.send(playList)
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Add Audio Nft CoverPage =============================

router.post('/createNft', authenticate, upload.single('image') , async (req,res) => {
    try{

        const userId = req.query.Id;
        const {title, description,price} = req.body.values;
        const audioFile = req.body.AudioFile;
        const coverImage = req.body.CoverImg;
        
        const Nft = {
            title, description, coverImage, audioFile, price
        }
        await User.findOneAndUpdate({_id: userId}, {$push: {NFT: Nft}})
        
        res.send({msg: " Audio Nft Created Successfully! "})
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Add Audio Nft Audio File =============================

router.post('/uploadImg', authenticate, upload.single('image') , async (req,res) => {
    try{

        const file = req.file;

        const type = path.extname(file.originalname);

        if(type !== '.jpg' && type !== '.jpeg' && type !== '.png'){
            res.status(400).send({error: 'File Is Not An Image file!'})
        }
        else{
            const uploadFiles = await cloudinary.uploader.upload( file.path, { resource_type: 'auto'});

            const coverImg = uploadFiles.secure_url;

            res.send(coverImg);
        }      
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Add Audio Nft =============================

router.post('/uploadAudioFile', authenticate, upload.single('audio') , async (req,res) => {

    try{
        

        const file = req.file;

        const type = path.extname(file.originalname);

        if(type !== '.mp3' && type !== '.wav' && type !== '.sit'){

            res.status(400).send({error: 'File Is Not An Audio file!'})
        }
        else{
            const uploadFiles = await cloudinary.uploader.upload( file.path, { resource_type: 'auto'});

            const audioFile = uploadFiles.secure_url;

            res.send(audioFile);

        }   
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Delete Genres =============================

router.post('/addAdmin', async (req,res) => {
    try{

        const admin = req.body;

        await new User(admin).save();
        
        res.send('msg: Admin register Successfully!')
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Logout =============================

router.get('/logout', authenticate, async (req,res) => {
    try{

        //============================= Remove Token From Database =============================
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((ele) => {
            return ele.token !== req.token
        })
        //============================= Clear Cookie =============================
        res.clearCookie("audioNft");
        
        //============================= Save Authenticate User =============================
        await req.authenticateUser.save();

        //============================= Send Response =============================
        res.status(200).send("User Logout");
    }
    catch(err){
        //============================= Send Error Message =============================
        res.status(500).send(err);
    }
    
});

//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================