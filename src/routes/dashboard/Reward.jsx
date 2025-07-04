import { FaSackDollar } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
export default function Rewards() {
  const rewards = [
    { title: "Commission", points: "Max 50 pts/qtr", value: "AED 3000", icon: <FaSackDollar size={32} className="text-yellow-500"/> },
    { title: "Bi-Annual Bonus", points: "Max 50 pts", value: "AED 3000", icon: <FaMoneyCheckAlt size={32} className="text-green-700"/> },
    { title: "2-Night Vacation", points: "Local Staycation", value: " 50 pts", icon: <FaUmbrellaBeach size={32} className="text-blue-500"/> },
    { title: "Mental Health Day", points: "Personalized Mental Day ", value: "20 pts", icon: <RiMentalHealthFill size={32} className="text-orange-300"/> },
    { title: "Gift Cards", points: "2x", value: "50% Company Contribution", icon: <FaGift size={32} className="text-red-500"/> },
    { title: "Company Car", points: "Get a Company Car for travel", value: "500 pts", icon: <FaCar size={32} className="text-slate-500"/> },
    { title: "Kids Education", points: "School Fee Assistance", value: "300 pts", icon: <FaBookOpen size={32} className="text-orange-500"/> },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
        {rewards.map((reward, idx) => (
          <div key={idx} className="p-4 hover:shadow-xl transition-shadow rounded-2xl border border-slate-500 bg-white hover:shadow-red-500 hover:cursor-pointer dark:bg-slate-950 dark:border-slate-800 shadow-xl hover:scale-110">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-primary">{reward.icon}</div>
              <h2 className="font-semibold dark:text-slate-500">{reward.title}</h2>
              <p className="text-sm dark:text-white">{reward.points}</p>
              <p className="text-red-500 font-medium items-center">{reward.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
