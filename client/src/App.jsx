import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState('');
  const [mapHTML, setMapHTML] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (location.lat && location.lon) {
      getMapHTML();
    }
  }, [location]);

  async function fetchLocationData() {
    try {
      const response = await axios.get(
        `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`
      );
      if (response.data[0]) {
        setLocation(response.data[0]);
        setErrorMessage('');
      } else {
        setErrorMessage('No results found for the given location.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      setErrorMessage('An error occurred while fetching location data.');
    }
  }

  function getMapHTML() {
    if (location.lat && location.lon) {
      const { lat, lon } = location;
      setMapHTML(`<iframe src="https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}&zoom=10" width="600" height="450" frameBorder="0"></iframe>`);
    } else {
      console.error('Invalid latitude or longitude.');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search) {
      fetchLocationData();
    }
  }

  return (
    <>
      <h1>Lost and Found</h1>
      <p>Using LocationIQ API, enter your location and find your desired location within a 20 mile radius!</p>
      <form onSubmit={handleSubmit}>
        <input className='input-box' onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Type your desired location..." />
        <button type="submit">Explore! 🌎</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <h2>{location.display_name}</h2>
      {location.lat && location.lon && (
        <h3>📍{location.lat},{location.lon}</h3>
      )}
      <div className="map" dangerouslySetInnerHTML={{ __html: mapHTML }} />
    </>
  );
}

export default App;
