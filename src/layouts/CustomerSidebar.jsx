import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { customernavbarLinks } from "@/constants";

import logo from "@/assets/GWL-logo2.png"

import { cn } from "@/utils/cn";

import PropTypes from "prop-types";

export const CustomerSidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <img
                    src={logo}
                    loading="lazy"
                    alt="Logoipsum"
                    className="dark:hidden w-[60px] rounded-full"
                />
                <img
                    src={logo}
                    loading="lazy"
                    alt="Logoipsum"
                    className="hidden dark:block w-[60px] rounded-full"
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">Gulf Worldwide Logistics</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">

                {customernavbarLinks.map((navbarLink,index) => (
                    <nav
                        key={index}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        {/* <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p> */}
                        {navbarLink.links.map((link,index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                end
                                className={({ isActive }) =>
                                    cn(
                                        "sidebar-item",
                                        collapsed && "md:w-[45px]",
                                        isActive && "bg-red-500 text-slate-50 dark:bg-red-600"
                                    )
                                }
                            >
                                <link.icon size={22} className="flex-shrink-0" />
                                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}

            </div>
        </aside>
    );
});

CustomerSidebar.displayName = "CustomerSidebar";

CustomerSidebar.propTypes = {
    collapsed: PropTypes.bool,
};


