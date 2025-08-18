import { Footer } from "@/layouts/footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import API from "../../API/Api";

const Editemployeeupcomingoffer = () => {
    const { fetchemployeeallupcomingoffer } = useAuth()
    const [data, setdata] = useState({
        offerTitle: "",
        offerDescription: "",
        startDate: "",
        endDate: "",
        offerid: ""
    });

    const location = useLocation();
    const { LManagerEmpUpOffer } = location.state;

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

    const updateoffer = {
        offerTitle: data.offerTitle,
        offerDescription: data.offerDescription,
        startDate: data.startDate,
        endDate: data.endDate,
        offerid: data.offerid
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/upcomingupdate-employee-offer/${data.offerid}`, updateoffer, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setdata({
                offerTitle: "",
                offerDescription: "",
                startDate: "",
                endDate: "",
                offerid: ""
            });
            await fetchemployeeallupcomingoffer();
            toast.success("Employee offer updated successfully !");
        } catch (err) {
            const message = err.response?.data?.extradetails || err.response?.data?.message || "Login failed";
            toast.error(message);
            console.log("login error:", err);
        }
    };

    useEffect(() => {
        API.get(`/upcoming-singleEmployee-offer/${LManagerEmpUpOffer}`)
            .then(res =>
                setdata({
                    offerTitle: res.data.offerData.offerTitle,
                    offerDescription: res.data.offerData.offerDescription,
                    startDate: new Date(res.data.offerData.startDate).toISOString().split('T')[0],
                    endDate: new Date(res.data.offerData.endDate).toISOString().split('T')[0],
                    offerid: res.data.offerData.offerid
                })
            ).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Employee Upcoming Offers</h1>
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
                                readOnly
                                value={data.offerid}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:bg-slate-50 focus:shadow focus:outline-none "
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

export default Editemployeeupcomingoffer;
