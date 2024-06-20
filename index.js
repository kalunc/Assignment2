
// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const productRoute = require("./models/products");
const productController = require("./controllers/productController");
const config=require("./config.js");



// Connect to MongoDB
mongoose
    .connect(config.MONGO_URL)
    .then(() => console.log("DBConnection Successful!"))
    .catch((err) => {
        console.log(err);
});


// Middleware
app.use(express.json());



// Routes

app.get("/api/products", productController.getAllProductNames);
app.get("/api/products/:id", productController.getProductById);
app.post("/api/products", productController.createProduct);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.deleteProduct);
app.delete("/api/products", productController.deleteAllProducts);



// module.exports = router;

// Default route
// app.use("/",(req,res)=>{
//     res.json({message: "This is home page"})
// });


// Start server
app.listen(config.PORT, () => {
    console.log("Backend server is running!")
});

