import { useUser } from "@/hooks/use-user-context";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { ProfileDropdownMenu } from "./profile-dropdown-menu";

export default function Profile() {
    const { user } = useUser();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <ProfileDropdownMenu>
                        <Button
                            variant={"default"}
                            size={"icon"}
                            className="capitalize rounded-full"
                        >
                            {user?.userName.slice(0, 2)}
                        </Button>
                    </ProfileDropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
