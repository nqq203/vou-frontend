'use client';
import  { useRouter } from "next/router";
import Link from "next/link"
import store from "@redux/store";

const ErrorPage = ({content="Page not exists!"}) => {
  const router = useRouter();
  // const role = store.getState().auth.role;

  const backToHome = () => {
    router.back()
  }
  return (
    <div className="w-screen mt-[100px] flex flex-col justify-center items-center">
        <div className="flex-col justify-center items-center">
          <h1 className="head_text orange_gradient text-center">
              Error Page
              <br className="max-md:hidden" />
              <span className="orange_gradient text-center">{content}</span>
          </h1>
        </div>

        <div className="sm:flex hidden mt-4">
            <div className="primary_btn w-[200px]" onClick={backToHome}>
                Back
            </div>
        </div>
    </div>
  )
}

export default ErrorPage