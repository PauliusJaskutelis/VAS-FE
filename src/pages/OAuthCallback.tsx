// OAuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you could extract the token from the URL (if using implicit flow)
    // or call your backend to exchange an auth code (for auth-code flow)
    // Then redirect to your dashboard or homepage
    navigate('/');
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;