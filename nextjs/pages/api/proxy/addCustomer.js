// Filename: pages/api/proxy/addCustomer.js
// This file will handle POST requests to the /api/proxy/addCustomer route.
// It will forward the request to the FastAPI server's /addCustomer endpoint.

import axios from 'axios';

export default async function handler(req, res) {
  console.log('Request received at /api/proxy/addCustomer');
  console.log('    /api/proxy/addCustomer  | POST  |  Forwarding to FastAPI server');
  
  const { customer, address, city, country } = req.body;
  console.log('    /api/proxy/addCustomer  |  Customer:', customer);
  console.log('    /api/proxy/addCustomer  |  Address:', address);
  console.log('    /api/proxy/addCustomer  |  City:', city);
  console.log('    /api/proxy/addCustomer  |  Country:', country);
  // Now you can use customer, address, city, and country in your code

  const response = await axios.post('http://fastapi:8000/addCustomer', {customer, address, city, country});
  console.log('    /api/proxy/addCustomer  |  FastAPI server response:', response.status);
  console.log('    /api/proxy/addCustomer  |  FastAPI server response data:', response.data);
  return res.status(response.status).json(response.data);

}