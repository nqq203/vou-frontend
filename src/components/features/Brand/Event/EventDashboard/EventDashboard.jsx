'use client'
import { useRouter } from 'next/navigation';
import { useCallback,useState,useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import { IoChevronBackCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io"
import { useQuery } from 'react-query';

import Image from 'next/image'
import AdminOverview from '@components/features/Admin/AdminOverview/AdminOverview'
import AdminStatistic from '@components/features/Admin/AdminStatistic/AdminStatistic'
import { callApiGetEventStatistic } from '@pages/api/statistic';
import Box from '@components/common/Box';
import Table from '@components/common/Table';
import Notification from '@components/common/Notification';

const EventDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idEvent = searchParams.get('e') || 0;  
  const gameType = searchParams.get('t') || 1;   // 1: Shake game; 2: Quiz game
  const [numOfPlayers, setNumOfPlayers] = useState(0);

  // Noti
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');
  const closeNoti = () => {
    setShowNoti(false)
  }

  // Shake game
  const [numOfGivenVouchers, setNumOfGivenVouchers] = useState(0);
  const [numOfRemainVouchers, setNumOfRemainVouchers] = useState(0);
  const [shareCounts, setShareCounts] = useState(0)

  // Quiz game
  const [winners, setWinners] = useState([])
  const [rows, setRows] = useState([])
  const [isViewAccount, setIsViewAccount] = useState(false)
  const [userInfo, setUserInfo] = useState(null);
  function handleOpenForm() {
    setIsViewAccount(true)
  }

  const header = [
    "STT",
    "Username",
    "Họ và tên",
    "Email",
    "Số điện thoại",
    "Hạng",
  ]

  const scrollViewStyle = {
    minHeight: "550px",
    maxHeight: "550px",
  }

  const overviewShakeGame = [
    {
      icon: <FaSackDollar size={32} />,
      name: 'Tổng số người tham gia',
      value: numOfPlayers,
    }, 
    {
      icon: <FaHandHoldingDollar size={32} />,
      name: 'Số voucher đã đổi',
      value: numOfGivenVouchers,
    },
    {
      icon: <Image
              src="../../../../../../icons/001-medical.svg"
              alt="EXPENSE"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Số voucher còn lại',
      value: numOfRemainVouchers,
    },
    {
      icon: <Image
              src="../../../../../../icons/003-saving.svg"
              alt="total saving"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Số lượt chia sẻ',
      value: shareCounts,
    }
  ]

  const fakeData = {
    participants: 30,
    winners: [
      {
      "idUser": 1,
      "username": "Username",
      "password": "pass",
      "fullName": "Full Name",
      "email": "Email",
      "phoneNumber": "0963182221",
      "lockedDate": "Date",
      "role": "Player",
      "status": "Active",
      "address": "227 Nguyễn văn cừ",
      "avatarUrl": "https://placehold.co/40x40",
      "rank": 1,
      },
      {
        "idUser": 2,
        "username": "Username 1",
        "password": "pass",
        "fullName": "Full Name 1",
        "email": "Email",
        "phoneNumber": "0963182221",
        "lockedDate": "Date",
        "role": "Player",
        "status": "Active",
        "address": "227 Nguyễn văn cừ",
        "avatarUrl": "https://placehold.co/40x40",
        "rank": 2,
      },
      {
        "idUser": 3,
        "username": "Username 2",
        "password": "pass",
        "fullName": "Full Name 2",
        "email": "Email",
        "phoneNumber": "0963182221",
        "lockedDate": "Date",
        "role": "Player",
        "status": "Active",
        "address": "227 Nguyễn văn cừ",
        "avatarUrl": "https://placehold.co/40x40",
        "rank": 3,
      }
    ],
    "correctRates": [],
  }

  const [overview, setOverview] = useState(overviewShakeGame);

  const {isFetching, refetch } = useQuery(
    "fetch-event-statistic",
    () => callApiGetEventStatistic(idEvent),
    {
      onSuccess: (data) => {
        console.log(data);
        if(gameType === "1"){
          setNumOfPlayers(data.metadata?.participants);
          setNumOfGivenVouchers(data.metadata?.givenVouchers);
          setNumOfRemainVouchers(data.metadata?.remainingVouchers);
          setShareCounts(data.metadata?.shareCounts || 0);
        } else {
          // setNumOfPlayers(data.metadata?.participants);
          // setWinners(data.metadata?.winners || []);
          setWinners(fakeData.winners);
          setNumOfPlayers(fakeData.participants);
          const list = fakeData.winners.map((user,index) => {
            return {
              no: index+1,
              name: user.fullName,
              email: user.username,
              phone: user.email,
              role: user.phoneNumber,
              status: user.rank,
            }
          })
          setRows(list)
        }
        
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
        setWinners(fakeData.winners);
        setNumOfPlayers(fakeData.participants);
        setNumOfPlayers(fakeData.participants);
        const list = fakeData.winners.map((user,index) => {
          return {
            no: index+1,
            name: user.username,
            email: user.fullName,
            phone: user.email,
            role: user.phoneNumber,
            status: user.rank,
          }
        })
        setRows(list)
      },
    }
  )

  

  const goBackToDetailPage = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if(gameType === "1"){
      setOverview([
        {
          icon: <FaSackDollar size={32} />,
          name: 'Tổng số người tham gia',
          value: numOfPlayers,
        }, 
        {
          icon: <FaHandHoldingDollar size={32} />,
          name: 'Số voucher đã đổi',
          value: numOfGivenVouchers,
        },
        {
          icon: <Image
                  src="../../../../../../icons/001-medical.svg"
                  alt="EXPENSE"
                  width={32}
                  height={32}
                  className="object-contain"
                />,
          name: 'Số voucher còn lại',
          value: numOfRemainVouchers,
        },
        {
          icon: <Image
                  src="../../../../../../icons/003-saving.svg"
                  alt="total saving"
                  width={32}
                  height={32}
                  className="object-contain"
                />,
          name: 'Số lượt chia sẻ',
          value: shareCounts,
        }
      ])
    } else {
      setOverview([
        {
          icon: <FaSackDollar size={32} />,
          name: 'Tổng số người tham gia',
          value: numOfPlayers,
        }, 
      ])
    }

  },[numOfPlayers,winners,rows])

  return (
    <div className='container p-6 mx-auto'>
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      {isViewAccount ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setIsViewAccount(false)}>
              <IoMdClose size={24} />
            </button>
            <div className="mx-2">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[24px]">Thông tin người chơi</h3>

                <div className="flex mt-2">
                  <div className="flex flex-col mr-6 items-center w-[250px]">
                    <img src={userInfo.avatarUrl || "https://placehold.co/400x200"} alt="avt" className="h-[200px] "  />
                    <div className="text-xl font-semibold text-primary mt-1">{"Hạng " + userInfo.rank}</div>
                  </div>
                
                  <div className='w-full'>
                    <div className="flex gap-3 mb-4">
                      <div className="flex flex-col w-[50%]">
                          <h5 className="text-base font-semibold">Username</h5>
                          <div className="input_text">{userInfo.username}</div>
                      </div>
                      <div className="flex flex-col grow">
                          <h5 className="text-base font-semibold">Họ và tên</h5>
                          <div className="input_text">{userInfo.fullName || ""}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <div className="flex flex-col w-[50%]">
                          <h5 className="text-base font-semibold">Email</h5>
                          <div className="input_text">{userInfo.email || ""}</div>
                      </div>

                      <div className="flex flex-col grow">
                          <h5 className="text-base font-semibold">Số điện thoại</h5>
                          <div className="input_text">{userInfo.phoneNumber || ""}</div>
                      </div>
                    </div>

                    <div className="flex flex-col grow">
                        <h5 className="text-base font-semibold">Địa chỉ</h5>
                        <div className="input_text">{userInfo.address || ""}</div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      ): null}

      <div className="flex gap-2 items-center">
        <div className="text-primary p-2 cursor-pointer" onClick={goBackToDetailPage}>
          <IoChevronBackCircle size={40} />
        </div>
        <h1 className='text-heading1 font-bold text-primary'>Thống kê sự kiện</h1>
      </div>
      {gameType === "1" ? (
        <AdminOverview overview={overview}/>
      ) : (
        <>
          <Box 
            icon={<FaSackDollar size={32} />} 
            textColor={"text-brown-500"} 
            bgColor={"bg-yellow-50"} 
            iconColor={"text-yellow-500"} 
            textContent={"Tổng số người tham gia"} 
            value={numOfPlayers}
          />
          
          <Table head={header} rows={rows} listUsers={winners} isEditTable={false} scrollViewStyle={scrollViewStyle} 
            setInfo={setUserInfo} handleOpenForm={handleOpenForm}/>
        </>
      )}
      
    </div>
  )
}

export default EventDashboard