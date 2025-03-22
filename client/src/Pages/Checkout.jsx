import { CheckoutProducts } from '@/Components/CheckoutProducts/CheckoutProducts'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const Checkout = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const buyNow = params.get("buyNow")

    return (
        <CheckoutProducts buyNowProductId={buyNow} />
    )
}
