import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrums.css";

const Breadcrums = ({ items }) => {
  const location = useLocation();

  // Build crumbs from prop or from current path
  const crumbs =
    items && items.length
      ? items
      : location.pathname
          .split("/")
          .filter(Boolean)
          .map((part, idx, arr) => {
            const to = "/" + arr.slice(0, idx + 1).join("/");
            const label = decodeURIComponent(part).replace(/[-_]/g, " ");
            return { label, to };
          });

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-home">Home</Link>
        </li>

        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const label = (c.label || "").replace(/\b\w/g, (ch) => ch.toUpperCase());
          return (
            <li key={i} className="breadcrumb-item">
              <span className="breadcrumb-sep" aria-hidden>›</span>
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">{label}</span>
              ) : (
                <Link to={c.to} className="breadcrumb-link">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrums;