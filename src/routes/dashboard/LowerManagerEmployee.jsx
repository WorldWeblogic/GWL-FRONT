import { Footer } from "@/layouts/footer";
import { EyeIcon, PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";
import { useEffect } from "react";

const LowerManagerEmployee = () => {
    const { employeedata, fetchallemployee, managerdata, fetchallmanager, fetchlowermanagerData } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const adminToken = localStorage.getItem("admintoken");

    useOfferSync(null, null, null, fetchallemployee);
    const rejectEmp = async (id, employee, superManagerEmail, lowerManagerName, lowerManagerEmail) => {
        try {
            await API.put(`/deleteEmp/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            console.log("calling");
            bc.close();
            toast.success("Delete employee request send to super manager Successfully!");
            await handleSendMail(employee, superManagerEmail, lowerManagerName, lowerManagerEmail);
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    const handleSendMail = async (employee, superManagerEmail, lowerManagerName, lowerManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required: Please Review Employee",
                html: generateHtmlTemplate(employee, lowerManagerName, lowerManagerEmail)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    const generateHtmlTemplate = (employee, lowerManagerName, lowerManagerEmail) => {
        return `
   <!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
     .header {
        background-color:rgb(175, 76, 76);
        color: white;
        padding: 15px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 5px 0;
        font-size: 16px;
        text-decoration: none;
        border-radius: 5px;
        color: white;
      }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Employee Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          A new Employee has been Deleted by <br>
          <strong>Manager Name :</strong> ${lowerManagerName} <br>
          <strong>Manager Email : </strong>${lowerManagerEmail} and requires your action.
        </p>
        <p><strong>Employee ID:</strong> ${employee.employeeid} <br>
        <strong>Employee Name:</strong> ${employee.firstname} ${employee.lastname} <br>
        <strong>Employee Email:</strong>${employee.email}</p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };

    useEffect(() => {
        if (managerToken || lowerManagerToken || adminToken) {
            fetchallemployee(adminToken, lowerManagerToken, managerToken);
            fetchallmanager(lowerManagerToken)
            fetchlowermanagerData(null, lowermanagersession)
        }
    }, [])

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
                                    <th className="px-2 py-2 text-left font-semibold">Redeem Point</th>
                                    <th className="px-2 py-2 text-left font-semibold">Monthly Sale</th>
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
                                        <td className="px-4 py-2 text-left font-semibold">
                                            <Link
                                                to={"/LowerManagerlayout/employee-redeempoint"}
                                                state={{
                                                    LManagerEmployeeId: employee._id,
                                                }}
                                            >
                                                <button className="flex items-center gap-1 rounded bg-green-500 w-32 py-1 text-white pl-2">
                                                    <EyeIcon size={20} />Redeem Point
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 text-left font-semibold">
                                            <Link
                                                to={"/LowerManagerlayout/employee-monthly-sale"}
                                                state={{
                                                    LManagerEmployeeId: employee._id,
                                                }}
                                            >
                                                <button className="flex items-center gap-1 rounded bg-yellow-500 pl-5 py-1 text-white w-32">
                                                    <EyeIcon size={20} />View Sale
                                                </button>
                                            </Link>
                                        </td>
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
                                                onClick={() => { rejectEmp(employee._id, employee, managerdata[0]?.email, employee.manager, employee.managerEmail) }}
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
