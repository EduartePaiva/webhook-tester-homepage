import { ChevronLeft, Eye, EyeOff, Webhook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, type loginUserType } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import toast from "react-hot-toast";
import { setupUser } from "@/utils";
import { useUser } from "@/hooks/use-user-context";

export default function SignIn() {
    const [isLoggin, setIsLoggin] = useState(false);
    const navigate = useNavigate();
    const { setIsLogged, setUser } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword((prev) => (prev ? false : true));
    }

    const form = useForm<loginUserType>({
        resolver: zodResolver(loginUser),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (values: loginUserType) => {
        setIsLoggin(true);
        try {
            // in production the fetch request will be just "/api/auth/login"
            const response = await fetch(
                `${import.meta.env.VITE_SITE_URL}/api/auth/login`,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(values),
                    mode: "cors",
                },
            );
            if (!response.ok) {
                if (response.status == 401) {
                    const resText = await response.text();
                    throw new Error(resText);
                }
                if (response.status == 500) {
                    throw new Error("Internal server error");
                }
                throw new Error(`${response.status} error`);
            }
            const data = await response.text();
            window.localStorage.setItem("user_data", data);
            setupUser(setIsLogged, setUser);
            navigate("/home", { replace: true });
            toast.success("Logged in");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            console.error(err);
        } finally {
            setIsLoggin(false);
        }
    };
    return (
        <>
            <Link to={"/home"} className="self-start relative">
                <Button
                    variant={"ghost"}
                    className="rounded-full text-base font-semibold mt-4 gap-2"
                >
                    <ChevronLeft size={14} /> Home
                </Button>
            </Link>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="bg-gray-50 p-6 rounded-lg w-[360px] flex flex-col gap-4 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                        <Webhook size={28} />
                        <h1 className="text-lg font-bold">
                            Sign in to Webhook
                        </h1>
                        <p className="text-balance text-muted-foreground text-[0.8125rem]">
                            Welcome back! Please sign in to continue
                        </p>
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        required
                                        placeholder="m@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Password</FormLabel>
                                <Link
                                    className="ml-auto inline-block text-[0.8125rem] font-normal text-muted-foreground underline absolute right-0 -top-1"
                                    to={"/forgot-password"}
                                >
                                    Forgot your password?
                                </Link>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            {...field}
                                        />
                                        <div className="absolute top-1/2 -translate-y-1/2 right-0">
                                            <Button
                                                type="button"
                                                variant={"ghost"}
                                                size={"icon"}
                                                onClick={toggleShowPassword}
                                            >
                                                {showPassword ? (
                                                    <Eye size={20} />
                                                ) : (
                                                    <EyeOff size={20} />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoggin}>
                        {isLoggin ? (
                            <span className="">
                                <Spinner className="stroke-slate-300" />
                            </span>
                        ) : (
                            <span>Login</span>
                        )}
                    </Button>
                    <div className="mt-4 text-center text-[0.8125rem] text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to={"/sign-up"} className="underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
}
