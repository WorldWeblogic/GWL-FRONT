import { createContext, useContext, useEffect, useState } from "react";
import API from "../API/Api";

export const AuthContext = createContext();
export const AuthProvier = ({ children }) => {

    // *************************************customer***********************************************
    // function to store token in local storage
    const [token, settoken] = useState(localStorage.getItem("token") || null);
    const storetoken = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    };

    // logic to check if user is logged in or not
    let isloggedin = !!token;
    const logoutuser = () => {
        settoken("");
        sessionStorage.removeItem("id");
        return localStorage.removeItem("token");
    };

    // fetch all customer data
    const [customersdata, setCustomersdata] = useState([]);
    const fetchalluser = async () => {
        try {
            const response = await API.get("/alluser");
            // console.log(response);
            setCustomersdata(response.data.customer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchalluser();
    }, []);

    // get single customer data
    const [user, setuser] = useState({});
    const fetchcustomerData = async (userid) => {
        try {
            const response = await API.get(`/user/${userid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            setuser(response.data.userdata);
        } catch (err) {
            console.log(err.response?.status || err.message);
        }
    };
    useEffect(() => {
        const userid = sessionStorage.getItem("id");
        if (userid) {
            fetchcustomerData(userid);
        }
    }, [])

    // *************************************employee***********************************************

    // function to store employee token in local storage
    const [employeetoken, setemployeetoken] = useState(localStorage.getItem("employeetoken") || null);
    const storeemployeetoken = (serveremployeeToken) => {
        return localStorage.setItem("employeetoken", serveremployeeToken);
    };

    // logic to check if admin is logged in or not
    let isloggedemployee = !!employeetoken;
    const logoutemployee = () => {
        setemployeetoken("");
        sessionStorage.removeItem("employeeid");
        return localStorage.removeItem("employeetoken");
    };
    // fetch all employee data
    const [employeedata, setemployeedata] = useState([]);
    const fetchallemployee = async () => {
        try {
            const response = await API.get("/allemployee");
            setemployeedata(response.data.employees);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallemployee();
    }, []);

    // get single employee data
    const [singleemployee, setsingleemployee] = useState({});
    const fetchuserData = async (employeeid) => {
        try {
            const response = await API.get(`/employee/${employeeid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setsingleemployee(response.data.employeedata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };

    // console.log(singleemployee);

    useEffect(() => {
        const employeeid = sessionStorage.getItem("employeeid");
        if (employeeid) {
            fetchuserData(employeeid);
        }
    }, []);

    // ************************************lowermanager*******************************************
    // function to store manager token in local storage
    const [lowermanagertoken, setlowermanagertoken] = useState(localStorage.getItem("lowermanagertoken") || null);
    const storelowermanagertoken = (serverlowermanagerToken) => {
        return localStorage.setItem("lowermanagertoken", serverlowermanagerToken);
    };
    // logic to check if manager is logged in or not
    let isloggedlowermanager = !!lowermanagertoken;
    const logoutlowermanager = () => {
        setlowermanagertoken("");
        sessionStorage.removeItem("lowermanagerid");
        return localStorage.removeItem("lowermanagertoken");
    };
    // function to fetch single manager from the server
    const [lowermanager, setlowermanager] = useState({});
    const fetchlowermanagerData = async (lowermanagerid) => {
        try {
            const response = await API.get(`/getlowermanager/${lowermanagerid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setlowermanager(response.data.managerdata);
        } catch (err) {
            console.log(err.response?.status || err.message);
        }
    };

    useEffect(() => {
        const lowermanagerid = sessionStorage.getItem("lowermanagerid");
        if (lowermanagerid) {
            fetchlowermanagerData(lowermanagerid);
        }
    }, []);

    //fetch all lower manager data
    const [lowermanagerdata, setlowermanagerdata] = useState([]);
    const fetchallLowermanager = async () => {
        try {
            const response = await API.get("/allLowermanager");
            //console.log(response.data.manager);
            setlowermanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallLowermanager();
    }, []);

    // *************************************manager***********************************************
    // function to store manager token in local storage
    const [managertoken, setmanagertoken] = useState(localStorage.getItem("managertoken") || null);
    const storemanagertoken = (servermanagerToken) => {
        return localStorage.setItem("managertoken", servermanagerToken);
    };
    // logic to check if manager is logged in or not
    let isloggedmanager = !!managertoken;
    const logoutmanager = () => {
        setmanagertoken("");
        sessionStorage.removeItem("managerid");
        return localStorage.removeItem("managertoken");
    };
    // fetch all manager data
    const [managerdata, setmanagerdata] = useState([]);
    const fetchallmanager = async () => {
        try {
            const response = await API.get("/allmanager");
            setmanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallmanager();
    }, []);

    // function to fetch single manager from the server
    const [manager, setmanager] = useState({});
    const fetchmanagerData = async (managerid) => {
        try {
            const response = await API.get(`/manager/${managerid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setmanager(response.data.managerdata);
        } catch (err) {
            console.log("Error fetching user data:", err.response?.status || err.message);
        }
    };

    useEffect(() => {
        const managerid = sessionStorage.getItem("managerid");
        if (managerid) {
            fetchmanagerData(managerid);
        }
    }, []);

    // *************************************admin***********************************************

    // function to store admin token in local storage
    const [admintoken, setadmintoken] = useState(localStorage.getItem("admintoken") || null);
    const storeadmintoken = (serveradminToken) => {
        sessionStorage.removeItem("adminid");
        return localStorage.setItem("admintoken", serveradminToken);
    };
    // logic to check if admin is logged in or not
    let isloggedadmin = !!admintoken;
    const logoutadmin = () => {
        setadmintoken("");
        sessionStorage.removeItem("adminid");
        return localStorage.removeItem("admintoken");
    };

    // *************************************offer***************************************************
    // get all offer function
    const [offerdata, setofferdata] = useState([]);
    const fetchalloffer = async () => {
        try {
            const response = await API.get("/get-offer");
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchalloffer();
    }, []);


    // get all employee offer function
    const [employeeofferdata, setemployeeofferdata] = useState([]);
    const fetchallemployeeoffer = async () => {
        try {
            const response = await API.get("/getall-employee-offer");
            setemployeeofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallemployeeoffer();
    }, []);


    // *************************************upcoming-offer***************************************************
    // get all upcoming offer function
    const [Upcomimgofferdata, setUpcomimgofferdata] = useState([]);
    const fetchupcomingalloffer = async () => {
        try {
            const response = await API.get("/getupcoming-offer");
            setUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchupcomingalloffer();
    }, []);

    // get all employee upcoming offer function
    const [employeeUpcomimgofferdata, setemployeeUpcomimgofferdata] = useState([]);
    const fetchemployeeallupcomingoffer = async () => {
        try {
            const response = await API.get("/getupcoming-employee-offer");
            setemployeeUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchemployeeallupcomingoffer();
    }, []);

    // *************************************company***************************************************
    // get all company
    const [companydata, setcompanydata] = useState([]);
    const fetchallcompany = async () => {
        try {
            const response = await API.get("/getallcompany");
            setcompanydata(response.data.company);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchallcompany();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                storetoken,
                logoutuser,
                isloggedin,
                logoutadmin,
                isloggedadmin,
                storeadmintoken,
                storeemployeetoken,
                isloggedemployee,
                logoutemployee,
                logoutmanager,
                isloggedmanager,
                customersdata,
                employeedata,
                offerdata,
                fetchalloffer,
                fetchalluser,
                managerdata,
                fetchallmanager,
                Upcomimgofferdata,
                fetchupcomingalloffer,
                fetchallemployee,
                singleemployee,
                user,
                fetchcustomerData,
                employeeofferdata,
                fetchallemployeeoffer,
                employeeUpcomimgofferdata,
                fetchemployeeallupcomingoffer,
                companydata,
                fetchallcompany,
                fetchuserData,
                manager,
                logoutlowermanager,
                storelowermanagertoken,
                lowermanager,
                fetchlowermanagerData,
                fetchallLowermanager,
                lowermanagerdata,
                fetchmanagerData,
                storemanagertoken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of AuthProvider");
    }
    return authContextValue;
};
