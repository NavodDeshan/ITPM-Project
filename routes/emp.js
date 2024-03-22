const express = require('express');
const multer = require('multer');
const Users = require('../models/userModel');
const mongoose = require('mongoose');
const postEmp = require('../models/emp')
const bcrypt = require('bcrypt')


const router = express.Router();

//save posts     
router.post('/Emp/save',(req,res)=>{
    let newPost = new postEmp(req.body);

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

router.get('/Emp', (req, res) => {
    postEmp.find().exec((err, postEmp) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: postEmp
        });

    });
});

//update Posts

router.put('/Emp/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const updatedFields = {
            name: req.body.name,
            email: req.body.email,
            lecId: req.body.lecId,
            password: passwordHash // Update the password field if needed
        };

        // Find and update the employee details
        const updatedEmployee = await postEmp.findByIdAndUpdate(postId, {
            $set: updatedFields
        }, { new: true });

        // Update corresponding user details
        await Users.findOneAndUpdate({ _id: updatedEmployee.userId }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash // Update the password field if needed
            }
        });

        return res.status(200).json({
            success: "Updated Successfully",
            updatedEmployee
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



//delete post
// router.delete('/Emp/delete/:id', (req, res) => {
//     postEmp.findByIdAndRemove(req.params.id).exec((err, deletedEmp) => {
//         if (err)
//             return res.status(400).json({
//                 massage: "Delete unsuccesful",
//                 err
//             });
//         return res.json({
//             massege: "Delete Succesfully",
//             existingPosts:deletedEmp

//         });


//     });
// });

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
router.get('/Emp/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postEmp.findById(postId);
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

router.post('/add/emp', async (req, res) => {
    try {
        // Create a new user
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash, 
            role: req.body.role
        });
        // Save the user to the database
        const savedUser = await newUser.save();

        // Create a new employer with the user ID
        const newEmployer = new postEmp({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            lecId: req.body.lecId,
            role: req.body.role,
            userId: savedUser._id // Store the user ID in the employer document
        });

        // Save the employer to the database
        await newEmployer.save();

        res.status(201).send("Employer added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete employee by user ID
router.delete('/Emp/delete/:userId', async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.userId);

    try {
        // Find the employee by the user ID
        const employee = await postEmp.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Delete the employee from the employer database
        await postEmp.findOneAndDelete({ userId });
        // Delete the corresponding user from the user database
        await Users.findOneAndDelete({ _id: userId });

        return res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;