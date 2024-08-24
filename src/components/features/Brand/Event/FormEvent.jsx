'use client'
import { useState,useRef } from "react"
import ImageUploader from "@components/common/ImageUploader";

const FormEvent = () => {
    const [banner, setBanner] = useState(null)
    const [qrImg, setQrImg] = useState(null)
    const [voucherImg, setvoucherImg] = useState(null)
    const formEventInfo = useRef(null);

    const handleFormData = () => {
      const formData = new FormData(formEventInfo.current);
      const formProps = Object.fromEntries(formData);
      console.log(formProps)
    }
  
    return (  
        <div className='container flex bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
          {/* Sự kiện và vouchers */}
          <form className="container" ref={formEventInfo}>
              <h2 className='text-heading3_semibold text-primary'>Sự kiện</h2>
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên sự kiện</h5>
                  <input type="text" className="input_text" placeholder="Tên" name="event_name" required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input type="number" className="input_text" placeholder="100" name="numOfVouchers" required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" name="startDay" required />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" name="endDay" required />
                </div>
              </div>
  
              {/* Event image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh</h5>
                <ImageUploader image={banner} setResource={setBanner}/>
              </div>
  
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hợp tác với brand khác (Nếu có)</h5>
                <input type="text" className="input_text" placeholder="dd/mm/yyyy" name="endDay" required />
              </div>
  
  
              <h2 className='text-heading3_semibold text-primary mt-8'>Voucher</h2>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên voucher</h5>
                  <input type="text" className="input_text" placeholder="Tên voucher" name="voucher_name" required  />
                </div> 

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Mã voucher</h5>
                  <input type="text" className="input_text" placeholder="XXXXXX" name="voucher_code" required  />
                </div>
              </div>

              <div className="flex gap-4">  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Trị giá</h5>
                  <input type="number" className="input_text" placeholder="100000VNĐ" name="voucher_price" required  />
                </div> 
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày hết hạn</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" name="voucher_expired" required  />
                </div> 
              </div>
  
              <div className="flex flex-col px-2 py-2 h-[200px]">
                <h5 className="text-base font-semibold">Mô tả</h5>
                <textarea type="text" className="input_text h-full" placeholder="Mô tả ngắn gọn về cách sử dụng voucher" name="voucher_description" required />
              </div>
  
              {/* QR Code image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">QR Code</h5>
                <ImageUploader image={qrImg} setResource={setQrImg}/>
                
              </div>
              
              {/* Voucher image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh voucher</h5>
                <ImageUploader image={voucherImg} setResource={setvoucherImg}/>
              </div>
  
              <div className="primary_btn w-[200px] mt-8" onClick={handleFormData}>Tiếp theo</div>
          </form>
        </div>
    )
}

export default FormEvent