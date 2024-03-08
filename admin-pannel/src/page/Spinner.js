import React from 'react'

import Growing from '../media/./pikloader.gif'
export const Spinner = () => {
  return (
   
       <div className='flex justify-center items-center w-full h-screen'>
         <div className='w-11'>
         <img src={Growing} alt ='Loading...'/>
         </div>
       </div>
   
  )
}
// ./pikloader.gif