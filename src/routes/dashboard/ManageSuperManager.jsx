import React, { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";
 
const ManageSuperManager = () => {
    const [superManager, setSuperManager] = useState({ firstname: "", lastname: "", email: "" })
    const location = useLocation();
    const { managerId } = location.state;
    const { fetchmanagerData } = useAuth();
 
    const handleUpdateSManager = async (e) => {
        e.preventDefault();
 
        const updatedData = {
            firstname: superManager.firstname,
            lastname: superManager.lastname,
            email: superManager.email,
        };
 
        try {
            await API.put(`/superManagerProfile/${managerId}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            fetchmanagerData();
            setSuperManager({
                firstname: "",
                lastname: "",
                email: "",
            });
            toast.success("Successfully updated!");
        } catch (err) {
            const message = err.response?.lowerManager?.message || "update failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };
 
    const fetchSuperManager = async () => {
        try {
            const response = await API.get(`/manager/${managerId}`);
            setSuperManager({
                firstname: response.data.managerdata.firstname,
                lastname: response.data.managerdata.lastname,
                email: response.data.managerdata.email
            })
        } catch (err) {
            console.log(`Error Fetching SuperManager Data: ${err}`);
        }
    };
 
    useEffect(() => {
        fetchSuperManager()
    }, [])
 
 
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={superManager.firstname}
                                onChange={(e) => setSuperManager({ ...superManager, firstname: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>
 
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={superManager.lastname}
                                onChange={(e) => setSuperManager({ ...superManager, lastname: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>
 
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={superManager.email}
                                onChange={(e) => setSuperManager({ ...superManager, email: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleUpdateSManager}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};
 
export default ManageSuperManager;
 