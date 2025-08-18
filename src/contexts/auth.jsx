import { createContext, useContext, useEffect, useState } from "react";
import API from "../API/Api";

export const AuthContext = createContext();
export const AuthProvier = ({ children }) => {

    // *************************************customer***********************************************
    // function to store token in local storage
    const [token, settoken] = useState(localStorage.getItem("token") || null);
    const [employeetoken, setemployeetoken] = useState(localStorage.getItem("employeetoken") || null);
    const [lowermanagertoken, setlowermanagertoken] = useState(localStorage.getItem("lowermanagertoken") || null);
    const [managertoken, setmanagertoken] = useState(localStorage.getItem("managertoken") || null);
    const [admintoken, setadmintoken] = useState(localStorage.getItem("admintoken") || null);

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

    const fetchalluser = async (admintoken, lowermanagertoken, managertoken) => {
        try {
            const response = await API.get("/alluser", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || lowermanagertoken || managertoken}`,
                }
            });
            setCustomersdata(response.data.customer);
        } catch (err) {
            console.error(err);
        }
    };

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
    const fetchallemployee = async (admintoken, lowermanagertoken, managertoken,) => {
        try {
            const response = await API.get("/allemployee", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || managertoken || lowermanagertoken}`,
                }
            });
            setemployeedata(response.data.employees);
        } catch (err) {
            console.error(err);
        }
    };

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

    useEffect(() => {
        const employeeid = sessionStorage.getItem("employeeid");
        if (employeeid) {
            fetchuserData(employeeid);
        }
    }, []);

    // ************************************lowermanager*******************************************
    // function to store manager token in local storage

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
    const fetchlowermanagerData = async (admintoken, lowermanagerid, managertoken) => {
        if (lowermanagerid) {
            try {
                const response = await API.get(`/getlowermanager/${lowermanagerid}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${admintoken || lowermanagerid || managertoken}`,
                    },
                });
                setlowermanager(response.data.managerdata);
            } catch (err) {
                console.log(err.response?.status || err.message);
            }
        }
    };

    //fetch all lower manager data
    const [lowermanagerdata, setlowermanagerdata] = useState([]);
    const fetchallLowermanager = async (admintoken, managertoken) => {
        try {
            const response = await API.get("/allLowermanager", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || managertoken}`,
                }
            }
            );
            setlowermanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };

    // *************************************manager***********************************************
    // function to store manager token in local storage

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
    const fetchallmanager = async (admintoken, lowermanagertoken, managertoken) => {
        try {
            const response = await API.get("/allmanager", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || lowermanagertoken || managertoken}`,
                }
            });
            setmanagerdata(response.data.manager);
        } catch (err) {
            console.error(err);
        }
    };

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

    // *************************************admin***********************************************

    // function to store admin token in local storage

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
    const fetchalloffer = async (admintoken, lowermanagertoken, managertoken) => {
        try {
            const response = await API.get("/get-offer", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || managertoken || lowermanagertoken}`,
                }
            });
            setofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };


    // get all employee offer function
    const [employeeofferdata, setemployeeofferdata] = useState([]);
    const fetchallemployeeoffer = async (admintoken, managertoken, lowermanagertoken) => {
        try {
            const response = await API.get("/getall-employee-offer", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || managertoken || lowermanagertoken}`,
                }
            });
            setemployeeofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };

    // *************************************upcoming-offer***************************************************
    // get all upcoming offer function
    const [Upcomimgofferdata, setUpcomimgofferdata] = useState([]);
    const fetchupcomingalloffer = async (admintoken, lowermanagertoken, managertoken) => {
        try {
            const response = await API.get("/getupcoming-offer", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || lowermanagertoken || managertoken}`,
                }
            });
            setUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };

    // get all employee upcoming offer function
    const [employeeUpcomimgofferdata, setemployeeUpcomimgofferdata] = useState([]);
    const fetchemployeeallupcomingoffer = async (admintoken, lowermanagertoken, managertoken) => {
        try {
            const response = await API.get("/getupcoming-employee-offer", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || lowermanagertoken || managertoken}`,
                }
            });
            setemployeeUpcomimgofferdata(response.data.offer);
        } catch (err) {
            console.error(err);
        }
    };

    // *************************************company***************************************************
    // get all company
    const [companydata, setcompanydata] = useState([]);
    const fetchallcompany = async (admintoken, managertoken, lowermanagertoken) => {
        try {
            const response = await API.get("/getallcompany", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admintoken || managertoken || lowermanagertoken}`,
                }
            });
            setcompanydata(response.data.company);
        } catch (err) {
            console.error(err);
        }
    };

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
