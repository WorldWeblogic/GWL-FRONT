import { Footer } from "@/layouts/footer";
import { Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const ManagerCustomer = () => {
    const { customersdata, fetchalluser } = useAuth()
    useOfferSync(fetchalluser);
    const softdeleteCustomer = async (id) => {
        try {
            await API.patch(
                `/deleteuser/${id}`,
                null,
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success('Customer deleted Successfully!');
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error(err);
        }
    }

    // approve customer
    const approveCustomer = async (id) => {
        try {
            const response = await API.put(
                `/approvecustomer/${id}`
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Approve failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    const declineCustomer = async (id) => {
        try {
            const response = await API.put(
                `/rejectcustomer/${id}`
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close(); // or your function to refresh customer list
            toast.success(response.data.message); // Show success message from backend
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Delete failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    const handleSendMail = async (action) => {
    let subject = "";
    let text = "";
 
    if (action === "approve") {
        subject = "Offer Approved";
        text = "Your offer has been approved.";
    } else if (action === "decline") {
        subject = "Offer Declined";
        text = "Your offer has been declined.";
    } else if (action === "delete") {
        subject = "Offer Deleted";
        text = "Your offer was deleted.";
    }
 
    try {
        const response = await API.post("/send-mail", {
            to: "skr36880@gmail.com" && "shantanu.kr.worldweblogic@gmail.com", 
            subject,
            text,
        });
 
        toast.success(response.data.message);
    } catch (error) {
        console.error("Mail send error:", error);
        toast.error("Failed to send email");
    }
};

    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Customer</h1>
                <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                    <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                        <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {customersdata.length} Customer</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customer_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {customersdata.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">{customer.firstname}{" "}{customer.lastname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{customer.email}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.customerid}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.manager}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.status}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button onClick={() => { approveCustomer(customer._id); handleSendMail("approve") }} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded my-2">
                                                <Trash size={16} /> Approve
                                            </button>
                                            <button onClick={() => { declineCustomer(customer._id); handleSendMail("decline") }} className="flex items-center gap-1 px-4 py-1 bg-orange-500 text-white rounded my-2">
                                                <Trash size={16} /> Decline
                                            </button>
                                            <button onClick={() => { softdeleteCustomer(customer._id); handleSendMail("delete"); }} className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded my-2">
                                                <Trash size={16} /> Delete
                                            </button>
                                        </td>
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

export default ManagerCustomer;



