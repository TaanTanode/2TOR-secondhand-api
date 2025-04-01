import React, { useState } from 'react'
import { LayoutDashboard, UserRoundCog, LayoutList, ShoppingBasket, ClipboardList, LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../../store/ecom-store';

const SidebarAdmin = () => {
    const logout = useEcomStore((s) => s.logout)
    return (
        <div className='bg-gray-800 w-64 text-gray-100 flex flex-col h-screen'>
            <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold '>
                Admin Panel
            </div>

            <nav className='flex-1 px-2 py-4 space-y-2'>
                <NavLink
                    to={'/admin'}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <LayoutDashboard className='mr-2' />
                    Dashboard
                </NavLink>

                <NavLink
                    to={'manage'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <UserRoundCog className='mr-2' />
                    Manage
                </NavLink>


                <NavLink
                    to={'category'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <LayoutList className='mr-2' />
                    Category
                </NavLink>


                <NavLink
                    to={'product'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }
                >
                    <ShoppingBasket className='mr-2' />
                    Product
                </NavLink>


                <NavLink
                    to={'orders'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }>
                    <ClipboardList className='mr-2' />
                    Orders
                </NavLink>




            </nav>


            <div className='hover:bg-gray-900 mx-2 px-3 p-4 rounded-md'>
                <button
                    onClick={() => logout()}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    }>

                    <Link to={'/'} className='flex'>

                        <LogOut className='mx-2'/>
                        Logout
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default SidebarAdmin