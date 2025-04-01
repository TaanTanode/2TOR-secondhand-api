import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  //javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log('user from zustand', user)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success('Welcome Back')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }

  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }


  return (
    <div className='min-h-screen flex 
    items-center justify-center bg-gray-100 '>
      <div className='w-full shadow-md bg-white p-8 max-w-md'>


        <h1 className='text-2xl text-center my-4 font-bold '>
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>

            <input
              placeholder='Email'
              className='border w-full px-3 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-black
            focus:border-transparent'
              onChange={handleOnChange}
              name='email'
              type='email'
            />

            <input
              placeholder='Password'
              className='border w-full px-3 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-black
            focus:border-transparent'
              onChange={handleOnChange}
              name='password'
              type='password'
            />

            <Link 
            to={'/register'}
            className='w-full text-gray-500 text-sm
             hover:text-gray-300 hover:duration-200 p-4
            '>
              Forget password?
            </Link>

            <button className='bg-black rounded-md w-full text-white py-2 font-bold
            shadow-md hover:bg-gray-200 hover:text-black hover:duration-200
            '>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login