// Filename: pages/api/proxy/addCustomer.js
// This file will handle POST requests to the /api/proxy/addCustomer route.
// It will forward the request to the FastAPI server's /addCustomer endpoint.

import axios from 'axios';

export default async function handler(req, res) {
  const { body } = req;

  try {
    const response = await axios.post('http://fastapi:8000/addCustomer', body);

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'An error occurred' });
  }
}