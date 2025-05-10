import React, { useState } from 'react';
import Header from '../src/components/Header';
import Sidebar from '../src/components/SideBar';
import PageHeader from '../src/components/PageHeader';
import ProductTable from '../src/components/ProductTable';
import AddProductForm from '../src/components/AddProduct';

function App() {
  const [isAddProductMode, setIsAddProductMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddProductClick = () => {
    setProductToEdit(null);
    setIsAddProductMode(!isAddProductMode);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsAddProductMode(true);
  };

  const handleProductAdded = (updatedProduct) => {
    setIsAddProductMode(false);
    setProductToEdit(null);
    // Force ProductTable to refresh
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div style={appStyles.app}>
      <Sidebar />
      <div style={appStyles.mainContent}>
        <Header />
        <PageHeader 
          onAddProduct={handleAddProductClick}
          isAddProductMode={isAddProductMode}
        />
        {isAddProductMode ? (
          <AddProductForm 
            onCancel={() => {
              setIsAddProductMode(false);
              setProductToEdit(null);
            }}
            onProductAdded={handleProductAdded}
            productToEdit={productToEdit}
          />
        ) : (
          <ProductTable 
            key={refreshKey} 
            onEditProduct={handleEditProduct}
          />
        )}
      </div>
    </div>
  );
}

const appStyles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    marginLeft: '259px', // Sidebar width
    paddingTop: '60px',  // Match header height
  }
};

export default App;