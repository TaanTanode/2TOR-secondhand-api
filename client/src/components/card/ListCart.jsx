import React from 'react'
import { ListCheck } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';


const ListCart = () => {
    const cart = useEcomStore((state) => state.carts);
    const user = useEcomStore((s) => s.user);
    const token = useEcomStore((s) => s.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success('บันทึกใส่ตะกร้าเรียบร้อย',
                    {
                        position: "top-center",
                    });
                navigate('/checkout')
            })
            .catch((err) => {
                console.log('err', err)
                toast.warning(err.response.data.message)
            })
    }


    return (
        <div className='bg-gray-100 rounded-sm p-4'>

            {/* header */}
            <div className='flex gap-4 mb-4'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold'>Product {cart.length} List</p>
            </div>

            {/* list */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                {/* left */}
                <div className='col-span-2'>
                    {/* Card */}

                    {cart.map((item, index) => (
                        <div key={index} className='bg-white p-2 rounded-md shadow-md mb-2'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2'>
                                {/* left */}
                                <div className='flex gap-2 items-center'>

                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-16 h-16 rounded-md'
                                                src={item.images[0].url} />
                                            : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                                                No Image
                                            </div>
                                    }







                                    <div>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm'>
                                            {numberFormat(item.price)} x {numberFormat(item.count)}
                                        </p>
                                    </div>
                                </div>
                                {/* right */}
                                <div>
                                    <div className='font-bold text-blue-500'>
                                        ฿{numberFormat(item.price * item.count)}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                    }
                </div>

                {/* right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>Total</p>
                    <div className='flex justify-between'>
                        <span>Total Price</span>
                        <span className='text-2xl font-bold'>{numberFormat(getTotalPrice())}</span>
                    </div>

                    <div className='flex flex-col gap-2'>

                        {
                            user
                                ? (<Link>
                                    <button
                                        disabled={cart.length < 1}
                                        onClick={handleSaveCart}
                                        className='bg-red-500 w-full 
                    rounded-md text-white py-2 shadow-md hover:bg-red-600 text-xl'>
                                        Order
                                    </button>
                                </Link>)
                                : (<Link to={'/login'}>
                                    <button className='bg-yellow-500 w-full 
                    rounded-md text-white py-2 shadow-md hover:bg-yellow-600 text-xl'>
                                        Login
                                    </button>
                                </Link>)
                        }





                        <Link to={'/shop'}>
                            <button className='bg-gray-500 w-full 
                    rounded-md text-white text-xl py-2 shadow-md hover:bg-gray-700'>
                                Edit
                            </button>
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ListCart;