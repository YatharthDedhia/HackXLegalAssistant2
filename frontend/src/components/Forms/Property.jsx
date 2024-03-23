import { useState } from "react";
const Property = () => {
    const [propertyData, setPropertyData] = useState({
        partyNo1Name: '',
        partyNo2Name: '',
        partyNo1Address: '',
        partyNo2Address: '',
        totalSaleConsideration: '',
        bankChequeNo: '',
        bankChequeDate: '',
        indemnityAmount: '',
        additionalTerms: '',
        witness1: '',
        witness2: '',
      });
    
      const [PropertyData, setPropertyDataArray] = useState([]); // Array to store submitted data
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Property Agreement Data submitted:', propertyData);
    
        // Push the submitted data into the PropertyData array
        setPropertyDataArray([...PropertyData, propertyData]);
    
        // Reset the form fields after submission
        setPropertyData({
          partyNo1Name: '',
          partyNo2Name: '',
          partyNo1Address: '',
          partyNo2Address: '',
          totalSaleConsideration: '',
          bankChequeNo: '',
          bankChequeDate: '',
          indemnityAmount: '',
          additionalTerms: '',
          witness1: '',
          witness2: '',
        });
      };
  
    return ( 
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="partyNo1Name">Party No.1 Name:</label>
          <input
            type="text"
            id="partyNo1Name"
            name="partyNo1Name"
            value={propertyData.partyNo1Name}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="partyNo2Name">Party No.2 Name:</label>
          <input
            type="text"
            id="partyNo2Name"
            name="partyNo2Name"
            value={propertyData.partyNo2Name}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="partyNo1Address">Party No.1 Address:</label>
          <textarea
            id="partyNo1Address"
            name="partyNo1Address"
            value={propertyData.partyNo1Address}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="partyNo2Address">Party No.2 Address:</label>
          <textarea
            id="partyNo2Address"
            name="partyNo2Address"
            value={propertyData.partyNo2Address}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="totalSaleConsideration">Total Sale Consideration:</label>
          <input
            type="text"
            id="totalSaleConsideration"
            name="totalSaleConsideration"
            value={propertyData.totalSaleConsideration}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bankChequeNo">Bank Cheque No.:</label>
          <input
            type="text"
            id="bankChequeNo"
            name="bankChequeNo"
            value={propertyData.bankChequeNo}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bankChequeDate">Bank Cheque Date:</label>
          <input
            type="date"
            id="bankChequeDate"
            name="bankChequeDate"
            value={propertyData.bankChequeDate}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="indemnityAmount">Indemnity Amount:</label>
          <input
            type="text"
            id="indemnityAmount"
            name="indemnityAmount"
            value={propertyData.indemnityAmount}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="additionalTerms">Additional Terms:</label>
          <textarea
            id="additionalTerms"
            name="additionalTerms"
            value={propertyData.additionalTerms}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="witness1">Witness 1:</label>
          <input
            type="text"
            id="witness1"
            name="witness1"
            value={propertyData.witness1}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="witness2">Witness 2:</label>
          <input
            type="text"
            id="witness2"
            name="witness2"
            value={propertyData.witness2}
            onChange={handleChange}
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>  
        
        <button type="submit">Submit Property Agreement</button>
      </form>
     );
}
 
export default Property;