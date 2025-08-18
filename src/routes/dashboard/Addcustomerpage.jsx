import React, { useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddcustomerPage = () => {
    const { fetchalluser, managerdata, lowermanager, fetchallmanager, fetchlowermanagerData } = useAuth();
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const admintoken = localStorage.getItem("admintoken");
    const managertoken = localStorage.getItem("managertoken");
    const lowermanagertoken = localStorage.getItem("lowermanagertoken");
    const [company, setCompany] = useState([]);
    const [data, setdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        customerid: "",
        companyId: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlesubmit = async (e, superManagerEmail, customer) => {
        e.preventDefault();
        try {
            await API.post(
                "/signup",
                {
                    ...data,
                    manager:
                        lowermanager && lowermanager.firstname && lowermanager.lastname
                            ? `${lowermanager.firstname} ${lowermanager.lastname}`
                            : "Created by Super Manager / Admin",
                    managerEmail: lowermanager.email
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setdata({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                customerid: "",
                companyId: "",
            });
            await fetchalluser(admintoken, lowermanagertoken, managertoken);
            toast.success("customer created successfully !");

            lowermanagersession ? await handleSendMail(superManagerEmail, customer) : null
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message);
            console.error("Signup error:", err);
        }
        getCustId();
    };

    const getCustId = async () => {
        const response = await API.get("/getLastCustomerId");
        const nextNumber = parseInt(response.data.lastCusId.replace("CUS", "")) + 1;
        setdata({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            companyId: "",
            customerid: "CUS" + String(nextNumber).padStart(2, "0"),
        });
    };

    const getCompanyName = async (admintoken, managertoken, lowermanagertoken) => {
        const response = await API.get("/getallcompany", {
            headers: {
                Authorization: `Bearer ${admintoken || managertoken || lowermanagertoken}`,
            },
        });
        setCompany(response.data.company);
    };

    useEffect(() => {
        getCustId();
        getCompanyName(admintoken, managertoken, lowermanagertoken);
        fetchallmanager(admintoken, lowermanagertoken, managertoken)
        fetchlowermanagerData(admintoken, lowermanagersession, managertoken)
    }, []);

    const handleSendMail = async (superManagerEmail, customer) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required: Please Review Customer",
                html: generateHtmlTemplate(customer)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };


    const generateHtmlTemplate = (customer) => {
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
        <h2>Customer Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          A new customer has been added by <br>
          <strong>Manager Name :</strong> ${lowermanager.firstname} ${lowermanager.lastname} <br>
          <strong>Manager Email : </strong>${lowermanager.email} and requires your action.
        </p>
        <p><strong>Customer ID:</strong> ${customer.customerid} <br>
        <strong>Customer Name:</strong> ${customer.firstname} ${customer.lastname} <br>
        <strong>Customer Email: </strong>${customer.email}</p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Customer</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                name="firstname"
                                id="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                type="text"
                                placeholder="First Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                name="lastname"
                                id="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                type="text"
                                placeholder="Last Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        {/* Email and Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email ID</label>
                            <input
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password</label>
                            <input
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                type="text"
                                placeholder="Password"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        {/* Customer ID and Employee */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Customer ID</label>
                            <input
                                name="customerid"
                                id="customerid"
                                value={data.customerid}
                                readOnly
                                onChange={handleChange}
                                type="text"
                                placeholder="Customer ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company Name</label>
                            <select
                                className="overflow-y-auto rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                                name="companyId"
                                id="companyId"
                                value={data.companyId}
                                onChange={handleChange}
                            >
                                <option value="">Select Company</option>
                                {company.map((company, index) => (
                                    <option
                                        className="mb-1 dark:text-black"
                                        key={index}
                                        value={company.companyId}
                                    >
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={(e) => {
                                handlesubmit(e, managerdata[0]?.email, data);
                            }}
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

export default AddcustomerPage;
