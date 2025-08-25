import { Footer } from "@/layouts/footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import API from "../../API/Api";
import { useState } from "react";

const CustRedeempoint = () => {
    const location = useLocation();
    const { LManagerCustomerId } = location.state;
    const [customer, setcustomer] = useState([{}]);
    const fetchcustomerData = async () => {
        try {
            const response = await API.get(`/getcustredeemrequest/${LManagerCustomerId}`, {
                headers: {
                    "Content-Type": "application/json",
                }, 
            });
            setcustomer(response.data.request);
            // console.log(response.data.request);
        } catch (err) {
            console.log(err.response?.status || err.message);
        }
    };
    useEffect(() => {
        fetchcustomerData();
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Customer Redeem Point Request</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customer ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">POINTS</th>
                                    <th className="px-4 py-2 text-left font-semibold">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {customer.map((data, index) => (
                                    <tr key={index}>
                                         <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                       <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">
                                                    {data.firstname} {data.lastname}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{data.customerID}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.points}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CustRedeempoint;
