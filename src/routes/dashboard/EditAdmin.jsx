import { useState, useEffect } from "react";
import { Footer } from "@/layouts/footer";
import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../API/Api";
const EditAdminPage = () => {

    // function to fetch admion data from the server
    const [admin, setadmin] = useState({});
    const fetchadminData = async (adminid) => {
        try {
            const response = await API.get(`/admin/${adminid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setadmin(response.data.admindata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };
    useEffect(() => {
        const adminid = sessionStorage.getItem("adminid")
        if (adminid) {
            fetchadminData(adminid);
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing Profile</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr
                                className="items-center"
                            >
                                <td className="px-4 py-3 dark:text-white">
                                    <div className="flex h-12 items-center">1</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex h-12 items-center gap-3">
                                        <span className="dark:text-white">{admin.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">
                                    <div className="flex h-12 items-center">{admin.email}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex h-12 items-center gap-2">
                                        <Link to="/layout/manage-admin"
                                            state={{ adminid: admin._id }}>
                                            <button className="flex gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                                <PencilLine size={16} /> Manage
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditAdminPage;
