import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ toast, onClose }) => {
  // auto close after duration
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => onClose(), toast.duration || 3000);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type || "info"}`}>
      <div className="toast-message">{toast.message}</div>
      <button className="toast-close" onClick={onClose} aria-label="close">✕</button>
    </div>
  );
};

export default Toast;
