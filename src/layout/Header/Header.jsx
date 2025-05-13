import React, { useRef, useState } from 'react';
import './Header.scss';
import { MdClear } from 'react-icons/md';
import { BiCart, BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router';

function Header() {
  const [isFragmentVisible, setIsFragmentVisible] = useState(true);
  const contentUl = useRef()
  const handleClearClick = () => {
    setIsFragmentVisible(false);
  };

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };


  const handleBurgerClick = () => {
    contentUl.current.classList.toggle("resp")
  }
  return (
    <header>
      {isFragmentVisible && (
        <div className='header-top'>
          <p>20% Bonus Olishni Istasangiz promo Komron_033 . <a href="#">Sign Up Now</a></p>
          <MdClear className='clear-btn' onClick={handleClearClick} />
        </div>
      )}
      <div className='container'>
        <div className='navbar-wrapper'>
          <Link to={'/'}  style={{ textDecoration: "none" }}>
          <h3>SHOP.CO</h3>
          </Link>
          <div className='content-ul'>
            <ul>Shop
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
          <div className='search-input'>
            <BiSearch />
            <input type="text" placeholder='Search for products...' />
          </div>
          <div className='card-and-profile-icons'>
          <BiCart onClick={handleCartClick} />

            <CgProfile />
          </div>
        </div>
        <div className='navbar-wrapper resp'>
          <div className='navbar-wrapper-resp__left'>
            <GiHamburgerMenu size={30} onClick={handleBurgerClick} />
            <h3>SHOP.CO</h3>
          </div>
          <div className='card-and-profile-icons'>
            <BiSearch color='black' />
            <BiCart onClick={handleCartClick} />
            <CgProfile />
          </div>
          <div className='navbar-wrapper resp__content-ul' ref={contentUl} >
            <ul>Shop
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;