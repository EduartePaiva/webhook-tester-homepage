import { ChevronLeft, Webhook } from "lucide-react";
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

export default function SignIn() {
    const [isLoggin, setIsLoggin] = useState(false);
    const navigate = useNavigate();

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
                "http://localhost:3000/api/auth/login",
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
                    toast.error(resText);
                    throw new Error(resText);
                }
                if (response.status == 500) {
                    toast.error("Internal server error");
                    throw new Error("Internal server error");
                }
                toast.error(`${response.status} error`);
                throw new Error(response.status.toString());
            }
            const data = await response.text();
            window.localStorage.setItem("user_data", data);
            navigate("/home", { replace: true });
            toast.success("Logged in");
        } catch (err) {
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
                                    <Input
                                        type="password"
                                        required
                                        {...field}
                                    />
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
