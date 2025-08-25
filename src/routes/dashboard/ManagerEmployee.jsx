import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";

const ManagerEmployee = () => {
  const { employeedata, fetchallemployee } = useAuth();
  const managerToken = localStorage.getItem("managertoken");
  const lowerManagerToken = localStorage.getItem("lowermanagertoken");
  const adminToken = localStorage.getItem("admintoken");

  useOfferSync(null, null, null, fetchallemployee);
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


  const handleAction = async (id, approved, data) => {
    try {
      const response = await API.post(`/review/${id}`, { approved });
      toast.success(response.data.message);
      await getallrequest();
      const bc = new BroadcastChannel("offer_status_channel");
      bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
      bc.close();
      const action = approved ? 'approvePoint' : 'declinePoint';
      handleSendMail(action, data.employee.managerEmail, data.employee.email, data.employee.firstname, data.employee.manager, data.value, data.type, data.employee.employeeid)
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };


  const handleSendMail = async (action, managerEmail, employeeEmail, employeeName, managerName, employeePoints, pointType, employeeId) => {
    try {
      let employeeSubject = "";
      let employeeHtml = "";
      let managerSubject = "";
      let managerHtml = "";
      let employeePointSubject = "";
      let employeePointHtml = ""

      if (action === "approve") {
        employeeSubject = "Your Registration Has Been Approved!";

        employeeHtml = `
<!-- wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <!-- card -->
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <!-- blue banner -->
        <tr>
          <td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
              Your Registration Has Been Approved!
            </h2>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${employeeName},</h2>

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

        managerSubject = "Your Employee has been Approved.";
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
              Employee Approved
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your Employee : <strong>${employeeName} has been approved.</strong>.<br>
               Employee Id : <strong>${employeePoints}</strong>.
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
        managerSubject = "Your Employee Has Been Declined.";
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
              Employee Declined
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your Employee <strong>${employeeName}</strong> has been declined.<br>
               Employee Id : <strong>${employeePoints}</strong>.
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
        managerSubject = "Your Employee Has Been Deleted.";
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
              Employee Deleted
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>
            <p style="margin:0 0 12px 0;">
              Your employee <strong>${employeeName}</strong> has been deleted.<br>
               Employee Id : <strong>${employeePoints}</strong>.
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



      if (action === "approvePoint") {
        employeePointSubject = "Your Points Have Been Approved.";
        employeePointHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Employee Points Approved</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <h2 style="margin:0 0 16px;font-size:18px;">Hello ${employeeName}</h2>
        <p style="margin:0 0 12px;">Your points have been <strong>approved</strong>.<br/>
           <strong>Employee ID:</strong> ${employeeId}</p><br>
           <strong>Point :</strong> ${employeePoints}<br>
           <strong>Action Type:</strong> ${pointType}</p>
        <p style="margin:0;">Thank you.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;

        managerSubject = "Your Employee Points Have Been Approved.";
        managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Employee Points Approved</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <h2 style="margin:0 0 16px;font-size:18px;">Hello ${managerName}</h2>
        <p style="margin:0 0 12px;">Your Employee points have been <strong>approved</strong>.<br/>
           <strong>Employee Name:</strong> ${employeeName}</p><br>
           <strong>Employee ID:</strong> ${employeeId}</p><br>
           <strong>Point :</strong> ${employeePoints}<br>
           <strong>Action Type:</strong> ${pointType}</p>
        <p style="margin:0;">Thank you.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
      }

      /* ---------- POINTS: DECLINE ---------- */
      if (action === "declinePoint") {
        managerSubject = "Your Employee Points Request Has Been Declined.";
        managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Employee Points Declined</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <h2 style="margin:0 0 16px;font-size:18px;">Hello ${managerName}</h2>
        <p style="margin:0 0 12px;">Unfortunately, your recent <strong>points request</strong> has been declined.<br/>
           <strong>Employee ID:</strong> ${employeeName}<br>
           <strong>Point :</strong> ${employeePoints}<br>
           <strong>Action Type:</strong> ${pointType}</p>
        <p style="margin:0;">If you have any questions, please contact your manager.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
      }




      // Send to employee only if approved
      if (action === "approve") {
        await API.post("/send-mail", {
          to: [employeeEmail],
          subject: employeeSubject,
          html: employeeHtml
        });
      }

      if (action === "approvePoint") {
        await API.post("/send-mail", {
          to: [employeeEmail],
          subject: employeePointSubject,
          html: employeePointHtml
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
      fetchallemployee(adminToken, lowerManagerToken, managerToken);
    }
    getallrequest();
  }, [])



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
                          {employee?.firstname} {employee?.lastname}
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
                          handleSendMail(
                            "approve",
                            employee.managerEmail,
                            employee.email,
                            `${employee.firstname} ${employee.lastname}`,
                            employee.manager, employee.employeeid);
                        }}
                        className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                      >
                        <PencilLine size={16} /> Approve
                      </button>

                      <button
                        onClick={() => {
                          declineEmployee(employee._id);
                          handleSendMail("decline",
                            employee.managerEmail,
                            employee.email,
                            `${employee.firstname} ${employee.lastname}`,
                            employee.manager, employee.employeeid);
                        }}
                        className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                      >
                        <Trash size={16} /> Decline
                      </button>
                      <button
                        onClick={() => {
                          softdeleteemployee(employee._id);
                          handleSendMail("delete",
                            employee.managerEmail,
                            employee.email,
                            `${employee.firstname} ${employee.lastname}`,
                            employee.manager, employee.employeeid);
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


        {/* ==========================================================================================*/}
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
                {request.slice().reverse().map((data, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="dark:text-white">
                          {data.employee?.firstname} {data.employee?.lastname}
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
                        onClick={() => {
                          handleAction(data._id, true, data)
                        }}
                        className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                      >
                        <PencilLine size={16} /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(data._id, false, data)}
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
