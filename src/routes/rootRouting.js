/** @format */

import { memo, Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthRoute, PublicRoute } from "./authRoute";
import LoginPage from "../pages/loginPage";
import Layout from "../layout";
import RequestForm from "../pages/requestPage";
import RegistrationPage from "../pages/registerPage";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";
import RequestView from "../pages/requestView";
import RequestEdit from "../pages/requestEditpage";
import Toaster from "../utils/toaster/Toaster";
import UpdateUser from "../pages/UpdateUser/UpdateUser";
import UpdateUserEdit from "../pages/UpdateUserEdit/UpdateUserEdit";
// import RequestList from "../pages/requestList/RequestList";
// import RejectList from "../pages/requestList/RejectList";
import UnapprovedForm from "../pages/requestList/UnapprovedForm";
import RequestList from "../pages/requestList/RequestedList";
import RejectedList from "../pages/requestList/RejectedList";
const HomePage = lazy(() => import("../pages/homePage"));

const AppRoute = memo(() => {
  const Loading = useSelector((state) => state?.common?.loading);
  return (
    <main>
      {Loading && <Loader />}
      <Suspense fallback={"LOADING"}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route
              path="/request-form"
              element={
                <Layout>
                  <RequestForm />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <RegistrationPage />
                </Layout>
              }
            />
            <Route
              path="/update"
              element={
                <Layout>
                  <UpdateUser />
                </Layout>
              }
            />

            {/* <Route
              path="/request-list"
              element={
                <Layout>
                  <RequestList />
                </Layout>
              }
            /> */}
            <Route
              path="/"
              element={
                <Layout>
                  {/* <HomePage /> */}
                  <RequestList />
                </Layout>
              }
            />
            <Route
              path="/request-form"
              element={
                <Layout>
                  <RequestForm />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <RegistrationPage />
                </Layout>
              }
            />

            <Route
              path="/request-list"
              element={
                <Layout>
                  <RequestList />
                </Layout>
              }
            />
            <Route
              path="/unverified-form"
              element={
                <Layout>
                  <UnapprovedForm />
                </Layout>
              }
            />
            <Route
              path="/rejected-form"
              element={
                <Layout>
                  <RejectedList />
                </Layout>
              }
            />
            <Route
              path="/request/view/:type/:id"
              element={
                <Layout>
                  <RequestView />
                </Layout>
              }
            />
            <Route
              path="/request/edit/:type/:id"
              element={
                <Layout>
                  <RequestEdit />
                </Layout>
              }
            />
            <Route
              path="/request/edit_user/:id"
              element={
                <Layout>
                  <UpdateUserEdit />
                </Layout>
              }
            />
            <Route
              path="/request/approve/:id"
              element={
                <Layout>
                  <RequestList />
                </Layout>
              }
            />

            {/* //admin routes */}

            {/* <Route element={<RoleBaseRouting role={"admin"} />}>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
            </Route> */}
            {/* user|| police route */}
            {/* <Route element={<RoleBaseRouting role={"initiator"} />}>
              <Route path="/" element={<HomePage />} />
            </Route> */}

            {/* recomender route */}
            {/* <Route element={<RoleBaseRouting role={"recomender"} />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/request-form"
                element={
                  <Layout>
                    <RequestForm />
                  </Layout>
                }
              />
            </Route> */}

            {/* approver route */}
            {/* <Route element={<RoleBaseRouting role={"approver"} />}>
              <Route path="/" element={<HomePage />} />
            </Route> */}
          </Route>
          <Route element={<PublicRoute />}>
            <Route
              path="*"
              element={
                <>
                  <img className="w-[100%] h-[100vh]" src="/404.jpg" alt="" />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
});

export default AppRoute;
