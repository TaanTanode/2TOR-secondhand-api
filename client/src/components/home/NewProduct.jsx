import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/product';
import ProductCard from '../card/ProductCard'

const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('updatedAt', 'desc', 15)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='flex flex-wrap gap-4 justify-center'>
            {
                data?.map((item, index) =>
                    <ProductCard item={item} key={index}
                    />
                )
            }
        </div>
    )
}

export default NewProduct