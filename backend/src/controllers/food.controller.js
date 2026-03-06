const foodModel = require("../models/food.model");
const storageService = require('../services/storage');

// uuid hmne browser se uthaye h uuid generator se aur npm i uuid krke install kie and require bhi 
 
const {v4: uuid} = require("uuid")

async function createFood(req, res){

    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    // console.log(fileUploadResult) 

    res.status(201).json({
        message: " food created sucessfully",
        food: foodItem
    })

}

async function  getFoodItems(req, res) {
     const foodItems = await foodModel.find({})
     res.status(200).json({
        message: "Food items fetched sucessfully",
        foodItems
     })
}

module.exports = {
    createFood,
    getFoodItems
}

