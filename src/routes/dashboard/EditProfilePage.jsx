import { Footer } from "@/layouts/footer";
import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth";

const EditProfilePage = () => {
    // function to fetch admion data from the server
    const { user, fetchcustomerData } = useAuth();
    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            fetchcustomerData(id);
        }
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Customer</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
                <div className="mb-4 flex items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <p className="font-semibold dark:text-white sm:text-sm lg:text-lg">Showing Customer</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-gray-200 text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">#</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Email</th>
                                <th className="px-4 py-2 text-left font-semibold">Customer Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-4 py-3 dark:text-white">1</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="dark:text-white">
                                            {user.firstname} {user.lastname}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 dark:text-white">{user.email}</td>
                                <td className="px-4 py-3 dark:text-white">{user.customerid}</td>
                                <td className="flex gap-2 px-4 py-3">
                                    <Link to={"/Customerlayout/manage-profile"}
                                        state={{ custId: user._id }}
                                    >
                                        <button className="flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white">
                                            <PencilLine size={16} /> Manage
                                        </button>
                                    </Link>
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

export default EditProfilePage;
