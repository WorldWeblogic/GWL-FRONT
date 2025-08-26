import { Footer } from "@/layouts/footer";
import API from "../../API/Api";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Customersaleform = () => {
    const location = useLocation();
    const { Lcustomerid } = location.state;
    console.log(Lcustomerid);
    const [saledata, setsaledata] = useState([]);
    const [originalData, setOriginalData] = useState([]); // 🔁 Store full data
    const [selectedDate, setSelectedDate] = useState("");

    const sale = async () => {
        try {
            const res = await API.get(`/customersaledata/${Lcustomerid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setsaledata(res.data.latestSale);
            setOriginalData(res.data.latestSale); // 🔁 Set full copy
            // console.log(res.data.latestSale)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        sale();
    }, []);

    const handleFilter = () => {
        if (!selectedDate) return;

        const inputDate = new Date(selectedDate);
        const targetDay = inputDate.getDate();
        const targetMonth = inputDate.getMonth(); // 0-indexed
        const targetYear = inputDate.getFullYear();

        const result = originalData.filter((item) => {
            const created = new Date(item.createdAt);
            return created.getDate() === targetDay && created.getMonth() === targetMonth && created.getFullYear() === targetYear;
        });

        setsaledata(result);
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h2 className="text-2xl font-semibold dark:text-white">Filter Sales Data</h2>
            <div>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button
                    onClick={handleFilter}
                    className="ml-4 rounded-lg bg-red-500 px-2 text-lg font-semibold text-white"
                >
                    Filter
                </button>
            </div>

            <div className="rounded-xl bg-white shadow dark:bg-slate-900 ">
                <div className="rounded-xl bg-white dark:bg-slate-900 p-5 overflow-x-auto">
                    <table className="w-full overflow-hidden rounded-lg border-gray-300">
                        <thead>
                            <tr className="bg-black text-white dark:bg-red-600">
                                <td className="border px-4 py-2 font-semibold dark:text-white min-w-[120px]">Created At</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">GWLHandling</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Agency</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Documentation</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Freight</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Handling</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Loading</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Offloading</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Storage</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Transport</td>
                                <td className="border px-4 py-2 font-semibold dark:text-white">Points</td>
                            </tr>
                        </thead>
                        <tbody>
                            {saledata?.length > 0 ? (
                                saledata.map((data, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 dark:text-white w-[250px]">
                                            {data?.createdAt.slice(0, 10).split("-").reverse().join("-")}
                                        </td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.GWLHandling}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.agency}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.documentation}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.freight}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.handling}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.loading}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.offloading}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.storage}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.transport}</td>
                                        <td className="border px-4 py-2 dark:text-white">{data?.points}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="mt-4 text-center dark:text-white">
                                        No sales data available for the selected period.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Customersaleform;
