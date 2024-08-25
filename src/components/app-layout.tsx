import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <div className="bg-[#fbe2e3] dark:bg-[#946263] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
            <div className="bg-[#dbd7fb] dark:bg-[#676394] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
            <div className="sm:container antialiased flex flex-col h-screen">
                <Outlet />
            </div>
            <Toaster position="top-left" />
        </>
    );
}
