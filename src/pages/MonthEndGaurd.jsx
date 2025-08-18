import { useMemo } from "react";
import MonthEndUnavailable from "../pages/MonthEndUnavailable";

const MonthEndGuard = ({ children }) => {
    const isLastDay = useMemo(() => {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return today.getDate() === lastDay.getDate();
    }, []);

    return isLastDay ? children : <MonthEndUnavailable />;
};

export default MonthEndGuard;
