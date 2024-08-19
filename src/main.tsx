import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import AppLayout from "./components/app-layout.tsx";
import SIgnIn from "./components/auth/sign-in.tsx";
import SignUp from "./components/auth/sign-up.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route path="/" element={<App />}></Route>,
            <Route path="/home" element={<App />}></Route>,
            <Route path="/sign-in" element={<SIgnIn />}></Route>,
            <Route path="/sign-up" element={<SignUp />}></Route>
        </Route>,
    ),
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
