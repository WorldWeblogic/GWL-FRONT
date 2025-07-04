import { Package } from "lucide-react";
import { BsTrophyFill } from "react-icons/bs";
import { Footer } from "@/layouts/footer";
import Achivements from "./Achivements";
import { useAuth } from "../../contexts/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../API/Api";

const MySwal = withReactContent(Swal);

const CustomerPage = () => {
    const { user, fetchcustomerData } = useAuth();
    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            fetchcustomerData(id);
        }
    }, [fetchcustomerData]);
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
        if (color === 'Blue') return "text-blue-500";
        if (color === 'Silver') return "text-zinc-500";
        if (color === 'Gold') return "text-yellow-500";
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
    const truncateText = (text, length = 30) => (text.length > length ? text.slice(0, length) + "..." : text);
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
                                <BsTrophyFill className={`ml-3 text-8xl ${getTrophyColor(user.company?.[0].trophy ? user.company?.[0].trophy.charAt(0).toUpperCase() + user.company?.[0].trophy.slice(1) : 'None')}`} />
                                <div>
                                    <div className="flex flex-row gap-x-2">
                                        <span className="text-xl font-bold text-red-500">{user.company?.[0].points}</span>
                                        <p className="text-xl font-bold text-slate-900 dark:text-slate-50">Total Points</p>
                                    </div>
                                    <p className="font-medium text-slate-900 dark:text-slate-50">Current Balance</p>
                                    <button className="rounded-lg bg-red-500 p-2 font-semibold text-white">Redeem Points</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {/* Latest Offers */}
                <div className="card">
                    <div className="card-header">
                        <span>
                            <Package
                                size={26}
                                className="text-blue-500"
                            />
                        </span>
                        <p className="card-title">Latest Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {offerdata.map((sale, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription.length > 50 && (
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

                {/* Upcoming Offers */}
                <div className="card">
                    <div className="card-header">
                        <span>
                            <Package
                                size={26}
                                className="text-blue-500"
                            />
                        </span>
                        <p className="card-title">Upcoming Offers</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {upcomingofferdata.map((sale, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-y-2 border-b border-slate-200 p-3 dark:border-slate-700"
                            >
                                <p className="font-medium text-slate-900 dark:text-slate-50">{sale.offerTitle}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {expandedOffers[`latest-${sale._id}`] ? sale.offerDescription : truncateText(sale.offerDescription, 50)}
                                    {sale.offerDescription.length > 50 && (
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
