import { Footer } from "@/layouts/footer";
import { PencilLine, Trash } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import useOfferSync from "../../hooks/useOfferSync";
import { BASE_URL } from "../../API/Api";

const CompanyPage = () => {
    const { companydata, fetchallcompany } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");
    const [showPdfUrl, setShowPdfUrl] = useState(null);

    useOfferSync(null, null, null, null, fetchallcompany);

    const softdeletecompany = async (id) => {
        try {
            const response = await API.patch(
                `/softdelete-company/${id}`,
                null, // no request body
            );
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            toast.success("company deleted Successfully!");
        } catch (err) {
            const message = "deletion failed";
            toast.error(message);
            console.error("delete error:", err);
        }
    };
    // approve company
    const approvecompany = async (id) => {
        try {
            const response = await API.put(`/approvecompany/${id}`);
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
    // decline company
    const declinecompany = async (id) => {
        try {
            const response = await API.put(`/rejectcompany/${id}`);
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close(); // or your function to refresh customer list
            toast.success(response.data.message); // Show success message from backend
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Decline failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    // get all request
    const [request, setrequest] = useState([]);
    const getallrequest = async () => {
        try {
            const response = await API.get("/allcompanyrequest");
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

    const handlePointAction = async (id, approved, companyEmail, companyName, managerName, companyId, points, managerEmail) => {
        try {
            const response = await API.post(`/reviewpoints/${id}`, { approved });
            toast.success(response.data.message);
            await getallrequest();
            const bc = new BroadcastChannel("offer_status_channel");
            bc.postMessage({ type: "OFFER_STATUS_UPDATED" });
            bc.close();
            const action = approved ? "approvePoint" : "declinePoint";
            handleSendMail(action, companyEmail, companyName, managerName, companyId, points, managerEmail);
        } catch (err) {
            toast.error(err);
            console.error(err);
        }
    };

    const handleSendMail = async (action, managerEmail, companyEmail, companyName, managerName, companyId, points) => {
        try {
            let companySubject = "";
            let companyHtml = "";
            let managerSubject = "";
            let managerHtml = "";
            let companyPointSubject = "";
            let companyPointHtml = "";

            if (action === "approvePoint") {
                companyPointSubject = "Your Points Have Been Approved.";
                companyPointHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Company Points Approved</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <p style="margin:0 0 12px;">Your points have been <strong>approved</strong>.<br/>
           <strong>Company ID:</strong> ${companyId}</p><br>
           <strong>Point :</strong> ${points}<br>
        <p style="margin:0;">Thank you.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;

                managerSubject = "Your Company Points Have Been Approved.";
                managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Company Points Approved</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <h2 style="margin:0 0 16px;font-size:18px;">Hello ${managerName}</h2>
        <p style="margin:0 0 12px;">Your Company points have been <strong>approved</strong>.<br/>
           <strong>Company ID:</strong> ${companyId}</p><br>
           <strong>Point :</strong> ${points}<br>
        <p style="margin:0;">Thank you.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
            }

            /* ---------- POINTS: DECLINE ---------- */
            if (action === "declinePoint") {
                managerSubject = "Your Company Points Request Has Been Declined.";
                managerHtml = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
      <tr><td style="background:#e74c3c;border-top-left-radius:6px;border-top-right-radius:6px;padding:16px 24px;text-align:center;">
        <h2 style="margin:0;font-size:20px;color:#fff;">Company Points Declined</h2>
      </td></tr>
      <tr><td style="padding:24px;font-size:14px;color:#333;">
        <h2 style="margin:0 0 16px;font-size:18px;">Hello ${managerName}</h2>
        <p style="margin:0 0 12px;">Unfortunately, your recent <strong>points request</strong> has been declined.<br/>
           <strong>Company ID:</strong> ${companyId}<br>
           <strong>Point :</strong> ${points}<br>
        <p style="margin:0;">If you have any questions, please contact your manager.</p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
            }

            if (action === "approve") {
                companySubject = "Your Registration Has Been Approved!";

                companyHtml = `
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
              Your Registration Has Been Approved
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${companyName},</h2>

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

                managerSubject = "You Company has been Approved.";
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
              Company Approved
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your Company : <strong>${companyName} has been approved.</strong>.
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
                managerSubject = "Your Company Has Been Declined.";
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
              Company Declined
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>

            <p style="margin:0 0 12px 0;">
              Your Company <strong>${companyName}</strong> has been declined.
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
                managerSubject = "Your Company Has Been Deleted.";
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
              Company Deleted
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">Hello ${managerName},</h2>
            <p style="margin:0 0 12px 0;">
              Your Company <strong>${companyName}</strong> has been deleted.
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

            // Send to company only if approved
            if (action === "approve") {
                await API.post("/send-mail", {
                    to: [companyEmail],
                    subject: companySubject,
                    html: companyHtml,
                });
            }

            // Send to company and lowerManager only if approved
            if (action === "approvePoint") {
                await API.post("/send-mail", {
                    to: [companyEmail],
                    subject: companyPointSubject,
                    html: companyPointHtml,
                });
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

    useEffect(() => {
        if (managerToken || lowerManagerToken || adminToken) {
            fetchallcompany(adminToken, lowerManagerToken, managerToken);
        }
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Company Notification</h1>
                <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                    <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                        <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {companydata.length} Company</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">#</th>
                                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers</th>
                                    <th className="px-4 py-2 text-left font-semibold">Customers_Id</th>
                                    <th className="px-4 py-2 text-left font-semibold">Points</th>
                                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                                    <th className="px-4 py-2 text-left font-semibold">Manager_Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Company Cretificate</th>
                                    <th className="px-4 py-2 text-left font-semibold">Emirates ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {companydata.map((company, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                        <td className="px-4 py-3 dark:text-white">{company?.name}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.companyId}</td>
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx}>
                                                    {data.firstname} {data.lastname}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.customers.map((data, idx) => (
                                                <div key={idx}>{data.customerid}</div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{company.points}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{company.manager}</td>

                                        {/* SHOW PDF BUTTON */}
                                        <td className="px-4 py-3 dark:text-white">
                                            {company.pdf1Path ? (
                                                <button
                                                    target="_blank"
                                                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                                                    onClick={() => setShowPdfUrl(`${BASE_URL}${company.pdf1Path}`)}
                                                >
                                                    Show PDF
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">No File</span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 dark:text-white">{company.emetID}</td>

                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    approvecompany(company._id);
                                                    handleSendMail("approve", company.managerEmail, company.email, company.name, company.manager);
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => {
                                                    declinecompany(company._id);
                                                    handleSendMail("decline", company.managerEmail, company.email, company.name, company.manager);
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-orange-500 px-4 py-1 text-white"
                                            >
                                                <Trash size={16} /> Decline
                                            </button>
                                            <button
                                                onClick={() => {
                                                    softdeletecompany(company._id);
                                                    handleSendMail("delete", company.managerEmail, company.email, company.name, company.manager);
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

                {/* company points */}
                <h1 className="mb-4 mt-4 text-2xl font-bold text-gray-800 dark:text-white">Approve Company points</h1>
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
                                    <th className="px-4 py-2 text-left font-semibold">Company_ID</th>
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
                                                <span className="dark:text-white">{data.company?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 dark:text-white">{data.companyId}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.value}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.status}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.type}</td>
                                        <td className="px-4 py-3 dark:text-white">{data.manager}</td>
                                        <td className="flex gap-2 px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    handlePointAction(
                                                        data._id,
                                                        true,
                                                        data.company?.email,
                                                        data.company?.name,
                                                        data.manager,
                                                        data.companyId,
                                                        data.value,
                                                        data.managerEmail,
                                                    );
                                                }}
                                                className="my-2 flex items-center gap-1 rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                <PencilLine size={16} /> Approve
                                            </button>

                                            <button
                                                onClick={() => {
                                                    handlePointAction(
                                                        data._id,
                                                        false,
                                                        data.company?.email,
                                                        data.company?.name,
                                                        data.manager,
                                                        data.companyId,
                                                        data.value,
                                                        data.managerEmail,
                                                    );
                                                }}
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
            {/* PDF Modal Viewer */}
            {showPdfUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-11/12 max-w-3xl rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800">
                        <button
                            className="absolute right-2 top-2 text-xl font-bold text-red-600"
                            onClick={() => setShowPdfUrl(null)}
                        >
                            ✖
                        </button>
                        <h2 className="mb-4 text-lg font-semibold dark:text-white">PDF Preview</h2>
                        <iframe
                            src={showPdfUrl}
                            title="PDF Viewer"
                            width="100%"
                            height="500px"
                            className="rounded border"
                        ></iframe>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default CompanyPage;
