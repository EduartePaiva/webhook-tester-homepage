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
            <div className="bg-gray-50 p-10 rounded-lg lg:p-0 w-[360px] flex flex-col gap-4">
                <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                    <Webhook size={28} />
                    <h1 className="text-lg font-bold">Sign in to Webhook</h1>
                    <p className="text-balance text-muted-foreground text-sm">
                        Welcome back! Please sign in to continue
                    </p>
                </div>
                <Label htmlFor="email" className="font-medium">
                    <span className="!font-medium">Email address</span>
                    <Input
                        type="email"
                        id="email"
                        placeholder="m@example.com"
                        required
                    />
                </Label>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                        </label>
                        <a
                            className="ml-auto inline-block text-sm underline"
                            href="/forgot-password"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <input
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="password"
                        required
                    />
                </div>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    type="submit"
                >
                    Login
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                    Login with Google
                </button>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <a className="underline" href="#">
                        Sign up
                    </a>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    alt="Image"
                    loading="lazy"
                    width="1920"
                    height="1080"
                    decoding="async"
                    data-nimg="1"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    style={{ color: "transparent" }}
                    src="/placeholder.svg"
                />
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
