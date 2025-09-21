import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import backendRequests from '../../functions/axios-requests/backend';

const SystemReadyGate = ({ children }) => {
  const jwt = useSelector(state => state.jwt);
  const { isAuthenticated, isLoading } = useAuth0();
  const [backendAvailable, setBackendAvailable] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await backendRequests.isserverup();
        console.log('gate:', response.status);
        if (response.status === 200) {
          setBackendAvailable(true);
        } else {
          setBackendAvailable(false);
        }
      } catch (err) {
        setBackendAvailable(false);
      }
    };
    if (isAuthenticated && jwt) {
      checkBackend();
    }
  }, [isAuthenticated, jwt]);
  if (isLoading) return <div>Ładowanie uwierzytelniania...</div>;
  if (!isAuthenticated || !jwt) return <div>Trwa uwierzytelnianie...</div>;
  if (backendAvailable === null) return <div>Sprawdzanie połączenia z serwerem...</div>;
  if (!backendAvailable) return <div>Błąd: backend niedostępny.</div>;

  return children;
};

export default SystemReadyGate;
