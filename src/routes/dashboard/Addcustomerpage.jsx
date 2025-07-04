import React, { useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddcustomerPage = () => {
    const { fetchalluser, lowermanager } = useAuth();
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


    const handlesubmit = async (e) => {
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
            await fetchalluser();
            toast.success("customer created successfully !");
            await handleSendMail(e);
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
            employeeid: "",
            password: "",
            companyId: "",
            customerid: "CUS" + String(nextNumber).padStart(2, "0"),
        });
    };

    const getCompanyName = async () => {
        const response = await API.get("/getallcompany");
        setCompany(response.data.company);
    };

    useEffect(() => {
        getCustId();
        getCompanyName();
    }, []);

    const handleSendMail = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/send-mail", {
                to: "skr36880@gmail.com",
                subject: "Adding customer notification came for Approval",
                text: "This is a test email sent for customer adding.",
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
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
                                handlesubmit(e);
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
