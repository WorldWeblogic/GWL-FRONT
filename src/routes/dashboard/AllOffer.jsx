import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";

const AllOffer = () => {
    const {offerdata,fetchalloffer,employeeofferdata,fetchallemployeeoffer}=useAuth()
    // approve offer
     const approveoffer = async (id) => {  
      try {
        const response = await API.put(
          `/approve-offer/${id}`
        );
        await fetchalloffer(); 
        toast.success(response.data.message); // use backend message directly
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Approve failed";
        toast.error(errorMessage);
        console.error(err);
      }
    };
    // decline offer
     const declineoffer = async (id) => {  
      try {
        const response = await API.put(
          `/reject-offer/${id}`
        );
        await fetchalloffer(); 
        toast.success(response.data.message); // use backend message directly
      } catch (err) {
        const errorMessage = err.response?.data?.message || "reject failed";
        toast.error(errorMessage);
        console.error(err);
      }
    };
    const softdeleteoffer = async (id) => {    
    try {
        await API.patch(
            `/delete-offer/${id}`,null,  // no request body
        );
        toast.success('offer deleted Successfully!');
        await fetchalloffer();
    } catch (err) {
        const message = err.response?.data?.message || "deletion failed";
        toast.error(message);
        console.error("delete error:", err);
    }
    };
    // soft delete employee offer
    const softdeleteemloyeeoffer = async (id) => {    
    try {
         await API.patch(
            `/delete-employee-offer/${id}`,null,  // no request body
        );
        toast.success('employee offer deleted Successfully!');
        await fetchallemployeeoffer();
    } catch (err) {
        const message = "deletion failed";
        toast.error(message);
        console.error("delete error:", err);
    }
    };
    // approve employee offer
     const approveemployeeoffer = async (id) => {  
      try {
        const response = await API.put(
          `/approve-employee-offer/${id}`
        );
        await fetchallemployeeoffer(); 
        toast.success(response.data.message); // use backend message directly
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Approve failed";
        toast.error(errorMessage);
        console.error(err);
      }
    };
    // decline offer
     const declineemployeeoffer = async (id) => {  
      try {
        const response = await API.put(
          `/reject-employee-offer/${id}`
        );
        await fetchallemployeeoffer(); 
        toast.success(response.data.message); // use backend message directly
      } catch (err) {
        const errorMessage = err.response?.data?.message || "reject failed";
        toast.error(errorMessage);
        console.error(err);
      }
    };
    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {offerdata.length} Offers </p>
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
                                <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {offerdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index+1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{customer.offerDescription}</p>
                                    </div>
                                </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0,10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.endDate.slice(0,10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.manager}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button onClick={() => approveoffer(customer._id)}
                                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded my-2"><PencilLine size={16} /> Approve </button>
                                        <button onClick={() => declineoffer(customer._id)}
                                        className="flex items-center gap-1 px-4 py-1 bg-orange-500 text-white rounded my-2"><Trash size={16} /> Decline</button>
                                        <button onClick={() => softdeleteoffer(customer._id)}
                                        className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded my-2"><Trash size={16} /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {employeeofferdata.length} Offers </p>
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
                                <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employeeofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index+1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{customer.offerDescription}</p>
                                    </div>
                                </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}</td>

                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0,10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">
                                    {customer.endDate.slice(0,10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.manager}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button onClick={() => approveemployeeoffer(customer._id)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded my-2"><PencilLine size={16} /> Approve</button>
                                        <button onClick={() => declineemployeeoffer(customer._id)} className="flex items-center gap-1 px-4 py-1 bg-orange-500 text-white rounded my-2"><Trash size={16} /> Decline</button>
                                        <button onClick={() => softdeleteemloyeeoffer(customer._id)} className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded my-2"><Trash size={16} /> Delete</button>
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

export default AllOffer;


