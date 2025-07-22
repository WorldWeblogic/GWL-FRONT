import { Footer } from "@/layouts/footer";
import { Link, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import API from "../../API/Api";
import { useEffect } from "react";

const SingleEmployeeMonthlySale = () => {

    const location = useLocation();
    const { LManagerEmployeeId } = location.state
    const [monthlySaleData, setsaledata] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

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
                console.log(res);
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

    const result = originalData.filter(item => {
      const created = new Date(item.createdAt);
      return (
        created.getDate() === targetDay &&
        created.getMonth() === targetMonth &&
        created.getFullYear() === targetYear
      );
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
                <button onClick={handleFilter} className="text-white bg-red-500 ml-4 px-2 text-lg font-semibold rounded-lg">Filter</button>
            </div>
            <div className="flex ">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Monthyl Sale form data</h1>
            </div>

            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6 divide-y-2">

                    {monthlySaleData.map((data, index) => (
                        <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                            <div className="flex mt-4">
                                <p className="mb-1 dark:text-white">Created AT :</p> <p className="dark:text-white ml-3">{data?.createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
                            </div>
                            
                            <div className="flex mt-4">
                                <p className="mb-1 dark:text-white">Total amount of services you sold in a month : </p>
                                <p className="dark:text-white ml-3">{data?.serviceSales}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white ">Number of Doc services :</p>
                                <p className="dark:text-white ml-3 ">{data?.docSales}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Number of Transport Services :</p>
                                <p className="dark:text-white ml-3">{data?.transportSales}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Number of Handling Services :</p>
                                <p className="dark:text-white ml-3">{data?.handlingSales}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Number of Freight Services :</p>
                                <p className="dark:text-white ml-3">{data?.freightSales}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">A new service sold of 1000 AUD :</p>
                                <p className="dark:text-white ml-3">{data?.servicesold}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Total customers you added this month :</p> <p className="dark:text-white ml-3">{data?.newCustomer}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Total spend in a month by all customers in AED :</p> <p className="dark:text-white ml-3">{data?.newCustomerSales}</p>
                            </div>

                            {/* Radio: Digital Training */}
                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Complete digital training :</p>
                                <p className="dark:text-white ml-3">{data?.digitalTraining ? "Yes" : "No"}</p>
                            </div>

                            {/* Radio: Book Read */}

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Read a book and share 3 ideas :</p>
                                <p className="dark:text-white ml-3">{data?.bookRead ? "Yes" : "No"}</p>
                            </div>

                            {/* Radio: CSR Program */}
                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Complete the CSR program :</p>
                                <p className="dark:text-white ml-3">{data?.csrProgram ? "Yes" : "No"}</p>
                            </div>

                            {/* Marketing Materials */}
                            <div className="flex ">
                                <p className="mb-1 dark:text-white">How many marketing materials did you create?</p> <p className="dark:text-white ml-3">{data?.marketingMaterials}</p>
                            </div>

                            <div className="flex ">
                                <p className="mb-1 dark:text-white">Points : </p>
                                <p className="dark:text-white ml-3">{data?.points}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SingleEmployeeMonthlySale;



