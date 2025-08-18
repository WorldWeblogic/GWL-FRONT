import { Footer } from "@/layouts/footer";
import { Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";
import { useEffect } from "react";

const ManagerCustomer = () => {
  const { customersdata, fetchalluser } = useAuth();
  useOfferSync(fetchalluser);
  const managerToken = localStorage.getItem("managertoken");
  const lowerManagerToken = localStorage.getItem("lowermanagertoken");
  const adminToken = localStorage.getItem("admintoken");

  const softdeleteCustomer = async (id) => {
    try {
      await API.patch(`/deleteuser/${id}`, null);
      broadcastUpdate();
      toast.success('Customer deleted Successfully!');
    } catch (err) {
      const message = err.response?.data?.message || "deletion failed";
      toast.error(message);
      console.error(err);
    }
  };

  const approveCustomer = async (id) => {
    try {
      const response = await API.put(`/approvecustomer/${id}`);
      broadcastUpdate();
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Approve failed";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const declineCustomer = async (id) => {
    try {
      const response = await API.put(`/rejectcustomer/${id}`);
      broadcastUpdate();
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Decline failed";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const broadcastUpdate = () => {
    const bc = new BroadcastChannel("offer_status_channel");
    bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
    bc.close();
  };

  const handleSendMail = async (action, customerEmail, managerEmail, customerName, managerName, customerId) => {
    try {
      let customerSubject = "";
      let customerHtml = "";
      let managerSubject = "";
      let managerHtml = "";

      if (action === "approve") {
        customerSubject = "Your Registration Has Been Approved!";
        customerHtml = `
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
              Your Registration Has Been Approved!
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${customerName},</h2>

            <p style="margin:0 0 12px 0;">
              We are pleased to inform you that your registration has been
              <strong>approved</strong> by our team.
            </p>
            <p style="margin:0 0 20px 0;">Welcome aboard!</p>
            <p style="margin:0;">Regards,<br/>Team</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;

        managerSubject = "Your Customer has been Approved.";
        managerHtml = `
<!-- wrapper -->
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
              Customer Approved
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>
            <p style="margin:0 0 12px 0;">
              Your Customer : <strong>${customerName} have approved.</strong>.<br>
               Customer Id : <strong>${customerId}</strong>.
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
        managerSubject = "Your Customer Has Been Declined.";
        managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <!-- red banner -->
        <tr>
          <td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
              Customer Declined
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your customer <strong>${customerName}</strong> has been declined.<br>
               Customer Id : <strong>${customerId}</strong>.
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
        managerSubject = "Your Customer Has Been Deleted.";

        managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <!-- card -->
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <!-- red banner -->
        <tr>
          <td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
              Customer Deleted
            </h2>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your customer <strong>${customerName}</strong> has been deleted.<br>
               Customer Id : <strong>${customerId}</strong>
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

      // Send to customer only if approved
      if (action === "approve") {
        await API.post("/send-mail", {
          to: [customerEmail],
          subject: customerSubject,
          html: customerHtml
        });
      }

      // Send to manager for all actions
      await API.post("/send-mail", {
        to: [managerEmail],
        subject: managerSubject,
        html: managerHtml
      });

      toast.success("Mail sent successfully!");
    } catch (error) {
      console.error("Mail send error:", error);
      toast.error("Failed to send email");
    }
  };


  useEffect(() => {
    if (managerToken || lowerManagerToken || adminToken) {
      fetchalluser(adminToken, lowerManagerToken, managerToken);
    }
  }, [])

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
                    <td className="px-4 py-3 dark:text-white">{customer.firstname} {customer.lastname}</td>
                    <td className="px-4 py-3 dark:text-white">{customer.email}</td>
                    <td className="px-4 py-3 dark:text-white">{customer.customerid}</td>
                    <td className="px-4 py-3 dark:text-white">{customer.manager}</td>
                    <td className="px-4 py-3 dark:text-white">{customer.status}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => {
                          approveCustomer(customer._id);
                          handleSendMail(
                            "approve",
                            customer.email,
                            customer.managerEmail,
                            `${customer.firstname} ${customer.lastname} `,
                            customer.manager,
                            customer.customerid
                          );
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded my-2"
                      >
                        <Trash size={16} /> Approve
                      </button>

                      <button
                        onClick={() => {
                          declineCustomer(customer._id);
                          handleSendMail(
                            "decline",
                            customer.email,
                            customer.managerEmail,
                            `${customer.firstname} ${customer.lastname} `,
                            customer.manager,
                            customer.customerid
                          );
                        }}
                        className="flex items-center gap-1 px-4 py-1 bg-orange-500 text-white rounded my-2"
                      >
                        <Trash size={16} /> Decline
                      </button>
                      <button
                        onClick={() => {
                          softdeleteCustomer(customer._id);
                          handleSendMail(
                            "delete",
                            customer.email,
                            customer.managerEmail,
                            `${customer.firstname} ${customer.lastname} `,
                            customer.manager,
                            customer.customerid
                          );
                        }}
                        className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded my-2"
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

export default ManagerCustomer;
