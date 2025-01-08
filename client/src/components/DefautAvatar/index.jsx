import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React from 'react'

const DefautAvatar = () => {
  return (
    <div className='w-full aspect-square rounded-full flex items-center justify-center bg-slate-500'>
        <PersonRoundedIcon className='w-4/5 text-white'/>
    </div>
  )
}

export default DefautAvatar  