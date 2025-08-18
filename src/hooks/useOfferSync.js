import { useEffect } from "react";

const useOfferSync = (fetchOffers, fetchEmployeeOffers, fetchalluser, fetchallemployee, fetchallcompany, fetchupcomingalloffer, fetchemployeeallupcomingoffer) => {
    const lowermanagertoken = localStorage.getItem("lowermanagertoken")
    const admintoken = localStorage.getItem("admintoken");
    const managertoken = localStorage.getItem("managertoken");
    useEffect(() => {
        const bc = new BroadcastChannel("offer_status_channel");

        bc.onmessage = (event) => {
            if (event.data.type === "OFFER_STATUS_UPDATED") {
                fetchOffers?.(admintoken, lowermanagertoken, managertoken);
                fetchEmployeeOffers?.(admintoken, lowermanagertoken, managertoken);
                fetchalluser?.(admintoken, lowermanagertoken, managertoken);
                fetchallemployee?.(admintoken, lowermanagertoken, managertoken);
                fetchallcompany?.(admintoken, lowermanagertoken, managertoken);
                fetchupcomingalloffer?.(admintoken, lowermanagertoken, managertoken);
                fetchemployeeallupcomingoffer?.(admintoken, lowermanagertoken, managertoken);
            }
        };

        return () => bc.close();
    }, [fetchOffers, fetchEmployeeOffers, fetchalluser, fetchallemployee]);
};

export default useOfferSync;