import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import { Package } from "lucide-react";
import { FaCoins } from "react-icons/fa6";
import Rewards from "./Reward";
import Points from "./Points";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import { toast } from "react-toastify";

const EmployeePage = () => {
    const { theme } = useTheme();
    const { singleemployee, fetchuserData } = useAuth();
    const employeeid = sessionStorage.getItem("employeeid");
    console.log(singleemployee);
    useEffect(() => {
        const employeeid = sessionStorage.getItem("employeeid");
        if (employeeid) {
            fetchuserData(employeeid);
        }
    }, []);

    const [expandedOffers, setExpandedOffers] = useState({});

    const [offerdata, setofferdata] = useState([]);
    const fetchalloffer = async () => {
        try {
            const response = await API.get("/getallapprove-employee-offer");
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalloffer();
    }, []);

    const [upcomingofferdata, setupcomingofferdata] = useState([]);
    const fetchallupcomingoffer = async () => {
        try {
            const response = await API.get("/getapproveupcoming-employee-offer");
            setupcomingofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallupcomingoffer();
    }, []);

    const [request, setrequest] = useState([]);
    const getallrequest = async () => {
        try {
            const response = await API.get("/allrequest")
            setrequest(response.data.requests);
        } catch (err) {
            console.error("get all request data failed", err);
        }
    };
    useEffect(() => {
        getallrequest();
    }, []);

    const truncateText = (text, length = 20) => (text?.length > length ? text.slice(0, length) + "..." : text);

    const toggleDescription = (key) => {
        setExpandedOffers((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [leader, setleader] = useState([]);
    const fetchleader = async () => {
        try {
            const res = await API.get("/empleader");
            setleader(res.data.employees);
        } catch (err) {
            console.err(err);
        }
    };
    useEffect(() => {
        fetchleader();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [message, setmessage] = useState("");
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [value, setvalue] = useState(0);

    const handleSendMail = async () => {
        try {
            const response = await API.post("/send-mail", {
                to: singleemployee.managerEmail,
                subject: "Request for Redeem Points",
                text: `${singleemployee.firstname} request for ${value} points for ${message}`,
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error sending mail:", error);
            toast.error(error);
        }
    };

    function getRankColorClass(rank) {
        switch (rank) {
            case 1:
                return "bg-red-600 dark:bg-red-600 dark:text-white text-black";
            case 2:
                return "bg-blue-600 dark:bg-blue-600 dark:text-white text-black";
            case 3:
                return "bg-green-600 dark:bg-green-600 dark:text-white text-black";
            default:
                return "dark:text-white text-black";
        }
    }

    const handleSubmit = async () => {
        try {
            await API.post(
                "/redeem",
                { value, employeeid, message, firstname: singleemployee.firstname , lastname: singleemployee.lastname , employeeID: singleemployee.employeeid},
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
            handleSendMail();
        } catch (err) {
            toast.error("Failed to send redeem request. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Employee</h1>
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:gap-6">
                {/* 40% Width Box (Total Points) */}
                <div className="w-full md:w-2/5">
                    <div className="card h-[200px]">
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-red-500/20 p-2 text-red-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Total Points</p>
                        </div>
                        <div className="h-full rounded-lg bg-slate-100 py-2 dark:bg-slate-950">
                            <div className="flex flex-row items-center gap-x-6">
                                <FaCoins className="ml-3 text-6xl text-yellow-500" />
                                <div className="space-y-1">
                                    <div className="flex flex-row gap-x-2">
                                        <span className="text-lg font-bold text-red-500">{singleemployee.TotalPoints}</span>
                                        <p className="text-lg font-bold text-slate-900 dark:text-slate-50">Total Points</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Current Balance</p>
                                    <button
                                        className="mt-1 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white"
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
                                            if (value <= 0 || singleemployee.TotalPoints < value) {
                                                toast.error("Choose valid points");
                                                return;
                                            }
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

                {/* 60% Width Box (notification) */}
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
                            {singleemployee?.message
                                ?.slice()
                                .reverse()
                                .map((sale, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                                    >
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {expandedOffers[`latest-${sale._id}`] ? sale : truncateText(sale, 50)}
                                            {sale?.length > 50 && (
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

            <div className="mt-4">
                <div className="rounded-xl border bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900">
                    <div className="mb-4 text-xl font-semibold dark:text-white">
                        <p>Leaderboard Of Employees</p>
                    </div>
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead className="bg-gray-600 text-white">
                            <tr>
                                <th className="rounded-bl-lg rounded-tl-lg px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="rounded-br-lg rounded-tr-lg px-4 py-2 text-left">Total Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leader.map((emp, index) => (
                                <tr
                                    key={index}
                                    className={`${getRankColorClass(index + 1)}rounded-lg shadow-sm`}
                                >
                                    <td className="rounded-l-lg px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {emp.firstname} {emp.lastname}
                                    </td>
                                    <td className="rounded-r-lg px-4 py-2">{emp.TotalPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                {/* Point System Explanation */}
                <div className="card h-auto">
                    <div className="card-header">
                        <p className="card-title text-2xl">Point System Explanation</p>
                    </div>
                    <div className="card-body p-0">
                        <Points />
                    </div>
                </div>

                {/* Redeem Points For */}
                <div className="card">
                    <div className="card-header">
                        <p className="card-title text-2xl">Redeem Points For</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        <Rewards />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EmployeePage;
