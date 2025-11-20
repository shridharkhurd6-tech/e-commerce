import React from "react";
import "./CategoryTiles.css";
import men from "../Assets/banner_mens.png";
import women from "../Assets/banner_women.png";
import kid from "../Assets/banner_kids.png";

import { useNavigate } from "react-router-dom";

const CategoryTiles = () => {
  const navigate = useNavigate();

  const tiles = [
    { title: "Men's Clothing", img: men, link: "/men" },
    { title: "Women's Clothing", img: women, link: "/women" },
    { title: "Kids Collection", img: kid, link: "/kids" },
  ];

  return (
    <div className="amazon-category-grid">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="amazon-tile"
          onClick={() => navigate(tile.link)}
        >
          <h3>{tile.title}</h3>
          <img src={tile.img} alt={tile.title} />
        </div>
      ))}
    </div>
  );
};

export default CategoryTiles;
