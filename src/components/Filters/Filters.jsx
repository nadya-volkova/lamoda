import React from "react";
import { colors, colorCircleStyle } from "../constants.jsx";
import "./Filters.css";

function Filters({
  search,
  setSearch,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
}) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handlePriceRangeChange = (e, type) => {
    const value = e.target.value;
    setPriceRange((prev) => ({
      ...prev,
      [type]: value === "" ? "" : Number(value),
    }));
  };

  return (
    <div className="filters">
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Поиск..."
          className="search-input"
        />
      </div>
      <div className="filters-block">
        <h3>По цвету</h3>
        <div className="color-filters">
          {colors.map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <span style={colorCircleStyle(color)}></span>
              {color}
            </label>
          ))}
        </div>
        <h3>По цене</h3>
        <div className="price-filters">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceRangeChange(e, "min")}
            placeholder="От"
          />
          <p>-</p>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceRangeChange(e, "max")}
            placeholder="До"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
