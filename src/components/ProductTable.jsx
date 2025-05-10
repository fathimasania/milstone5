import React, { useEffect, useState } from 'react';
import { ReactComponent as Delete } from '../assets/icons/Delete.svg';
import { ReactComponent as Edit } from '../assets/icons/Edit.svg';
import { ReactComponent as LeftArrow } from '../assets/icons/arrow-left.svg';
import { ReactComponent as RightArrow } from '../assets/icons/arrow-right.svg';
import apiService from '../services/ApiService';

const ProductTable = ({ onEditProduct, refreshKey }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]); // Add refreshKey as dependency to refetch when it changes

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.get('/products');
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.delete(`/products/${productId}`);
        // Remove the deleted product from state
        setProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        );
      } catch (err) {
        console.error('Failed to delete product:', err);
        setError(err.message);
      }
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id} style={styles.tr}>
              <td style={styles.td}><input type="checkbox" /></td>
              <td style={styles.td}>
                <img src={product.images[0]} alt={product.title} style={styles.image} />
              </td>
              <td style={styles.td}>{product.title}</td>
              <td style={styles.td}>{product.description}</td>
              <td style={styles.td}>${product.price}</td>
              <td style={{ ...styles.td, ...styles.actions }}>
                <Delete 
                  style={styles.icon} 
                  onClick={() => handleDelete(product.id)} 
                />
                <Edit 
                  style={styles.icon} 
                  onClick={() => onEditProduct(product)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationStyles.container}>
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          style={paginationStyles.button}
        >
          <div style={paginationStyles.buttonContent}>
            <LeftArrow style={paginationStyles.arrowIcon} />
            <span>Previous</span>
          </div>
        </button>
        
        <div style={paginationStyles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <span
              key={number}
              onClick={() => paginate(number)}
              style={{
                ...paginationStyles.pageNumber,
                ...(number === currentPage ? paginationStyles.activePage : {})
              }}
            >
              {number}
            </span>
          ))}
        </div>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages}
          style={paginationStyles.button}
        >
          <div style={paginationStyles.buttonContent}>
            <span>Next</span>
            <RightArrow style={paginationStyles.arrowIcon} />
          </div>
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '24px 32px',
    backgroundColor: '#fff',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    color: '#111827',
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px',
    fontWeight: 600,
    color: '#6b7280',
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
    height: '80px', 
  },
  td: {
    padding: '16px 12px', 
    verticalAlign: 'middle', 
    lineHeight: '1.5',
  },
  image: {
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: '6px',
    display: 'block',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  icon: {
    cursor: 'pointer',
    color: '#4b5563',
  },
};

const paginationStyles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      gap: '10px',
    },
    button: {
      padding: '8px 16px',
      border: '1px solid #e5e7eb',
      backgroundColor: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#4b5563',
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    buttonContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    arrowIcon: {
      width: '16px',
      height: '16px',
      verticalAlign: 'middle',
    },
    pageNumbers: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    pageNumber: {
      cursor: 'pointer',
      fontSize: '17px',
      color: '#4b5563',
      padding: '0 4px',
    },
    activePage: {
      color: '#3b82f6',
      fontWeight: '600',
    },
  };
  
  export default ProductTable;