import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useProducts } from '../../hooks';
import './ProductDetails.scss';
import Card from '../../components/Card';

const reviews = [
  {
    name: 'Samantha D.', date: 'August 14, 2023', rating: 4.5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable..."
  },
  {
    name: 'Alex M.', date: 'August 15, 2023', rating: 5,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality..."
  }
];

function ProductDetails() {
  const { id } = useParams();
  const { data = [] } = useProducts();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const found = data.find((item) => String(item.id) === id);
    if (found) {
      setProduct(found);
      setMainImage(found.images[0]);
    }
  }, [data, id]);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
    };
  
    let cart = JSON.parse(localStorage.getItem("products") || "[]");
  
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);
    Add
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
  
    localStorage.setItem("products", JSON.stringify(cart));
    alert("Product added to cart!");
  };
  

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details container">
      <div className="product-gallery">
        <div className="thumbnails">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? 'active' : ''}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt="Main" />
        </div>
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <div className="rating">⭐ {product.rating} / 5</div>
        <div className="price">
          <span className="current-price">${product.price}</span>
          {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
          {product.oldPrice &&
            <span className="discount">-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>}
        </div>
        <p className="description">{product.description}</p>

        <div className="color-select">
          <p>Select Color</p>
          <div className="colors">
            {['green', 'navy', 'black'].map((color) => (
              <label key={color} className={`color-option ${selectedColor === color ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  onChange={() => setSelectedColor(color)}
                  checked={selectedColor === color}
                />
                <span className={`circle ${color}`}></span>
              </label>
            ))}
          </div>
        </div>


        <div className="size-select">
          <p>Choose Size</p>
          <div className="sizes">
            {['Small', 'Medium', 'Large', 'X-Large'].map(size => (
              <div
                key={size}
                className={`small-div ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <div className="quantity">
            <FaMinus onClick={() => quantity > 1 && setQuantity(q => q - 1)} style={{ cursor: "pointer" }} />
            <span>{quantity}</span>
            <FaPlus onClick={() => setQuantity(q => q + 1)} style={{ cursor: "pointer" }} />
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>

        </div>
      </div>

      <div className="tabs">
        {['details', 'reviews', 'faqs'].map(tab => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'details' ? 'Product Details' : tab === 'reviews' ? 'Rating & Reviews' : 'FAQs'}
          </div>
        ))}
      </div>

      {activeTab === 'details' && <p className="tab-content">{product.description}</p>}
      {activeTab === 'reviews' && (
        <div className="reviews-section">
          <h2>All Reviews ({reviews.length})</h2>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="stars">{'★'.repeat(Math.floor(r.rating))}{"½"}</div>
                <h4>{r.name} <span className="verified">✔</span></h4>
                <p>{r.text}</p>
                <small>{r.date}</small>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'faqs' && <p className="tab-content">No FAQs yet.</p>}
      <div className="related-products">
        <div className='text'>You may also like</div>
        <div className="related">
          {data.slice(11, 15).map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
