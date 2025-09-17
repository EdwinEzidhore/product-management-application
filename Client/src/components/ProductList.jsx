import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: "$10.00",
  //     rating: 4,
  //     image: "pd-1.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: "$20.00",
  //     rating: 5,
  //     image: "pd-2.png",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     price: "$15.00",
  //     rating: 3,
  //     image: "pd-3.png",
  //   },
  // ];

  return (
    <>
      <div>
        <div className="grid grid-cols-3 gap-y-5">
          {
            products && products.length > 0 ? (
              products.map(
                (product) =>
                  product.subCategories && product.subCategories.length > 0
                    ? product.subCategories.map(
                        (sub) =>
                          sub.variants && sub.variants.length > 0
                            ? sub.variants.map((item) => (
                                <ProductCard key={item._id} product={item} />
                              ))
                            : null 
                      )
                    : null 
              )
            ) : (
              <p>No products available</p>
            ) 
          }          
        </div>
      </div>
    </>
  );
};

export default ProductList;
