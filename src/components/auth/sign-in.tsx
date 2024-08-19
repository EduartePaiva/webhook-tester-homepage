import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function SIgnIn() {
    return (
        <div className="flex flex-col items-center gap-16">
            <Link to={"/home"} className="self-start">
                <Button
                    variant={"ghost"}
                    className="rounded-full text-base font-semibold mt-4 gap-2"
                >
                    <ChevronLeft size={14} /> Home
                </Button>
            </Link>
            <div className="bg-black/5 p-6 rounded-2xl">
                <h1 className="font-bold text-lg">Log in to Webhook Tester</h1>
                <span>
                    Don't have an account?{" "}
                    <Link className="text-blue-500 text-sm" to={"/sign-up"}>
                        Sign up
                    </Link>
                </span>
            </div>
        </div>
    );
}
