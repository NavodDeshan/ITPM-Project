const express = require('express');
const multer = require('multer');
const postStd = require('../models/students')
const router = express.Router();

//save posts    
router.post('/Std/save',(req,res)=>{
    let newPost = new postStd(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Post save successfully"
        });
    });
});
//get posts

router.get('/Std', (req, res) => {
    postStd.find().exec((err, postStd) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: postStd
        });

    });
});

//update Posts

router.put('/Std/update/:id', (req, res) => {
    postStd.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, postStd) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({
                success: "Updated Succesfully",
                

            });
        }

    );
});


//delete post
router.delete('/Std/delete/:id', (req, res) => {
    postStd.findByIdAndRemove(req.params.id).exec((err, deletedStd) => {
        if (err)
            return res.status(400).json({
                massage: "Delete unsuccesful",
                err
            });
        return res.json({
            massege: "Delete Succesfully",
            existingPosts:deletedStd

        });


    });
});

//storage
// const Storage = multer.diskStorage({
//     destination: 'upload',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage: Storage
// }).single('CusImg')

//get a specific post
router.get('/Std/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postStd.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

router.post('/add/Std', (req, res) => {
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
            const newStd = new postStd({
                name: req.body.name,
                email: req.body.email,
                studentId: req.body.studentId,
                specialization: req.body.specialization,
                password: req.body.password,
                role: req.body.role,
                // CusImg:req.file.filename
   
            })
            newStd.save().then(() => res.send("successfull uploaded"))
                .catch((err) => console.log(err));

})



module.exports = router;