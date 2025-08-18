import { Footer } from "@/layouts/footer";
import API from "../../API/Api";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Customersaleform = () => {
    const location = useLocation();
    const {Lcustomerid } = location.state;
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

            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <div className="divide-y-2 rounded-xl bg-white p-4 dark:bg-slate-900 sm:p-6">
                    {saledata?.length > 0 ? (
                        saledata.map((data, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                            >
                                <div className="mt-2 flex">
                                    <p className="mb-1 dark:text-white">Created AT :</p>
                                    <p className="ml-3 dark:text-white">{data?.createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
                                </div>
                                <div className="mt-2 flex">
                                    <p className="mb-1 dark:text-white">GWLHandling :</p>
                                    <p className="ml-3 dark:text-white">{data?.GWLHandling}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">agency :</p>
                                    <p className="ml-3 dark:text-white">{data?.agency}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">documentation :</p>
                                    <p className="ml-3 dark:text-white">{data?.documentation}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">freight :</p>
                                    <p className="ml-3 dark:text-white">{data?.freight}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">handling :</p>
                                    <p className="ml-3 dark:text-white">{data?.handling}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">loading :</p>
                                    <p className="ml-3 dark:text-white">{data?.loading}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">offloading :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.offloading}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">storage :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.storage}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">transport :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.transport}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Points :</p>
                                    <p className="ml-3 dark:text-white">{data?.points}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mt-4 text-center dark:text-white">No sales data available for the selected period.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Customersaleform;
