import React from 'react'

export const CategoryModal = ({ iisOpen, onCloseModal, categoryProduct, onSave }) => {
  return (
 
<>
{iisOpen && (
        <div
          id="crud-modal"
          className="modal-container -mt-56 ml-[650px] sm:min-w-screen "
        >
          <div className="modal-content">
            
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                   Add Product
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={onCloseModal}
                  >
                    &times;
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form className="p-4" 
                onSubmit={onSave}
                >
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
                       
                      />
                    </div>
                    <div className=' truncate' >
                      <label
                      htmlFor='name'
                      className='block mb-2 text-sm font-medium text-gray-900 '>
                        Add Images
                      </label>
                      <input
                      type='file'
                      name=''
                      id=''
                      className='input-field text-ellipsis'
                      placeholder='add images'
                      />
                    </div>


                  </div>
                  <button type="submit" className="submit-button"
                  onClick={()=>{
                    categoryProduct(onSave)
                    console.log(categoryProduct)
                  }}
                  >
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

