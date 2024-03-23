import React from 'react';
import BtnRender from './BtnRender';
import { FaRegFilePdf } from "react-icons/fa";

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {
    const handleDownload = () => {
        // Handle download logic here
        // For example, you can create a link with the product's file URL
        window.open(product.images.url, '_blank');
      };

    return (
        <div className='flex items-center justify-center p-4 grid-cols-5'>
            <div className="bg-white rounded-lg flex mb-1  px-3 w-screen">
                {isAdmin && (
                    <input
                        type="checkbox"
                        className="form-checkbox flex items-center justify-center text-purple-600"
                        checked={product.checked}
                        onChange={() => handleCheck(product._id)}
                    />
                )}
                <div>
                <FaRegFilePdf className="flex text-black p-4 w-24 h-24  " /> 
                </div>
               
                
                <div className="  ml-10 mt-6  flex">
                    <p className="text-gray-600">{product.product_id}</p>
                </div>

                <div className="ml-10 mt-6">
                    <p className="text-gray-600">{product.description}</p>
                </div>
                                  
                 <div className='flex ml-auto'>
                 <div className="flex  items-center">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-5 " onClick={handleDownload}>
                        Download
                    </button>
                    <BtnRender product={product} deleteProduct={deleteProduct} className="bg-purple-500 text-slate-950 p-2" />
                </div>
                 </div>
              
            </div>
        </div>
    );
}

export default ProductItem;