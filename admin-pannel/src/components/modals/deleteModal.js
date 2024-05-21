import React from "react";

export const DeleteModal = ({ isOpen, onClose, handleDelete, productId }) => {
  return (
    <>
      {isOpen && (
        <div className="flex justify-center h-screen w-[83vw] md:w-[80vw]  top-0 fixed items-center bg-[rgb(0 0 0 / 56%)]">
          <div className="modal bg-neutral-900 w-72 z-10 rounded-md h-36 text-center ">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <div className=" text-white">
                Do you want to delete the product
              </div>
              <div className="flex gap-4 text-cyan-700 ml-8 mt-6">
                <button
                  className=" bg-lime-600 p-2 text-white"
                  onClick={() => {
                    handleDelete(productId);
                    console.log(productId);
                  }}
                >
                  Confirm Delete
                </button>
                <button
                  className=" bg-red-600 p-2 text-white"
                  onClick={onClose}
                >
                  {" "}
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
