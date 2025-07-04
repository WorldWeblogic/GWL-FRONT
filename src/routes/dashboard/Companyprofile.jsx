import { Footer } from "@/layouts/footer";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth";

const Companyprofile = () => {
    // function to fetch admion data from the server
    const { user, fetchcustomerData } = useAuth();
    useEffect(() => {
        fetchcustomerData();
    }, []);
    const achievedDate = user.company?.[0].trophyDate ? new Date(user.company?.[0].trophyDate) : null;
    const validUntil = achievedDate ? new Date(achievedDate.setFullYear(achievedDate.getFullYear() + 1)) : null;
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            {/* Available points */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{user.company?.[0].name}</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing Company</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Company Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Available Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3 dark:text-white">1</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="dark:text-white">
                                            {user.company?.[0].name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].email}</td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].companyId}</td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].points}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Points Validity</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing Company</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Company Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Available Points</th>
                                <th className="px-4 py-2 text-left font-semibold">Points Alloted</th>
                                <th className="px-4 py-2 text-left font-semibold">Points Validity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3 dark:text-white">1</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="dark:text-white">
                                            {user.company?.[0].name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].companyId}</td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].points}</td>
                                <td className="px-4 py-3 dark:text-white">{user.company?.[0].trophyDate ? new Date(user.company?.[0].trophyDate).toDateString() : '--'}</td>
                                <td className="px-4 py-3 dark:text-white">{validUntil ? validUntil.toDateString() : '--'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Companyprofile;
