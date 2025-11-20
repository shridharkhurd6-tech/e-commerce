import React, { useContext } from 'react';
import './CSS/Product.css';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  //  Handle empty or loading state
  if (!all_product || all_product.length === 0) {
    return <div className="loading">Loading product details...</div>;
  }

  //  Find the matching product by ID
  const product = all_product.find((item) => item.id === Number(productId));

<div>
      {product ? (
        <ProductDisplay product={product} />
      ) : (
        <h2>Product not found</h2>
      )}
    </div>
    
  //if (!product) {
  //  return <div className="not-found">Product not found.</div>;
  //}

  return (
    <section className="product-page">
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </section>
  );
};

export default Product;
