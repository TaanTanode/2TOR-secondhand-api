import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../utils/number';

const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)


    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])

    const [price, setPrice] = useState([1000, 30000])
    const [ok, setOk] = useState(false)


    // console.log(categories)
    useEffect(() => {
        getCategory()
    }, [])



    // step 1 search text
    // console.log(text)
    useEffect(() => {
        const delay = setTimeout(() => {


            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)
        return () => clearTimeout(delay)
    }, [text])

    // step 2 search by category
    const handleCheck = (e) => {
        // console.log(e.target.value)
        const inCheck = e.target.value //ค่าที่เรา ติ๊ก
        const inState = [...categorySelected] // []
        const findCheck = inState.indexOf(inCheck) // ถ้าไม่เจอจะ return -1 

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)


        if (inState > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }

    }
    // console.log(categorySelected)

    //step 3 search by price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        console.log(value)
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }



    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Search Product</h1>
            {/* Search by Text */}
            <input
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='search...'
                className='border rounded-md w-full mb-4 px-2 text-xl'
            />
            <hr />
            {/* Search by category */}
            <div className='py-4'>
                <h1 className='text-xl font-bold'>Category</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div className='flex gap-2 text-xl'>
                                <input
                                    onChange={handleCheck}
                                    value={item.id}
                                    type='checkbox' />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
            {/* search by price */}
            <div className='py-4'>
                <h1 className='text-xl font-bold'>Price Range</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min : {numberFormat(price[0])}</span>
                        <span>Max : {numberFormat(price[1])}</span>
                    </div>
                    <Slider
                        onChange={handlePrice}
                        range
                        min={0}
                        max={100000}
                        defauktValue={[1000, 30000]}
                    />

                </div>
            </div>

        </div>
    )
}

export default SearchCard