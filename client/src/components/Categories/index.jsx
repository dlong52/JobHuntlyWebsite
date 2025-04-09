import React from 'react'

const Categories = ({categories}) => {
if  (!categories?.length) return null
  return (
    <>{categories?.map((item)=>{
        return `${item?.name}, `
    })}</>
  )
}

export default Categories