import React, { useState, useEffect } from 'react';

import api from '~/services/api';
// import { Container } from './styles';

function Response({ children }) {
  const [response, setResponse] = useState([]);
  const { id } = children;

  useEffect(() => {
    async function loadResponse() {
      const responsed = await api.get(`ordersres?request_id=${id}`);

      setResponse(responsed.data.length);
    }
    loadResponse();
  }, []);

  return <span>{response}</span>;
}

export default Response;
