import { useEffect, useRef, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";

const UpdateEmployee = () => {
    const location = useLocation();
    const state = location.state || {}; // Avoid destructuring from undefined
    const { LManagerCustId } = location.state;

    const {
        docs,
        transport,
        service,
        handling,
        freight,
        newCustomer,
        newCustomerSales,
        digitalTraining,
        bookRead,
        servicesold,
        csrProgram,
        marketingMaterials,
        estimatedPoints,
    } = state;
    const { fetchallemployee, lowermanager } = useAuth();
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
        employeeid: "",
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
        const updateData = {
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            employeeid: data.employeeid,
            phone: data.phone,
        };
        try {
            const response = await API.put(`/update-employee/${data.employeeid}`, updateData, {
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
                employeeid: "",
                phone: "",
            });
            await fetchallemployee();
            toast.success("employee updated successfully !");
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            toast.error(message);
            console.log("login error:", err);
        }
    };

    const [employeeid, setemployeeId] = useState('');
    const [type, setType] = useState('add');
    const [notification, setnotification] = useState("");
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/request',
                {
                    employeeid,
                    type,
                    value: parseInt(value),
                    notification,
                    manager: `${lowermanager.firstname} ${lowermanager.lastname}`
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success('Request sent for admin approval');
            await handleSendMail(e);
        }
        catch (err) {
            toast.error(err.response.data.message);
            console.error(err);
        }
    };

    useEffect(() => {
        API.get(`/employee/${LManagerCustId}`)
            .then(res => {
                setdata({
                    email: res.data.employeedata.email,
                    firstname: res.data.employeedata.firstname,
                    lastname: res.data.employeedata.lastname,
                    employeeid: res.data.employeedata.employeeid,
                    phone: res.data.employeedata.phone,
                })
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const handleSendMail = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/send-mail", {
                to: "skr36880@gmail.com",
                subject: "Offer notification came for Approval",
                text: "This is a test email sent from MERN app.",
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">

            {sessionStorage.getItem("adminid") || sessionStorage.getItem("managerid") ? (
                <>
                    {/* Admin View - Update Employee */}
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
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
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
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                {/* Email and Password */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Email ID</label>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Password</label>
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        name="password"
                                        id="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                {/* Employee ID and Phone */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        name="employeeid"
                                        id="employeeid"
                                        value={data.employeeid}
                                        onChange={handleChange}
                                        readOnly
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
                                    onClick={handlesubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
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
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
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
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                {/* Email and Password */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Email ID</label>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Password</label>
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        name="password"
                                        id="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:outline-red-500"
                                    />
                                </div>

                                {/* Employee ID and Phone */}
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        name="employeeid"
                                        id="employeeid"
                                        value={data.employeeid}
                                        readOnly
                                        onChange={handleChange}
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
                                    onClick={handlesubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Employee View - Points Data */}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Points Data</h1>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                        <div className="grid grid-cols-4 gap-4 dark:text-white">
                            <div className="flex flex-col space-y-2">
                                <p>Doc Sales: {docs}</p>
                                <p>Transport Sales: {transport}</p>
                                <p>Service Sales: {service}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <p>Handling Sales: {handling}</p>
                                <p>Freight Sales: {freight}</p>
                                <p>New Customers: {newCustomer}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <p>New Customer Sales: {newCustomerSales}</p>
                                <p>Digital Training: {digitalTraining ? "Yes" : "No"}</p>
                                <p>Book Read: {bookRead ? "Yes" : "No"}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <p>Service Sold: {servicesold}</p>
                                <p>CSR Program: {csrProgram ? "Yes" : "No"}</p>
                                <p>Marketing Materials: {marketingMaterials}</p>
                                <p>Estimated Points: {estimatedPoints}</p>
                            </div>
                        </div>
                    </div>

                    {/* Give Points Section */}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">New Points</h1>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                        <form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Employee_Id</label>
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        value={employeeid}
                                        onChange={(e) => setemployeeId(e.target.value)}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 dark:text-white">Points</label>
                                    <input
                                        type="number"
                                        placeholder="Points"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 mt-3 dark:text-white">Notification</label>
                                <textarea
                                    rows={3}
                                    placeholder="Notification"
                                    name="notification"
                                    id="notification"
                                    value={notification}
                                    onChange={(e) => setnotification(e.target.value)}
                                    className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                                />
                            </div>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="mt-4 p-1"
                            >
                                <option value="add">Add</option>
                                <option value="deduct">Deduct</option>
                            </select>

                            <div className="mt-6">
                                <button
                                    onClick={(e) => { handleSubmit(e) }}
                                    className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default UpdateEmployee;
