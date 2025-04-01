import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react';
import { Mail } from 'lucide-react';


const MainNav = () => {
    const carts = useEcomStore((s) => s.carts);
    const user = useEcomStore((s) => s.user)
    const logout = useEcomStore((s) => s.logout)
    // console.log(Boolean(user))
    const [isOpen, setIsOpen] = useState(false)


    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    console.log(carts.length)

    return (
        

        
        <nav className='bg-red-600 shadow-2xl h-20 py-2'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6 text-xl text-white'>
                        <Link to={'/'}
                            className='font-extrabold text-3xl'>
                            2TOR
                        </Link>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-red-700 px-3 py-2 rounded-full font-medium'
                                    : 'hover:bg-red-700 px-3 py-2 rounded-full font-medium '
                            }

                            to={'/'}>
                            Home
                        </NavLink>


                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-red-700 px-3 py-2 rounded-full font-medium'
                                    : 'hover:bg-red-700 px-3 py-2 rounded-full font-medium '
                            }
                            to={'/shop'}>
                            Shop
                        </NavLink>
                        {/* Badge */}



                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-red-700 px-3 py-2 rounded-full font-medium'
                                    : 'hover:bg-red-700 px-3 py-2 rounded-full font-medium '
                            }
                            to={'/cart'}>
                            Cart
                            {
                                carts.length > 0
                                &&
                                (<span className='absolute top-3 bg-yellow-500 
                                rounded-full px-2 text-white'>{carts.length}</span>)
                            }

                        </NavLink>

                        

                        


                    </div>

                            {
                                user
                                ? <div className='flex items-center gap-4'>
                        <button
                            onClick={toggleDropdown}
                            className='flex items-center gap-2 hover:bg-red-700 px-2 py-1 rounded-3xl'>
                            <img
                                className='w-10 shadow-md'
                                src='https://cdn.iconscout.com/icon/premium/png-512-thumb/boy-2054218-1726916.png?f=webp&w=256' />
                            <ChevronDown />
                        </button>
                        {
                            isOpen &&
                            <div className='absolute top-16 bg-white shadow-md z-50'>
                                <Link
                                    to={'/user/history'}
                                    className='block px-4 py-2 hover:bg-gray-200'>
                                    History
                                </Link>

                                <button
                                    onClick={() => logout()}
                                    className='block px-4 py-2 hover:bg-gray-200'>
                                    Logout
                                </button>

                            </div>
                        }



                    </div>
                                : <div className='flex items-center gap-4 text-white text-xl'>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-red-700 px-3 py-2 rounded-full font-medium'
                                    : 'hover:bg-red-700 px-3 py-2 rounded-full font-medium '
                            }
                            to={'/register'}>
                            Register
                        </NavLink>


                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-red-700 px-3 py-2 rounded-full font-medium'
                                    : 'hover:bg-red-700 px-3 py-2 rounded-full font-medium '
                            }
                            to={'/login'}>
                            Login
                        </NavLink>
                    </div>
                            }

                    


                    
                </div>
            </div>
        </nav>
        
    )
}

export default MainNav