import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const LowerManagerAllupcomingoffer = () => {
    const { Upcomimgofferdata, fetchupcomingalloffer, employeeUpcomimgofferdata, fetchemployeeallupcomingoffer, managerdata, fetchallmanager } = useAuth()

    useOfferSync(null, null, null, null, null, fetchupcomingalloffer, fetchemployeeallupcomingoffer);
    const [expandedOffers, setExpandedOffers] = useState({});
    const lowermanagertoken = localStorage.getItem("lowermanagertoken")
    const managertoken = localStorage.getItem("managertoken");
    const admintoken = localStorage.getItem("admintoken");

    useEffect(() => {
        if (lowermanagertoken) {
            fetchallmanager(admintoken, lowermanagertoken, managertoken);
            fetchupcomingalloffer(null, lowermanagertoken);
            fetchemployeeallupcomingoffer(null, lowermanagertoken);
        }
    }, []);

    // delete upcomingoffer
    const deleteoffer = async (id, offer, superManagerEmail) => {
        try {
            const response = await API.put(`/deleteupcomingoffer/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("Delete request of customer upcoming offer send to super manager successfully");
            await handleSendMail(offer, superManagerEmail);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "delete failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // delte employee upcoming offer
    const deleteemployeeoffer = async (id, offer, superManagerEmail) => {
        try {
            const response = await API.put(`/deleteemployeeupcomingoffer/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("Delete request of employee upcoming offer send to super manager successfully");
            await handleSendMail(offer, superManagerEmail);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    const truncateText = (text, length = 20) => (text.length > length ? text.slice(0, length) + "..." : text);
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSendMail = async (offer, superManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Deleting upcoming offer came for Approval",
                html: generateHtmlTemplate(offer)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };


    const generateHtmlTemplate = (offer) => {
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
        <h2>Upcoming Offer Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          Upcoming Offer has been deleted by 
          <strong>${offer.manager}</strong><br>
          <strong>${offer.managerEmail}</strong> and requires your action.
        </p>
        <p><strong>Offer Id:</strong>${offer.offerid}</p>
        <p><strong>Offer Name:</strong> ${offer.offerTitle}</p>
        <p><strong>Offer Description:</strong> ${offer.offerDescription}</p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };


    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Upcoming Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {Upcomimgofferdata.length} Upcoming Offers </p>
                    <Link to={"/LowerManagerlayout/add-upcomingoffers"}><button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Offer</button></Link>
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
                            {Upcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link to={"/LowerManagerlayout/edit-upcomingoffers"}
                                            state={{ LManagerCustUpOffer: customer._id }}
                                        ><button className="flex items-center gap-1 px-3 py-1 my-3 bg-blue-500 text-white rounded">
                                                <PencilLine size={16} /> Manage
                                            </button></Link>
                                        <button onClick={() => {
                                            deleteoffer(customer._id,
                                                customer, managerdata[0]?.email
                                            )
                                        }}
                                            className="flex items-center gap-1 px-3 py-1 my-3 bg-red-500 text-white rounded">
                                            <Trash size={16} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Upcoming Offers</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing {employeeUpcomimgofferdata.length} Upcoming Offers </p>
                    <Link to={"/LowerManagerlayout/add-employee-upcomingoffers"}><button className="bg-green-500 py-1 px-2 rounded-full hover:bg-green-600 text-white font-medium">Add Offer</button></Link>
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
                            {employeeUpcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`] ? customer.offerDescription : truncateText(customer.offerDescription, 20)}
                                                    {customer.offerDescription.length > 20 && (
                                                        <button
                                                            onClick={() => toggleDescription(`latest-${customer._id}`)}
                                                            className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                        >
                                                            {expandedOffers[`latest-${customer._id}`] ? " Show Less" : " Show More"}
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.offerid}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.startDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.endDate.slice(0, 10).split("-").reverse().join("-")}</td>
                                    <td className="font-medium text-slate-900 dark:text-slate-50 px-4 py-3">{customer.status}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link to={"/LowerManagerlayout/edit-employee-upcomingoffers"}
                                            state={{ LManagerEmpUpOffer: customer._id }}
                                        ><button className="flex items-center gap-1 px-3 py-1 my-3 bg-blue-500 text-white rounded justify-center text-center">
                                                <PencilLine size={16} /> Manage
                                            </button></Link>
                                        <button onClick={() => {
                                            deleteemployeeoffer(customer._id,
                                                customer, managerdata[0]?.email
                                            )
                                        }} className="flex items-center gap-1 px-3 py-1 my-3 bg-red-500 text-white rounded">
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

export default LowerManagerAllupcomingoffer;



