// Filename: pages/api/proxy/checkVideoAvailability/[param].js
// This file will handle GET requests to the /api/proxy/checkVideoAvailability/{param} route.
// It will forward the request to the FastAPI server's /checkVideoAvailability/{param} endpoint.

import axios from 'axios';

export default async function handler(req, res) {
  const { param } = req.query;

  try {
    const response = await axios.get(`http://fastapi:8000/checkVideoAvailability/${param}`);

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'An error occurred' });
  }
}