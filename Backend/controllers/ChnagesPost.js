/**
import express from "express";
import isLogged from "../Middleware/Loggedin";
import postModel from "../module/post";
**/
const express = require("express");
const router = express.Router();
const isLogged = require("../Middleware/Loggedin");
const postModel = require("../module/post");

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/like/:id', isLogged, async (req,res)=>{
    const _id = req.params.id;
    const user = req.user;
    try{
        const post = await postModel.findOne({_id});

        post.likedAcc.indexOf(user._id) === -1? post.likedAcc.push(user._id):
        post.likedAcc.splice(user._id,1);

        await post.save();
        res.send(post.likedAcc);
    }catch(err) {res.status(401).send(err.message);}
});

module.exports = router;