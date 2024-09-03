import { ChevronLeft, Webhook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { finishCreateUser, type FinishCreateUserType } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

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
import toast from "react-hot-toast";
import Spinner from "../spinner/spinner";
import { setupUser } from "@/utils";
import { useUser } from "@/hooks/use-user-context";

export default function CompleteSignUp() {
    const [isHandlingSignUp, setIsHandlingSignUp] = useState(false);
    const { setIsLogged, setUser } = useUser();
    const navigate = useNavigate();

    const form = useForm<FinishCreateUserType>({
        resolver: zodResolver(finishCreateUser),
        defaultValues: {
            userName: "",
            password: "",
        },
    });

    const handleSignUp = async ({
        password,
        userName,
    }: FinishCreateUserType) => {
        // this will create the account and immediately login in it
        try {
            setIsHandlingSignUp(true);
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            if (token === null) {
                throw new Error("token is missing");
            }
            // response could return the jwt token for user to login or I could fetch the login part, but actually I don't know the email for the user, so let's do the first option.
            const response = await fetch(
                "http://localhost:3000/api/auth/create",
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ token, userName, password }),
                    mode: "cors",
                },
            );
            if (!response.ok) {
                throw new Error(`${response.status} error`);
            }
            const data = await response.text();
            window.localStorage.setItem("user_data", data);
            setupUser(setIsLogged, setUser);
            navigate("/home", { replace: true });
            toast.success("Account created!");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        } finally {
            setIsHandlingSignUp(false);
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

            {/* Form start here */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSignUp)}
                    className="bg-gray-50 p-6 rounded-lg w-[360px] flex flex-col gap-4 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="flex flex-col text-center items-center text-gray-700">
                        <Webhook size={28} />
                        <h1 className="text-lg font-bold">
                            Create your account
                        </h1>
                        <p className="text-balance text-muted-foreground text-[0.8125rem]">
                            Welcome! Please fill in the details to get started.
                        </p>
                    </div>
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isHandlingSignUp}
                                        type="text"
                                        required
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
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isHandlingSignUp}
                                        type="password"
                                        required
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isHandlingSignUp}>
                        {isHandlingSignUp ? (
                            <Spinner className="stroke-slate-300" />
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                    <div className="mt-4 text-center text-[0.8125rem] text-muted-foreground">
                        Already have an account?{" "}
                        <Link to={"/sign-in"} className="underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
}