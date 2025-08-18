import { Footer } from "@/layouts/footer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react"
import API from "../../API/Api";

const Addupcomingoffer = () => {
    const { fetchupcomingalloffer, lowermanager, managerdata, fetchallmanager, fetchlowermanagerData } = useAuth();
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


    const today = new Date().toISOString().split('T')[0];
    const handleChange = (e) => {
        const { name, value } = e.target;

        setdata((prev) => {
            if (name === "startDate" && prev.endDate && prev.endDate < value) {
                return {
                    ...prev,
                    startDate: value,
                    endDate: ""
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handlesubmit = async (e, offer, superManagerEmail) => {
        e.preventDefault();
        try {
            await API.post(
                "/upcomingcreate-offer",
                {
                    ...data,
                    manager:
                        lowermanager && lowermanager.firstname && lowermanager.lastname
                            ? `${lowermanager.firstname} ${lowermanager.lastname}`
                            : "Created by Super Manager / Admin",
                    managerEmail: lowermanager ? lowermanager.email : "Email Not Found"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setdata({
                offerTitle: "",
                offerDescription: "",
                startDate: "",
                endDate: "",
                offerid: "",
            });
            await fetchupcomingalloffer(admintoken, lowermanagertoken, managertoken);
            toast.success("Upcoming offer created successfully!");
            lowermanagersession ? await handleSendMail(offer, superManagerEmail) : null
        } catch (err) {
            const message = err.response?.data?.message || "offer created failed";
            toast.error(message);
            console.log("login error:", err);
        }
        getCusUpOfferId();
    };

    const getCusUpOfferId = async () => {
        const response = await API.get("/last-cust-up-offer-id")
        const nextNumber = parseInt(response.data.lastCusOfferId.replace("OFF", "")) + 1;
        setdata({
            offerTitle: "",
            offerDescription: "",
            startDate: "",
            endDate: "",
            offerid: "OFF" + String(nextNumber).padStart(2, '0')
        })
    }

    useEffect(() => {
        getCusUpOfferId();
        fetchallmanager(admintoken, lowermanagertoken, managertoken)
        fetchlowermanagerData(null, lowermanagersession)
    }, [])

    const handleSendMail = async (offer, superManagerEmail) => {
        try {
            const response = await API.post("/send-mail", {
                to: [superManagerEmail],
                subject: "Action Required : Please Review Employee Upcoming Offer",
                html: generateHtmlTemplate(offer),
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    const generateHtmlTemplate = (offer) => {
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
        <h2>Upcoming Customer Offer Action Required</h2>
      </div>
      <div class="content">
        <p>Dear Super Manager,</p>
        <p>
         Upcoming Customer Offer has been Added by 
          <strong>${lowermanager.firstname} ${lowermanager.lastname}</strong> and requires your action.
        </p>
        <p><strong>Offer Id:</strong>${offer.offerid}</p>
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Customer Upcoming Offers</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Offer Id</label>
                            <input
                                type="text"
                                placeholder="Offer Id"
                                name="offerid"
                                id="offerid"
                                value={data.offerid}
                                readOnly
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 dark:text-white">Offer Title</label>
                            <input
                                type="text"
                                placeholder="Offer Title"
                                name="offerTitle"
                                id="offerTitle"
                                value={data.offerTitle}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 mt-3 dark:text-white">Offer description</label>
                        <textarea
                            rows={4}
                            placeholder="Offer Description"
                            name="offerDescription"
                            id="offerDescription"
                            value={data.offerDescription}
                            onChange={handleChange}
                            className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Start Date and End Date*/}
                        <div className="flex flex-col">
                            <label className="mb-1 mt-3 dark:text-white">Start Date</label>
                            <input
                                type="date"
                                placeholder="start date"
                                name="startDate"
                                id="startDate"
                                value={data.startDate}
                                min={today}
                                onChange={handleChange}
                                className="h-92 appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 mt-3 dark:text-white">End Date</label>
                            <input
                                type="date"
                                placeholder="end date"
                                name="endDate"
                                id="endDate"
                                value={data.endDate}
                                min={data.startDate || today}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={(e) => {
                                handlesubmit(e,
                                    data, managerdata[0]?.email)
                            }}
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

export default Addupcomingoffer;
