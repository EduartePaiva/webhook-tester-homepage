import { ChevronRight, Webhook } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="px-2 sm:px-0 flex items-center gap-2 my-2 mb-36">
            <span className=" font-bold text-lg mr-auto flex gap-2">
                <Webhook />
                Webhook <span className="hidden sm:inline">Tester</span>
            </span>
            <div className="flex gap-2 flex-wrap">
                <Button className="rounded-full text-base" variant={"ghost"}>
                    Sign in
                </Button>
                <Button className="rounded-full text-base">
                    Get Started <ChevronRight size={14} />
                </Button>
            </div>
        </header>
    );
}
