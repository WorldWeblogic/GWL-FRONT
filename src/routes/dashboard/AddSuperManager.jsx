import React, { useRef, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";
import { useEffect } from "react";

const AddSuperManger = () => {
    const { fetchallmanager } = useAuth()
    const phone = useRef();
    function handlenumber(e) {
        // Remove all characters except digits and dashes
        const sanitized = e.target.value.replace(/[^0-9-]/g, "");
        phone.current.value = sanitized;
    }
    const [data, setdata] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        managerid: "",
        phone: "",
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
            await API.post("/signupManager", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setdata({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                managerid: "",
                phone: "",
            });
            await fetchallmanager();
            toast.success("Manager added successfully !");
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            toast.error(message);
            console.log("login error:", err);
        }
        getLastSuperManId();
    };

    const getLastSuperManId = async () => {
        const response = await API.get("/getLastSuperManager");
        const nextNumber = parseInt(response.data.lastSuperManId.replace("SM", "")) + 1;

        setdata({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            managerid: "SM" + String(nextNumber).padStart(2, '0')
        });
    }


    useEffect(() => {
        getLastSuperManId();
    }, []);


    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Super Manager</h1>
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
                                placeholder="Last Name"
                                value={data.lastname}
                                onChange={handleChange}
                                name="lastname"
                                id="lastname"
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
                            <label className="mb-1 dark:text-white">Super Manager ID</label>
                            <input
                                type="text"
                                placeholder="Manager ID"
                                value={data.managerid}
                                onChange={handleChange}
                                readOnly
                                name="managerid"
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
                        <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={handlesubmit}>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddSuperManger;
