import React from 'react'

const HtmlContent = ({string}) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: string }}
    />
  )
}

export default HtmlContent