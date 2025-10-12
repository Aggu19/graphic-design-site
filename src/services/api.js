const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error.message || 'Network error occurred',
      0,
      null
    );
  }
};

// Product API functions
export const productApi = {
  // Get all products with optional filters
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return apiRequest(endpoint);
  },

  // Get product by slug
  getBySlug: async (slug) => {
    return apiRequest(`/products/${slug}`);
  },

  // Get featured products
  getFeatured: async (limit = 6) => {
    return apiRequest(`/products/featured?limit=${limit}`);
  },

  // Sync products from Sanity (admin only)
  syncFromSanity: async () => {
    return apiRequest('/products/sync-sanity', { method: 'POST' });
  }
};

// Order API functions
export const orderApi = {
  // Create new order
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Get order by ID
  getById: async (id) => {
    return apiRequest(`/orders/${id}`);
  },

  // Get orders by customer email
  getByEmail: async (email, params = {}) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/orders/customer/${email}?${queryString}` : `/orders/customer/${email}`;
    
    return apiRequest(endpoint);
  },

  // Update order status
  updateStatus: async (id, statusData) => {
    return apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  },

  // Get order statistics
  getStats: async () => {
    return apiRequest('/orders/stats');
  }
};

// Health check
export const healthApi = {
  check: async () => {
    return apiRequest('/health', { baseURL: API_BASE_URL.replace('/api', '') });
  }
};

// Utility functions
export const apiUtils = {
  // Handle API errors in components
  handleError: (error, setError) => {
    console.error('API Error:', error);
    
    if (error instanceof ApiError) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  },

  // Check if error is network related
  isNetworkError: (error) => {
    return error instanceof ApiError && error.status === 0;
  },

  // Check if error is client error (4xx)
  isClientError: (error) => {
    return error instanceof ApiError && error.status >= 400 && error.status < 500;
  },

  // Check if error is server error (5xx)
  isServerError: (error) => {
    return error instanceof ApiError && error.status >= 500;
  }
};

export { ApiError };
export default { productApi, orderApi, healthApi, apiUtils };
