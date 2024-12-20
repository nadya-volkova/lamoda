import React, { useState, useEffect, useMemo } from "react";
import Product from "./Product";
import "./ProductList.css";

function ProductList({ products, filters, sortBy, sorts, visibleProducts }) {
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(() => {
    return filters.reduce((acc, filter) => filter(acc), products);
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const sortFunction = sorts[sortBy] || (() => 0);
    return [...filteredProducts].sort(sortFunction);
  }, [filteredProducts, sortBy, sorts]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {sortedProducts.length === 0 ? (
        <div className="no-products">
          По вашему запросу ничего не найдено...
        </div>
      ) : (
        <div className="product-list">
          {sortedProducts.slice(0, visibleProducts).map((product) => {
            console.log("Render:", product.name);
            return <Product key={product.id} product={product} />;
          })}
          <button onClick={handleScrollToTop} className="scroll-to-top-button">
            Наверх
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(ProductList);
