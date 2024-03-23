import { useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// import { useNavigate } from "react-router-dom";

const LeaseDeed = () => {
  // useNavigate = navigate()
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
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
  const [caseInput, setCaseInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const geminiDraft = (newLeaseData) => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyCpXuKG4nlPYHe0XDtRn0iiW32KbPQTt9o"
    );

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DEROGATORY,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_TOXICITY,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_VIOLENCE,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUAL,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_MEDICAL,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      }
    ];

    const callGemini = async (caseDetails) => {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        options: { safetySettings }
      });

      const prompt = `
        You are a Legal AI Assistant.
        template:
This Lease Deed is made on this _ but shall be effective from ————————————————————- for the purposes of payment of rent.
BETWEEN
Mr/Mrs—————————————————————————————-through Authorized Signatory———————————————————, hereinafter referred to as the LESSOR (which expression shall unless excluded by or repugnant to the context include its holding/subsidiary companies as also its successors and assigns) of the First Part.
AND
Mr/Mrs—————————————————————————————-, through Authorized Signatory———————————————————- hereinafter called the LESSEE) which expression unless repugnant to the context herein includes its holding/subsidiary, associate companies, group companies as also its successors and assigns) of the SECOND PART.
WHEREAS THE LESSOR is absolutely seized and possessed of or otherwise well & sufficiently owner of the residential House No.—————————- consisting of —————————————————————————— and fittings & fixtures as per detail in Annexure 1( hereinafter referred to as the DEMISED PREMISES).
AND WHEREAS, the LESSE has approached the LESSOR for taking on lease the demised premises for a term of 2 years in respect of the said demised premises at House No—————————————————————— for residential purposes of the LESSEE and for the executives of its Associates, affiliates, Group Companies, subject to the terms and conditions of this Lease Deed.
The LESSOR and the LESSE have agreed to record the terms and conditions of this Lease Deed as stated hereinafter.
NOW THIS LEASE DEED WITNESSETH AS UNDER:
1. The monthly rent for the said premises shall be Rs———————– and such rent shall be payable in advance on or before the 10th day of each calendar month (due date). Failure to make the payment of lease rentals within 10 days from the said due to date shall render the LESSEE liable to pay interest @ 18% p.a. for the delayed period. However, the delay in the payment of the Lease Rental beyond two months shall attract the provision of clause 4 hereof. Income Tax shall be deducted at source as per the prevailing Income Tax Laws and amendments made thereto from time to time. The monthly Lease rental shall be exclusive of all Electricity, Water and Maintenance Charges, which shall be paid directly by the LESSEE to the concerned authorities at actual, including any increase in the costs hereof which may come into effect with time. The Lease rentals shall be paid by way of cheques/pay order and drawn in favor of the LESSOR at Delhi.
2. After the expiry of the lease agreement, the Lessee shall vacate the demised property. However, Lessor may enter into fresh agreement with the Lessee for a mutually agreed term at the prevalent market rates. In the event THE LESSOR decides to renew the lease, fresh Lease Deed shall be made out and registered by parties hereto. In case, the Lease is not renewed as contemplated herein, LESSEE shall handover the vacant, peaceful and physical possession of the DEMANDED PREMISES to the LESSOR and the LESSOR shall refund the security deposit to the LESSEE forthwith. In case, the Lease is not renewed and the LESSEE does not handover the vacant physical possession of the DEMISED PREMISES to the LESSOR, lease rent———————————————————————————————–per day will be charged by the LESSOR from the LESSEE for the period of default.
3. LESSEE had paid an amount equivalent to (Six) months Lease rentals of Rs.————————- vide Cheque No.————– dated———— as refundable security deposit free of interest to the LESSOR which money is still with the LESSOR and shall be retained by him pursuant to the extension of the present lease deed. The LESSOR shall refund the security deposit to the LESSEE forthwith on the expiry of the term of this assignment or extended agreement or earlier vacation/ termination of this lease and physical possession of the DEMISED PREMISES in original shape and condition subject to normal wear and tear. It is clearly understood that the security deposit is being paid to ensure compliance with the terms & conditions contained herein on the part of the LESSEE. If the LESSOR fails to refund the Security Deposit at such time then the LESSE shall be entitled to interest at the rate of 18% from the date of such failure till its actual realization and the LESSEE shall continue with the possession of the premises without payment of rent till the amount of such security deposit is repaid by the LESSOR.
4. That in the event the LESSE defaults in the payment of monthly Lease rentals for a continuous period of Two Months (2 months) due to any reasons whatsoever it shall constitute the breach of this Lease Deed and, the LESSOR shall give a Registered A.D. Notice/ Letter to the LESSEE. The LESSEE shall make necessary payments, within 30 (Thirty) days of the receipt of said Registered A.D. Notice/ Letter along with interest at the rate of 18% p.a. on the delayed period in terms of Clause (2) hereof. But in case the LESSEE does not make the payment within the stipulated time, the LESSOR shall have the absolute right to terminate the Lease and re-enter the premises without any further notice. It is further agreed that on account of non-payment of the rent as mentioned above, the LESSEE will not only cease to have any rights in the DEMISED PREMISES but will also become a trespasser and the LESSOR shall be entitled to proceed against the LESSEE and evict then the DEMISED PREMISES as a trespasser.
5. The LESSEE shall use the DEMISED PREMISES for residential use only and in no case its business shall be conducted from the DEMISED PRMISES. The LESSEE shall use the DEMISED PREMISES as per the relevant laws. The LESSEE shall not do or suffer to be done in the DEMISED PREMISES anything, which may be or become a nuisance, annoyance or cause damage or inconvenience to the other occupants/owners of Golf Links, New Delhi. In case of any beach on the part of the LESSEE the entire risk and responsibility including any legal proceedings of the consequences of the same shall be entirely of the LESSEE to the exclusion of the LESSOR.
6. That the LESSEE shall not sublet, assign or otherwise part with the possession of the DEMISED PREMISES on any account whatsoever.
7. The LESSOR shall have the right to carry out interiors and furnishing without making any structural alterations, however, but with the prior approval of the LESSOR. At the expiration or earlier termination of the Lease Agreement, the LESSEE shall have the right to take back any and all furnishings they have installed. The LESSEE shall obtain all statutory/requisite permissions as may be applicable for installations and operation of all its equipment installed in the DEMISED PREMISES.
8. The LESSEE shall be entitled to obtain at its cost (if so required) sanction for additional load of electricity/ power provided however it shall ensure that the existing electrical installations are not damaged or affected.
9. That the LESSEE shall permit LESSOR or its duly authorized representative upon reasonable prior notice in writing to enter the DEMISED PREMISES at reasonable hours, for the purpose of inspection and/or carrying out any required structural repair works whenever it is necessary at a mutually agreed time. It is agreed and acknowledged by the LESSOR that such repairs will be performed in such a manned so as not to cause any inconvenience or disturbance to the LESSEE.
10. The LESSEE shall pay all charges for the Electricity and Water on the basis of Meters installed in the DEMISED PREMISES from the effective date of start of Lease as and when the LESSEE received bills/invoices from the concerned authority. Such bills when received by the LESSEE shall be deposited within the due date to the concerned authorities. Any damage done to the meters/ or meter getting burnt due to extra load/misuse by the LESSEE, shall be the sole responsibility of the LESSEE and the LESSEE hereby undertakes to get the same changed/rectified at its own cost and efforts. The LESSOR shall pay all previous electricity & meter charges up to the effective date of start of Lease.
11. That the LESSEE shall maintain the DEMISED PREMISES, in good condition and that on expiry of this Lease Deed, as the case may be, the LESSEE shall remove, forthwith all that belongs to the LESSEE and the fixtures/fittings installed their in the same conditions as the same were at the commencement of this LEASE Deed subject to normal wear and tear.
12. That the LESSEE shall be entitled to peaceful and uninterrupted use of the DEMISED PREMISES during the terms of Lease period, free from any interference, interruption or objection whatsoever claiming through and on behalf of the LESSOR. The LESSOR shall indemnify to the LESSEE in case it is found that the said demised premises is not free from all encumbrances, restrictive orders, injunctive and Les Pendence proceedings and against all and any costs, expenses, charges, out going damages and risk at all times arising from any suit, eviction, action, claim or demand whatsoever in relation to the titles of the property, to the extent of losses suffered by the LESSOR and against all covenants, representations and warranties made and agreed by the LESSOR. The LESSOR hereby assures the LESSEE that it will extend its utmost co-operation occupation in the DEMISED PREMISES during the Lease period subject to the terms and conditions as contained herein.
13. That all the applicable taxes or levies including Property Tax or any other charges on the property (except for Service Tax on Lease Rentals) payable to Government or municipal authority shall be responsibility of the LESSOR and shall be regularly paid by he LESSOR so as not to cause any interference or disturbance in the possession or enjoyment of the DEMISED PREMISES by the LESSEE.
14. That the LESSEE shall be entitled to install and use of telephones and other equipment in the DEMISED PREMISES as may be convenient to the LESSEE, but the LESSEE alone shall be responsible for all charges thereof. The LESSOR shall assist and co-operate with the LESSEE in obtaining telephone connections if required.
15. All day to day repairs, such as fuses, leakage of taps, replacement of glass panes and such other minor repairs shall be made by the LESSEE at its own cost. However, all major and structural repairs such as seepages on walls, cracks in the structure, replacement of hidden sanitary pipes shall be undertaken by LESSORS at its own cost and expenses, PROVIDED the same are not caused by the LESSEES commissions/ omissions and misuse. Such major and structural repairs shall be carried out by the LESSOR within 15 days of receiving a notice in writing for the same form the LESSEE. However, in case the LESSOR fails to remedy the said repairs within the stipulated time, then the LESSEE shall be entitled to remedy the said repairs and recover the amount spent form the rent payable to the LESSEE.
16. That if any time during the Lease Period, DEMISED PREMISES are destroyed or damaged or any other means so as to become unfit for use, occupation and habitation then the rent hereby reserved or a fair and just proportion thereof according to he nature and extent of the damage sustained shall be suspended and cease to be payable until the DEMISED PREMISES shall have been again rendered fit for use, occupation and habitation PROVIDED that this agreement shall be without prejudice to all other rights and remedies to which the LESSEE is or may be entitled by statute or otherwise including the right to terminate this Lease which the LESSEE hereby expressly reserves. However in case the DEMISED PREMISES remains unfit for use, occupation and habitation for a period exceeding 12 weeks then it would be open to the Lessee to terminate this agreement without notice.
17. That the present lease may be terminated by the LESSEE at any time upon serving a notice of three months but subject at all times to the obligation of the LESSEE to pay monthly rent for a minimum period of 12 months (lock-in-period) from the date of execution of this lease including the notice period on the terms and conditions as contained herein. In the event of the LESSEE opting for vacating the DEMISED PREMISES at any time prior to expiry of 12 months from the date of commencement of this Lease, rentals for the balance un-expired stipulated Lock-in-period of 12 months from the date of commencement of this lease shall be payable by the LESSEE to the LESSOR. In such a situation, if the LESSEE demanded refund of Interest Free Security Deposit, the Lessor shall be entitled to deduct outstanding Lease rentals from the Interest Free Security Deposit for the balance/ unexpired Lock-in-period.
18. That any notice required to be served upon the LESSEE shall be sufficiently served and given if delivered to it at the address first given above, or such other address as may by communicated later on for the purpose. That any notice required to be served upon the LESSOR shall be sufficiently served and given if delivered to it at the address first given above, or such other address as any be communicated later on for the purpose.
19. The LESSOR and the LESSEE represent that they are fully authorized empowered and competent to execute this LEASE DEED and the LESSOR shall hold the LESSEE free and harmless of any demands, claims, actions or proceedings by other in respect of peaceful possession of the premises.
20. The Lease Deed shall be made and executed in original on stamp paper and the same shall be registered as required by law. The expenses and costs including the stamp duty shall be borne by the LESSEE. The LESSOR and LESSEE have agreed that original lease deed will remain with the LESSEE and a true certified copy will be with LESSOR.
21. That any dispute arising between the LESSOR and LESSEE with regards to the terms and conditions hereof or their interpretation shall have the jurisdiction of the courts of——————-Only, if the same remain unresolved in the Arbitration proceedings to be conducted in accordance with the provisions of Arbitration proceedings to be conducted in accordance with the provisions of Arbitration and Conciliation Act, 1996 and any amendments made thereto.
22. No modifications or amendments to the terms and conditions of this Lease Deed shall be valid or binding unless made in writing and duly executed by both Parties.
IN WITNESS WHEREOF THE PARTIES HERETO HAVE EXECUTED THESE PRESENTS, THE DATE, MONTH AND YEAR
WHICH IS WRITTEN BEFORE
WITNESSES:
1.
2.


json with input values:`+ caseDetails + `



fill in the values from json at appropriate places in the template to give a proper agreement
strictly keep the format from the template
        `;

      console.log("calling gemini\n" + prompt)

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setApiData(text.toString()); // Ensure apiData is a string
      setLoading(false);
      // navigate("/createdTemplate")
    };
  }

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

    setApiData(geminiDraft(newLeaseData))
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
