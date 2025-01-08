import React from 'react'
import { cpLogo } from '../../../../assets/images'

const JobListItem = () => {
  return (
    <div className='flex justify-between border p-6'>
      <div className="flex items-start gap-3">
        <img src={cpLogo} alt="" />
        <div className="flex flex-col gap-2">
            <h2 className='font-semibold text-lg flex items-center gap-2'>Product Designer <span className='py-1 px-4 text-xs rounded-full bg-[#2c99162c] text-green-700 w-fit'>Full-time</span></h2>
            <span>Next Level Solution</span>
        </div>
      </div>
      <div className="">
        <button className='px-6 py-2 bg-primary text-white rounded-sm'>Ứng tuyển</button>
      </div>
    </div>
  )
}

export default JobListItem
