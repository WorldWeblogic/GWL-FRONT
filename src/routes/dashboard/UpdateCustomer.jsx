import { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";

const UpdateCustomer = () => {
    const location = useLocation();
    const LManager = location.state;
    const { fetchalluser } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        customerid: "",
        companyId: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleUpdateCustomer = async (e) => {
        e.preventDefault();
        const updatedData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            companyId: data.companyId
        };
        try {
            await API.put(`/update-customer/${data.customerid}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // needed if using cookies/sessions
            });
            setData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                customerid: "",
                companyId: "",
            })
            await fetchalluser(adminToken, lowerManagerToken, managerToken); // Refresh the user list after update
            toast.success('Successfully updated!')
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };
    useEffect(() => {
        API.get(`/user/${LManager.LManagerCustId}`)
            .then(res => {
                setData({
                    firstname: res.data.userdata.firstname,
                    lastname: res.data.userdata.lastname,
                    email: res.data.userdata.email,
                    customerid: res.data.userdata.customerid,
                    companyId: res.data.userdata.company[0].companyId || 0
                });
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Update Customer</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form onSubmit={handleUpdateCustomer}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Email ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password</label>
                            <input
                                type="text"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Customer ID</label>
                            <input
                                type="text"
                                name="customerid"
                                value={data.customerid}
                                onChange={handleChange}
                                readOnly
                                placeholder="Customer ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>



                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Company ID</label>
                            <input
                                type="text"
                                name="companyId"
                                value={data.companyId}
                                onChange={handleChange}
                                placeholder="Company ID"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateCustomer;
