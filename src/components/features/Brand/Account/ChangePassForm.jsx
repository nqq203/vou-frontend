import { IoMdClose } from "react-icons/io"
import { useState,useRef } from "react";
import { useMutation } from "react-query";
import { callApiChangePassword } from "@pages/api/user";
import Notification from "@components/common/Notification";
import { useSelector } from "react-redux";

const ChangePassForm = ({handleClose}) => {
  const formChangePass = useRef(null);
  const email = useSelector(state => state.auth.email)

  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  const changePassMutation = useMutation(
    (data) => callApiChangePassword(data),
    {
      onSuccess: (data) => {
        console.log(data);
        // noti();
        setIsError(false);
        setShowNoti(true);
        setNotiMsg("Cập nhật thông tin thành công");
        formChangePass.current.reset();
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )

  const validate = (formProps) => {
    if(formProps.password === "" || formProps.rePassword === ""){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Vui lòng điền đầy đủ các ô nhập liệu");
      return false;
    }

    const accountRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!accountRegex.test(formProps.password)) {
      setNotiMsg("Mật khẩu bao gồm 8 ký tự trở lên bao gồm chữ hoa, chữ thường, số, ký hiệu (ví dụ: !@#$)");
      setIsError(true);
      setShowNoti(true);
      return false;
    }
    if (formProps.password.length < 8) {
      setNotiMsg("Mật khẩu phải lớn hơn 8 kí tự");
      setIsError(true);
      setShowNoti(true);
      return false;
    }

    if(formProps.password !== formProps.rePassword){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Mật khẩu nhập lại chưa đúng");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    const formData = new FormData(formChangePass.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)
    const isValid = validate(formProps)
    if(isValid) {
      const data = {
        ...formProps,
        email: email,
      }
      changePassMutation.mutate(data)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className={`${showNoti ? '' : 'hidden'} absolute flex flex-row justify-center z-50` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={() => {setShowNoti(false)}}/>
      </div>
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-xl h-auto mx-4">
        <div className="flex mb-2">
          <h4 className="text-heading3_semibold font-semibold">Thay đổi mật khẩu</h4>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            onClick={handleClose}
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form ref={formChangePass} onSubmit={(e) => {e.preventDefault()}} className="flex flex-col gap-2">
          <div className="flex flex-col px-2 py-2 grow">
            <h5 className="text-base font-semibold">Password</h5>
            <input type="password" className="input_text" placeholder="" 
              name="password" defaultValue={""}   required  />
          </div>

          <div className="flex flex-col px-2 py-2 grow">
            <h5 className="text-base font-semibold">Confirm Password</h5>
            <input type="password" className="input_text" placeholder="" 
              name="rePassword" defaultValue={""}   required  />
          </div>

          <div className="primary_btn w-[200px]" onClick={handleSubmit}>Đổi mật khẩu</div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassForm