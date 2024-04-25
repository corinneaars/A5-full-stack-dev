import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function RentVideos() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newcustomer, setNewCustomer] = useState('true');
  const [customer, setCustomer] = useState({});
  const [address, setAddress] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [rentedVideos, setRentedVideos] = useState([]);
  const [customerForm, setCustomerForm] = useState({
    customer: {
      customer_id: "",
      first_name: '',
      last_name: '',
      email: '',
      store_id: '1',
    },
    address: {
      address_id: "",
      address: '',
      district: '',
      postal_code: '',
      phone: '',
      location: {
        longitude: '',
        latitude: '',
      },
    },
    city: {
      city_id: "",
      city: '',
    },
    country: {
      country_id: "",
      country: '',
    },
  });

  const getCustomerbyEmail = async (event) => {
    event.preventDefault();
  
    const response = await axios.get(`/api/proxy/getCustomerbyEmail/${email}`);
    setNewCustomer(response.data.newcustomer);
    setCustomer(response.data.customer);
    setAddress(response.data.address);
    setCity(response.data.city);
    setCountry(response.data.country);
    setCities(response.data.cities);
    setCountries(response.data.countries);
    setCustomerForm({
      customer: response.data.customer,
      address: response.data.address,
      city: response.data.city,
      country: response.data.country,
    });   
    if (response.data.newcustomer === 'true') {
      setStep(2);
    } else {
      setStep(3);
   }
  };


  const handleCustomerInfoSubmit = async (event) => {
    event.preventDefault();
    setCustomer(customerForm.customer);
    setAddress(customerForm.address);
    setCity(customerForm.city); 
    setCountry(customerForm.country); 

    const response = await axios.post('/api/proxy/addCustomer', customer, address, city, country);
    if (response.data.success) {
      setStep(3);
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
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
            <form onSubmit={handleCustomerInfoSubmit}>
              <h2>Customer Information</h2>
              <input type="hidden" value={customerForm.newcustomer} />
              <input type="hidden" value={customerForm.customer.customer_id}  />
              <input type="hidden" value={customerForm.customer.store_id}  />
              <label>
                First Name:
                <input type="text" value={customerForm.customer.first_name} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, first_name: e.target.value}})} required />
              </label>
              <label>
                Last Name:
                <input type="text" value={customerForm.customer.last_name} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, last_name: e.target.value}})} required />
              </label>
              <label>
                Email:
                <input type="email" value={customerForm.customer.email} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, email: e.target.value}})} required />
              </label>

              <h2>Address Information</h2>
              <input type="hidden" value={customerForm.address.address_id} />
              <label>
                Address:
                <input type="text" value={customerForm.address.address} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, address: e.target.value}})} required />
              </label>
              <label>
                District:
                <input type="text" value={customerForm.address.district} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, district: e.target.value}})} required />
              </label>
              <label>
                Postal Code:
                <input type="text" value={customerForm.address.postal_code} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, postal_code: e.target.value}})} required />
              </label>
              <label>
                Phone:
                <input type="text" value={customerForm.address.phone} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, phone: e.target.value}})} required />
              </label>
              <label>
                Longitude:
                <input type="number" step="any" value={customerForm.address.location.longitude} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, location: {...customerForm.address.location, longitude: e.target.value}}})} required />
              </label>
              <label>
                Latitude:
                <input type="number" step="any" value={customerForm.address.location.latitude} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, location: {...customerForm.address.location, latitude: e.target.value}}})} required />
              </label>
              <h2>City Information</h2>
              <label>
                City:
                <input type="hidden" value={customerForm.city.city_id} />
                <input type="text" value={customerForm.city.city} onChange={e => {
                  const value = e.target.value;
                  setCustomerForm({...customerForm, city: {...customerForm.city, city: value, city_id: ""}});
                  if (value) {
                    setCitySuggestions(cities.filter(city => city.city.toLowerCase().startsWith(value.toLowerCase())));
                  } else {
                    setCitySuggestions([]);
                  }
                }} />
                {citySuggestions.length > 0 && (
                  <div className="suggestions">
                    {citySuggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => {
                        setCustomerForm({...customerForm, city: {...customerForm.city, city: suggestion.city, city_id: suggestion.city_id}});
                        setCitySuggestions([]);
                      }}>
                        {suggestion.city}
                      </div>
                    ))}
                  </div>
                )}
              </label>

              <label>
                Country:
                <input type="hidden" value={customerForm.country.country_id} />
                <input type="text" value={customerForm.country.country} onChange={e => {
                  const value = e.target.value;
                  setCustomerForm({...customerForm, country: {...customerForm.country, country: value, country_id: ""}});
                  if (value) {
                    setCountrySuggestions(countries.filter(country => country.country.toLowerCase().startsWith(value.toLowerCase())));
                  } else {
                    setCountrySuggestions([]);
                  }
                }} />
                {countrySuggestions.length > 0 && (
                  <div className="suggestions">
                    {countrySuggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => {
                        setCustomerForm({...customerForm, country: {...customerForm.country, country: suggestion.country, country_id: suggestion.country_id}});
                        setCountrySuggestions([]);
                      }}>
                        {suggestion.country}
                      </div>
                    ))}
                  </div>
                )}
              </label>
          <input type="submit" value="Submit" />
        </form>  )}

      {step === 3 && (
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

