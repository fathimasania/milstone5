import React from 'react';

const PageHeader = ({ onAddProduct, isAddProductMode }) => {
  return (
    <div style={styles.headerWrapper}>
      <h1 style={styles.title}>{isAddProductMode ? 'Add Product' : 'Products'}</h1>
      <div style={styles.actions}>
        {!isAddProductMode && (
          <>
            <button style={styles.buttonOutline}>
              Filter <span style={styles.badge}>1</span>
            </button>
            <button style={styles.buttonOutline}>Export</button>
          </>
        )}
        <button 
          style={isAddProductMode ? styles.backButton : styles.buttonPrimary}
          onClick={onAddProduct}
        >
          {isAddProductMode ? '← Back' : '+ Add Product'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 24px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#111827',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  buttonOutline: {
    padding: '8px 12px',
    backgroundColor: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
    position: 'relative',
  },
  buttonPrimary: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#fff',
    cursor: 'pointer',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#3b82f6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  badge: {
    backgroundColor: '#ef4444',
    color: '#fff',
    borderRadius: '999px',
    fontSize: '10px',
    padding: '2px 6px',
    marginLeft: '6px',
  },
};

export default PageHeader;