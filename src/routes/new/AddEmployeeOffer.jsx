import { Footer } from "@/layouts/footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import API from "../../API/Api";

const AddEmployeeOffers = () => {
    const { fetchallemployeeoffer, lowermanager, managerdata, fetchlowermanagerData, fetchallmanager } = useAuth();
    const lowermanagersession = sessionStorage.getItem("lowermanagerid");
    const admintoken = localStorage.getItem("admintoken")
    const lowermanagertoken = localStorage.getItem("lowermanagertoken")
    const managertoken = localStorage.getItem("managertoken")
    const [data, setdata] = useState({
        offerTitle: "",
        offerDescription: "",
        startDate: "",
        endDate: "",
        offerid: "",
    });


    const today = new Date().toISOString().split("T")[0];

    const employeehandleChange = (e) => {
        const { name, value } = e.target;

        setdata((prev) => {
            if (name === "startDate" && prev.endDate && prev.endDate < value) {
                return {
                    ...prev,
                    startDate: value,
                    endDate: "",
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const employeehandlesubmit = async (e, superManagerEmail, lowerManagerFirstName, lowerManagerLastName, offer) => {
        e.preventDefault();

        try {
            const payload = {
                ...data,
                manager:
                    lowermanager?.firstname && lowermanager?.lastname
                        ? `${lowermanager.firstname} ${lowermanager.lastname}`
                        : "Created by Super Manager / Admin",
                managerEmail: lowermanager?.email,
            };

            await API.post("/create-employee-offer", payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            await fetchallemployeeoffer(admintoken, lowermanagertoken, managertoken);

            toast.success(
                "Employee offer created and notification sent to Super Manager."
            );
            lowermanagersession ? await handleSendMail(superManagerEmail, lowerManagerFirstName, lowerManagerLastName, offer) : null
            getEmpOfferId(); // set new ID after success
            setdata({
                offerTitle: "",
                offerDescription: "",
                startDate: "",
                endDate: "",
                offerid: "",
            });
        } catch (err) {
            console.error(err);
            toast.error("Offer creation failed");
        }
    };

    const getEmpOfferId = async () => {
        const response = await API.get("/getLastEmpOffeerId");
        const nextNumber = parseInt(response.data.lastEmpOfferId.replace("OFF", "")) + 1;
        setdata((prev) => ({
            ...prev,
            offerid: "OFF" + String(nextNumber).padStart(2, "0"),
        }));
    };

    useEffect(() => {
        getEmpOfferId();
        fetchallmanager(admintoken, lowermanagertoken, managertoken)
        fetchlowermanagerData(null, lowermanagersession)
    }, []);

    const handleSendMail = async (superManagerEmail, lowerManagerFirstName, lowerManagerLastName, offer) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required : Please Review Employee Offer",
                html: generateHtmlTemplate(
                    offer,
                    lowerManagerFirstName,
                    lowerManagerLastName),
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to send email notification");
        }
    };

    const generateHtmlTemplate = (offer, lowerManagerFirstName, lowerManagerLastName) => {
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
              background-color: rgb(16, 65, 94);
              color: white;
              padding: 15px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Employee Offer Action Required</h2>
            </div>
            <div class="content">
              <p>Dear Super Manager,</p>
              <p>
                An employee offer has been added by 
                <strong>${lowerManagerFirstName} ${lowerManagerLastName}</strong> and requires your action.
              </p>
              <p><strong>Offer Id:</strong> ${offer.offerid}</p>
              <p><strong>Offer Name:</strong> ${offer.offerTitle}</p>
              <p><strong>Offer Description:</strong> ${offer.offerDescription}</p>
              <p style="margin-top: 20px;">Thanks,<br/>Your Team</p>
            </div>
          </div>
        </body>
      </html>
    `;
    };

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Employee Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form onSubmit={(e) => employeehandlesubmit(e, managerdata[0]?.email, lowermanager.firstname, lowermanager.lastname, data)}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Offer Id</label>
                            <input
                                type="text"
                                name="offerid"
                                value={data.offerid}
                                readOnly
                                onChange={employeehandleChange}
                                className="w-full rounded border px-3 py-2 text-black shadow bg-slate-100 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Offer Title</label>
                            <input
                                type="text"
                                name="offerTitle"
                                value={data.offerTitle}
                                onChange={employeehandleChange}
                                className="w-full rounded border px-3 py-2 text-black shadow"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-3 dark:text-white">Offer Description</label>
                        <textarea
                            rows={4}
                            name="offerDescription"
                            value={data.offerDescription}
                            onChange={employeehandleChange}
                            className="w-full rounded border px-3 py-2 text-black shadow"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 mt-3 dark:text-white">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={data.startDate}
                                min={today}
                                onChange={employeehandleChange}
                                className="rounded border px-3 py-2 text-black shadow"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 mt-3 dark:text-white">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={data.endDate}
                                min={data.startDate || today}
                                onChange={employeehandleChange}
                                className="rounded border px-3 py-2 text-black shadow"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
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

export default AddEmployeeOffers;
