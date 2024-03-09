import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAddressModal from "./UpdateAddressModal";
import { toast } from "react-toastify";

const AddressesTable = () => {
  const [addresses, setAddresses] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(10);
  const [totalAddresses, setTotalAddresses] = useState(0);

  // Fetch addresses from the API
  const baseURL = "http://localhost:8000/api/v1/address";
  useEffect(() => {
    fetchAddresses();
  }, [currentPage, addressesPerPage]);
  const totalPages = Math.ceil(totalAddresses / addressesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}?page=${currentPage}&limit=${addressesPerPage}`
      );
      setAddresses(response.data.data); // Adjust based on your API response structure
      setTotalAddresses(response.data.total);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  // Function to handle delete
  const handleDelete = async (address) => {
    setCurrentAddress(address);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  // Function to handle update
  const handleUpdate = (address) => {
    setCurrentAddress(address);
    setIsUpdateModalOpen(true);
  };
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="hidden md:table-cell px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {addresses.map((address) => (
            <tr key={address._id}>
              <td className="px-2 md:px-6 py-4 whitespace-normal md:whitespace-nowrap text-sm text-gray-900">
                {address.street}, {address.city}, {address.state}, {address.zip}
              </td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleUpdate(address)}
                  className="text-green-600 hover:text-green-900 mr-3"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(address)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        address={currentAddress}
        refreshAddresses={fetchAddresses}
      />
      <UpdateAddressModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        address={currentAddress}
        refreshAddresses={fetchAddresses} // Passing fetchAddresses to refresh the list after an update
      />
      <nav className="py-8">
        <ul className="flex pl-0 list-none rounded my-2 justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="mr-3">
              <button
                onClick={() => paginate(index + 1)}
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                  currentPage === index + 1 ? "bg-gray-400" : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AddressesTable;

const DeleteConfirmation = ({ isOpen, onClose, address, refreshAddresses }) => {
  const baseURL = "http://localhost:8000/api/v1/address";
  const handleClick = async () => {
    try {
      const res = await axios.delete(`${baseURL}/${address._id}`); // Adjust this URL to your API endpoint
      // console.log(res);
      toast.success(res.data.message);
      refreshAddresses();
      onClose(); // Refresh the list of addresses after deletion
    } catch (error) {
      // console.error("Error deleting address:", error);
      toast.success(error.data.msg);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Delete Confirmation
                </h3>
                <div>
                  {isOpen && (
                    <div className="mt-4 flex flex-col justify-end">
                      <h3
                        className="text-md leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Are you sure you want to delete this address ?
                      </h3>
                      <p>
                        {address.street}, {address.city}, {address.state},{" "}
                        {address.zip}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={onClose}
                          className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleClick}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
