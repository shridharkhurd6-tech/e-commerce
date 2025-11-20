import React, { useEffect, useState, useRef } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import Toast from "../Toast/Toast";


import Pagination from "../Pagination/Pagination";
import ProductFilters from "../ProductFilters/ProductFilters";
import EditProductModal from "../../Pages/EditProductModal/EditProductModal";


const PAGE_SIZE = 8; // change page size

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const abortRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to fetch products" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const abortController = abortRef.current;
    return () => {
      if (abortController) abortController.abort();
    };
  }, []);

  // Filtering & sorting & pagination - compute derived list
  const filtered = allProducts
    .filter((p) => {
      const s = (filters.search || "").trim().toLowerCase();
      if (s && !p.name.toLowerCase().includes(s)) return false;
      if (filters.category && filters.category !== "All" && p.category !== filters.category) return false;
      const min = filters.minPrice ?? 0;
      const max = filters.maxPrice ?? Number.MAX_SAFE_INTEGER;
      if (Number(p.new_price) < min || Number(p.new_price) > max) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "price_asc") return Number(a.new_price) - Number(b.new_price);
      if (filters.sort === "price_desc") return Number(b.new_price) - Number(a.new_price);
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filtered.length, totalPages, page]);

  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  // Remove (with animation & optimistic UI)
  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setDeletingId(id);
    // optimistic removal
    const prev = allProducts;
    setAllProducts(prev.filter((p) => p.id !== id));
    try {
      const res = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const r = await res.json();
      if (!r.success) {
        setAllProducts(prev); // rollback
        setToast({ type: "error", message: "Failed to remove product" });
      } else {
        setToast({ type: "success", message: "Product removed" });
      }
    } catch (err) {
      setAllProducts(prev);
      setToast({ type: "error", message: "Error removing product" });
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Edit handlers
  const handleSaveEdit = async (payload) => {
    try {
      const res = await fetch("http://localhost:4000/updateproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const r = await res.json();
      if (r.success) {
        // update local list
        setAllProducts((prev) => prev.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)));
        setEditedProduct(null);
        setToast({ type: "success", message: "Product updated" });
      } else {
        setToast({ type: "error", message: "Update failed" });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Error updating product" });
    }
  };

  return (
    <div className="list-product-page">
      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <h1>Products — Admin</h1>

      {/* Filters */}
      <ProductFilters onChange={(f) => { setFilters(f); setPage(1); }} />

      {/* Loading / Empty */}
      {loading ? (
        <div className="loading-text">Loading products…</div>
      ) : filtered.length === 0 ? (
        <div className="no-products">No products found.</div>
      ) : (
        <>
          <div className="table-header">
            <span>Image</span>
            <span>Title</span>
            <span>Old Price</span>
            <span>New Price</span>
            <span>Category</span>
            <span>Actions</span>
          </div>

          <div className="product-grid">
            {pageItems.map((product) => (
              <div
                key={product.id}
                className={`product-row ${deletingId === product.id ? "deleting" : ""}`}
              >
                <img src={product.image || "https://via.placeholder.com/120"} alt={product.name} />
                <div className="prod-title">{product.name}</div>
                <div>₹{product.old_price}</div>
                <div className="new-price">₹{product.new_price}</div>
                <div>{product.category}</div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => setEditedProduct(product)}>Edit</button>
                  <button className="del-btn" onClick={() => removeProduct(product.id)}>
                    <img src={cross_icon} alt="delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}

      <EditProductModal
        product={editedProduct}
        onClose={() => setEditedProduct(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ListProduct;
