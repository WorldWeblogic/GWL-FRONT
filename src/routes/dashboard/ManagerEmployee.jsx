import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const ManagerEmployee = () => {
    const { employeedata, fetchallemployee, lowermanager } = useAuth();
    useOfferSync(fetchallemployee);
    const softdeleteemployee = async (id) => {
        try {
            await API.patch(
                `/deleteemployee/${id}`,
                null, // no request body
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("employee deleted Successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };

    // approve employee
    const approveEmployee = async (id) => {
        try {
            const response = await API.put(`/approveEmp/${id}`);
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
    const declineEmployee = async (id) => {
        try {
            const response = await API.put(`/rejectEmp/${id}`);
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
    // get all request
    const [request, setrequest] = useState([]);
    const getallrequest = async () => {
        try {
            const response = await API.get("/allrequest");
            setrequest(response.data.requests);
        } catch (err) {
            const errorMessage = "get all request data failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    useEffect(() => {
        getallrequest();
    }, []);

    const handleAction = async (id, approved) => {
        try {
            const response = await API.post(`/review/${id}`, { approved });
            toast.success(response.data.message);
            await getallrequest();
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
        } catch (err) {
            toast.error(err);
            console.error(err);
        }
    };


    const handleSendMail = async (action, managerEmail, employeeEmail) => {

        let subject = "";
        let html = "";
        let to = [];

        switch (action) {
            case "approve":
                to = [managerEmail, employeeEmail];
                subject = "Employee Approved";
                html = "<p>Your offer has been Approved.</p>";
                break;

            case "decline":
                to = [managerEmail];
                subject = "Employee Declined";
                html = "<p>Your offer has been Declined.</p>";
                break;

            case "delete":
                to = [managerEmail];
                subject = "Employee Deleted";
                html = "<p>Your offer has been Deleted.</p>";
                break;

            case "give":
                to = [managerEmail, employeeEmail];
                subject = "Points Given";
                html = "<p>Points have been successfully credited.</p>";
                break;

            case "redeem":
                to = [managerEmail, employeeEmail];
                subject = "Points Redeemed";
                html = "<p>Points have been successfully redeemed.</p>";
                break;

            default:
                toast.error("Unknown email action type.");
                return;
        }

        try {
            const response = await API.post("/send-mail", {
                to,
                subject,
                html,
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Mail send error:", error);
            toast.error("Failed to send email");
        }
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Edit Employee</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeedata.length} Employee</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Employee_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">phone</th>
                                    <th className="px-4 py-2 text-left font-semibold">Total_Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employeedata.map((employee, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">
                                                    {employee.firstname} {employee.lastname}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{employee.email}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.employeeid}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.phone}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.TotalPoints}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.manager}</td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    approveEmployee(employee._id);
                                                    handleSendMail("approve", employee.managerEmail, employee.email);
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => {
                                                    declineEmployee(employee._id);
                                                    handleSendMail("decline", employee.managerEmail);
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Decline
                                            </button>
                                            <button
                                                onClick={() => {
                                                    softdeleteemployee(employee._id);
                                                    handleSendMail("delete", employee.managerEmail);
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-red-500 px-4 py-1 text-white"
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
                {/* employee points */}
                <h1 className="mb-4 mt-4 text-2xl font-bold text-gray-800 dark:text-white">Approve Employee points</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {request.length} Request</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Employee_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Total_Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Working</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {request.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">
                                                    {data.employee.firstname} {data.employee.lastname}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{data.employeeid}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.value}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.type}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.manager}</td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => handleAction(data._id, true)}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => handleAction(data._id, false)}
                                                className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Decline
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

export default ManagerEmployee;
