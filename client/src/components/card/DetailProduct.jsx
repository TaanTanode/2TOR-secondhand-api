import { useParams } from 'react-router-dom';
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from '../../utils/number';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import NewProduct from '../../components/home/NewProduct'
import CartCard from './CartCard';
import { Link } from 'react-router-dom'

const DetailProduct = () => {
  const { id } = useParams();
  const products = useEcomStore((state) => state.products);
  const product = products.find((p) => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  const carts = useEcomStore((state) => state.carts)
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  const actionAddtocart = useEcomStore((state) => state.actionAddtoCart);

  if (!product) {
    return <h1 className="text-center text-2xl font-bold">No Product</h1>;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div>
      <div className='flex '>


        <div className="w-2/3 max-w-5xl mx-auto flex p-6 gap-6 bg-gray-100 rounded-md mt-10 mb-10">
          {/* รูปสินค้า (อยู่ซ้าย) */}
          <div className="w-1/2 relative">
            {product.images?.length > 0 ? (
              <>
                <img
                  src={product.images[currentImage].url}
                  alt={product.title}
                  className="w-full h-[400px] object-cover rounded-md shadow-md"
                />

                {/* ปุ่ม Previous (ซ้าย) */}
                {product.images.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* ปุ่ม Next (ขวา) */}
                {product.images.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                    <ChevronRight size={24} />
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-md">
                No Image
              </div>
            )}
          </div>

          {/* รายละเอียดสินค้า (อยู่ขวา) */}
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-lg text-gray-700 mt-2">{product.description}</p>

            {/* จำนวนคงเหลือ */}
            <p className="text-md font-semibold mt-2">stock: {product.quantity}</p>

            <p className="text-2xl font-bold text-gray-500 mt-4">
              ฿{numberFormat(product.price)}
            </p>
            <button
              onClick={() => actionAddtocart(product)}
              className='bg-black rounded-md p-2 hover:bg-gray-700 shadow-md w-11 mt-10'>
              <ShoppingCart className='text-white' />
            </button>
          </div>

        </div>
        <div className='w-1/3'>
          <div>
            <h1 className='text-2xl font-bold'>Product Cart</h1>
            {/* border */}
            <div className='border p-2'>
              {/* Card */}

              {carts.map((product, index) => (
                <div key={index} className='bg-white p-2 rounded-md shadow-md mb-2'>
                  {/* Row 1 */}
                  <div className='flex justify-between mb-2'>
                    {/* left */}
                    <div className='flex gap-2 items-center'>

                      {
                        product.images && product.images.length > 0
                          ? <img
                            className='w-16 h-16 rounded-md'
                            src={product.images[0].url} />
                          : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                            No Image
                          </div>
                      }
                      <div>
                        <p className='font-bold'>{product.title}</p>
                        <p className='text-sm'>{product.description}</p>
                      </div>
                    </div>
                    {/* right */}
                    <div
                      onClick={() => actionRemoveProduct(product.id)}
                      className='text-red-500 p-2 '>
                      <Trash2 />
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className='flex justify-between'>
                    {/* left */}
                    <div className='border rounded-sm px-2 py-1 flex items-center'>
                      <button
                        onClick={() => actionUpdateQuantity(product.id, product.count - 1)}
                        className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-400'>
                        <Minus size={16} />
                      </button>

                      <span className='px-4'>{product.count}</span>

                      <button
                        onClick={() => actionUpdateQuantity(product.id, product.count + 1)}
                        className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-400'>
                        <Plus size={16} />
                      </button>
                    </div>
                    {/* right */}
                    <div className='font-bold text-blue-500'>
                      ฿{numberFormat(product.price * product.count)}
                    </div>
                  </div>
                </div>
              ))
              }
              {/* total */}
              <div className='flex justify-between px-2'>
                <span>รวม</span>
                <span>฿{numberFormat(getTotalPrice())}</span>
              </div>
              {/* Button */}
              <Link to='/cart'>
                <button className='mt-4 bg-red-600 hover:bg-red-700
                 text-white w-full py-2 rounded-md shadow-md'>
                  ดำเนินการชำระเงิน
                </button>
              </Link>

            </div>


          </div>
        </div>
      </div>

      <div>
        <NewProduct />
      </div>
    </div>

  );
};

export default DetailProduct;


















