import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'


const initialState = {
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": '',
    "images": []
}

const FromProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categorie = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState({
        "title": "",
        "description": "",
        "price": 0,
        "quantity": 0,
        "categoryId": '',
        "images": []
    })



    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])



    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(initialState)
            getProduct()
            toast.success(`Add ${res.data.title} Success`)

        } catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (id) => {

        if (window.confirm('Do you want to delete')) {
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.success('Deleted Success')
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>Add Product Information</h1>
                <input
                    className='border'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input
                    className='border'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input
                    type='number'
                    className='border'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='Price'
                    name='price'
                />
                <input
                    type='number'
                    className='border'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='Quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled >Please Select</option>
                    {
                        categorie.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }

                </select>
                <hr />
                {/* Upload file*/}
                <Uploadfile form={form} setForm={setForm} />


                <button className='bg-blue-500 p-2 rounded-md shadow-md
                hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                    Add Product
                </button>

                <hr />
                <br />
                <table className="table w-full border text-center items-center">
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th scope="col">No.</th>
                            <th scope="col">Picture</th>
                            <th scope="col">name of product</th>
                            <th scope="col">detail</th>
                            <th scope="col">price</th>
                            <th scope="col">quantity</th>
                            <th scope="col">sold</th>
                            <th scope="col">Update at</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>

                                        <td className='place-items-center text-center'>
                                            {
                                                item.images.length > 0
                                                    ? <img
                                                        className='w-24 h-24 rounded-lg shadow-md'
                                                        src={item.images[0].url} />
                                                    : <div
                                                        className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm'
                                                    >No Image</div>
                                            }
                                        </td>

                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{dateFormat(item.updatedAt)}</td>
                                        <td className='flex gap-2 p-5 justify-center'>
                                            <p className='bg-yellow-500 rounded-md p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200 shadow-md'>
                                                <Link to={'/admin/product/' + item.id}>
                                                    <Pencil />
                                                </Link>
                                            </p>
                                            <p
                                                className='bg-red-500 rounded-md p-1 hover:scale-105 hover:-translate-y-1 hover:duration-200 shadow-md'
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 />
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>


            </form>
        </div>
    )
}

export default FromProduct