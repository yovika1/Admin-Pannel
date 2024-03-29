import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import axios from "axios";
// import { useParams } from "react-router";

export const UpdateDetails = ({ isOpen, onClose, product, onSubmit }) => {
  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState([]);
  console.log(product._id);
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const [updatedValue, setUpdatedValue] = useState({
    productTitle: "",
    quantity: "",
    productBrief: "",
    price: "",
    discount: "",
  });

  const handleSizeChange = (size, e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const htmlValue = editorValue.toString("html");
      const response = await axios.put("http://localhost:8000/updateProduct", {
        ...updatedValue,
        productBrief: htmlValue,
        sizes: selectedSizes,
        id: product._id,
      });
      console.log(response);
      if (setUpdatedValue) {
        alert('added sucessfully')
      } else {
        alert('something problem while added')
      }
      onClose();
      onSubmit(response.data);
      console.log(response);
    } catch (error) {
      error && console.log(error);
    }
  };

  const handleChange = (e) => {
    setUpdatedValue({ ...updatedValue, [e.target.name]: e.target.value });
   
  };

  useEffect(() => {
    setUpdatedValue({
      productTitle: product.productTitle,
      quantity: product.quantity,
      productBrief: product.productBrief,
      price: product.price,
      discount: product.discount,
    });
    setEditorValue(
      RichTextEditor.createValueFromString(product.productBrief, "html")
    );

    
  }, [product]);

  return (
    <>
      {isOpen && (
        <div
          id="crud-modal"
          className="modal-container -mt-[600px] ml-[650px] sm:min-w-screen "
        >
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Product
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={onClose}
                  >
                    &times;
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form className="p-4" onSubmit={handleUpdate}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        ProductTitle
                      </label>
                      <input
                        type="text"
                        name="productTitle"
                        id="name"
                        className="input-field"
                        placeholder="Type product name"
                        onChange={(e) => handleChange(e)}
                        value={updatedValue.productTitle}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={updatedValue.discount}
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                        placeholder="10"
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={updatedValue.price}
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                        placeholder="$2999"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 ">
                      <label className="block mb-2 font-semibold">
                        Select Size
                      </label>
                      <div>
                        {availableSizes.map((size) => (
                          <label
                            key={size}
                            htmlFor={`size${size}`}
                            className="mr-2 text-gray-400 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={`sizes${size}`}
                              value={updatedValue.sizes}
                              checked={selectedSizes.includes(size)}
                              onChange={(e) => handleSizeChange(size, e)}
                            />
                            {size}
                          </label>
                        ))}
                      </div>

                      <p className="mt-2 text-slate-600">
                        Selected Sizes: {selectedSizes.join(", ")}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Product Description
                      </label>
                      <RichTextEditor
                        value={editorValue}
                        onChange={setEditorValue}
                      />
                    </div>
                  </div>
                  <button type="submit" className="submit-button">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
