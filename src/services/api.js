import axios from 'axios';

const BASE_URL = 'https://demohotelsapi.pythonanywhere.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Get all hotels with dynamic parameters
  // params: { limit, skip, search, name, location, price, min_price, max_price, rating, min_rating, max_rating, order_by }
  getHotels: async (params = {}) => {
    // Clean empty parameters to avoid sending ?search=&location= etc.
    const cleanParams = Object.keys(params).reduce((acc, key) => {
      const val = params[key];
      if (val !== undefined && val !== null && val !== '') {
        acc[key] = val;
      }
      return acc;
    }, {});

    const response = await apiClient.get('/hotels/', { params: cleanParams });
    return response.data; // Response contains: { status, count, returned, message, data }
  },

  // Get a specific hotel by ID
  getHotelById: async (id) => {
    const response = await apiClient.get(`/hotels/${id}/`);
    return response.data; // Response contains: { status, message, data }
  },
};
