const productSchema = require("../models/product.model");

const productController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      let limit;

      // Set limit based on user's role
      if (req.user && req.user.role === "admin") {
        console.log("Admin can query all products");
        limit = parseInt(req.query.limit, 10) || 0; // Admin can query all products
      } else if (req.user) {
        console.log("Logged in users can query up to 20 products");
        limit = parseInt(req.query.limit, 10) || 20; // Logged in users can query up to 20 products
        if(limit > 20){
          limit = 20;
        }
      } else {
        console.log("Non-logged in users can query up to 10 products");
        // Non-logged in users can query up to 10 products
       
        limit = Math.min(parseInt(req.query.limit, 10) || 10,10);
        console.log("limit",limit);
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      const total = await productSchema.countDocuments().exec();

      // Set limit based on user's role
     
      if (endIndex < total) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.total = total;
      results.totalPages = Math.ceil(total / limit);
      results.results = await productSchema.find().limit(limit).skip(startIndex).exec();
      //console.log(results.results.length);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  addProduct: async (req, res) => {
    try {
      console.log(req.file);
      const { name, price, description, image } = req.body;
      const product = new productSchema({
        name,
        price,
        description,
        image: req.file.path ? req.file.path : "public/images/default.jpg",
      });
      await product.save();
      res.status(201).json({ message: "Product added", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getProductDetails: async (req, res) => {
    try {
      const id = req.params.id ? req.params.id : 0;
      if (id === 0) {
        return res.status(400).json({ message: "Invalid product id" });
      }

      const product = await productSchema.findById(id);
      if (!product) {
        console.log("Product not found");
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product found", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

exports.productController = productController;
