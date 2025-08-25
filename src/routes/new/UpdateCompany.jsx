import { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const UpdateCompany = () => {
    const { fetchallcompany, lowermanager, managerdata } = useAuth();
    const [companyId, setcompanyId] = useState('');
    const [type, setType] = useState('add');
    const [value, setValue] = useState('');
    const [notification, setnotification] = useState("");
    const [pdf1, setPdf1] = useState(null);

    const [data, setData] = useState({
        name: "",
        companyId: "",
        phone: "",
        email: "",
        companyaddress: "",
        employeeid: ""
    });

    const location = useLocation();
    const { LManagerCustId } = location.state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleUpdateCompany = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("companyId", data.companyId);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("employeeid", data.employeeid);
        formData.append("companyaddress", data.companyaddress);

        if (pdf1) formData.append("pdf1", pdf1);

        try {
            await API.put(`/updatecompany/${data.companyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            toast.success("Successfully updated!");
            await fetchallcompany();

            // Reset
            setPdf1(null);
            setData({
                name: "",
                companyId: "",
                email: "",
                phone: "",
                employeeid: "",
                companyaddress: ""
            });

        } catch (err) {
            toast.error("Update failed");
            console.error("update error:", err);
        }
    };



    const getCompany = async () => {
        try {
            const res = await API.get(`/getCompany/${LManagerCustId}`);
            setData({
                name: res.data.compData.name,
                companyId: res.data.compData.companyId,
                email: res.data.compData.email,
                phone: res.data.compData.phone,
                companyaddress: res.data.compData.companyaddress,
                emiratesId: res.data.compData.emetID
            })

        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }

    }

    useEffect(() => {
        getCompany()
    }, [])


    const handlePointSubmit = async (e, points, superManagerEmail, message, compamyId, superManagerName) => {
        e.preventDefault()
        try {
            const response = await API.post('/companypoints',
                {
                    companyId: data.companyId,
                    type,
                    value: parseInt(value),
                    notification,
                    manager: `${lowermanager.firstname} ${lowermanager.lastname}`,
                    managerEmail: lowermanager.email
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setcompanyId("");
            setType("");
            setValue("");
            setnotification("");
            toast.success('Request sent for admin approval');
            handleSendMail(points, message, superManagerEmail, compamyId, superManagerName);
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.error(err);
        }
    };

    const handleSendMail = async (points, message, superManagerEmail, compamyId, superManagerName) => {
        try {
            /* ----------  POINTS‑APPROVAL EMAIL  ---------- */
            const approvalSubject = "Company Points Request";
            const approvalHtml = `
<!-- wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7fa;padding:24px 0;">
  <tr>
    <td align="center">
      <!-- card -->
      <table cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border:1px solid #d9d9d9;border-radius:6px;
                    font-family:Arial,Helvetica,sans-serif;background:#ffffff;">
        <!-- blue header bar -->
        <tr>
          <td style="background:#2f67bd;border-top-left-radius:6px;border-top-right-radius:6px;
                     padding:16px 24px;text-align:center;">
            <h2 style="margin:0;font-size:20px;line-height:24px;color:#ffffff;">
              Points Approval Needed
            </h2>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="padding:24px;font-size:14px;line-height:20px;color:#333333;">
            <h2 style="margin:0 0 16px 0;font-size:18px;line-height:22px;">
              Hello ${superManagerName},
            </h2>

            <p style="margin:0 0 12px 0;">
              <strong>${lowermanager?.firstname} ${lowermanager?.lastname}</strong> has submitted company points request for approval.
            </p>

            <p style="margin:0 0 12px 0;">
              <strong>Company Id ID:</strong> ${compamyId}<br>
              <strong>Points Requested:</strong> ${points}<br>
              <strong>Message:</strong> ${message}
            </p>

            <p style="margin:0;">Please review and approve or decline this request at your earliest convenience.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;
            await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: approvalSubject,
                html: approvalHtml,
            });
            toast.success("Mail Sent");
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };



    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            {sessionStorage.getItem("adminid") || sessionStorage.getItem("managerid") ? (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Company</h1>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">

                        <form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* First and Last Name */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={handleChange}
                                        name="name"
                                        id="name"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Company ID</label>
                                    <input
                                        type="text"
                                        placeholder="Company ID"
                                        value={data.companyId}
                                        onChange={handleChange}
                                        name="companyId"
                                        id="companyId"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        name="email"
                                        id="email"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Phone</label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={data.phone}
                                        maxLength={14}
                                        onChange={handleChange}
                                        name="phone"
                                        id="phone"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="employee Id"
                                        value={data.employeeid}
                                        onChange={handleChange}
                                        name="employeeid"
                                        id="employeeid"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Upload Certificate</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setPdf1(e.target.files[0])}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow dark:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500 bg-white"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 mt-3 dark:text-white">Company address</label>
                                <textarea
                                    rows={4}
                                    placeholder="Company address"
                                    name="companyaddress"
                                    id="companyaddress"
                                    value={data.companyaddress}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={handleUpdateCompany}>Submit</button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (

                <>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Company</h1>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">

                        <form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* First and Last Name */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={handleChange}
                                        name="name"
                                        id="name"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Company ID</label>
                                    <input
                                        type="text"
                                        placeholder="Company ID"
                                        value={data.companyId}
                                        onChange={handleChange}
                                        name="companyId"
                                        id="companyId"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        name="email"
                                        id="email"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Phone</label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={data.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        id="phone"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="employee Id"
                                        value={data.employeeid}
                                        onChange={handleChange}
                                        name="employeeid"
                                        id="employeeid"
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Upload Certificate</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setPdf1(e.target.files[0])}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow dark:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500 bg-white"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 mt-3 dark:text-white">Company address</label>
                                <textarea
                                    rows={4}
                                    placeholder="Company address"
                                    name="companyaddress"
                                    id="companyaddress"
                                    value={data.companyaddress}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={handleUpdateCompany}>Submit</button>
                            </div>
                        </form>
                    </div>


                    {/* give points */}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">New Points</h1>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                        <form >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Company_Id</label>
                                    <input type="text"
                                        placeholder="Company ID"
                                        value={data.companyId}
                                        readOnly
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Points</label>
                                    <input
                                        type="number"
                                        placeholder="Points"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 mt-3 dark:text-white">Notification</label>
                                <textarea
                                    rows={3}
                                    placeholder="Notification"
                                    name="notification"
                                    id="notification"
                                    value={notification}
                                    onChange={(e) => setnotification(e.target.value)}
                                    className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                                />
                            </div>

                            <select value={type} onChange={(e) => setType(e.target.value)}
                                className="mt-4 p-1">
                                <option value="add">Add</option>
                                <option value="deduct">Deduct</option>
                            </select>

                            <div className="mt-6">
                                <button
                                    onClick={(e) => {
                                        handlePointSubmit
                                            (e, value, managerdata[0]?.email, notification, data.companyId,
                                                `${managerdata[0]?.firstname} ${managerdata[0]?.lastname}`);
                                    }}
                                    className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
};

export default UpdateCompany;
