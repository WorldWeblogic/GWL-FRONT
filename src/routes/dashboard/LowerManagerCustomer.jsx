import { Footer } from "@/layouts/footer";
import { EyeIcon, PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";
import { useEffect } from "react";

const LowerManagerCustomer = () => {
    const { customersdata, fetchalluser, managerdata, fetchlowermanagerData, fetchallmanager } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");

    useOfferSync(null, null, fetchalluser, null);

    const rejectCustomer = async (id, superManagerEmail, customer, lowerManagerName, lowerManagerEmail) => {
        try {
            const response = await API.put(`/deletecustomer/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success(response.data.message);
            await handleSendMail(superManagerEmail, customer, lowerManagerName, lowerManagerEmail);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };


    const handleSendMail = async (superManagerEmail, customer, lowerManagerName, lowerManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required: Please Review Customer Deletion",
                html: generateHtmlTemplate(customer, lowerManagerName, lowerManagerEmail)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    useEffect(() => {
        if (managerToken || lowerManagerToken || adminToken) {
            fetchalluser(adminToken, lowerManagerToken, managerToken);
            fetchallmanager(lowerManagerToken)
            fetchlowermanagerData(adminToken, lowermanagersession, managerToken)
        }
    }, [])

    const generateHtmlTemplate = (customer, lowerManagerName, lowerManagerEmail) => {
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
        <h2>Customer Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          A new customer has been Deleted by <br>
          <strong>Manager Name :</strong> ${lowerManagerName} <br>
          <strong>Manager Email : </strong>${lowerManagerEmail} and requires your action.
        </p>
        <p><strong>Customer ID:</strong> ${customer.customerid} <br>
        <strong>Customer Name:</strong> ${customer.firstname} ${customer.lastname} <br>
        <strong>Customer Email:</strong>${customer.email}</p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };



    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">All Customer</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customer_ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Redeem Point</th>
                                    <th className="px-4 py-2 text-left font-semibold">View Sale</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {customersdata.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span className="dark:text-white">
                                                    {customer.firstname} {customer.lastname}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{customer.email}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.customerid}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer?.company[0]?.name}</td>
                                        <td className="px-4 py-3 dark:text-white">{customer.status}</td>
                                        <td className="px-4 py-2 text-left font-semibold">
                                            <Link
                                                to={"/LowerManagerlayout/redeem-point"}
                                                state={{
                                                    LManagerCustomerId: customer._id,
                                                }}
                                            >
                                                <button className="flex items-center gap-1 rounded bg-green-500 w-32 py-1 text-white pl-2">
                                                    <EyeIcon size={20} />Redeem Point
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 text-left font-semibold">
                                            <Link
                                                to={"/LowerManagerlayout/singlecustsaleform"}
                                                state={{Lcustomerid:customer._id}}
                                            >
                                                <button className="flex items-center gap-1 rounded bg-yellow-500 pl-5 py-1 text-white w-32">
                                                    <EyeIcon size={20} />View Sale
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <Link to={"/LowerManagerlayout/manage-customer"}
                                                state={{
                                                    LManagerCustId: customer._id
                                                }}>
                                                <button className="my-1 flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                                    <PencilLine size={16} /> Manage
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => { rejectCustomer(customer._id, managerdata[0]?.email, customer, customer.manager, customer.managerEmail) }}
                                                className="my-1 flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white"
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

export default LowerManagerCustomer;
