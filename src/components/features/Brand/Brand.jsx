'use client';
import SearchBar from '@components/common/SearchBar'
import Card from '@components/common/Card'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import { useDispatch } from 'react-redux';
import TitlePage from '@components/common/TitlePage';
import { useQuery } from 'react-query';
import { callApiGetMyEvents } from '@pages/api/event';
import Notification from '@components/common/Notification';
import { convertDataToOutputString } from '@utils/date';

const Brand = () => {
  const router = useRouter();
  const [listEvents, setListEvents] = useState([])

  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  const closeNoti = () => {
    setShowNoti(false)
  }

  const {isFetching, refetch} = useQuery(
    "fetch-my-events",
    callApiGetMyEvents,
    {
      onSuccess: (data) => {
        console.log(data.metadata);
        setListEvents(data.metadata);
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )

  useEffect(()=> {

  },[listEvents])


  return (
    <div className='container w-full my-4'>
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      <TitlePage title={"Sự kiện của tôi"} />

      <SearchBar/>
      <div className="container flex flex-wrap gap-4 my-4">
      {
        listEvents.map(event => {
          return <Card id={event.idEvent} key={event.idEvent}
            name={event.eventName}
            date={convertDataToOutputString(event.startDate) + " - " + convertDataToOutputString(event.endDate)}
            vouchers={event.numberOfVouchers}
            status={event.status} 
            />
        })
      }
      </div>
    </div>
  )
}

export default Brand