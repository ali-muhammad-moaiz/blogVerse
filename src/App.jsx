import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import './App.css'
import authService from './externalIntegrations/auth';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getLoggedInUser()
    .then((userData) => 
      {
        if(userData)
          dispatch(login(userData))
        else
          dispatch(logout(userData))
      }
    ).finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <>
      <h1>Appwrite blog application</h1>
    </>
  ) : <div>loading...</div>
}

export default App
