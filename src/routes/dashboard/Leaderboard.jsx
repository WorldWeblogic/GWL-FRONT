import { Footer } from "@/layouts/footer";
import { useEffect, useState } from "react";
import API from "../../API/Api";

const Leaderboard = () => {
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

    function getRankColorClass(rank) {
        switch (rank) {
            case 1:
                return "bg-red-600 dark:bg-red-600";
            case 2:
                return "bg-blue-600 dark:bg-blue-600";
            case 3:
                return "bg-green-600 dark:bg-green-600";
            default:
                return "bg-zinc-500";
        }
    }
    return (
        <>
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
                                    className={`${getRankColorClass(index + 1)}rounded-lg shadow-sm text-white`}
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
            <Footer />
        </>
    );
};

export default Leaderboard;
