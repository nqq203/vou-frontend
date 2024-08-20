'use client';
import { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Auth from '@redux/auth';
import ErrorPage from '@pages/errorPage';
import { logout } from '@redux/auth';
import HomePage from '@pages';


// const AuthContext = createContext();

const AuthValidation = ({children}) => {
  const router = useRouter()

  const token = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();
  
  const { asPath } = router;
  const role = useSelector(state => state.auth.role);
  
  if(role){
      if (asPath === '/admin' || asPath.startsWith('/admin/')) {
        if(role !== "ADMIN"){
          return <ErrorPage content='Unauthorized request!' />
        }
      } else if (asPath === '/brand' || asPath.startsWith('/brand/')) {
        // console.log("hi brand")
        if(role !== "BRAND"){
          return <ErrorPage content='Unauthorized request!' />
        }
      }
  }

  useEffect(() => {
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(decodedToken);
        console.log(currentTime);
        console.log(Date.now())

        if (decodedToken.exp < currentTime) {
            dispatch(logout());
            router.push('/');
        }
    } 
  }, [token, dispatch]);

  return (
    <div>
        {children}
    </div>
  )
}

export default AuthValidation