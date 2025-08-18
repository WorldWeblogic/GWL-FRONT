import { useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import API from "../../API/Api";
import * as XLSX from "xlsx";

const Monthlysaleform = () => {
    const [excelData, setExcelData] = useState({});

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(worksheet);

            // Clean keys: remove \r and \n from each key
            const cleanedData = rawData.map((row) => {
                const cleanedRow = {};
                for (const key in row) {
                    const cleanKey = key.replace(/[\r\n]/g, "").trim();
                    cleanedRow[cleanKey] = row[key];
                }
                return cleanedRow;
            });

            setExcelData(cleanedData);
            if (cleanedData.length > 0) {
                setForm((prev) => ({
                    ...prev,
                    ...cleanedData[0],
                }));
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = null; // reset input so same file can be uploaded again
    };

    const usersession = sessionStorage.getItem("employeeid");
    const [form, setForm] = useState({
        serviceSales: "",
        docSales: "",
        transportSales: "",
        handlingSales: "",
        freightSales: "",
        servicesold: "",
        newCustomer: "",
        newCustomerSales: "",
        digitalTraining: "",
        bookRead: "",
        csrProgram: "",
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

        if (!excelData[0]) {
            toast.error("No Excel data found!");
            return;
        }

        const updatedData = {
            serviceSales: excelData[0]?.serviceSales,
            docSales: excelData[0]?.docSales,
            transportSales: excelData[0]?.transportSales,
            handlingSales: excelData[0]?.handlingSales,
            freightSales: excelData[0]?.freightSales,
            servicesold: excelData[0]?.servicesold,
            newCustomer: excelData[0]?.newCustomer,
            newCustomerSales: excelData[0]?.newCustomerSales,
            digitalTraining: form.digitalTraining,
            bookRead: form.bookRead,
            csrProgram: form.csrProgram,
            marketingMaterials: excelData[0]?.marketingMaterials,
            Id: usersession
        };

        try {
            await API.post(`/monthlysaleform`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            toast.success("Data added successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "Updation failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Monthly Sale Form</h1>
            <div className="flex gap-x-4">
                <p className="dark:text-white">Upload your monthly sales data in Excel format.</p>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => { handleFileUpload(e); }}
                    className="justify-end"
                />

            </div>

            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Total amount of services you sold in a month</label>
                            <input
                                type="number"
                                name="serviceSales"
                                value={excelData[0]?.serviceSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Doc services</label>
                            <input
                                type="number"
                                name="docSales"
                                value={excelData[0]?.docSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Transport Services</label>
                            <input
                                type="number"
                                name="transportSales"
                                value={excelData[0]?.transportSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Handling Services</label>
                            <input
                                type="number"
                                name="handlingSales"
                                value={excelData[0]?.handlingSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Number of Freight Services</label>
                            <input
                                type="number"
                                name="freightSales"
                                value={excelData[0]?.freightSales}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">A new service sold of 1000 AUD</label>
                            <input
                                type="number"
                                name="servicesold"
                                value={excelData[0]?.servicesold}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Total customers you added this month</label>
                            <input
                                type="number"
                                name="newCustomer"
                                value={excelData[0]?.newCustomer}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Total spend in a month by all customers in AED</label>
                            <input
                                type="number"
                                name="newCustomerSales"
                                value={excelData[0]?.newCustomerSales}
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
                                value={excelData[0]?.marketingMaterials}
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
export default Monthlysaleform;

