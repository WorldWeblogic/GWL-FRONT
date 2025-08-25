import React, { useEffect, useRef, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";

const ManageEmployee = () => {
    const [employeesession, setemployeesession] = useState(sessionStorage.getItem("employeeid"));
    const { fetchuserData } = useAuth();
    const phone = useRef();
    function handlenumber(e) {
        // Remove all characters except digits and dashes
        const sanitized = e.target.value.replace(/[^0-9-]/g, "");
        phone.current.value = sanitized;
    }
    const [data, setdata] = useState({
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
    });

    const location = useLocation();
    const { employeeId } = location.state;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
        };
        try {
           await API.put(`/updatesingleemployee/${employeesession}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setdata({
                password: "",
                firstname: "",
                lastname: "",
                employeeid: "",
                phone: "",
            });
            await fetchuserData();
            toast.success("employee updated successfully !");
        } catch (err) {
            const message = "updation failed";
            toast.error(message);
            console.log(err);
        }
    };


    const getEmployee = async () => {
        try {
            const response = await API.get(`/employee/${employeeId}`)
            setdata({
                firstname: response.data.employeedata.firstname,
                lastname: response.data.employeedata.lastname,
                phone: response.data.employeedata.phone
            })
        } catch (error) {
            console.log(`Error Fetching Employee : ${error}`);
        }
    }

    useEffect(() => {
        getEmployee();
    }, [])

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Update Employee</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* First and Last Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstname"
                                id="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastname"
                                id="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>

                        {/* password and Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Password </label>
                            <input
                                type="text"
                                placeholder="password "
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
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
                                maxLength={14}
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => {
                                    handlenumber(e);
                                    handleChange(e);
                                }}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                            onClick={handlesubmit}
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

export default ManageEmployee;
