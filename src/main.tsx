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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AppLayout />}>
            <Route path="/" element={<App />}></Route>,
            <Route path="/home" element={<App />}></Route>,
            <Route path="/login" element={<SIgnIn />}></Route>,
        </Route>,
    ),
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
