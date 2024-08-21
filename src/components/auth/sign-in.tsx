import { ChevronLeft, Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
            <div className="bg-gray-50 p-6 rounded-lg w-[360px] flex flex-col gap-4 shadow-md">
                <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                    <Webhook size={28} />
                    <h1 className="text-lg font-bold">Sign in to Webhook</h1>
                    <p className="text-balance text-muted-foreground text-sm">
                        Welcome back! Please sign in to continue
                    </p>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">
                        <span className="font-medium">Email address</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center relative">
                        <Label>Password</Label>
                        <Link
                            className="ml-auto inline-block text-sm font-normal text-muted-foreground underline absolute right-0"
                            to={"/forgot-password"}
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        id="password"
                        className=""
                        required
                    ></Input>
                </div>
                <Button type="submit">Login</Button>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to={"/sign-up"} className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
{
    /* <h1 classNameName="font-bold text-lg">
                                Log in to Webhook Tester
                            </h1>
                            <span>
                                Don't have an account?{" "}
                                <Link
                                    className="text-blue-500 text-sm"
                                    to={"/sign-up"}
                                >
                                    Sign up
                                </Link>
                            </span> */
}
