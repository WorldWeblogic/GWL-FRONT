
import CountUp from "react-countup";
import { MdDiscount } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";
import { MdError } from "react-icons/md";
import { TiSocialTwitter } from "react-icons/ti";
import { IoIosMail } from "react-icons/io";
import { FcPositiveDynamic } from "react-icons/fc";
import { GrServices } from "react-icons/gr";
import { GiCargoShip } from "react-icons/gi";
import { FaPlaneDeparture } from "react-icons/fa";
import { GiCargoCrate } from "react-icons/gi";
import { FaTruckMoving } from "react-icons/fa";
import { GiCargoCrane } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";

export default function Achivements() {
  const performanceRewards = [
    { title: "Sales (AED 1,000)", points: 10, description: "For each AED 1,000 sold", icon: <FcPositiveDynamic className="size-8" /> },
    { title: "Additional Service Used", points: "5x", description: "Valid for 3 purchases", icon: <GrServices className="size-8 text-orange-500" /> },
    { title: "50 Doc Clearances", points: "2x", description: "2x Points for 50 docs/month", icon: <GiCargoCrate className="text-red-600 size-8" /> },
    { title: "20 Loading/Offloading", points: "2x", description: "in a month you will get", icon: <GiCargoCrane className="text-zinc-600 size-8" /> },
    { title: "20 Containers Shipped", points: "2x", description: "in a month you will get", icon: <GiCargoShip className="size-8 text-blue-700" /> },
    { title: "20 Transportation", points: "2x", description: "in a month you will get", icon: <FaTruckMoving className="text-red-600 size-8" /> },
    { title: "10T Airfreight", points: "2x", description: "in a month you will get", icon: <FaPlaneDeparture className="text-zinc-600 size-8" /> },
    { title: "Value Deal", points: "5x", description: "for one month on every transactio you will get ", icon: <BsCart4 className="text-green-600 size-8" /> }
  ];

  const gamification = [
    { title: "Post GWL on your Website", points: 10, description: "Post GWL services on your website", icon: <IoIosMail className="text-yellow-500 size-10" /> },
    { title: "Post GWL service on Social Media", points: 10, description: "Max 10 times and you will get ", icon: <TiSocialTwitter className="text-blue-500 size-10" /> },
    { title: "Quiz Answer", points: 10, description: "Earn for every correct quiz", icon: <MdQuiz className="text-green-500 size-10" /> },
    { title: "Errors at GWL End", points: 50, description: "Earn if GWL error occurs", icon: <MdError className="text-red-500 size-10" /> },
  ];

  const milestoneRewards = [
    { title: "Blue", points: 300, perks: ["1 Doc Free", "1 Handling Free", "1 Transport Free", "No Storage Free", "No Value Deals"], icon: <FaStar className="text-blue-500 size-8" /> },
    { title: "Silver", points: 1000, perks: ["3 Doc Free", "3 Handling Free", "3 Transport Free", "7 Days Storage Free", "2 Value Deals"], icon: <FaStar className="text-zinc-500 size-8" /> },
    { title: "Gold", points: 3000, perks: ["10 Doc Free", "10 Handling Free", "10 Transport Free", "15 Days Storage Free", "4 Value Deals"], icon: <FaStar className="text-yellow-500 size-8" /> },
  ];

  const otherRewards = [
    { title: "Discounts", points: 100, reward: "Get 1,000 AED Discount on", icon: <MdDiscount className="size-12 text-green-600" /> },
    { title: "Visit to Dubai", points: 1000, reward: "Tickets + Hotel for 2 persons", icon: <RiBuilding2Fill className="size-12 text-blue-500" /> },
  ];

  return (
    <div className="p-8">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Digital Currency Program for Customers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceRewards.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl shadow-xl dark:bg-slate-950 hover:shadow-red-500 hover:scale-110 hover:cursor-pointer ">
              <div className="flex flex-col items-center text-center gap-4">
                <div>{item.icon}</div>
                <h3 className="text-lg font-bold dark:text-white break-words w-full max-w-[200px]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="text-red-600 text-lg font-medium">
                  {typeof item.points === 'number' ? <CountUp end={item.points} duration={2} /> : item.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gamification Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Gamify Activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gamification.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl shadow-xl dark:bg-slate-950 hover:shadow-red-500 hover:scale-110 hover:cursor-pointer border-slate-500 dark:border-slate-700">
              <div className="flex flex-col items-center text-center gap-4">
                <div>{item.icon}</div>
                <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="text-2xl text-red-600 font-bold">
                  <CountUp end={item.points} duration={2} /> pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestone Rewards */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Milestone Rewards</h2>
        <div className="dark:bg-slate-950 bg-white shadow mb-4 rounded-lg py-4 px-6 flex items-center hover:shadow-red-500 hover:scale-105 hover:cursor-pointer">
          <span><FaStar className="text-red-500 mr-4" size={32} /></span>
          <span className="font-semibold dark:text-white">Red color means you did not achieve any milestone Rewards or your milestone Rewards are less than 300 points.</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestoneRewards.map((tier, idx) => (
            <div key={idx} className="p-6 rounded-2xl shadow-xl dark:bg-slate-950 hover:shadow-red-500 hover:scale-110 hover:cursor-pointer border-slate-500 dark:border-slate-700 ">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>{tier.icon}</div>
                  <h3 className="text-xl font-bold dark:text-white">{tier.title}</h3>
                </div>
                <div className="text-2xl text-red-600 font-bold">
                  <CountUp end={tier.points} duration={2} /> pts
                </div>
                <ul className="text-gray-600 text-sm list-disc pl-4 dark:text-white">
                  {tier.perks.map((perk, i) => (
                    <li key={i}>{perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Rewards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Special Rewards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherRewards.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl hover:shadow-xl shadow-xl dark:bg-slate-950 hover:shadow-red-500 hover:cursor-pointer hover:scale-110 border-slate-500 dark:border-slate-700">
              <div className="flex flex-col items-center text-center gap-4">
                <div>{item.icon}</div>
                <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                <p className="text-gray-600">{item.reward}</p>
                <div className="text-2xl text-red-500 font-bold">
                  <CountUp end={item.points} duration={2} /> pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
