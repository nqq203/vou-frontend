import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import BrandPage from './admin';
import AdminPage from './brand';
import HomePage from './index';

function DynamicPage() {
  const router = useRouter();
  const { asPath } = router;
  console.log(asPath);
  const renderPage = useCallback(() => {
    if (asPath.startsWith('/admin')) {
      return <AdminPage />
    } else if (asPath.startsWith('/brand')) {
      return <BrandPage />
    }
    else if (asPath.startsWith('/')) {
      console.log('home page');
      return <HomePage />
    }
    return
  }, [asPath]);

  return (
    renderPage()
  )
}

export default DynamicPage