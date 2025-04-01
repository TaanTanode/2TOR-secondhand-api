import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
    const token = useEcomStore((s) => s.token)
    // console.log(token)
    const [orders, setOrders] = useState([])


    useEffect(() => {
        hdlGetOrders(token)
    }, [])

    const hdlGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return 'bg-gray-200'
            case "Processing":
                return 'bg-blue-200'
            case "Completed":
                return 'bg-green-200 text-white'
            case "Cancelled":
                return 'bg-red-200'
        }
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>History Order</h1>

            {/* คลุม  table */}
            <div className='space-y-4'>
                {/* card loop order*/}
                {orders?.map((item, index) => {
                    // console.log(item)
                    return (
                        <div
                            key={index}
                            className='bg-gray-100 p-4 rounded-md shadow-md'>
                            {/* ทีมงาน header */}
                            <div className='flex justify-between mb-2'>
                                <div>
                                    <p className='text-sm'>Order date</p>
                                    <p className='font-bold'>
                                        {dateFormat(item.updatedAt)}
                                    </p>
                                </div>
                                <div>
                                    <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                        {item.orderStatus}
                                    </span>
                                    
                                </div>
                            </div>
                            {/* ทีมงาน table loop product*/}
                            <div>
                                <table className='border w-full text-xl'>
                                    <thead>
                                        <tr className='bg-yellow-400'>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            item.products?.map((product, index) => {
                                                // console.log(product)
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.product.title}</td>
                                                        <td>{numberFormat(product.product.price)}</td>
                                                        <td>{numberFormat(product.count)}</td>
                                                        <td>{numberFormat(product.count * product.product.price)}</td>
                                                    </tr>)
                                            })
                                        }

                                    </tbody>


                                </table>
                            </div>
                            {/* ทีมงาน total */}
                            <div>
                                <div className='text-right font-semibold'>
                                    <p>Total Price: </p>
                                    <p className='text-xl'>฿{numberFormat(item.cartTotal)}</p>
                                </div>
                            </div>

                        </div>
                    )
                })
                }





            </div>

        </div>
    )
}

export default HistoryCard