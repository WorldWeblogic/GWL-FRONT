import { useEffect, useState } from "react";
import { Footer } from "@/layouts/footer";
import { toast } from "react-toastify";
import API from "../../API/Api";
import { useLocation } from "react-router-dom";

const CustomerUpdatesaleform = () => {
    const location = useLocation();
    const { ID } = location.state;
    const [form, setForm] = useState({
        GWLHandling: "",
        agency: "",
        documentation: "",
        freight: "",
        handling: "",
        loading: "",
        offloading: "",
        storage: "",
        transport: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/customerupdatesaleform/${ID}`, form, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            toast.success("updated successfully");
        } catch (err) {
            const message = err.response.data.message;
            toast.error(message);
            console.log(err);
        }
    };

    async function sale() {
        try {
            const res = await API.get(`/customersinglesaledata/${ID}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            // console.log(res);
            setForm({
                GWLHandling: res.data.sale.GWLHandling ||"",
                agency: res.data.sale.agency ||"",
                documentation: res.data.sale.documentation ||"",
                freight: res.data.sale.freight ||"",
                handling: res.data.sale.handling ||"",
                loading: res.data.sale.loading ||"",
                offloading: res.data.sale.offloading ||"",
                storage: res.data.sale.storage ||"",
                transport: res.data.sale.transport ||"",
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        sale();
    }, []);
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Update Monthly Sale Form</h1>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">GWL Handling</div>
                            <input
                                type="number"
                                name="GWLHandling"
                                value={form.GWLHandling}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Agency</div>
                            <input
                                type="number"
                                name="agency"
                                value={form.agency}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Documentation</div>
                            <input
                                type="number"
                                name="documentation"
                                value={form.documentation}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Freight</div>
                            <input
                                type="number"
                                name="freight"
                                value={form.freight}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Handling</div>
                            <input
                                type="number"
                                name="handling"
                                value={form.handling}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Loading</div>
                            <input
                                type="number"
                                name="loading"
                                value={form.loading}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">OFF Loading</div>
                            <input
                                type="number"
                                name="offloading"
                                value={form.offloading}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Storage</div>
                            <input
                                type="number"
                                name="storage"
                                value={form.storage}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>

                         <div className="flex flex-col">
                            <div className="mb-1 dark:text-white">Transport</div>
                            <input
                                type="number"
                                name="transport"
                                value={form.transport}
                                onChange={handleChange}
                                className="w-full appearance-none rounded border px-3 py-2 text-black shadow focus:border-red-500 focus:bg-slate-50 focus:shadow focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
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
export default CustomerUpdatesaleform;
