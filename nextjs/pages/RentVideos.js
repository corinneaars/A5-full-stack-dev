import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function RentVideos() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [rentedVideos, setRentedVideos] = useState([]);

  const getCustomerbyEmail = async (event) => {
    event.preventDefault();

    const response = await axios.get(`/api/proxy/getCustomerbyEmail/${email}`);
    if (response.data.newcustomer === "true") {
      // Add new Customer
      if (response.data.customer) {
        setStep(3);
        setCustomer(response.data.customer);
        setAddress(response.data.address);
        if (response.data.city){
          setCity(response.data.city);
          setCountry(response.data.country);
        } else {
          setCities(response.data.cities);
          setCountries(response.data.countries);
        }
      } else {
        alert('Help, it dieded');
      }
    } else {
      // Customer already exists
      setStep(2);
      setCustomer(response.data.customer);
      setAddress(response.data.address);
      if (response.data.city){
        setCity(response.data.city);
        setCountry(response.data.country);
      } else {
        setCities(response.data.cities);
        setCountries(response.data.countries);
      }
    }
  };

  const handleCustomerInfoSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/proxy/addCustomer', customer);
    if (response.data.success) {
      setStep(2);
    } else {
      alert('An error occurred');
    }
  };

  const handleVideoIdSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(`/api/proxy/checkVideoAvailability/${videoId}`);
    if (response.data.available) {
      setRentedVideos([...rentedVideos, response.data.video]);
      setVideoId('');
    } else {
      alert(`Video ${videoId} is not available`);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={getCustomerbyEmail}>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </label>
          <button type="submit">Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleCustomerInfoSubmit}>
          <label>
            Customer Name:
            <input type="text" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} required />
          </label>
          <label>
            Address:
            <input type="text" value={address.address} onChange={e => setAddress({...address, address: e.target.value})} required />
          </label>
          <label>
            City:
            {cities ? (
              <Select
                options={cities.map(city => ({ value: city.city_id, label: city.city }))}
                onChange={selectedOption => setCity(selectedOption.value)}
              />
            ) : (
              <input type="text" value={city.city} readOnly />
            )}
          </label>
          <label>
            Country:
            {countries ? (
              <Select
                options={countries.map(country => ({ value: country.country_id, label: country.country }))}
                onChange={selectedOption => setCountry(selectedOption.value)}
              />
            ) : (
              <input type="text" value={country.country} readOnly />
            )}
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVideoIdSubmit}>
          <label>
            Video ID:
            <input type="text" value={videoId} onChange={e => setVideoId(e.target.value)} />
          </label>
          <button type="submit">Rent Video</button>
        </form>
      )}

      {rentedVideos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {rentedVideos.map(video => (
              <tr key={video.id}>
                <td>{video.id}</td>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>{video.price}</td>
                <td>{video.available ? 'TRUE' : 'FALSE'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

