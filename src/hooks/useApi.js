import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (method, body, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisabled] = useState(false);


  const getIsDisable = () => {
    const role = localStorage.getItem("role");
    if (!(role === "ROLE_SUPERVISOR")) {
      setIsDisabled(true);
    }
  }

  const callApi = (url) => {


    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Set up axios headers with the token
    const config = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    // Handle GET and POST methods using .then() and .catch()
    let request;

    if (method === 'POST') {
      request = axios.post(url, body, config);  // POST request
    } else {
      request = axios.get(url, config);  // GET request
    }

    request
      .then((response) => {
        setData(response.data);
        getIsDisable();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    
  }
  return { data, loading, error, isDisable, callApi };

};

export default useApi;
