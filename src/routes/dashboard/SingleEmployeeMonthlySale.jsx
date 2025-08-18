import { Footer } from "@/layouts/footer";
import { Link, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import API from "../../API/Api";
import { useEffect } from "react";

const SingleEmployeeMonthlySale = () => {
    const location = useLocation();
    const { LManagerEmployeeId } = location.state;
    const [monthlySaleData, setsaledata] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const sale = async () => {
        try {
            const res = await API.get(`/saledata/${LManagerEmployeeId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setsaledata(res.data.sale);
            setOriginalData(res.data.sale);
            //console.log(res);
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
            <div className="flex">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Monthyl Sale form data</h1>
            </div>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <div className="divide-y-2 rounded-xl bg-white p-4 dark:bg-slate-900 sm:p-6">
                    {monthlySaleData.length > 0 ? (
                        monthlySaleData.map((data, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
                            >
                                <div className="mt-4 flex">
                                    <p className="mb-1 dark:text-white">Created AT :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
                                </div>

                                <div className="mt-4 flex">
                                    <p className="mb-1 dark:text-white">Total amount of services you sold in a month : </p>
                                    <p className="ml-3 dark:text-white">{data?.serviceSales}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Number of Doc services :</p>
                                    <p className="ml-3 dark:text-white">{data?.docSales}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Number of Transport Services :</p>
                                    <p className="ml-3 dark:text-white">{data?.transportSales}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Number of Handling Services :</p>
                                    <p className="ml-3 dark:text-white">{data?.handlingSales}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Number of Freight Services :</p>
                                    <p className="ml-3 dark:text-white">{data?.freightSales}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">A new service sold of 1000 AUD :</p>
                                    <p className="ml-3 dark:text-white">{data?.servicesold}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Total customers you added this month :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.newCustomer}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Total spend in a month by all customers in AED :</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.newCustomerSales}</p>
                                </div>

                                {/* Radio: Digital Training */}
                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Complete digital training :</p>
                                    <p className="ml-3 dark:text-white">{data?.digitalTraining ? "Yes" : "No"}</p>
                                </div>

                                {/* Radio: Book Read */}

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Read a book and share 3 ideas :</p>
                                    <p className="ml-3 dark:text-white">{data?.bookRead ? "Yes" : "No"}</p>
                                </div>

                                {/* Radio: CSR Program */}
                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Complete the CSR program :</p>
                                    <p className="ml-3 dark:text-white">{data?.csrProgram ? "Yes" : "No"}</p>
                                </div>

                                {/* Marketing Materials */}
                                <div className="flex">
                                    <p className="mb-1 dark:text-white">How many marketing materials did you create?</p>{" "}
                                    <p className="ml-3 dark:text-white">{data?.marketingMaterials}</p>
                                </div>

                                <div className="flex">
                                    <p className="mb-1 dark:text-white">Points : </p>
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

export default SingleEmployeeMonthlySale;
