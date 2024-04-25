// Filename: pages/api/proxy/addCustomer.js
// This file will handle POST requests to the /api/proxy/addCustomer route.
// It will forward the request to the FastAPI server's /addCustomer endpoint.

import axios from 'axios';

export default async function handler(req, res) {
  console.log("addCustomer.js  |  Hellow from addCustomer.js")
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  const customer = req.body.customer;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;

  try {
    const response = await axios.post('http://fastapi:8000/addCustomer', {customer, address, city, country});

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'An error occurred' });
  }
}