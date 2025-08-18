import React, { useRef, useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddemployeePage = () => {
    const { lowermanager, fetchallemployee, managerdata, fetchallmanager, fetchlowermanagerData } = useAuth();
    const managerToken = localStorage.getItem("managertoken");
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const lowerManagerToken = localStorage.getItem("lowermanagertoken");
    const adminToken = localStorage.getItem("admintoken");
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
    }


    const handlesubmit = async (e, employee, superManagerEmail) => {
        e.preventDefault();
        try {
            await API.post(
                "/signupEmployee",
                {
                    ...data,
                    manager:
                        lowermanager && lowermanager.firstname && lowermanager.lastname
                            ? `${lowermanager.firstname} ${lowermanager.lastname}`
                            : "Created by Super Manager / Admin",
                    managerEmail: lowermanager.email
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setdata({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                employeeid: "",
                phone: "",
            });
            await fetchallemployee(adminToken, lowerManagerToken, managerToken);
            toast.success("employee added successfully !");
            lowermanagersession ? await handleSendMail(employee, superManagerEmail) : null
        } catch (err) {
            const message = err.response.data.message || "adding employee failed";
            toast.error(message);
            console.log(err);
        }
        getEmpId();
    };

    const getEmpId = async () => {
        const response = await API.get("/getLastEmpId")
        const nextNumber = parseInt(response.data.lastEmpId.replace("EMP", "")) + 1;
        setdata({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            phone: "",
            employeeid: "EMP" + String(nextNumber).padStart(2, '0'),
        })
    }

    useEffect(() => {
        getEmpId();
        fetchallmanager(adminToken, lowerManagerToken, managerToken);
        fetchlowermanagerData(null, lowermanagersession)
    }, [])

    const handleSendMail = async (employee, superManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required: Please Review Employee",
                html: generateHtmlTemplate(employee)
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    const generateHtmlTemplate = (employee) => {
        return `
 <!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
      }
      .header {
        background-color:rgb(55, 105, 180);
        color: white;
        padding: 15px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 5px 0;
        font-size: 16px;
        text-decoration: none;
        border-radius: 5px;
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Employee Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
          A new Employee has been added by <br>
          <strong>Manager Name : </strong> ${lowermanager.firstname} ${lowermanager.lastname} <br>
          <strong>Manager Email : </strong>${lowermanager.email} and requires your action.
        </p>
        <p><strong>Employee ID : </strong> ${employee.employeeid} <br>
        <strong>Employee Name : </strong> ${employee.firstname} ${employee.lastname} <br>
        <strong>Employee Email : </strong>${employee.email}<br>
        </p>

        <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
      </div>
    </div>
  </body>
</html>
  `;
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Employee</h1>
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>

                        {/* Employee ID and Employee */}
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500 cursor-not-allowed"
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                            onClick={(e) => { handlesubmit(e, data, managerdata[0]?.email) }}
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

export default AddemployeePage;
