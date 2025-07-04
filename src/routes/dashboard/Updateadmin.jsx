import React, { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const Updateadmin = () => {
    const [admin, setadmin] = useState({ name: "", email: "", password: "" })
    const location = useLocation();
    const { adminid } = location.state;
    const { fetchloweradminData } = useAuth()

    const handleupdateadmin = async (e) => {
        e.preventDefault();
        const updatedData = {
            email: admin.email,
            name: admin.name,
            password: admin.password
        };

        try {
            await API.put(`/updateadmin/${adminid}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            setadmin({
                name: "",
                password: "",
                email: "",
            });
            toast.success("Successfully updated!");
        } catch (err) {
            const message = err.response?.data?.message || "update failed";
            toast.error(message);
            console.error(err);
        }
    };

    const fetchadmin = async () => {
        try {
            const response = await API.get(`/admin/${adminid}`);
            setadmin({
                name: response.data.admindata.name,
                password: "",
                email: response.data.admindata.email
            })
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchadmin()
    }, [])


    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={admin.name}
                                onChange={(e) => setadmin({ ...admin, name: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={admin.email}
                                onChange={(e) => setadmin({ ...admin, email: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password</label>
                            <input
                                type="text"
                                placeholder="Password"
                                value={admin.password}
                                onChange={(e) => setadmin({ ...admin, password: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleupdateadmin}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Updateadmin;
