import { useState } from "react";

const LeaseDeed = () => {
  const [leaseData, setLeaseData] = useState([]);
  const [formData, setFormData] = useState({
    lessorName: "",
    lessorAuthorizedSignatory: "",
    lesseeName: "",
    lesseeAuthorizedSignatory: "",
    monthlyRent: "",
    securityDeposit: "",
    duration: "",
    terminationNoticePeriod: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    Agreement_Date: "", // New parameter
    Lease_StartDate: "", // New parameter
    Witness1: "", // New parameter
    Witness2: "", // New parameter
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeaseData = [...leaseData, formData];
    setLeaseData(newLeaseData);
    console.log("Lease Data submitted:", formData);
    console.log("Lease Data array:", newLeaseData);
    setFormData({
      lessorName: "",
      lessorAuthorizedSignatory: "",
      lesseeName: "",
      lesseeAuthorizedSignatory: "",
      monthlyRent: "",
      securityDeposit: "",
      duration: "",
      terminationNoticePeriod: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      Agreement_Date: "", // New parameter
      Lease_StartDate: "", // New parameter
      Witness1: "", // New parameter
      Witness2: "", // New parameter
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="lessorName">Lessor's Name:</label>
        <input
          type="text"
          id="lessorName"
          name="lessorName"
          value={leaseData.lessorName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lessorAuthorizedSignatory">
          Lessor's Authorized Signatory:
        </label>
        <input
          type="text"
          id="lessorAuthorizedSignatory"
          name="lessorAuthorizedSignatory"
          value={leaseData.lessorAuthorizedSignatory}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lesseeName">Lessee's Name:</label>
        <input
          type="text"
          id="lesseeName"
          name="lesseeName"
          value={leaseData.lesseeName}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lesseeAuthorizedSignatory">
          Lessee's Authorized Signatory:
        </label>
        <input
          type="text"
          id="lesseeAuthorizedSignatory"
          name="lesseeAuthorizedSignatory"
          value={leaseData.lesseeAuthorizedSignatory}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>



      <div>
        <label htmlFor="monthlyRent">Monthly Rent:</label>
        <input
          type="number"
          id="monthlyRent"
          name="monthlyRent"
          value={leaseData.monthlyRent}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="securityDeposit">Security Deposit:</label>
        <input
          type="number"
          id="securityDeposit"
          name="securityDeposit"
          value={leaseData.securityDeposit}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="duration">Duration (in months):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={leaseData.duration}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="terminationNoticePeriod">
          Termination Notice Period:
        </label>
        <input
          type="number"
          id="terminationNoticePeriod"
          name="terminationNoticePeriod"
          value={leaseData.terminationNoticePeriod}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={leaseData.address}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={leaseData.city}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={leaseData.state}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={leaseData.pincode}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="Agreement_Date">Agreement Date:</label>
        <input
          type="date"
          id="Agreement_Date"
          name="Agreement_Date"
          value={leaseData.Agreement_Date}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="Lease_StartDate">Lease Start Date:</label>
        <input
          type="date"
          id="Lease_StartDate"
          name="Lease_StartDate"
          value={leaseData.Lease_StartDate}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="Witness1">Witness 1:</label>
        <input
          type="text"
          id="Witness1"
          name="Witness1"
          value={leaseData.Witness1}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="Witness2">Witness 2:</label>
        <input
          type="text"
          id="Witness2"
          name="Witness2"
          value={leaseData.Witness2}
          onChange={handleChange}
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LeaseDeed;
