import React, { useState, useEffect } from "react";
import "./EditProductModal.css";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "", new_price: "", old_price: "", category: "", image: ""
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        new_price: product.new_price || "",
        old_price: product.old_price || "",
        category: product.category || "Women",
        image: product.image || ""
      });
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const save = () => {
    // minimal validation
    if (!form.name || !form.new_price) return alert("Name and Offer Price required");
    onSave({ id: product.id, ...form });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Edit Product</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>Title</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Offer Price (₹)</label>
          <input name="new_price" type="number" value={form.new_price} onChange={handleChange} />

          <label>Original Price (₹)</label>
          <input name="old_price" type="number" value={form.old_price} onChange={handleChange} />

          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Women</option>
            <option>Men</option>
            <option>Kid</option>
          </select>

          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} />
        </div>

        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
