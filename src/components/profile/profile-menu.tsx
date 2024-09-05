import { LogOut, Settings, Webhook } from "lucide-react";
import { Link, redirect } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuArrow,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user-context";

export default function ProfileMenu() {
    const { user, setIsLogged, setUser } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"default"}
                    size={"icon"}
                    className="capitalize rounded-full"
                >
                    {user?.userName.slice(0, 2)}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="bottom" align="end">
                <DropdownMenuArrow className="fill-primary" />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to={"/webhook-url"} className="cursor-pointer">
                            <Webhook className="mr-2 h-4 w-4" />
                            <span>Webhook URL</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            to={"/change-password"}
                            className="cursor-pointer"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Change Password</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        window.localStorage.removeItem("user_data");
                        setIsLogged(false);
                        setUser(null);
                        redirect("/home");
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
