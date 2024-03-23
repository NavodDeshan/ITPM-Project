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
        <div className='flex items-center justify-center'>
            <div className="bg-white rounded-lg flex w-10/12 mb-1 items-center justify-center px-3">
                {isAdmin && (
                    <input
                        type="checkbox"
                        className="form-checkbox flex items-center justify-center text-purple-600"
                        checked={product.checked}
                        onChange={() => handleCheck(product._id)}
                    />
                )}
                <FaRegFilePdf className="flex text-black p-4 w-24 h-24  " /> 

                <div className="  ml-40 mt-6 w-full flex">
                    <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="flex justify-between items-center w-full mt-4 ml-96">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg " onClick={handleDownload}>
                        Download
                    </button>
                    <BtnRender product={product} deleteProduct={deleteProduct} className="bg-purple-500 text-slate-950 p-2" />
                </div>
            </div>
        </div>
    );
}

export default ProductItem;