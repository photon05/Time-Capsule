import React from 'react'
import react from '../assets/react.svg'

const PostCard = ({userId, username, body}) => {
  return (
    <div className='w-482 h-326 bg-cardBg rounded-xl'>
        <div className='flex gap-4 m-4'>
            <div className='rounded-full bg-black w-6 h-6'>
                {/* <img src={react} alt="" /> */}
            </div>
            <div className='text-white'>
                {username}
            </div>
        </div>
        <div className='m-4 text-white'>{body}</div>
    </div>
  )
}
export default PostCard