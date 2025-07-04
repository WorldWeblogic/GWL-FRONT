
import React, { useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import API from "../../API/Api";
const Monthlysaleform = () => {
  const [usersession,setadminsession]=useState(sessionStorage.getItem("employeeid"));
  const [form, setForm] = useState({
    serviceSales: '',
    docSales: '',
    transportSales: '',
    handlingSales: '',
    freightSales: '',
    servicesold: '',
    newCustomer: '',
    newCustomerSales: '',
    digitalTraining: '',
    bookRead: '',
    csrProgram: '',
    marketingMaterials: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            serviceSales: form.serviceSales,
            docSales: form.docSales,
            transportSales: form.transportSales,
            handlingSales: form.handlingSales,
            freightSales: form.freightSales,
            servicesold: form.servicesold,
            newCustomer: form.newCustomer,
            newCustomerSales: form.newCustomerSales,
            digitalTraining: form.digitalTraining,
            bookRead: form.bookRead,
            csrProgram: form.csrProgram,
            marketingMaterials: form.marketingMaterials,
        };
        try {
             await API.put(`/monthlysaleform/${usersession}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            });
            setForm({
                serviceSales: '',
                docSales: '',
                transportSales: '',
                handlingSales: '',
                freightSales: '',
                servicesold: '',
                newCustomer: '',
                newCustomerSales: '',
                digitalTraining: '',
                bookRead: '',
                csrProgram: '',
                marketingMaterials: '',
            })
            toast.success('Successfully updated!')
        } catch (err) {
            const message = err.response?.data?.message || "updation failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };
  return (
    <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Monthly Sale Form</h1>
      <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Total amount of services you sold in a month</label>
              <input
                type="number"
                name="serviceSales"
                value={form.serviceSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Number of Doc services</label>
              <input
                type="number"
                name="docSales"
                value={form.docSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Number of Transport Services</label>
              <input
                type="number"
                name="transportSales"
                value={form.transportSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Number of Handling Services</label>
              <input
                type="number"
                name="handlingSales"
                value={form.handlingSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Number of Freight Services</label>
              <input
                type="number"
                name="freightSales"
                value={form.freightSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">A new service sold of 1000 AUD</label>
              <input
                type="text"
                name="servicesold"
                value={form.servicesold}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Total customers you added this month</label>
              <input
                type="number"
                name="newCustomer"
                value={form.newCustomer}
                onChange={handleChange}
               className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Total spend in a month by all customers in AED</label>
              <input
                type="number"
                name="newCustomerSales"
                value={form.newCustomerSales}
                onChange={handleChange}
                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>
            
            {/* Radio: Digital Training */}
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Did you complete digital training?</label>
              <div>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="digitalTraining"
                    value="yes"
                    checked={form.digitalTraining === "yes"}
                    onChange={handleChange}
                    className="mr-1"
                  /> Yes
                </label>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="digitalTraining"
                    value="no"
                    checked={form.digitalTraining === "no"}
                    onChange={handleChange}
                    className="mr-1"
                  /> No
                </label>
              </div>
            </div>

            {/* Radio: Book Read */}
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Did you read a book and share 3 ideas?</label>
              <div>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="bookRead"
                    value="yes"
                    checked={form.bookRead === "yes"}
                    onChange={handleChange}
                    className="mr-1"
                  /> Yes
                </label>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="bookRead"
                    value="no"
                    checked={form.bookRead === "no"}
                    onChange={handleChange}
                    className="mr-1"
                  /> No
                </label>
              </div>
            </div>

            {/* Radio: CSR Program */}
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">Did you complete the CSR program?</label>
              <div>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="csrProgram"
                    value="yes"
                    checked={form.csrProgram === "yes"}
                    onChange={handleChange}
                    className="mr-1"
                  /> Yes
                </label>
                <label className="mr-4 dark:text-white">
                  <input
                    type="radio"
                    name="csrProgram"
                    value="no"
                    checked={form.csrProgram === "no"}
                    onChange={handleChange}
                    className="mr-1"
                  /> No
                </label>
              </div>
            </div>

            {/* Marketing Materials */}
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white">How many marketing materials did you create?</label>
              <input
                type="number"
                name="marketingMaterials"
                value={form.marketingMaterials}
                onChange={handleChange}
               className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Monthlysaleform;

