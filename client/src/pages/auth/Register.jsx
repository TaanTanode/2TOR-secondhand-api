import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid Email!!!' }),
  password: z.string().min(8, { message: "Password must more than 8" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password is not match',
  path: ["confirmPassword"]
})

const Register = () => {
  //javascript
  const [passwordScore, setPasswordScore] = useState(0)



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })


  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }
  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  // const taan = Array.from(Array(5))
  // console.log(taan)

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // if(passwordScore<2){
    //   toast.warning('Password not strong')
    //   return 
    // }
    // console.log('Ok')
    try {
      const res = await axios.post('http://localhost:5000/api/register', data)
      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  console.log(passwordScore)
  return (
    <div className='min-h-screen flex 
    items-center justify-center bg-gray-100 '>


      <div className='w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl text-center my-4 font-bold '>
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>


            <div>
              <input {...register("email")}
                placeholder='Email'
                className={`border w-full px-3 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-black
            focus:border-transparent
            ${errors.email && 'border-red-500'}`} />
              {
                errors.email &&
                <p className='text-red-500 text-sm'>
                  {errors.email.message}
                </p>
              }
            </div>

            <div>
              <input {...register("password")}
                placeholder="Password"
                type='password'
                className={`border w-full px-3 py-2 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black
                focus:border-transparent
                ${errors.password && 'border-red-500'}`} />
              {
                errors.password &&
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              }

              {
                watch().password?.length > 0 && <div className='flex  mt-2'>
                  {
                    Array.from(Array(5).keys()).map((item, index) =>
                      <span className='w-1/5 px-1' key={index}>
                        <div className={`rounded-full h-2 ${passwordScore <= 2
                          ? 'bg-red-500'
                          : passwordScore < 4
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          }`
                        }>

                        </div>
                      </span>
                    )
                  }
                </div>

              }
            </div>




            <div>
              
              <input {...register("confirmPassword")} 
              type='password'
              placeholder='Confirm Password'
              className={`border w-full px-3 py-2 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black
                focus:border-transparent
                ${errors.confirmPassword && 'border-red-500'}`} />
              {
                errors.confirmPassword &&
                <p className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </p>
              }
            </div>



            <button className='bg-black rounded-md w-full text-white py-2 font-bold
            shadow-md hover:bg-gray-200 hover:text-black hover:duration-200
            '>
              Register
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Register