import { useState, useEffect, useCallback } from 'react';
import { productApi, apiUtils } from '@/services/api';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchProducts = useCallback(async (searchParams = params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productApi.getAll(searchParams);
      
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      apiUtils.handleError(err, setError);
      setProducts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    params,
    updateParams,
    refetch
  };
};

export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await productApi.getBySlug(slug);
      
      if (response.success) {
        setProduct(response.data);
      } else {
        throw new Error(response.message || 'Product not found');
      }
    } catch (err) {
      apiUtils.handleError(err, setError);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct
  };
};

export const useFeaturedProducts = (limit = 6) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productApi.getFeatured(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch featured products');
      }
    } catch (err) {
      apiUtils.handleError(err, setError);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchFeaturedProducts
  };
};
