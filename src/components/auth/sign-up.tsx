import { ChevronLeft, Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function SignUp() {
    return (
        <div className="h-screen flex">
            <Link to={"/home"} className="self-start relative">
                <Button
                    variant={"ghost"}
                    className="rounded-full text-base font-semibold mt-4 gap-2"
                >
                    <ChevronLeft size={14} /> Home
                </Button>
            </Link>
            <div className="bg-gray-50 p-6 rounded-lg w-[360px] flex flex-col gap-4 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                    <Webhook size={28} />
                    <h1 className="text-lg font-bold">Create your account</h1>
                    <p className="text-balance text-muted-foreground text-[0.8125rem]">
                        Welcome! Please fill in the details to get started.
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
                    <Label>Password</Label>
                    <Input
                        type="password"
                        id="password"
                        className=""
                        required
                    ></Input>
                </div>
                <Button type="submit">Create Account</Button>
                <div className="mt-4 text-center text-[0.8125rem] text-muted-foreground">
                    Already have an account?{" "}
                    <Link to={"/sign-in"} className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
