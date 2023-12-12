/** @format */

import { memo, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute, PublicRoute } from "./authRoute";
import LoginPage from "../pages/loginPage";
import RoleBaseRouting from "./roleBaseRouting";
import Layout from "../layout";
import RequestForm from "../pages/requestPage";
const HomePage = lazy(() => import("../pages/homePage"));

const AppRoute = memo(() => {
  return (
    <main>
      <Suspense fallback={"LOADING"}>
        <Routes>
          <Route element={<AuthRoute />}>
            {/* //admin routes */}

            <Route element={<RoleBaseRouting role={"admin"} />}>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
            </Route>
            {/* user|| police route */}
            <Route element={<RoleBaseRouting role={"initiator"} />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* recomender route */}
            <Route element={<RoleBaseRouting role={"recomender"} />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/request-form"
                element={
                  <Layout>
                    <RequestForm />
                  </Layout>
                }
              />
            </Route>

            {/* approver route */}
            <Route element={<RoleBaseRouting role={"approver"} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
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
