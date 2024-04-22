import { useState } from 'react';
import axios from 'axios';

export default function RentVideos() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState({});
  const [videoId, setVideoId] = useState('');
  const [rentedVideos, setRentedVideos] = useState([]);

  const isNewEmail = async (event) => {
    event.preventDefault();

    const response = await axios.get(`/api/proxy/getEmail/${email}`);
    if (response.data) {
      setStep(3);
      setCustomer({ response.data.customer });
      setAddress({ response.data.address });
      if (response.data.city){
        setCity({ response.data.city }) ;
        setCountry({ response.data.country });
      } else {
        setCities({ response.data.cities})
        setCountries({ response.data.countries})
      }
    } else {
      alert('Help, it dieded');
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
        <form onSubmit={isNewEmail}>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button type="submit">Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleCustomerInfoSubmit}>
          <label>
            Email:
            <input type="email" value={customer.email} disabled />
          </label>
          <label>
            First Name:
            <input type="text" value={customer.firstName} onChange={e => setCustomer({ ...customer, firstName: e.target.value })} />
          </label>
          <label>
            Last Name:
            <input type="text" value={customer.lastName} onChange={e => setCustomer({ ...customer, lastName: e.target.value })} />
          </label>
          <label>
            Address:
            <input type="text" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
          </label>
          <label>
            City:
            <input type="text" value={customer.city} onChange={e => setCustomer({ ...customer, city: e.target.value })} />
          </label>
          <label>
            Country:
            <input type="text" value={customer.country} onChange={e => setCustomer({ ...customer, country: e.target.value })} />
          </label>
          <button type="submit">Submit</button>
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

