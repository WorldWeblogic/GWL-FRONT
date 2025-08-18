import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
// layout components
import Layout from "@/routes/layout";
import Customerlayout from "@/routes/Customerlayout";
import Employeelayout from "@/routes/Employeelayout";
import Managerlayout from "@/routes/Managerlayout";
// customer components
import CustomerPage from "./routes/dashboard/CustomerPage";
import ManageProfile from "./routes/dashboard/ManageProfile";
import EditProfilePage from "./routes/dashboard/EditProfilePage";
// employee components
import EmployeePage from "./routes/dashboard/EmployeePage";
//import EditemployeePage from "./routes/dashboard/EditEmployeeProfilePage";
import EditEmployeeProfilePage from "./routes/dashboard/EditEmployeeProfilePage";
// manager components
import EditManagerPage from "./routes/dashboard/EditManagerPage";
import ManagerPage from "./routes/dashboard/ManagerPage";
// admin components
import DashboardPage from "@/routes/dashboard/page";
import AdminLoginForm from "./pages/AdminLoginForm";
import LoginForm from "./pages/LoginForm";
import EmployeeLoginForm from "./pages/EmployeeLoginForm";
import ManagerLoginForm from "./pages/ManagerLoginForm";
import Logout from "./pages/Logout";
import EditCustomerPage from "./routes/dashboard/EditCustomerPage";
import AddcustomerPage from "./routes/dashboard/Addcustomerpage";
import AddemployeePage from "./routes/dashboard/Addemployeepage";
import EditEmployeePage from "./routes/dashboard/EditEmployeePage";
import AllOffers from "./routes/dashboard/AllOffers";
import AddOffers from "./routes/dashboard/AddOffers";
import EditOffers from "./routes/dashboard/EditOffers";
import UpdateEmployee from "./routes/dashboard/UpdateEmployee";
import UpdateCustomer from "./routes/dashboard/UpdateCustomer";
import AllManager from "./routes/dashboard/AllManager";
import AddManger from "./routes/dashboard/AddManager";
import UpdateManger from "./routes/dashboard/UpdateManger";
import Relation from "./routes/dashboard/Relation";
import ManageEmployee from "./routes/dashboard/ManageEmployee";
import ManagerCustomer from "./routes/dashboard/ManagerCustomer";
import ManageManager from "./routes/dashboard/ManageManager";
import ManagerAllOffers from "./routes/dashboard/ManagerAllOffer";
import ManagerEmployee from "./routes/dashboard/ManagerEmployee";
import EditAdminPage from "./routes/dashboard/EditAdmin";
import Managerlogout from "./pages/Managerlogout";
import Employeelogout from "./pages/EmployeeLogout";
import Adminlogout from "./pages/AdminLogout";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditons from "./components/TermsConditions";
import Allupcomingoffer from "./routes/dashboard/Allupcomingoffer";
import Addupcomingoffer from "./routes/dashboard/Addupcomingoffer";
import Editupcomingoffer from "./routes/dashboard/Editupcomingoffer";
import CustomerRoute from "./routes/CustomerRoute";
import CustomerProtectedRoute from "./routes/CustomerProtectedRoute";
import ManagerAllupcomingoffer from "./routes/dashboard/ManagerAllupcomingoffer";
import Monthlysaleform from "./routes/dashboard/Monthlysaleform";
import EditEmployeeOffers from "./routes/new/EditEmployeeOffer";
import AddEmployeeOffers from "./routes/new/AddEmployeeOffer";
import AddEmployeeUpcomingoffer from "./routes/new/AddEmployeeUpcomingOffer"
import Editemployeeupcomingoffer from "./routes/new/EditEmployeeUpcomingoffer";
import CompanyPage from "./routes/new/CompanyPage";
import AddCompany from "./routes/new/AddCompany";
import UpdateCompany from "./routes/new/UpdateCompany";
import LowerManagerlayout from "./routes/LowerManagerlayout";
import LowerManagerPage from "./routes/dashboard/LowerManagerPage";
import LowerManagerCustomer from "./routes/dashboard/LowerManagerCustomer";
import LowerManagerEmployee from "./routes/dashboard/LowerManagerEmployee";
import LowerManagerCompanyPage from "./routes/new/LowerManagerCompanyPage";
import LowerManagerAllOffers from "./routes/dashboard/LowerManagerAllOffer";
import LowerManagerAllupcomingoffer from "./routes/dashboard/LowerManagerAllupcomingoffer ";
import LowerManagerLoginForm from "./pages/LowerManagerLoginForm";
import LowerManagerlogout from "./pages/LowerManagerlogout";
import SuperManager from "./routes/dashboard/SuperManager";
import AddSuperManger from "./routes/dashboard/AddSuperManager";
import UpdateSuperManger from "./routes/dashboard/UpdateSuperManger";
import AdminCompanyPage from "./routes/new/AdminCompanyPage";
import EditLowerManagerPage from "./routes/dashboard/EditLowerManagerPage";
import Companyprofile from "./routes/dashboard/Companyprofile";
import Allcustomer from "./routes/dashboard/Allcustomer";
import Allemployee from "./routes/dashboard/Allemployee";
import Allcompany from "./routes/new/Allcompany";
import EmployeeProtectedRoute from "./routes/EmployeeProtectedRoute";
import EmployeeRoute from "./routes/EmployeeRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import ManagerProtectedRoute from "./routes/ManagerProtectedRoute";
import ManagerRoute from "./routes/ManagerRoute";
import LManagerProtectedRoute from "./routes/LManagerProtectedRoute";
import LManagerRoute from "./routes/LManagerRoute";
import Updateadmin from "./routes/dashboard/Updateadmin";
import Leaderboard from "./routes/dashboard/Leaderboard";
import FAQ from "./routes/dashboard/FAQ";
// import MonthEndGuard from "./pages/MonthEndGaurd";
import Error404 from "./pages/Error404";
import Salesform from "./routes/dashboard/Salesform";
import Updatesaleform from "./routes/dashboard/Updatesaleform";
import SingleEmployeeMonthlySale from "./routes/dashboard/SingleEmployeeMonthlySale";
import Employeeoffer from "./routes/dashboard/Employeeoffer";
import CustomerSalesform from "./routes/dashboard/CustomerSalesform";
import CustomerMonthlysaleform from "./routes/dashboard/Customermonthlysaleform";
import CustomerUpdatesaleform from "./routes/dashboard/CustomerUpdatesaleform";
import Customersaleform from "./routes/dashboard/Customersaleform";

function App() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: (
                <CustomerProtectedRoute>
                    <LoginForm />
                </CustomerProtectedRoute>
            ),
        },
        {
            path: "/Customerlayout",
            element: (
                <CustomerRoute>
                    <Customerlayout />
                </CustomerRoute>
            ),
            children: [
                {
                    index: "true",
                    element: (
                        <CustomerRoute>
                            <CustomerPage />
                        </CustomerRoute>
                    ),
                },
                {
                    path: "/Customerlayout/manage-profile",
                    element: (
                        <CustomerRoute>
                            <ManageProfile />
                        </CustomerRoute>
                    ),
                },
                {
                    path: "/Customerlayout/edit-profile",
                    element: (
                        <CustomerRoute>
                            <EditProfilePage />
                        </CustomerRoute>
                    ),
                },
                {
                    path: "/Customerlayout/company-profile",
                    element: (
                        <CustomerRoute>
                            <Companyprofile />
                        </CustomerRoute>
                    ),
                },
                {
                    path: "/Customerlayout/saleform",
                    element: (
                        <CustomerRoute>
                            <CustomerSalesform/>
                        </CustomerRoute>)
                },
                {
                    path: "/Customerlayout/updatesaleform",
                    element: (
                        <CustomerRoute>
                            <CustomerUpdatesaleform/>
                        </CustomerRoute>)
                },
                {
                    path: "/Customerlayout/monthlysaleform",
                    element: (
                        <CustomerRoute>
                            <CustomerMonthlysaleform/>
                        </CustomerRoute>)
                },
                {
                    path: "/Customerlayout/faq",
                    element: (
                        <CustomerRoute>
                            <FAQ />
                        </CustomerRoute>
                    ),
                },
                { path: "/Customerlayout/logout", element: <Logout /> },
            ],
        },
        {
            path: "/employeelogin",
            element: (<EmployeeProtectedRoute>
                <EmployeeLoginForm />
            </EmployeeProtectedRoute>
            )
        },
        {
            path: "/Employeelayout",
            element: (<EmployeeRoute>
                <Employeelayout />
            </EmployeeRoute>),
            children: [
                {
                    index: "true", element: (
                        <EmployeeRoute>
                            <EmployeePage />
                        </EmployeeRoute>)
                },
                {
                    path: "/Employeelayout/edit-profile", element: (
                        <EmployeeRoute>
                            <EditEmployeeProfilePage />
                        </EmployeeRoute>)
                },
                {
                    path: "/Employeelayout/manage-profile", element: (
                        <EmployeeRoute>
                            <ManageEmployee />
                        </EmployeeRoute>)
                },
                {
                    path: "/Employeelayout/monthlysaleform", element: (
                        <EmployeeRoute>
                            <Monthlysaleform />
                        </EmployeeRoute>)
                },
                {
                    path: "/Employeelayout/saleform", element: (
                        <EmployeeRoute>
                            <Salesform />
                        </EmployeeRoute>)
                },
                {
                    path: "/Employeelayout/updatesaleform", element: (
                        <EmployeeRoute>
                            <Updatesaleform />
                        </EmployeeRoute>)
                },
                // {
                //     path: "/Employeelayout/monthlysaleform",
                //     element: (
                //         <EmployeeRoute>
                //             <MonthEndGuard>
                //                 <Monthlysaleform />
                //             </MonthEndGuard>
                //         </EmployeeRoute>
                //     ),
                // },
                {
                    path: "/Employeelayout/faq",
                    element: (
                        <EmployeeRoute>
                            <FAQ />
                        </EmployeeRoute>
                    ),
                },
                { path: "/Employeelayout/logout", element: <Employeelogout /> },
            ],
        },
        {
            path: "/lowermanagerlogin",
            element: (
                <LManagerProtectedRoute>
                    <LowerManagerLoginForm />
                </LManagerProtectedRoute>),
        },
        {
            path: "/LowerManagerlayout",
            element: (
                <LManagerRoute>
                    <LowerManagerlayout />
                </LManagerRoute>),
            children: [
                {
                    index: "true", element: (
                        <LManagerRoute>
                            <LowerManagerPage />
                        </LManagerRoute>)
                },
                //profile
                {
                    path: "/LowerManagerlayout/edit-manager", element: (
                        <LManagerRoute>
                            <EditLowerManagerPage />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/manage-manager", element: (
                        <LManagerRoute>
                            <ManageManager />
                        </LManagerRoute>)
                },
                // offers
                {
                    path: "/LowerManagerlayout/all-offers", element: (
                        <LManagerRoute>
                            <LowerManagerAllOffers />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/add-offers", element: (
                        <LManagerRoute>
                            <AddOffers />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/edit-offers", element: (
                        <LManagerRoute>
                            <EditOffers />
                        </LManagerRoute>)
                },
                // employee offers
                {
                    path: "/LowerManagerlayout/edit-employee-offers", element: (
                        <LManagerRoute>
                            <EditEmployeeOffers />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/add-employee-offers", element: (
                        <LManagerRoute>
                            <AddEmployeeOffers />
                        </LManagerRoute>)
                },
                // customer
                {
                    path: "/LowerManagerlayout/edit-customer", element: (
                        <LManagerRoute>
                            <LowerManagerCustomer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/add-customer", element: (
                        <LManagerRoute>
                            <AddcustomerPage />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/manage-customer", element: (
                        <LManagerRoute>
                            <UpdateCustomer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/singlecustsaleform", element: (
                        <LManagerRoute>
                             <Customersaleform/>
                        </LManagerRoute>)
                },
                // relation
                {
                    path: "/LowerManagerlayout/relation", element: (
                        <LManagerRoute>
                            <Relation />
                        </LManagerRoute>)
                },
                // company
                {
                    path: "/LowerManagerlayout/edit-company", element: (
                        <LManagerRoute>
                            <LowerManagerCompanyPage />
                        </LManagerRoute>
                    )
                },
                {
                    path: "/LowerManagerlayout/add-company", element: (
                        <LManagerRoute>
                            <AddCompany />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/update-company", element: (
                        <LManagerRoute>
                            <UpdateCompany />
                        </LManagerRoute>)
                },
                // employee
                {
                    path: "/LowerManagerlayout/edit-employee", element: (
                        <LManagerRoute>
                            <LowerManagerEmployee />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/add-employee", element: (
                        <LManagerRoute>
                            <AddemployeePage />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/update-employee", element: (
                        <LManagerRoute>
                            <UpdateEmployee />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/employee-monthly-sale", element: (
                        <LManagerRoute>
                            <SingleEmployeeMonthlySale />
                        </LManagerRoute>)
                },
                // upcoming offers
                {
                    path: "/LowerManagerlayout/all-upcomingoffers", element: (
                        <LManagerRoute>
                            <LowerManagerAllupcomingoffer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/add-upcomingoffers", element: (
                        <LManagerRoute>
                            <Addupcomingoffer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/edit-upcomingoffers", element: (
                        <LManagerRoute>
                            <Editupcomingoffer />
                        </LManagerRoute>)
                },
                // employee upcoming offer
                {
                    path: "/LowerManagerlayout/add-employee-upcomingoffers", element: (
                        <LManagerRoute>
                            <AddEmployeeUpcomingoffer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/edit-employee-upcomingoffers", element: (
                        <LManagerRoute>
                            <Editemployeeupcomingoffer />
                        </LManagerRoute>)
                },
                {
                    path: "/LowerManagerlayout/employee/leaderboard", element: (
                        <LManagerRoute>
                            <Leaderboard />
                        </LManagerRoute>)
                },
                // faq
                {
                    path: "/LowerManagerlayout/faq",
                    element: (
                        <LManagerRoute>
                            <FAQ />
                        </LManagerRoute>
                    ),
                },
                // logout
                { path: "/LowerManagerlayout/logout", element: <LowerManagerlogout /> },
            ],
        },
        {
            path: "/managerlogin",
            element: (
                <ManagerProtectedRoute>
                    <ManagerLoginForm />
                </ManagerProtectedRoute>),
        },
        {
            path: "/Managerlayout",
            element: (
                <ManagerRoute>
                    <Managerlayout />
                </ManagerRoute>),
            children: [
                {
                    index: "true", element: (
                        <ManagerRoute>
                            <ManagerPage />
                        </ManagerRoute>)
                },
                //profile
                {
                    path: "/Managerlayout/edit-manager", element: (
                        <ManagerRoute>
                            <EditManagerPage />
                        </ManagerRoute>)
                },
                {
                    path: "/Managerlayout/manage-manager", element: (
                        <ManagerRoute>
                            <ManageManager />
                        </ManagerRoute>)
                },
                // offers
                {
                    path: "/Managerlayout/all-offers", element: (
                        <ManagerRoute>
                            <ManagerAllOffers />
                        </ManagerRoute>)
                },
                {
                    path: "/Managerlayout/add-offers", element: (
                        <ManagerRoute>
                            <AddOffers />
                        </ManagerRoute>)
                },
                {
                    path: "/Managerlayout/edit-offers", element: (
                        <ManagerRoute>
                            <EditOffers />
                        </ManagerRoute>)
                },
                //employee offers
                { path: "/Managerlayout/edit-employee-offers", element:(
                    <ManagerRoute>
                    <EditEmployeeOffers />
                    </ManagerRoute>
                )},
                {
                    path: "/Managerlayout/add-employee-offers", element: (
                        <ManagerRoute>
                            <AddEmployeeOffers />
                        </ManagerRoute>)
                },
                // customer
                {
                    path: "/Managerlayout/edit-customer", element: (
                        <ManagerRoute>
                            <ManagerCustomer />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/add-customer", element: (
                        <ManagerRoute>
                            <AddcustomerPage />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/manage-customer", element: (
                        <ManagerRoute>
                            <UpdateCustomer />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/all-customer", element: (
                        <ManagerRoute>
                            <Allcustomer />
                        </ManagerRoute>
                    )
                },
                // relation
                {
                    path: "/Managerlayout/relation", element: (
                        <ManagerRoute>
                            <Relation />
                        </ManagerRoute>
                    )
                },
                // company
                {
                    path: "/Managerlayout/edit-company", element: (
                        <ManagerRoute>
                            <CompanyPage />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/add-company", element: (
                        <ManagerRoute>
                            <AddCompany />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/update-company", element: (
                        <ManagerRoute>
                            <UpdateCompany />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/all-company", element: (
                        <ManagerRoute>
                            <Allcompany />
                        </ManagerRoute>
                    )
                },
                // employee
                {
                    path: "/Managerlayout/edit-employee", element: (
                        <ManagerRoute>
                            <ManagerEmployee />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/add-employee", element: (
                        <ManagerRoute>
                            <AddemployeePage />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/update-employee", element: (
                        <ManagerRoute>
                            <UpdateEmployee />
                        </ManagerRoute>)
                },
                {
                    path: "/Managerlayout/all-employee", element: (
                        <ManagerRoute>
                            <Allemployee />
                        </ManagerRoute>
                    )
                },
                {
                    path: "/Managerlayout/leaderboard", element: (
                        <ManagerRoute>
                            <Leaderboard />
                        </ManagerRoute>)
                },
                // upcoming offers
                {
                    path: "/Managerlayout/all-upcomingoffers", element: (
                        <ManagerRoute>
                            <ManagerAllupcomingoffer />
                        </ManagerRoute>)
                },
                {
                    path: "/Managerlayout/add-upcomingoffers", element: (
                        <ManagerRoute>
                            <Addupcomingoffer />
                        </ManagerRoute>)
                },
                // employee upcoming offer
                {
                    path: "/Managerlayout/add-employee-upcomingoffers", element: (
                        <ManagerRoute>
                            <AddEmployeeUpcomingoffer />
                        </ManagerRoute>)
                }, ,
                {
                    path: "/Managerlayout/edit-employee-upcomingoffers", element: (
                        <ManagerRoute>
                            <Editemployeeupcomingoffer />
                        </ManagerRoute>)
                },
                // faq
                {
                    path: "/Managerlayout/faq",
                    element: (
                        <ManagerRoute>
                            <FAQ />
                        </ManagerRoute>
                    ),
                },
                // logout
                { path: "/Managerlayout/logout", element: <Managerlogout /> },
            ],
        },
        {
            path: "/",
            element: (
                <AdminProtectedRoute>
                    <AdminLoginForm />
                </AdminProtectedRoute>)
        },
        {
            path: "/layout",
            element: (
                <AdminRoute>
                    <Layout />
                </AdminRoute>),
            children: [
                {
                    index: "true", element: (
                        <AdminRoute>
                            <DashboardPage />
                        </AdminRoute>)
                },
                // customer routes
                {
                    path: "/layout/add-customer", element: (
                        <AdminRoute>
                            <AddcustomerPage />
                        </AdminRoute>)
                },
                {
                    path: "/layout/edit-customer", element: (
                        <AdminRoute>
                            <EditCustomerPage />
                        </AdminRoute>
                    )
                },
                {
                    path: "/layout/update-customer", element: (
                        <AdminRoute>
                            <UpdateCustomer />
                        </AdminRoute>)
                },
                // company
                {
                    path: "/layout/edit-company", element: (
                        <AdminRoute>
                            <AdminCompanyPage />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-company", element: (
                        <AdminRoute>
                            <AddCompany />
                        </AdminRoute>)
                },
                {
                    path: "/layout/update-company", element: (
                        <AdminRoute>
                            <UpdateCompany />
                        </AdminRoute>)
                },
                // employee routes
                {
                    path: "/layout/edit-employee", element: (
                        <AdminRoute>
                            <EditEmployeePage />
                        </AdminRoute>)
                },
                {
                    path: "/layout/update-employee", element: (
                        <AdminRoute>
                            <UpdateEmployee />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-employee", element: (
                        <AdminRoute>
                            <AddemployeePage />
                        </AdminRoute>)
                },
                // manager routes
                {
                    path: "/layout/edit-manager", element: (
                        <AdminRoute>
                            <AllManager />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-manager", element: (
                        <AdminRoute>
                            <AddManger />
                        </AdminRoute>)
                },
                {
                    path: "/layout/update-manager", element: (
                        <AdminRoute>
                            <UpdateManger />
                        </AdminRoute>)
                },
                // super manager routes
                {
                    path: "/layout/edit-supermanager", element: (
                        <AdminRoute>
                            <SuperManager />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-supermanager", element: (
                        <AdminRoute>
                            <AddSuperManger />
                        </AdminRoute>)
                },
                {
                    path: "/layout/update-supermanager", element: (
                        <AdminRoute>
                            <UpdateSuperManger />
                        </AdminRoute>)
                },
                // offers
                {
                    path: "/layout/all-offers", element: (
                        <AdminRoute>
                            <AllOffers />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-offers", element: (
                        <AdminRoute>
                            <AddOffers />
                        </AdminRoute>)
                },
                {
                    path: "/layout/edit-offers", element: (
                        <AdminRoute>
                            <EditOffers />
                        </AdminRoute>)
                },
                // employee offers
                {
                    path: "/layout/all-employee-offers", element: (
                        <AdminRoute>
                            <Employeeoffer />
                        </AdminRoute>)
                },
                {
                    path: "/layout/edit-employee-offers", element: (
                        <AdminRoute>
                            <EditEmployeeOffers />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-employee-offers", element: (
                        <AdminRoute>
                            <AddEmployeeOffers />
                        </AdminRoute>)
                },
                // upcoming offers
                {
                    path: "/layout/all-upcomingoffers", element: (
                        <AdminRoute>
                            <Allupcomingoffer />
                        </AdminRoute>)
                },
                {
                    path: "/layout/add-upcomingoffers", element: (
                        <AdminRoute>
                            <Addupcomingoffer />
                        </AdminRoute>)
                },
                {
                    path: "/layout/edit-upcomingoffers", element: (
                        <AdminRoute>
                            <Editupcomingoffer />
                        </AdminRoute>)
                },
                // employee upcoming offer
                {
                    path: "/layout/add-employee-upcomingoffers", element: (
                        <AdminRoute>
                            <AddEmployeeUpcomingoffer />
                        </AdminRoute>)
                },
                {
                    path: "/layout/edit-employee-upcomingoffers", element: (
                        <AdminRoute>
                            <Editemployeeupcomingoffer />
                        </AdminRoute>)
                },
                // relation
                {
                    path: "/layout/relation", element: (
                        <AdminRoute>
                            <Relation />
                        </AdminRoute>)
                },
                {
                    path: "/layout/employee/leaderboard", element: (
                        <AdminRoute>
                            <Leaderboard />
                        </AdminRoute>
                    )
                },
                // logout
                { path: "/layout/logout", element: <Adminlogout /> },
                // profile
                {
                    path: "/layout/profile", element: (
                        <AdminRoute>
                            <EditAdminPage />
                        </AdminRoute>)
                },
                {
                    path: "/layout/manage-admin", element: (
                        <AdminRoute>
                            <Updateadmin />
                        </AdminRoute>)
                },
                // faq
                {
                    path: "/layout/faq",
                    element: (
                        <AdminRoute>
                            <FAQ />
                        </AdminRoute>
                    ),
                },
            ],
        },
        {
            path: "/privacy-policy",
            element: <PrivacyPolicy />,
        },
        {
            path: "/terms-condition",
            element: <TermsConditons />,
        },
        {
            path: "*",
            element: <Error404 />
        }
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
