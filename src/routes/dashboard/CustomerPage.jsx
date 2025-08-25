import { Package } from "lucide-react";
import { BsTrophyFill } from "react-icons/bs";
import { Footer } from "@/layouts/footer";
import Achivements from "./Achivements";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../API/Api";
import { toast } from "react-toastify";
const MySwal = withReactContent(Swal);

const CustomerPage = () => {
    const customerid= sessionStorage.getItem("id");
    const { user, fetchcustomerData } = useAuth();
    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            fetchcustomerData(id);
        }
    }, []);
    // get all offer function
    const [offerdata, setofferdata] = useState([]);
    const fetchalloffer = async () => {
        try {
            const response = await API.get("/get-approveoffer");
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalloffer();
    }, []);

    // get all offer function
    const [upcomingofferdata, setupcomingofferdata] = useState([]);
    const fetchallupcomingoffer = async () => {
        try {
            const response = await API.get("/get-approveupcomingoffer");
            setupcomingofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallupcomingoffer();
    }, []);

    const getTrophyColor = (color) => {
        if (color === "Blue") return "text-blue-500";
        if (color === "Silver") return "text-zinc-500";
        if (color === "Gold") return "text-yellow-500";
        return "text-red-500";
    };

    const [expandedOffers, setExpandedOffers] = useState({});
    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    // get all request
    const [request, setrequest] = useState([]);
    const getallrequest = async () => {
        try {
            const response = await API.get("/allcompanyrequest");
            setrequest(response.data.requests);
        } catch (err) {
            const errorMessage = "get all request data failed";
            toast.error(errorMessage);
            console.error(err);
        }
    };
    useEffect(() => {
        getallrequest();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [message, setmessage] = useState("");
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [value, setvalue] = useState(0);

    const handleSendMail = async () => {
        try {
            const response = await API.post("/send-mail", {
                to: user.managerEmail,
                subject: "Request for Redeem Points",
                text: `${user.firstname} request for ${value} points for ${message}`,
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            await API.post(
                "/custredeem",
                { value, customerid, message, firstname: user.firstname , lastname: user.lastname , customerID: user.customerid},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setvalue(0);
            setmessage("");
            closeModal();
            toast.success("Redeem request sent to manager!");
            handleSendMail()
        } catch (err) {
            toast.error("Failed to send redeem request. Please try again.");
        }
    };
    

    const truncateText = (text, length = 50) => (text.length > length ? text.slice(0, length) + "..." : text);
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">{user.company?.[0].name}</h1>

            <div className="flex flex-col items-stretch gap-4 md:flex-row">
                {/* 40% Width Box */}
                <div className="w-full md:w-2/5">
                    <div className="card flex h-full flex-col">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-red-500/20 p-2 text-red-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Total Points</p>
                        </div>

                        <div className="flex-1 rounded-lg bg-slate-100 pb-2 pt-2 dark:bg-slate-950">
                            <div className="flex flex-row gap-x-4">
                                <BsTrophyFill
                                    className={`ml-3 text-8xl ${getTrophyColor(
                                        user.company?.[0].trophy
                                            ? user.company?.[0].trophy.charAt(0).toUpperCase() + user.company?.[0].trophy.slice(1)
                                            : "None",
                                    )}`}
                                />
                                <div>
                                    <div className="flex flex-row gap-x-2">
                                        <span className="text-xl font-bold text-red-500">{user.company?.[0].points}</span>
                                        <p className="text-xl font-bold text-slate-900 dark:text-slate-50">Total Points</p>
                                    </div>
                                    <p className="font-medium text-slate-900 dark:text-slate-50">Current Balance</p>
                                    <button
                                        className="mt-2 rounded-lg bg-red-500 p-2 font-semibold text-white"
                                        onClick={openModal}
                                    >
                                        Redeem Points
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Redeem Points</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-2xl text-gray-600 hover:text-red-600"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <p className="mb-4 text-slate-700 dark:text-slate-200">Are you sure you want to redeem {value} points?</p>
                                <input
                                    type="Number"
                                    placeholder="Enter Points"
                                    value={value}
                                    onChange={(e) => setvalue(e.target.value)}
                                    className="w-full rounded-lg border p-2 focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                                />
                                <textarea
                                    type="text"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setmessage(e.target.value)}
                                    placeholder="message"
                                    className="mt-2 w-full rounded-lg border p-2 focus:border-red-500 focus:bg-slate-50 focus:outline-none"
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={closeModal}
                                        className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (user.company?.[0].points < value || value <= 0) {
                                                toast.error("Choose valid points");
                                                return;
                                            }
                                            // handleSendMail();
                                            handleSubmit();
                                        }}
                                        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 60% Width Box */}

                <div className="w-full md:w-3/5">
                    <div className="card h-[200px]">
                        <div className="card-header">
                            <span>
                                <Package
                                    size={26}
                                    className="text-blue-500"
                                />
                            </span>
                            <p className="card-title">Notification</p>
                        </div>
                        <div className="card-body h-full overflow-y-auto p-0">
                            {request
                                .slice()
                                .reverse()
                                .map((sale) => (
                                    <div
                                        key={sale._id}
                                        className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                                    >
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {expandedOffers[`latest-${sale._id}`] ? sale.notification : truncateText(sale.notification, 50)}
                                            {sale.notification.length > 50 && (
                                                <button
                                                    onClick={() => toggleDescription(`latest-${sale._id}`)}
                                                    className="ml-1 text-xs font-medium text-red-500 hover:underline"
                                                >
                                                    {expandedOffers[`latest-${sale._id}`] ? " Show Less" : " Show More"}
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest & Upcoming Offers */}

            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {offerdata.length} Offers</p>
                </div>
                <div className="w-full overflow-x-auto scroll-smooth">
                    <table className="min-w-[1000px] table-auto divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="w-12 px-4 py-2 text-left font-semibold">#</th>
                                <th className="w-60 px-4 py-2 text-left font-semibold">Title</th>
                                <th className="w-80 px-4 py-2 text-left font-semibold">Description</th>
                                <th className="w-40 px-4 py-2 text-left font-semibold">Offer Valid Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {offerdata.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3 dark:text-white">{data.offerTitle}</td>
                                    <td className="px-4 py-3 dark:text-white">{data.offerDescription}</td>
                                    <td className="px-4 py-3 dark:text-white">
                                        {new Date(data.endDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing {upcomingofferdata.length} Upcoming Offers</p>
                </div>
                <div className="w-full overflow-x-auto scroll-smooth">
                    <table className="min-w-[1000px] table-auto divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="w-12 px-4 py-2 text-left font-semibold">#</th>
                                <th className="w-60 px-4 py-2 text-left font-semibold">Title</th>
                                <th className="w-80 px-4 py-2 text-left font-semibold">Description</th>
                                <th className="w-40 px-4 py-2 text-left font-semibold">Offer Valid Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {upcomingofferdata.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 dark:text-white">{index + 1}</td>
                                    <td className="px-4 py-3 dark:text-white">{data.offerTitle}</td>
                                    <td className="px-4 py-3 dark:text-white">{data.offerDescription}</td>
                                    <td className="px-4 py-3 dark:text-white">
                                        {new Date(data.endDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Achievements */}
            <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div className="card col-span-full">
                        <div className="card-header"></div>
                        <div className="card-body overflow-auto p-0">
                            <Achivements />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CustomerPage;
