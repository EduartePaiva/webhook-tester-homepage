import { ChevronRight, Webhook } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/use-user-context";

export default function Header() {
    const { isLogged } = useUser();
    return (
        <header className="px-2 sm:px-0 flex items-center gap-2 my-2 mb-36">
            <Link
                to={"/home"}
                className=" font-bold text-lg mr-auto flex gap-2"
            >
                <Webhook />
                Webhook <span className="hidden sm:inline">Tester</span>
            </Link>
            {!isLogged && (
                <div className="flex gap-2 flex-wrap">
                    <Link to={"/sign-in"}>
                        <Button
                            className="rounded-full text-base"
                            variant={"ghost"}
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link to={"/sign-up"}>
                        <Button className="rounded-full text-base">
                            Get Started <ChevronRight size={14} />
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    );
}
