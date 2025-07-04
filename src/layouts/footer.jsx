import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <p className="cursor-pointer text-base font-medium text-slate-900 dark:text-slate-50">© 2025 Gulf Worldwide Logistics | Developed by WORLD WEBLOGIC</p>
            <div className="flex flex-wrap gap-x-2">
                <Link to="/privacy-policy"
                    className="link"
                >
                    Privacy Policy
                </Link>
                <Link to="/terms-condition"
                    className="link flex flex-row items-center"
                >
                    Terms & Conditions
                </Link>
            </div>
        </footer>
    );
};
