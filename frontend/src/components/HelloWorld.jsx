import React, { useEffect, useState } from 'react';

function HelloWorld() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'http://localhost:8000/api';

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default HelloWorld;
