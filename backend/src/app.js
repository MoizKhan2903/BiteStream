// create server 

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const cors = require('cors');

const app = express();
app.use(cookieParser());
// ye ek middleware hai jo req.body main data leke aata hai usko readable bnata hai 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // Allow cookies to be sent
}));


app.get("/", (req, res)=>{
    res.send("Hello")
})

// tumhare application main kuch authentication related APIs exist krti h ye btaya h tumne server ko
// postman pe ye prefix lagana pdega API send krne ke liye /user/register ke phle
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;