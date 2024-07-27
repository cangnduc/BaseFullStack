const productSchema = require("../models/product.model");
const addproduct = async () => {
  try {
    for (i = 10; i < 100; i++) {
      const product = new productSchema({
        name: `Product ${i}`,
        price: 1000 + i,
        description: `${i} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
        image: "default.jpg",
        descriptionId: i,
      });
      await product.save();
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      console.log(`Product ${i} added`);
      res
    }
  } catch (error) {
    console.log(error);
  }
};
exports.addproduct = addproduct;
