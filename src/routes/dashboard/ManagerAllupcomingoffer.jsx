import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const Allupcomingoffer = () => {
    const { Upcomimgofferdata, fetchupcomingalloffer, employeeUpcomimgofferdata, fetchemployeeallupcomingoffer } = useAuth();
    useOfferSync(fetchupcomingalloffer, fetchemployeeallupcomingoffer);
     const managertoken = localStorage.getItem("managertoken");
                useEffect(() => {
                    if (managertoken) {
                        fetchupcomingalloffer(managertoken);
                        fetchemployeeallupcomingoffer(managertoken);
                    }
                }, [])

    const [expandedOffers, setExpandedOffers] = useState({});
    // customer upcoming offer soft delete
    const softdeleteoffer = async (id) => {
        try {
            await API.patch(
                `/upcomingdelete-offer/${id}`,
                null, // no request body
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("Upcoming offer deleted Successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error(err);
        }
    };
    // approve offer
    const approveoffer = async (id) => {
        try {
            const response = await API.put(`/approveupcomingoffer/${id}`);
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
    // decline offer
    const declineoffer = async (id) => {
        try {
            const response = await API.put(`/rejectupcomingoffer/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success(response.data.message); // use backend message directly
        } catch (err) {
            const errorMessage = err.response?.data?.message || "reject failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // soft delete employee upcoming offer
    const employeesoftdeleteoffer = async (id) => {
        try {
            await API.patch(
                `/upcomingdelete-employee-offer/${id}`,
                null, // no request body
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("Employee Upcoming offer deleted Successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    // approve offer
    const approveupcomingoffer = async (id) => {
        try {
            const response = await API.put(`/approveemployeeupcomingoffer/${id}`);
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
    // decline offer
    const declineupcomingoffer = async (id) => {
        try {
            const response = await API.put(`/rejectemployeeupcomingoffer/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success(response.data.message); // use backend message directly
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

    const handleSendMail = async (action, managerEmail, managerName, offerName, offerDescription, offerid, offerType) => {
        try {
            let managerSubject = "";
            let managerHtml = "";
            const typeLabel = offerType === "Customer" ? "Customer" : "Employee";

            if (action === "approve") {
                managerSubject = `You ${typeLabel} upcoming Offer has been Approved.`;
                managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <tr>
          <td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
            Upcoming Offer Approved
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
            Your ${typeLabel} upcoming offer has been approved. <br>
              <strong> Offer Id : </strong>${offerid} <br>
               <strong>Offer Name : </strong>${offerName}<br>
            <strong>  Offer Description : </strong> ${offerDescription}
            </p>

            <p style="margin:0;">Thank you for your action.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
                                `;
            }

            if (action === "decline") {
                managerSubject = `Your ${typeLabel} upcoming offer has been declined.`;
                managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <tr>
          <td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
             Upcoming Offer Declined
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

           <p style="margin:0 0 12px 0;">
            Your ${typeLabel} upcoming offer has been declined.<br>
              <strong> Offer Id : </strong>${offerid} <br>
               <strong>Offer Name : </strong>${offerName}
            </p>
            <p style="margin:0;">Thank you for your action.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
                                `;
            }

            if (action === "delete") {
                managerSubject = `Your ${typeLabel} upcoming offer has been deleted.`;
                managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <tr>
          <td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
             Upcoming Offer Deleted
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>
          <p style="margin:0 0 12px 0;">
           Your ${typeLabel} upcoming offer has been deleted.<br>
              <strong> Offer Id : </strong>${offerid} <br>
               <strong>Offer Name : </strong>${offerName}<br>
            <strong>  Offer Description : </strong> ${offerDescription} 
            </p>
            <p style="margin:0;">Thank you for your action.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
                                `;
            }

            //Send to manager for all actions
            await API.post("/send-mail", {
                to: [managerEmail],
                subject: managerSubject,
                html: managerHtml,
            });

            toast.success("Mail sent successfully!");
        } catch (error) {
            console.error("Mail send error:", error);
            toast.error("Failed to send email");
        }
    };
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Upcoming Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {Upcomimgofferdata.length} Upcoming Offers </p>
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
                            {Upcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`]
                                                        ? customer.offerDescription
                                                        : truncateText(customer.offerDescription, 20)}
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
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.offerid}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.status}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.manager}</td>

                                    <td className="flex gap-2 px-4 py-3">
                                        <button
                                            onClick={() => {
                                                approveoffer(customer._id);
                                                handleSendMail(
                                                    "approve",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Customer"
                                                );
                                            }}
                                            className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                        >
                                            <PencilLine size={16} /> Approve
                                        </button>
                                        <button
                                            onClick={() => {
                                                declineoffer(customer._id);
                                                handleSendMail(
                                                    "decline",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Customer"
                                                );
                                            }}
                                            className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                        >
                                            <Trash size={16} /> Decline
                                        </button>
                                        <button
                                            onClick={() => {
                                                softdeleteoffer(customer._id);
                                                handleSendMail(
                                                    "delete",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Customer"
                                                );
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
            {/* employee offer */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Upcoming Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {employeeUpcomimgofferdata.length} Upcoming Offers </p>
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
                            {employeeUpcomimgofferdata.map((customer, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-medium text-slate-900 dark:text-slate-50">{customer.offerTitle}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {expandedOffers[`latest-${customer._id}`]
                                                        ? customer.offerDescription
                                                        : truncateText(customer.offerDescription, 20)}
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
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.offerid}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.startDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">
                                        {customer.endDate.slice(0, 10).split("-").reverse().join("-")}
                                    </td>

                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.status}</td>
                                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{customer.manager}</td>

                                    <td className="flex gap-2 px-4 py-3">
                                        <button
                                            onClick={() => {
                                                approveupcomingoffer(customer._id);
                                                handleSendMail(
                                                    "approve",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Employee"
                                                );
                                            }}
                                            className="my-2 flex items-center gap-1 rounded bg-green-500 px-4 py-1 text-white"
                                        >
                                            <PencilLine size={16} /> Approve
                                        </button>
                                        <button
                                            onClick={() => {
                                                declineupcomingoffer(customer._id);
                                                handleSendMail(
                                                    "decline",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Employee"
                                                );
                                            }}
                                            className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                        >
                                            <Trash size={16} /> Decline
                                        </button>
                                        <button
                                            onClick={() => {
                                                employeesoftdeleteoffer(customer._id);
                                                handleSendMail(
                                                    "delete",
                                                    customer.managerEmail,
                                                    customer.manager,
                                                    customer.offerTitle,
                                                    customer.offerDescription,
                                                    customer.offerid,
                                                    "Employee"
                                                );
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
            <Footer />
        </div>
    );
};

export default Allupcomingoffer;
