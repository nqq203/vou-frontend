import React from 'react'

const Notification = ({type,title,content}) => {
  return (
    <div >
        <div>
            {title}
        </div>

        <p>{content}</p>
    </div>
  )
}

export default Notification