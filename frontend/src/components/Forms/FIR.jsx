import { useState } from "react";
const FIR = () => {
    const [formData, setFormData] = useState({
        policeStation: '',
        crimeDate: '',
        crimeTime: '',
        crimePlace: '',
        crimeNature: '',
        crimeModeOfCommission: '',
        criminalName: '',
        criminalAddress: '',
        criminalContactNumber: '',
        complainantName: '',
        complainantAddress: '',
        complainantContactNumber: '',
      });
    
      const [firArray, setFIRArray] = useState([]);
      const [FIRdata, setFIRData] = useState([]); // Array to store submitted FIR data
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFIRArray([...firArray, formData]);
        setFIRData([...FIRdata, formData]); // Store the submitted FIR data in FIRdata array
        console.log('Form submitted:', formData);
      };
    return ( 
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="policeStation">To the Station House Officer, PS:</label>
          <input
            type="text"
            id="policeStation"
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            placeholder="Enter Police Station Name"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="crimeDate">Date of Crime:</label>
          <input
            type="date"
            id="crimeDate"
            name="crimeDate"
            value={formData.crimeDate}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="crimeTime">Time of Crime:</label>
          <input
            type="time"
            id="crimeTime"
            name="crimeTime"
            value={formData.crimeTime}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="crimePlace">Place of Crime:</label>
          <input
            type="text"
            id="crimePlace"
            name="crimePlace"
            value={formData.crimePlace}
            onChange={handleChange}
            placeholder="Enter Place of Crime"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="crimeNature">Nature of Crime:</label>
          <input
            type="text"
            id="crimeNature"
            name="crimeNature"
            value={formData.crimeNature}
            onChange={handleChange}
            placeholder="Enter Nature of Crime"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="crimeModeOfCommission">Mode of Crime Commission:</label>
          <textarea
            id="crimeModeOfCommission"
            name="crimeModeOfCommission"
            value={formData.crimeModeOfCommission}
            onChange={handleChange}
            placeholder="Describe the mode of crime commission and attach any proof or documents."
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="criminalName">Name of the Person Who Committed the Crime:</label>
          <input
            type="text"
            id="criminalName"
            name="criminalName"
            value={formData.criminalName}
            onChange={handleChange}
            placeholder="Enter Criminal's Name"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="criminalAddress">Address of the Person Who Committed the Crime:</label>
          <input
            type="text"
            id="criminalAddress"
            name="criminalAddress"
            value={formData.criminalAddress}
            onChange={handleChange}
            placeholder="Enter Criminal's Address"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="criminalContactNumber">Contact Number of the Person Who Committed the Crime:</label>
          <input
            type="tel"
            id="criminalContactNumber"
            name="criminalContactNumber"
            value={formData.criminalContactNumber}
            onChange={handleChange}
            placeholder="Enter Criminal's Contact Number"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="complainantName">Name of the Complainant:</label>
          <input
            type="text"
            id="complainantName"
            name="complainantName"
            value={formData.complainantName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="complainantAddress">Address of the Complainant:</label>
          <input
            type="text"
            id="complainantAddress"
            name="complainantAddress"
            value={formData.complainantAddress}
            onChange={handleChange}
            placeholder="Enter Your Address"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="complainantContactNumber">Contact Number of the Complainant:</label>
          <input
            type="tel"
            id="complainantContactNumber"
            name="complainantContactNumber"
            value={formData.complainantContactNumber}
            onChange={handleChange}
            placeholder="Enter Your Contact Number"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button type="submit">Submit FIR</button>
      </form>
     );
}
 
export default FIR;