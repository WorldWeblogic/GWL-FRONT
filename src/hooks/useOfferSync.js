import { useEffect } from "react";

const useOfferSync = (fetchOffers, fetchEmployeeOffers,fetchalluser,fetchallemployee) => {
    useEffect(() => {
        const bc = new BroadcastChannel("offer_status_channel");

        bc.onmessage = (event) => {
            if (event.data.type === "OFFER_STATUS_UPDATED") {
                fetchOffers?.();
                fetchEmployeeOffers?.();
                fetchalluser?.();
                fetchallemployee?.();
            }
        };

        return () => bc.close();
    }, [fetchOffers, fetchEmployeeOffers,fetchalluser,fetchallemployee]);
};

export default useOfferSync;