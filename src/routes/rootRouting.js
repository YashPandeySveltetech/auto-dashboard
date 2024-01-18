/** @format */

import { memo, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute, PublicRoute } from "./authRoute";
import LoginPage from "../pages/loginPage";
import RoleBaseRouting from "./roleBaseRouting";
import Layout from "../layout";
import RequestForm from "../pages/requestPage";
import RegistrationPage from "../pages/registerPage";
import RequestList from "../pages/requestList";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";
import RequestView from "../pages/requestView";
import RequestEdit from "../pages/requestEditpage";
import UnverifiedFormList from "../pages/requestList/unverifiedFormList";
import RejectList from "../pages/requestList/rejectList";
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
                  <UnverifiedFormList />
                </Layout>
              }
            />
            <Route
              path="/rejected-form"
              element={
                <Layout>
                  <RejectList />
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
                  <img className="w-[100%] h-[100vh]" src="/404.jpg" />
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
