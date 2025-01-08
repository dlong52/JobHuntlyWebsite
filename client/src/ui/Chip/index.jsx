import { Chip } from '@mui/material'
import React from 'react'

const ChipMui = ({
    label,
    size,
    onDelete,
    variant,
    color,
    avatar,
}) => {
  return (
    <Chip label={label} size={size} onDelete={onDelete} variant={variant} color={color} avatar={avatar} />
  )
}

export default ChipMui
