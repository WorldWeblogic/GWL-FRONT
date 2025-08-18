import { Footer } from "@/layouts/footer";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { PencilLine } from "lucide-react";
import { useEffect } from "react";

const EditEmployeeProfilePage = () => {
    const { singleemployee, fetchuserData } = useAuth();
    useEffect(() => {
        const employeeid = sessionStorage.getItem("employeeid");
        if (employeeid) {
            fetchuserData(employeeid);
        }
    }, []);
    return (
        <div className="flex flex-col gap-y-4 p-6 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Employee</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing Employee</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Employee Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Phone_No</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">

                            <tr>
                                <td className="px-4 py-3 dark:text-white">1</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="dark:text-white">{singleemployee.firstname}{" "}{singleemployee.lastname}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.email}</td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.employeeid}</td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.phone}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <Link to={"/Employeelayout/manage-profile"}
                                        state={{ employeeId: singleemployee._id }}
                                    >
                                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded">
                                            <PencilLine size={16} /> Manage
                                        </button>
                                    </Link>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>


            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Points</h1>
            <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
                <div className="flex lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <p className="lg:text-lg sm:text-sm font-semibold dark:text-white">Showing Employee</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Employee Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Phone_No</th>
                                <th className="px-4 py-2 text-left font-semibold">Points</th>
                                <th className="px-4 py-2 text-left font-semibold">Points Alloted</th>
                                <th className="px-4 py-2 text-left font-semibold">Points Validity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">

                            <tr>
                                <td className="px-4 py-3 dark:text-white">1</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="dark:text-white">{singleemployee.firstname}{" "}{singleemployee.lastname}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.email}</td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.employeeid}</td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.phone}</td>
                                <td className="px-4 py-3 dark:text-white">{singleemployee.TotalPoints}</td>
                                <td className="px-4 py-3 dark:text-white">10-6-2025</td>
                                <td className="px-4 py-3 dark:text-white">10-6-2026</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditEmployeeProfilePage;


