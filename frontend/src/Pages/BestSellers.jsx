import React, { useEffect, useState } from 'react';
import './CSS/BestSellers.css';
import Item from '../Components/Items/Item';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/bestsellers`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        setBestSellers(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Unable to load best sellers.');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) return <div className="page-loading">Loading best sellers...</div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <section className="page-container">
      <h1 className="page-title">Best Sellers</h1>

      <div className="products-grid">
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
