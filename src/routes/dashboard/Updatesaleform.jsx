import { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import API from "../../API/Api";
import { useLocation } from "react-router-dom";

const Updatesaleform = () => {
    const location = useLocation();
    const { ID } = location.state;
    const [form, setForm] = useState({
        serviceSales: "",
        docSales: "",
        transportSales: "",
        handlingSales: "",
        freightSales: "",
        servicesold: "",
        newCustomer: "",
        newCustomerSales: "",
        digitalTraining: "no",
        bookRead: "no",
        csrProgram: "no",
        marketingMaterials: "",
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
        try {
            await API.put(`/updatesaleform/${ID}`, form, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            toast.success("updated successfully")
        }
        catch (err) {
            const message = err.response.data.message;
            toast.error(message);
            console.log(err);
        }
    };

    async function sale() {
        try {
            const res = await API.get(`/singlesaledata/${ID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setForm({
                serviceSales: res.data.sale.serviceSales || "",
                docSales: res.data.sale.docSales || "",
                transportSales: res.data.sale.transportSales || "",
                handlingSales: res.data.sale.handlingSales || "",
                freightSales: res.data.sale.freightSales || "",
                servicesold: res.data.sale.servicesold || "",
                newCustomer: res.data.sale.newCustomer || "",
                newCustomerSales: res.data.sale.newCustomerSales || "",
                digitalTraining: res.data.sale.digitalTraining ? "yes" : "no",
                bookRead: res.data.sale.bookRead ? "yes" : "no",
                csrProgram: res.data.sale.csrProgram ? "yes" : "no",
                marketingMaterials: res.data.sale.marketingMaterials || ""
            })
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        sale();
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Update Monthly Sale Form</h1>

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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Doc services</label>
                            <input
                                type="number"
                                name="docSales"
                                value={form.docSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Transport Services</label>
                            <input
                                type="number"
                                name="transportSales"
                                value={form.transportSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Handling Services</label>
                            <input
                                type="number"
                                name="handlingSales"
                                value={form.handlingSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Freight Services</label>
                            <input
                                type="number"
                                name="freightSales"
                                value={form.freightSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">A new service sold of 1000 AUD</label>
                            <input
                                type="number"
                                name="servicesold"
                                value={form.servicesold}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Total customers you added this month</label>
                            <input
                                type="number"
                                name="newCustomer"
                                value={form.newCustomer}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Total spend in a month by all customers in AED</label>
                            <input
                                type="number"
                                name="newCustomerSales"
                                value={form.newCustomerSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
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
                                    />{" "}
                                    Yes
                                </label>
                                <label className="mr-4 dark:text-white">
                                    <input
                                        type="radio"
                                        name="digitalTraining"
                                        value="no"
                                        checked={form.digitalTraining === "no"}
                                        onChange={handleChange}
                                        className="mr-1"
                                    />{" "}
                                    No
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
                                    />{" "}
                                    Yes
                                </label>
                                <label className="mr-4 dark:text-white">
                                    <input
                                        type="radio"
                                        name="bookRead"
                                        value="no"
                                        checked={form.bookRead === "no"}
                                        onChange={handleChange}
                                        className="mr-1"
                                    />{" "}
                                    No
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
                                    />{" "}
                                    Yes
                                </label>
                                <label className="mr-4 dark:text-white">
                                    <input
                                        type="radio"
                                        name="csrProgram"
                                        value="no"
                                        checked={form.csrProgram === "no"}
                                        onChange={handleChange}
                                        className="mr-1"
                                    />{" "}
                                    No
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
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
}
export default Updatesaleform;
