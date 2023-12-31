import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ModalProvider from "./context/LoginModalContext.tsx";
import UserProvider from "./context/UserContext.tsx";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      {/* <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </UserProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
