import { Footer } from "@/layouts/footer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react";
import API from "../../API/Api";

const AddEmployeeUpcomingoffer = () => {
    const { fetchemployeeallupcomingoffer, lowermanager } = useAuth()
    const [data, setdata] = useState({
        offerTitle: "",
        offerDescription: "",
        startDate: "",
        endDate: "",
        offerid: ""
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

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/upcomingcreate-employee-offer",
                {
                    ...data,
                    manager: lowermanager && lowermanager.firstname && lowermanager.lastname
                        ? `${lowermanager.firstname} ${lowermanager.lastname}`
                        : 'Created by Super Manager / Admin'
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            //console.log(response);
            setdata({
                offerTitle: "",
                offerDescription: "",
                startDate: "",
                endDate: "",
                offerid: ""
            });
            await fetchemployeeallupcomingoffer();
            toast.success("Employee Upcoming offer created successfully!");
        } catch (err) {
            const message = err.response?.data?.extradetails || err.response?.data?.message || "offer created failed";
            toast.error(message);
            console.log("login error:", err);
        }
        getEmpUpOfferId();
    };

    const getEmpUpOfferId = async () => {
        const response = await API.get("/last-emp-up-offer-id")
        const nextNumber = parseInt(response.data.lastEmpOfferId.replace("OFF", "")) + 1;
        setdata({
            offerTitle: "",
            offerDescription: "",
            startDate: "",
            endDate: "",
            offerid: "OFF" + String(nextNumber).padStart(2, '0'),
        })
    }

    useEffect(() => {
        getEmpUpOfferId();
    }, [])

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add Employee Upcoming Offers</h1>
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                            className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                                className="h-92 appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
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
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handlesubmit}
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

export default AddEmployeeUpcomingoffer;
