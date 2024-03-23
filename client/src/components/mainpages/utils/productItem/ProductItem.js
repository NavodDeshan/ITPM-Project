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

        <div className="bg-white rounded-lg shadow-md ml-4 mr-4 p-6">
            {isAdmin && (
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-purple-600"
                    checked={product.checked}
                    onChange={() => handleCheck(product._id)}
                />
            )}
            <FaRegFilePdf className=" text-black mx-auto w-64 h-64 object-contain" /> 


            <div className="text-center mt-6">
            
                <p className="text-gray-600">{product.description}</p>
                {/* Download button */}
            
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4" onClick={handleDownload}>
                    Download
                </button>
            
            </div>


            <BtnRender product={product} deleteProduct={deleteProduct} className="bg-purple-500 text-slate-950" />

            
        </div>
    );
}

export default ProductItem;