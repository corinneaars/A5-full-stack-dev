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
  const [rentedVideos, setRentedVideos] = useState('');
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
    // copy values from customerForm to customer, address, city, country
    const { customer, address, city, country } = customerForm;
    customer.address_id = address.address_id || "";
    address.address = customerForm.address.address || "";
    address.address2 = customerForm.address.address2 || "";
    address.district = customerForm.address.district || "";
    address.postal_code = customerForm.address.postal_code || "";
    address.phone = customerForm.address.phone || "";
    address.location.latitude = customerForm.address.location.latitude || "";
    address.location.longitude = customerForm.address.location.longitude || "";
    address.city_id = customerForm.city.city_id || "";
    city.city = customerForm.city.city || "";
    city.country_id = customerForm.country.country_id || "";
    country.country = customerForm.country.country || "";

    console.log("   RentVideos.js  |  customer: ", customer);
    console.log("   RentVideos.js  |  address: ", address);
    console.log("   RentVideos.js  |  city: ", city);
    console.log("   RentVideos.js  |  country: ", country);
    const response = await axios.post('/api/proxy/addCustomer', {customer, address, city, country});
    console.log("   RentVideos.js  |  AND we are backe here (success?): ", response.success);
    console.log("   RentVideos.js  |  AND we are backe here: ", response.data);
    if (response.status === 200) {
      // setNewCustomer(response.data.newcustomer);
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
      setStep(3);
    } else {
      alert('Ooops...else...An error occurred');
    }
  };

  const handleVideoIdSubmit = async (event) => {
    event.preventDefault();

    const store_id = customerForm.customer.store_id;
    const customer_id = customerForm.customer.customer_id;

    const response = await axios.get(`/api/proxy/checkVideoAvailability/${store_id}/${customer_id}/${videoId}`);
    if (response.status === 200) {
      setRentedVideos([...rentedVideos, response.data.filmsRented]);
      console.log("   RentVideos.js  |  AND we are backe here: RENTEDVIDEOS", response.data.filmsRented);
      setVideoId('');
    } else {
      alert(`Video ${videoId} is not available`);
    }
  };


// <<<<<<<<<<<< ALL THE FORMS ARE FROM HERE ON >>>>>>>>>>>>>>
return (
  <div>
    {step === 1 && (
      <form onSubmit={getCustomerbyEmail}>
        <label>
          Email:
          <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <button type="submit">Next</button>
      </form>
    )}

    {step === 2 && (
      <form onSubmit={handleCustomerInfoSubmit}>
        <h2>Customer Information</h2>
        <input type="hidden" value={customerForm.newcustomer} name="newcustomer" id="newcustomer" />
        <input type="hidden" value={customerForm.customer.customer_id} name="customer_id" id="customer_id" />
        <input type="hidden" value={customerForm.customer.store_id}  name="store_id" id="store_id"/>
        <label>
          First Name:
          <input type="text" id="first_name" name="first_name" value={customerForm.customer.first_name} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, first_name: e.target.value}})} required />
        </label>
        <label>
          Last Name:
          <input type="text" id="last_name" name="last_name" value={customerForm.customer.last_name} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, last_name: e.target.value}})} required />
        </label>
        <label>
          Email:
          <input type="email" id="customer_email" name="customer_email" value={customerForm.customer.email} onChange={e => setCustomerForm({...customerForm, customer: {...customerForm.customer, email: e.target.value}})} required />
        </label>

        <h2>Address Information</h2>
        <input type="hidden" value={customerForm.address.address_id} name="address_id" id="address_id" />
        <label>
          Address:
          <input type="text" id="address" name="address" value={customerForm.address.address} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, address: e.target.value}})} required />
        </label>
        <label>
          District:
          <input type="text" id="district" name="district" value={customerForm.address.district} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, district: e.target.value}})} required />
        </label>
        <label>
          Postal Code:
          <input type="text" id="postal_code" name="postal_code" value={customerForm.address.postal_code} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, postal_code: e.target.value}})} required />
        </label>
        <label>
          Phone:
          <input type="text" id="phone" name="phone" value={customerForm.address.phone} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, phone: e.target.value}})} required />
        </label>
        <label>
          Longitude:
          <input type="number" id="longitude" name="longitude" step="any" value={customerForm.address.location.longitude} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, location: {...customerForm.address.location, longitude: e.target.value}}})} required />
        </label>
        <label>
          Latitude:
          <input type="number" id="latitude" name="latitude" step="any" value={customerForm.address.location.latitude} onChange={e => setCustomerForm({...customerForm, address: {...customerForm.address, location: {...customerForm.address.location, latitude: e.target.value}}})} required />
        </label>
        <h2>City Information</h2>
        <label>
          City:
          <input type="hidden" value={customerForm.city.city_id}  name="city_id" id="city_id" />
          <input type="text" id="city" name="city" value={customerForm.city.city} onChange={e => {
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
          <input type="hidden" value={customerForm.country.country_id}  name="country_id" id="country_id" />
          <input type="text" id="country" name="country" value={customerForm.country.country} onChange={e => {
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
        <h2>Customer Information</h2>
        <label>
          First Name:
          <input type="text" id="first_name" name="first_name" value={customerForm.customer.first_name} readOnly />
        </label>
        <label>
          Last Name:
          <input type="text" id="last_name" name="last_name" value={customerForm.customer.last_name} readOnly />
        </label>
        <label>
          Email:
          <input type="email" id="customer_email" name="customer_email" value={customerForm.customer.email} readOnly />
        </label>
        <h2>Video Lookup</h2>
        <label>
          Video ID:
          <input type="text" id="video_id" name="video_id" value={videoId} onChange={e => setVideoId(e.target.value)} />
        </label>
        <button type="submit">Rent Video</button>
      </form>

    )}

    {rentedVideos.length > 0 && (
    <div>
      {newcustomer === 'true' && <h2>NEW Customer Saved successfully</h2>}
      { newcustomer === 'false' && <h2>Customer Found</h2>}
      {console.log("   RentVideos.js  |  rentedVideos: ", rentedVideos)}

      <h2>Customer Information</h2>
      <label>
        First Name:
        <input type="text" id="first_name" name="first_name" value={customerForm.customer.first_name} readOnly />
      </label>
      <label>
        Last Name:
        <input type="text" id="last_name" name="last_name" value={customerForm.customer.last_name} readOnly />
      </label>
      <label>
        Email:
        <input type="email" id="customer_email" name="customer_email" value={customerForm.customer.email} readOnly />
      </label>
      <h2>Rented Videos: </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {rentedVideos[0].map(video => (
            <tr key={video.id}>
              <td>{video.inventory_id}</td>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.rental_rate}</td>
              <td>{video.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </div>
);

}