import React, { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";
const ManageProfile = () => {
    const [usersession, setadminsession] = useState(sessionStorage.getItem("id"));

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        password: "",
    });

    const location = useLocation()
    const { custId } = location.state


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
            password: data.password,
        };

        try {
            await API.put(`/update-singlecustomer/${usersession}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setData({
                firstname: "",
                lastname: "",
                password: "",
            })
            toast.success('Successfully updated!')
        } catch (err) {
            const message = err.response?.data?.message || "updation failed";
            toast.error(message);
            console.error("update error:", err);
        }
    };

    const getCustomer = async () => {
        try {
            const response = await API.get(`/user/${custId}`)
            setData({
                firstname: response.data.userdata.firstname,
                lastname: response.data.userdata.lastname,
            })
        } catch (err) {
            console.log(`Error in Customer fetching : ${err}`);

        }
    }

    useEffect(() => {
        getCustomer()
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
                                placeholder="First Name"
                                value={data.firstname}
                                onChange={handleChange}
                                name="firstname"
                                id="firstname"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={data.lastname}
                                onChange={handleChange}
                                name="lastname"
                                id="lastname"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">password</label>
                            <input
                                type="text"
                                placeholder="password"
                                value={data.password}
                                onChange={handleChange}
                                name="password"
                                id="password"
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={handleUpdateCustomer}>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ManageProfile;
