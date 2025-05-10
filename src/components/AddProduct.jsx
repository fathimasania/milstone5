import React, { useState, useEffect } from 'react';
import apiService from '../services/ApiService';

const AddProductForm = ({ onCancel, onProductAdded, productToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    imageFile: null,
    imageUrl: ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title,
        price: productToEdit.price.toString(),
        description: productToEdit.description,
        imageFile: null,
        imageUrl: productToEdit.images[0] || ''
      });
      setSelectedCategory(productToEdit.category?.id || '');
    }
  }, [productToEdit]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.get('/categories');
        setCategories(data);
        if (data.length > 0 && !productToEdit) {
          setSelectedCategory(data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file) 
      }));
    }
  };

  const uploadImageToHostingService = async (file) => {

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a placeholder URL since we can't actually upload to the API
    return 'https://placehold.co/600x400';
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = formData.imageUrl;
      
      if (formData.imageFile) {
        imageUrl = await uploadImageToHostingService(formData.imageFile);
      }

      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        categoryId: parseInt(selectedCategory),
        images: [imageUrl]
      };

      let response;
      if (productToEdit) {
        response = await apiService.put(`/products/${productToEdit.id}`, productData);
      } else {
        response = await apiService.post('/products', productData);
      }
      
      if (onProductAdded) {
        onProductAdded(response);
      }

      // Reset form if not in edit mode
      if (!productToEdit) {
        setFormData({
          title: '',
          price: '',
          description: '',
          imageFile: null,
          imageUrl: ''
        });
      }

    } catch (err) {
      console.error('Failed to save product:', err);
      setError(err.message || 'Failed to save product. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formWrapper}>
        <h2 style={styles.formTitle}>
          {productToEdit ? 'Update Product' : 'Add New Product'}
        </h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.imageUpload}>
            <h3 style={styles.sectionTitle}>Product image</h3>
            <div style={styles.dropZone}>
              {formData.imageFile ? (
                <div>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    style={{ maxWidth: '100px', maxHeight: '100px', margin: '0 auto' }} 
                  />
                  <button 
                    type="button" 
                    style={styles.browseButton}
                    onClick={() => setFormData(prev => ({...prev, imageFile: null, imageUrl: ''}))}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p>Drag and drop files</p>
                  <p>or</p>
                  <label style={styles.browseButton}>
                    Browse
                    <input 
                      type="file" 
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/jpg"
                    />
                  </label>
                  <p style={styles.fileTypes}>Supported file types: jpg, png and jpeg format</p>
                </>
              )}
            </div>
          </div>

          <div style={styles.rowSection}>
            <div style={styles.rowInputGroup}>
              <label style={styles.sectionTitle}>Title</label>
              <input 
                type="text" 
                name="title"
                style={styles.input} 
                placeholder="Enter product title" 
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.rowInputGroup}>
              <label style={styles.sectionTitle}>Price</label>
              <input 
                type="number" 
                name="price"
                style={styles.input} 
                placeholder="Enter product price" 
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.input}
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <textarea 
              style={styles.textarea} 
              placeholder="Enter product description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formActions}>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.addButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'left',
    padding: '24px 32px',
    backgroundColor: '#fff',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '24px',
  },
  formWrapper: {
    width: '60%',
    minWidth: '500px',
  },
  imageUpload: {
    marginBottom: '24px',
  },
  dropZone: {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '32px',
    textAlign: 'center',
    marginTop: '12px',
  },
  browseButton: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    margin: '12px 0',
    cursor: 'pointer',
    display: 'inline-block',
  },
  fileTypes: {
    color: '#6b7280',
    fontSize: '14px',
    marginTop: '8px',
  },
  formSection: {
    marginBottom: '24px',
  },
  rowSection: {
    display: 'flex',
    gap: '20px', 
    marginBottom: '24px',
  },
  rowInputGroup: {
    flex: 1,
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px',
  },
  input: {
    width: '96%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '24px',
    gap: '12px',
  },
  addButton: {
    padding: '10px 24px',
    width: '40%',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  cancelButton: {
    padding: '10px 24px',
    width: '40%',
    backgroundColor: '#fff',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  error: {
    color: '#ef4444',
    backgroundColor: '#fee2e2',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
  },
};

export default AddProductForm;