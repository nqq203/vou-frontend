'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import ErrorPage from '@pages/errorPage';
import HomePage from '@pages';
import { Home } from '@components/features/Home';
import { jwtDecode } from 'jwt-decode';

// AuthValidation component to protect routes based on user role and token expiration
const AuthValidation = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);
  const role = useSelector((state) => state.auth.role);
  // const role = "BRAND";

  const { asPath } = router;

  // Check token expiration
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          dispatch(logout());
          router.push('/');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        dispatch(logout());
        router.push('/');
      }
    }
  }, [token, dispatch]);

  // Redirect to HomePage if role is null and not on signIn or signUp pages
  const unauthorizedPage = ['/signIn','/signUp', '/'];
  useEffect(() => {
    if (role === null && asPath !== '/signIn' && asPath !== '/signUp') {
      if(unauthorizedPage.includes(asPath)){
        router.push(asPath)
      } else {
        router.push('/');
      }
    }
  }, [role, asPath]);


  // Role-based route protection
  if (role) {
    if (
      (asPath === '/admin' || asPath.startsWith('/admin/')) && role !== 'ADMIN'
    ) {
      return <ErrorPage content="Unauthorized request!" />;
    }

    if (
      (asPath === '/brand' || asPath.startsWith('/brand/')) && role !== 'BRAND'
    ) {
      return <ErrorPage content="Unauthorized request!" />;
    }

    return <>{children}</>;
  }

  // If the user is on the signIn or signUp page, allow them to stay there
  if (asPath === '/signIn' || asPath === '/signUp') {
    return <>{children}</>;
  }

  // Otherwise, redirect to HomePage
  return <HomePage />;
};

export default AuthValidation;
