import React from 'react'
import helpers from '../../utils/helpers'

const Widget = ({ title, quantity, content, Icon,  color }) => {

  return (
    <div className='p-5 rounded-md w-full bg-blue-950 text-white'>
      <div className="pb-5 border-b border-neutrals-100 flex items-center gap-3">
        <div className={`p-2 bg-slate-50 rounded-full bg-${color}-100`}>
          <Icon className={`w-5 text-neutrals-100 text-${color}-700`} />
        </div>
        <span className='font-medium'>{title}</span>
      </div>
      <div className="pt-5 border-t">
        <span className='font-semibold text-[20px] font-RedHatDisplay'>{helpers.numberFormat(quantity)} {content}</span>
      </div>
    </div>
  )
}

export default Widget
