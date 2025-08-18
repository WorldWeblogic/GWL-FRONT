import { useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import API from "../../API/Api";
import * as XLSX from "xlsx";

const CustomerMonthlysaleform = () => {
    const [excelData, setExcelData] = useState({});
    const [form ,setForm]=useState({})
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
                    const cleanKey = key.replace(/[\r\n]/g, "").trim()
                    cleanedRow[cleanKey] = row[key];
                }
                return cleanedRow;
            });
            //console.log("Parsed Keys:", Object.keys(cleanedData[0]));
            setExcelData(cleanedData);
            console.log(cleanedData);
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

    const usersession = sessionStorage.getItem("id");

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

        const Data = {
            id: usersession,
            documentation:excelData[0].DOCUMENTATION,
            handling:excelData[0].HANDLING,
            agency:excelData[0].AGENCY,
            GWLHandling:excelData[0].GWLHANDLING,
            freight:excelData[0].FREIGHT,
            loading:excelData[0].LOADING,
            offloading:excelData[0].OFFLOADING,
            storage:excelData[0].STORAGE,
            transport:excelData[0].TRANSPORT,
        };

        try {
            await API.post(`/companysaleform`, Data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            toast.success("Data added successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "Failed to upload data";
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
                            <label className="mb-1 dark:text-white">DOCUMENTATION</label>
                            <input
                                type="number"
                                name="documentation"
                                value={excelData[0]?.DOCUMENTATION}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">HANDLING</label>
                            <input
                                type="number"
                                name="handling"
                                value={excelData[0]?.HANDLING}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">AGENCY</label>
                            <input
                                type="number"
                                name="agency"
                                value={excelData[0]?.AGENCY}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">GWL HANDLING</label>
                            <input
                                type="number"
                                name="GWLHandling"
                                value={excelData[0]?.GWLHANDLING}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">FREIGHT</label>
                            <input
                                type="number"
                                name="freight"
                                value={excelData[0]?.FREIGHT}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">LOADING</label>
                            <input
                                type="number"
                                name="loading"
                                value={excelData[0]?.LOADING}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">OFFLOADING</label>
                            <input
                                type="number"
                                name="offloading"
                                value={excelData[0]?.OFFLOADING}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">STORAGE</label>
                            <input
                                type="number"
                                name="storage"
                                value={excelData[0]?.STORAGE}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">TRANSPORT</label>
                            <input
                                type="number"
                                name="transport"
                                value={excelData[0]?.TRANSPORT}
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
export default CustomerMonthlysaleform;

