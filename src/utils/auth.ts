export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // or decode + check expiration if needed
};
