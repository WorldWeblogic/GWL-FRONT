import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";
import { useEffect } from "react";

const EditEmployeePage = () => {
    const { employeedata, fetchallemployee } = useAuth()
    useOfferSync(fetchallemployee);
    const managerToken = localStorage.getItem("managertoken");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");
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

    useEffect(() => {
        if (managerToken || lowerManagerToken || adminToken) {
            fetchallemployee(adminToken, lowerManagerToken, managerToken);
        }
    }, [])

    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">All Employee</h1>
                <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                    <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                        <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {employeedata.length} Employee</p>
                        <Link to={"/layout/add-employee"}>
                            <button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Employee</button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Employee_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employeedata.map((employee, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">{employee.firstname}{" "}{employee.lastname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{employee.email}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.employeeid}</td>
                                        <td className="px-4 py-3 dark:text-white">{employee.status}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <Link to={"/layout/update-employee"}
                                                state={{ LManagerCustId: employee._id }}>
                                                <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded">
                                                    <PencilLine size={16} /> Manage
                                                </button>
                                            </Link>
                                            <button onClick={() => softdeleteemployee(employee._id)}
                                                className=" flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white">
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

export default EditEmployeePage;



