// controllers/productController.js
const Product = require("../models/products");

// Controller methods


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllProductNames = async (req, res) => {

    const name = req.query.name; 

    if(name){
        try {
                 
            const regex = new RegExp(`.*${name}.*`, 'i'); // Use explicit wildcards      
            const products = await Product.find({ name: regex });
            res.json(products);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
    }else{
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    


  };

const getProductById = async (req, res) => {
    try {
       
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price,quantity, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            category,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ msg: 'All products removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProductNames,
    deleteAllProducts,
};
