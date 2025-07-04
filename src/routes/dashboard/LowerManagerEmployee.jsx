import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const LowerManagerEmployee = () => {
    const { employeedata, fetchallemployee } = useAuth();
    useOfferSync(fetchallemployee);
    const rejectEmp = async (id) => {
        try {
            await API.put(`/deleteEmp/${id}`);
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
    const handleSendMail = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/send-mail", {
                to: "skr36880@gmail.com",
                subject: "Offer notification came for Approval",
                text: "This is a test email sent from MERN app.",
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">All Employee</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeedata.length} Employee</p>
                        <Link to={"/LowerManagerlayout/add-employee"}>
                            <button className="rounded-full bg-green-500 px-2 py-1 font-medium text-white hover:bg-green-600">Add Employee</button>
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
                                    <th className="px-4 py-2 text-left font-semibold">phone</th>
                                    <th className="px-4 py-2 text-left font-semibold">Total_Points</th>
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
                                        <td className="flex gap-2 px-4 py-3">
                                            <Link
                                                to={"/LowerManagerlayout/update-employee"}
                                                state={{
                                                    LManagerCustId: employee._id,
                                                    docs: employee.docSales,
                                                    transport: employee.transportSales,
                                                    service: employee.serviceSales,
                                                    handling: employee.handlingSales,
                                                    freight: employee.freightSales,
                                                    servicesold: employee.servicesold,
                                                    newCustomer: employee.newCustomer,
                                                    newCustomerSales: employee.newCustomerSales,
                                                    digitalTraining: employee.digitalTraining,
                                                    bookRead: employee.bookRead,
                                                    csrProgram: employee.csrProgram,
                                                    marketingMaterials: employee.marketingMaterials,
                                                    estimatedPoints: employee.points
                                                }}
                                            >
                                                <button className="flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                                    <PencilLine size={16} /> Manage
                                                </button>
                                            </Link>
                                            <button
                                                onClick={(e) => { rejectEmp(employee._id); handleSendMail(e); }}
                                                className="flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white"
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
            </div>
            <Footer />
        </div>
    );
};

export default LowerManagerEmployee;
