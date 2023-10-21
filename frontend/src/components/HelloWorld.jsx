import React, { useEffect, useState } from 'react';

function HelloWorld() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api';
    const abortController = new AbortController();

    fetch(apiUrl, { signal: abortController.signal })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          // Ignore the error if it's an abort due to unmounting
        } else {
          console.error('Error fetching data:', error);
        }
      });

    // Cleanup function to abort the request when the component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default HelloWorld;
