'use client';
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import BrandPage from './brand';
import AdminPage from './admin';
import HomePage from './index';
import AdminAccountManagementPage from './admin/accounts';
import AdminGameManagementPage from './admin/games';
import ErrorPage from './errorPage';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';


function DynamicPage() {
  const router = useRouter();
  const param = useParams()
  const { asPath } = router;
  const role = useSelector((state) => state.auth.role);

  const renderPage = useCallback(() => {

    if(asPath.startsWith('/')){
      if(!role){
        router.push('/')
        return null;
      }
      return <ErrorPage />
    }

    // if (asPath.startsWith('/admin/')) {
    //   console.log("hi admin")
    //   if(role !== "ADMIN"){
    //     return <ErrorPage content='Unauthorized request!' />
    //   }
    // } else if (asPath.startsWith('/brand/')) {
    //   console.log("hi brand")
    //   if(role !== "BRAND"){
    //     return <ErrorPage content='Unauthorized request!'/>
    //   }
    // } else if (asPath.startsWith('/')){
    //   return <ErrorPage />
    // } 
    // return <ErrorPage />

  }, [asPath]);

  return (
    renderPage()
  )
}

export default DynamicPage