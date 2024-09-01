import { Webhook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ConfirmationMessage() {
    const { state } = useLocation();

    const handleState = () => {
        if (state && typeof state === "object") {
            if ("error" in state) {
                return <p className="text-balance text-base">{state.error}</p>;
            }
            if ("email" in state) {
                return (
                    <p className="text-balance text-base">
                        A confirmation email has been sent to{" "}
                        <span className="underline text-gray-900">
                            {state.email}
                        </span>
                        , please check your email to proceed the registration of
                        your account.
                    </p>
                );
            }
        } else {
            return (
                <p className="text-balance text-base">
                    You are trying to access this page before submitting an
                    email, please check the{" "}
                    <Link
                        className="underline text-gray-900 cursor-pointer"
                        to={"/sign-up"}
                    >
                        sign up
                    </Link>{" "}
                    page.
                </p>
            );
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg w-[460px] flex flex-col gap-4 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                <Webhook size={28} />
                <h1 className="text-lg font-bold mb-4">Confirm your email</h1>
                {handleState()}
            </div>
        </div>
    );
}
