import React, { useEffect, useRef, useState } from "react";
import { Footer } from "@/layouts/footer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const ManageManager = () => {
    const [manager, setManager] = useState({ firstname: "", lastname: "", password: "",phone:"" })
    const location = useLocation();
    const { managerId, manager_type } = location.state;
    const { fetchlowermanagerData } = useAuth();
    const { fetchmanagerData } = useAuth();
    
   const phone = useRef();
       function handlenumber(e) {
           // Remove all characters except digits and dashes
           const sanitized = e.target.value.replace(/[^0-9-]/g, "");
           phone.current.value = sanitized;
       }

    const handleUpdateManager = async (e) => {
        e.preventDefault();

        const updatedData = {
            firstname: manager.firstname,
            lastname: manager.lastname,
            password: manager.password,
            phone:manager.phone,
        };

        try {
            const update_manager_url = manager_type == 'lower_manager' ? 'update-singleLM'
                : manager_type == 'super_manager' ? 'superManagerProfile'
                    : '';
            await API.put(`/${update_manager_url}/${managerId}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (manager_type == 'lower_manager') {
                fetchlowermanagerData();
            } else {
                fetchmanagerData();
            }
            setManager({
                firstname: "",
                lastname: "",
                password: "",
                phone:""
            });
            toast.success("Successfully updated!");
        } catch (err) {
            const message = err.response?.manager?.message || "update failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };

    const fetchManager = async () => {
        try {
            const get_manager_url = manager_type == 'lower_manager' ? 'getlowermanager'
                : manager_type == 'super_manager' ? 'manager'
                    : manager_type == 'admin' ? 'getAdmin'
                        : '';
            const response = await API.get(`/${get_manager_url}/${managerId}`);
            setManager({
                firstname: response.data.managerdata.firstname,
                lastname: response.data.managerdata.lastname,
                phone:response.data.managerdata.phone
            })
        } catch (err) {
            console.log(`Error Fetching LowerManager Data: ${err}`);
        }
    };

    useEffect(() => {
        fetchManager()
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
                                value={manager.firstname}
                                onChange={(e) => setManager({ ...manager, firstname: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={manager.lastname}
                                onChange={(e) => setManager({ ...manager, lastname: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">password</label>
                            <input
                                type="text"
                                placeholder="password"
                                value={manager.password}
                                onChange={(e) => setManager({ ...manager, password: e.target.value })}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                                value={manager.phone}
                                onChange={(e) => {
                                    handlenumber(e);
                                    setManager({ ...manager, phone: e.target.value })
                                }}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleUpdateManager}
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ManageManager;
