import React from 'react';
import FilterSidebar from './FilterSidebar';
import './CategoryDetails.scss';
// import { LeftArrowIcon, RightArrowIcon } from '../../../assets/icons';
import Card from '../../../components/Card';
import { useProducts } from '../../../hooks/useProducts';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";



const CategoryDetails = () => {
  const { data = [] } = useProducts();
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 9;  // 1 sahifada nechta mahsulot

  const totalPages = Math.ceil(data.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = data.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='category-page container'>
      <div className='hr-line' />
      <div className='category-content'>
        <FilterSidebar />
        <div className='product-listing'>
          <div className='header'>
            <h2>Casual</h2>
            <div className='info'>
              <p className='title'>Showing {startIndex + 1}–{startIndex + currentProducts.length} of {data.length} Products</p>
              <div className='option-wrapper'>
                <p>Sort by:</p>
                <select>
                  <option className='Most-Popular'>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className='cards'>
            {currentProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>

          <div className='hr-botom' />

          <div className='pagination'>
            <button
              className='prev'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrLinkPrevious />Previous
            </button>
            <div className='pages'>
              {Array.from({ length: totalPages }, (_, index) => (
                <h3
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </h3>
              ))}
            </div>
            <button
              className='next'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
