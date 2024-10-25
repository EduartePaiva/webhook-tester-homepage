import { useUser } from "@/hooks/use-user-context";
import CopyToClipBoard from "../copy-to-clipboard";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function WebhookUrlPage() {
    const { user } = useUser();
    return (
        <div className="h-screen w-full relative flex justify-center items-center">
            <Link to={"/home"} className="absolute top-0 left-0">
                <Button
                    variant={"ghost"}
                    className="rounded-full text-base font-semibold mt-4 gap-2"
                >
                    <ChevronLeft size={14} /> Home
                </Button>
            </Link>
            <CopyToClipBoard text={user?.webhookURL ?? ""} />
        </div>
    );
}
