import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const Employeeoffer = () => {
    const { fetchalloffer, employeeofferdata, fetchallemployeeoffer } = useAuth();
    useOfferSync(fetchalloffer, fetchallemployeeoffer);
    const [expandedOffers, setExpandedOffers] = useState({});
    const admintoken = localStorage.getItem("admintoken");
    useEffect(() => {
        if (admintoken) {
            fetchallemployeeoffer(admintoken);
        }
    }, []);

    const softdeleteemloyeeoffer = async (id) => {
        try {
            await API.patch(
                `/delete-employee-offer/${id}`,
                null, // no request body
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("employee offer deleted Successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };

    const truncateText = (text, length = 20) => (text.length > length ? text.slice(0, length) + "..." : text);
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            
            {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeeofferdata.length} Offers </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Offer ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Start Date</th>
                                <th className="px-4 py-2 text-left font-semibold">End Date</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employeeofferdata.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{data.offerTitle}</p>

                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${data._id}`]
                                                        ? data.offerDescription
                                                        : truncateText(data.offerDescription, 20)}
                                                    {data.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${data._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${data._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{data.offerid}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {data.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {data.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{data.status}</td>
                                    <td className="flex gap-2 px-4 py-3">
                                        <Link
                                            to={"/layout/edit-employee-offers"}
                                            state={{ LManagerAllOfferEmpId: data._id }}
                                        >
                                            <button className="my-3 flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                                <PencilLine size={16} /> Manage
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => softdeleteemloyeeoffer(data._id)}
                                            className="my-3 flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white"
                                        >
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Employeeoffer;
