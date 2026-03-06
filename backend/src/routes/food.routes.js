const express = require('express');
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

// /api/food/ aise req krna h post method ke sth [protected]
// postman pe hmne video naam diya h string ka toh hme yaha bhi video hi dena pdega taaki multer file ko read kr skte express ke liye 

router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

// GET /api/food/ [protected] 
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)


module.exports = router