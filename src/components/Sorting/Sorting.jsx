import React from "react";
import "./Sorting.css";

function Sorting({ sortBy, setSortBy }) {
  return (
    <div className="sorting">
      <button
        className={`sort-button ${sortBy === "priceAsc" ? "active" : ""}`}
        onClick={() => setSortBy("priceAsc")}
      >
        Сначала дешевые
      </button>
      <button
        className={`sort-button ${sortBy === "priceDesc" ? "active" : ""}`}
        onClick={() => setSortBy("priceDesc")}
      >
        Сначала дорогие
      </button>
      <button
        className={`sort-button ${sortBy === "ratingDesc" ? "active" : ""}`}
        onClick={() => setSortBy("ratingDesc")}
      >
        Сначала популярные
      </button>
    </div>
  );
}

export default Sorting;
