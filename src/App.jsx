import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProductList from "./components/ProductList/ProductList";
import Filters from "./components/Filters/Filters";
import Sorting from "./components/Sorting/Sorting";
import generateProducts from "./generator/generateProducts";
import { useDebounced, useThrottled } from "./components/hooks";
import "./App.css";

const COUNT = 100;

function App() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("priceAsc");
  const [search, setSearch] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 10, max: 9999 });
  const [visibleProducts, setVisibleProducts] = useState(10);

  useEffect(() => {
    const initialProducts = generateProducts(COUNT);
    setProducts(initialProducts);
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500
    ) {
      handleLoadMore();
    }
  }, []);

  const throttledHandleScroll = useThrottled(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  const debouncedSearch = useDebounced(search, 300);
  const debouncedPriceRange = useDebounced(priceRange, 300);

  const filters = useMemo(() => {
    return [
      (products) => {
        const searchValue = debouncedSearch.toLowerCase();
        return searchValue
          ? products.filter((product) => {
              const { name, description } = product;
              return (
                name.toLowerCase().includes(searchValue) ||
                description.toLowerCase().includes(searchValue)
              );
            })
          : products;
      },
      (products) => {
        return selectedColors.length === 0
          ? products
          : products.filter((product) =>
              selectedColors.includes(product.color)
            );
      },
      (products) => {
        const { min, max } = debouncedPriceRange;
        return products.filter(
          (product) => product.price >= min && product.price <= max
        );
      },
    ];
  }, [debouncedSearch, selectedColors, debouncedPriceRange]);

  const sorts = {
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    ratingDesc: (a, b) => b.rating - a.rating,
  };

  useEffect(() => {
    setVisibleProducts(10);
  }, [debouncedSearch, selectedColors, debouncedPriceRange]);

  return (
    <div className="container">
      <h1>Lamoda</h1>
      <Sorting sortBy={sortBy} setSortBy={setSortBy} />
      <Filters
        search={search}
        setSearch={setSearch}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <div>
        <ProductList
          products={products}
          filters={filters}
          sortBy={sortBy}
          sorts={sorts}
          visibleProducts={visibleProducts}
        />
      </div>
    </div>
  );
}

export default App;
