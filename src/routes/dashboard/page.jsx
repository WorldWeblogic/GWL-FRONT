import { Footer } from "@/layouts/footer";
import { TrendingUp, Users } from "lucide-react";
import { useAuth } from "../../contexts/auth";
import LineChart from "../../components/LineChart";
import WaveChart from "../../components/WaveChart";

const DashboardPage = () => {
    const { customersdata, employeedata, managerdata, lowermanagerdata } = useAuth();

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Admin</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-red-500/20 p-2 text-red-500 transition-colors dark:bg-red-600/20 dark:text-red-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total Customer Registered</p>
                    </div>
                    <div className="bg-slate-100 transition-colors dark:bg-slate-950 card-body">

                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50 ">{customersdata.length}</p>

                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-red-500/20 p-2 text-red-500 transition-colors dark:bg-red-600/20 dark:text-red-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total Employee Registered</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{employeedata.length}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                            <TrendingUp size={18} />
                            19%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-red-500/20 p-2 text-red-500 transition-colors dark:bg-red-600/20 dark:text-red-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total Manager Registered</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{lowermanagerdata.length}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-red-500/20 p-2 text-red-500 transition-colors dark:bg-red-600/20 dark:text-red-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Total Super Manager Registered</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{managerdata.length}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="card">
                    <div className="card-header">
                        <p className="card-title">Total Customer Registered</p>
                    </div>
                    <div className="card-body p-0">
                        <WaveChart/>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <p className="card-title">Total Employee Registered</p>
                    </div>
                    <LineChart />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;

