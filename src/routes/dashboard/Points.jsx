import { TbTargetArrow } from "react-icons/tb";
import { FaTruckMoving } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FcPositiveDynamic } from "react-icons/fc";
import { FaGlobe } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import CountUp from "react-countup";
import { PiShippingContainerFill } from "react-icons/pi";
import { IoCartSharp } from "react-icons/io5";
export default function Points() {
    const achievements = [
        { title: "Sales (AED 1,000)",
           points: 2, 
           description: "For each AED 1,000 sold you get",
           icon: <FcPositiveDynamic size={32} /> 
        },
        {
            title: "Monthly Sales Target",
            points: 10,
            description: "Sales of 100 Doc service a month ",
            icon: (
                <TbTargetArrow
                    size={32}
                    className="text-red-500"
                />
            ),
        },
        {
          title:"Monthly Sales Target",
          points:10,
          description:"Sales of 100 Transport service a month",
          icon: <FaTruckMoving size={32} className="text-purple-500"/>,
        },
        {
          title:"Monthly Sales Target",
          points:10,
          description:"Sales of 100 Handling service a month ",
          icon: <IoCartSharp  size={32} className="text-rose-500"/>,
        },
        {
          title:"Monthly Sales Target",
          points:10,
          description:"Sales of 60 Freight service a month",
          icon: <PiShippingContainerFill  size={32} className="text-indigo-500"/>,
        },
        {
            title: "New Customers",
            points: 50,
            description: "Get new customer of upto 10000 AED per month & you get",
            icon: (
                <FaUser
                    size={32}
                    className="text-blue-500"
                />
            ),
        },
        {
            title: "Employee of Quarter",
            points: 10,
            description: "If you become employee of the Quarter you will get ",
            icon: (
                <FaUserTie
                    size={32}
                    className="text-red-500"
                />
            ),
        },
        {
            title: "Digital Course",
            points: 20,
            description: "If you complete Digital Training Course you will get",
            icon: (
                <FaGraduationCap
                    size={32}
                    className="text-green-500"
                />
            ),
        },
        {
            title: "Book Reading",
            points: 20,
            description: "If you Submit 3 Key Ideas",
            icon: (
                <FaBookOpen
                    size={32}
                    className="text-blue-500"
                />
            ),
        },
        {
            title: "Marketing Material",
            points: 6,
            description: "Per Creative Asset",
            icon: (
                <HiSpeakerphone
                    size={32}
                    className="text-yellow-700"
                />
            ),
        },
        {
            title: "CSR Program",
            points: 20,
            description: "Social Responsibility",
            icon: (
                <FaGlobe
                    size={32}
                    className="text-blue-400"
                />
            ),
        },
    ];

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {achievements.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl border border-slate-500 p-4 shadow-xl transition-shadow duration-300 hover:scale-110 hover:cursor-pointer hover:shadow-xl hover:shadow-red-500 dark:border-slate-800 dark:bg-slate-950"
                    >
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="text-primary">{item.icon}</div>
                            <h2 className="font-semibold dark:text-gray-500">{item.title}</h2>
                            <p className="text-sm dark:text-white">{item.description}</p>
                            <div className="mt-2 font-medium text-red-500">
                                <CountUp
                                    end={item.points}
                                    duration={2}
                                />{" "}
                                pts
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
