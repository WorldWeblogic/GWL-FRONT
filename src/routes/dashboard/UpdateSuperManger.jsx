import React, { useEffect, useRef, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";
const UpdateSuperManger = () => {
    const { fetchallmanager } = useAuth();
    const location = useLocation();
    const { supermanagerid } = location.state;
    const phone = useRef();
    function handlenumber(e) {
        // Remove all characters except digits and dashes
        const sanitized = e.target.value.replace(/[^0-9-]/g, "");
        phone.current.value = sanitized;
    }
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        managerid: "",
        phone: "",
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
            phone: data.phone,
            password: data.password,
            managerid: data.managerid,
        };

        try {
            await API.put(`/update-manager/${data.managerid}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setData({
                firstname: "",
                lastname: "",
                email: "",
                managerid: "",
                password: "",
                phone: "",
            });
            await fetchallmanager();
            toast.success("Successfully updated!");
        } catch (err) {
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };

    const fetchmanagerData = async () => {
        try {
            const response = await API.get(`/manager/${supermanagerid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setData({
                firstname: response.data.managerdata.firstname,
                lastname: response.data.managerdata.lastname,
                email: response.data.managerdata.email,
                managerid: response.data.managerdata.managerid,
                phone: response.data.managerdata.phone,
            });
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };

    useEffect(() => {
        fetchmanagerData();
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Update Super Manager</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={data.firstname}
                                onChange={handleChange}
                                name="firstname"
                                id="firstname"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                value={data.lastname}
                                onChange={handleChange}
                                name="lastname"
                                id="lastname"
                                placeholder="Last Name"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        {/* Email and Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email ID</label>
                            <input
                                type="email"
                                placeholder="Email ID"
                                value={data.email}
                                onChange={handleChange}
                                name="email"
                                id="email"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password</label>
                            <input
                                type="text"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                name="password"
                                id="password"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        {/* Customer ID and Employee */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Manager ID</label>
                            <input
                                type="text"
                                placeholder="Manager ID"
                                value={data.managerid}
                                onChange={handleChange}
                                name="managerid"
                                readOnly
                                id="managerid"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Phone</label>
                            <input
                                type="tel"
                                placeholder="Phone"
                                pattern="\d{3}-\d{2}-\d{3}"
                                ref={phone}
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => {
                                    handlenumber(e);
                                    handleChange(e);
                                }}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                            onClick={handleUpdateCustomer}
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

export default UpdateSuperManger;
