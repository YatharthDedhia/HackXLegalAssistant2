import ReactDOM from "react-dom";
// import Modal from "react-modal";
import { useState } from "react";
import LeaseDeed from "./Forms/LeaseDeed";
import FIR from "./Forms/FIR";
import NameChange from "./Forms/NameChange";
import Property from "./Forms/Property";
const Template = () => {
  return (
    <div className="templates">
      <div class="grid sm:grid-cols-2 sm:gap-4 sm:h-full p-6 grid-cols-1 h-auto gap-10">
        {/* Lease Deed */}
        <div class="bg-slate-200 p-4 h-80 hover:shadow-xl rounded-xl flex flex-col gap-5 sm:gap-10">
          <p class="text-5xl font-semibold text-blue-500 text-center dark:text-white">
            Lease Deed
          </p>
          <blockquote>
            A lease deed agreement, often simply referred to as a lease
            agreement or rental agreement, is a legal contract between a
            landlord (lessor) and a tenant (lessee) that outlines the terms and
            conditions under which the tenant is allowed to occupy and use the
            landlord's property for a specified period of time in exchange for
            rent payments
          </blockquote>
          <button
            data-modal-target="authentication-modal-lease"
            data-modal-toggle="authentication-modal-lease"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Generate Template
          </button>

          <div
            id="authentication-modal-lease"
            tabindex="-1"
            aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal-lease"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 md:p-5">
                  <LeaseDeed></LeaseDeed>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FIR */}
        <div class="bg-slate-200 p-4 h-80 hover:shadow-xl rounded-xl flex flex-col gap-5 sm:gap-10">
          <p class="text-5xl font-semibold text-blue-500 text-center dark:text-white">
            FIR
          </p>
          <blockquote>
            FIR stands for First Information Report. It is a document prepared
            by police organizations in various countries including India,
            Pakistan, Bangladesh, and others when they receive information about
            the commission of a cognizable offense. A cognizable offense is one
            for which the police can take immediate action without a warrant and
            can start an investigation.
          </blockquote>
          <button
            data-modal-target="authentication-modal-fir"
            data-modal-toggle="authentication-modal-fir"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Generate Template
          </button>

          <div
            id="authentication-modal-fir"
            tabindex="-1"
            aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal-fir"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 md:p-5">
                  <FIR></FIR>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Property Transfer */}
        <div class="bg-slate-200 p-4 h-80 hover:shadow-xl rounded-xl flex flex-col gap-5 sm:gap-10">
          <p class="text-5xl font-semibold text-blue-500 text-center dark:text-white">
            Property Transfers
          </p>
          <blockquote>
            A Property Transfer Agreement, sometimes also referred to as a
            Property Sale Agreement or Deed of Sale, is a legal document that
            outlines the terms and conditions under which the ownership of a
            property is transferred from one party (the seller or transferor) to
            another (the buyer or transferee).
          </blockquote>
          <button
            data-modal-target="authentication-modal-property"
            data-modal-toggle="authentication-modal-property"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Generate Template
          </button>

          <div
            id="authentication-modal-property"
            tabindex="-1"
            aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal-property"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 md:p-5">
                  <Property></Property>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Name change */}
        <div class="bg-slate-200 p-4 h-80 hover:shadow-xl rounded-xl flex flex-col gap-5 sm:gap-10">
          <p class="text-5xl font-semibold text-blue-500 text-center dark:text-white">
            Name Change
          </p>
          <blockquote>
            A document used to legally change one's name is typically referred
            to as a "Name Change Petition" or a "Name Change Application,"
            depending on the jurisdiction. The specific name of the document may
            vary by region and the governing legal system.
          </blockquote>
          <button
            data-modal-target="authentication-modal-namechange"
            data-modal-toggle="authentication-modal-namechange"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Generate Template
          </button>

          <div
            id="authentication-modal-namechange"
            tabindex="-1"
            aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal-namechange"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-4 md:p-5">
                  <NameChange></NameChange>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
