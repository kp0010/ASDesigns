import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { IoCloudDownloadOutline } from "react-icons/io5";

const Download = ({ className, productId, ...props }) => {

  const navigate = useNavigate()
  const buyNow = () => {
    navigate(`/checkout/?buyNow=${productId}`)
    window.scrollTo(0,0)
  }

  return (
    <Button onClick={buyNow}
      className={cn("", className)}
      {...props}>
      <IoCloudDownloadOutline /> Download
    </Button>
  )
}

export default Download
