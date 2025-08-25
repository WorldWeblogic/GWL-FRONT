import React, { useRef, useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddCompany = () => {
    const { fetchallcompany, lowermanager, managerdata, fetchallmanager, fetchlowermanagerData } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const lowermanagertoken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");
    const phone = useRef();
    const [emiratesId, setEmiratesId] = useState("");
    const [data, setData] = useState({
        name: "",
        companyId: "",
        email: "",
        phone: "",
        companyaddress: "",
        employeeid: "",
    });

    const [pdf1, setPdf1] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumber = (e) => {
        const sanitized = e.target.value.replace(/[^0-9-]/g, "");
        phone.current.value = sanitized;
    };

    const getComId = async () => {
        try {
            const response = await API.get("/getLastComId");
            const nextNumber = parseInt(response.data.lastComId.replace("COM", "")) + 1;
            setData((prev) => ({
                ...prev,
                companyId: "COM" + String(nextNumber).padStart(2, "0"),
            }));
        } catch (err) {
            toast.error("Failed to fetch Company ID");
        }
    };

    const handleSubmit = async (e, company, superManagerEmail) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.phone || !data.companyaddress || !data.employeeid) {
            return toast.error("Please fill all fields");
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("pdf1", pdf1);
        formData.append("emetID", emiratesId);

        formData.append(
            "manager",
            lowermanager?.firstname && lowermanager?.lastname
                ? `${lowermanager.firstname} ${lowermanager.lastname}`
                : "Created by Super Manager / Admin"
        );
        formData.append("managerEmail", lowermanager.email);

        try {
            await API.post("/create-company", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            toast.success("Adding company notification send for approval send to super manager!");
            await fetchallcompany(adminToken, lowermanagertoken, managerToken);
            setData({
                name: "",
                companyId: "",
                email: "",
                phone: "",
                companyaddress: "",
                employeeid: "",
            });
            setPdf1(null);
            getComId();
            getEmiratesID();
            lowermanagersession ? await handleSendMail(company, superManagerEmail) : null
        } catch (err) {
            toast.error(err.response?.data?.message || "Error occurred");
        }
    };

    const handleSendMail = async (company, superManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required: Please Review New Company Add Request",
                html: generateHtmlTemplate(company)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    const getEmiratesID = async () => {
        const response = await API.get("/getEId");
        setEmiratesId(response.data.emetID);
    }

    const generateHtmlTemplate = (company) => {
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
        background-color:rgb(55, 105, 180);
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
        <h2>Company Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          A new company has been added by <br>
          <strong>Manager Name :</strong> ${lowermanager.firstname} ${lowermanager.lastname} <br>
          <strong>Manager Email : </strong>${lowermanager.email} and requires your action.
        </p>
        <p><strong>Company ID:</strong> ${company.companyId} <br>
        <strong>Company Name:</strong> ${company.name} </p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };

    useEffect(() => {
        getComId();
        getEmiratesID();
        fetchallmanager(adminToken, lowermanagertoken, managerToken);
        fetchlowermanagerData(null, lowermanagersession)
    }, []);

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Company</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company ID</label>
                            <input
                                type="text"
                                name="companyId"
                                value={data.companyId}
                                readOnly
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                ref={phone}
                                maxLength={14}
                                value={data.phone}
                                onChange={(e) => {
                                    handleNumber(e);
                                    handleChange(e);
                                }}
                                placeholder="Phone"
                                className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Employee ID</label>
                            <input
                                type="text"
                                name="employeeid"
                                value={data.employeeid}
                                onChange={handleChange}
                                placeholder="Employee ID"
                                className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Upload Certificate</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPdf1(e.target.files[0])}
                                className="w-full rounded border px-3 py-2 dark:text-white shadow"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 dark:text-white">Emirates ID</label>
                        <input
                            type="id"
                            name="id"
                            value={emiratesId}
                            onChange={handleChange}
                            readOnly
                            className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="mb-1 dark:text-white">Company Address</label>
                        <textarea
                            rows={4}
                            name="companyaddress"
                            value={data.companyaddress}
                            onChange={handleChange}
                            placeholder="Company Address"
                            className="w-full rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={(e) => { handleSubmit(e, data, managerdata[0]?.email) }}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddCompany;
