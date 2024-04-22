import axios from 'axios';

export default async function handler(req, res) {
  const { param } = req.query;
  console.log(`curl http://fastapi:8000/isNewEmail/${param}`);

  try {
    const response = await axios.get(`http://fastapi:8000/isNewEmail/${param}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.message); // Log the error message
    const status = error.response ? error.response.status : 500;
    const data = error.response ? error.response.data : { error: 'An error occurred' };
    res.status(status).json(data);
  }
}