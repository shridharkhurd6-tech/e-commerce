import { useState } from "react";
import "./AddProduct.css";
//import Login from "../../Pages/Login/Login";
//import EditProductmodal from "../EditProductModal";

const AddProduct = () => {
  // IMAGE STATE
  const [image, setImage] = useState(null);

  // PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "Women",
    new_price: "",
    old_price: "",
    image: "",
  });

  // TOAST MESSAGE
  const [toast, setToast] = useState({ show: false, message: "", success: true });
  // LOADING STATE
  const [loading, setLoading] = useState(false);

  const showToast = (message, success = true) => {
    setToast({ show: true, message, success });
    setTimeout(() => setToast({ show: false, message: "", success: true }), 2500);
  };

  // IMAGE HANDLER
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 3 * 1024 * 1024) {
      showToast("Image size must be under 3MB!", false);
      return;
    }
    setImage(file);
  };

  // INPUT HANDLER
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FUNCTION
  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.new_price || !productDetails.old_price) {
      showToast("Please fill all fields!", false);
      return;
    }

    if (!image) {
      showToast("Please upload a product image!", false);
      return;
    }
    setLoading(true);

    try {
      // UPLOAD IMAGE FIRST
      const formData = new FormData();
      // backend expects field name 'product' for multer
      formData.append("product", image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      // If non-OK status, try to surface server message
      if (!uploadResponse.ok) {
        const text = await uploadResponse.text();
        console.error('Upload failed, status:', uploadResponse.status, text);
        showToast(`Image upload failed: ${uploadResponse.status}`, false);
        setLoading(false);
        return;
      }

      const uploadData = await uploadResponse.json();
      if (!uploadData || !uploadData.success || !uploadData.image_url) {
        console.error('Upload response unexpected:', uploadData);
        showToast(uploadData?.message || "Image upload failed!", false);
        setLoading(false);
        return;
      }

      // PREPARE PRODUCT DATA (coerce price fields to numbers)
      const product = {
        name: productDetails.name,
        category: productDetails.category || "Women",
        new_price: Number(productDetails.new_price),
        old_price: Number(productDetails.old_price),
        image: uploadData.image_url,
      };

      // SAVE PRODUCT
      const productResponse = await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!productResponse.ok) {
        const text = await productResponse.text();
        console.error('Add product failed, status:', productResponse.status, text);
        showToast(`Add product failed: ${productResponse.status}`, false);
        setLoading(false);
        return;
      }

      const productData = await productResponse.json();

      if (productData && productData.success) {
        showToast("Product Added Successfully!", true);

        // RESET FORM
        setProductDetails({
          name: "",
          category: "Women",
          new_price: "",
          old_price: "",
          image: "",
        });
        setImage(null);
      } else {
        console.error('Add product response:', productData);
        showToast(productData?.message || "Failed to add product!", false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showToast("Something went wrong! Check console.", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOAST MESSAGE */}
      {toast.show && (
        <div className={`toast ${toast.success ? "toast-success" : "toast-error"}`}>
          {toast.message}
        </div>
      )}

      <div className="add-product">
        <h2>✨ Add New Product</h2>

        {/* Product Title */}
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={productDetails.name}
            onChange={changeHandler}
          />
        </div>

        {/* Price Row */}
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Original Price (₹)</p>
            <input
              type="number"
              name="old_price"
              placeholder="999"
              value={productDetails.old_price}
              onChange={changeHandler}
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Offer Price (₹)</p>
            <input
              type="number"
              name="new_price"
              placeholder="499"
              value={productDetails.new_price}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Category */}
        <div className="addproduct-itemfield">
          <p>Category</p>
          <select
            name="category"
            className="add-product-selector"
            value={productDetails.category}
            onChange={changeHandler}
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kid">Kid</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="addproduct-thumbnail">
          <span className="addproduct-thumbnail-label">Product Image</span>
          <label htmlFor="file-input">
            <div className="addproduct-thumbnail-img">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload" />
              ) : (
                <span>📸</span>
              )}
            </div>
          </label>

          <input
            onChange={imageHandler}
            type="file"
            id="file-input"
            accept="image/*"
            hidden
          />
        </div>

        {/* Submit Button */}
        <button onClick={Add_Product} className="addproduct-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </>
  );
};

export default AddProduct;
