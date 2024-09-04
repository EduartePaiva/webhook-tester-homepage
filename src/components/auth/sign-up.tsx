import { ChevronLeft, Webhook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailCreateUser, type EmailCreateUserType } from "@/zod/schemas";
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
import Spinner from "../spinner/spinner";
import toast from "react-hot-toast";

export default function SignUp() {
    const navigate = useNavigate();
    const [isHandlingSignUp, setIsHandlingSignUp] = useState(false);

    const form = useForm<EmailCreateUserType>({
        resolver: zodResolver(emailCreateUser),
        defaultValues: {
            email: "",
        },
    });

    const handleSignUp = async (values: EmailCreateUserType) => {
        try {
            setIsHandlingSignUp(true);
            const response = await fetch(
                `${import.meta.env.VITE_SITE_URL}/api/auth/send-email`,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(values),
                    mode: "cors",
                },
            );
            if (!response.ok) {
                if (response.status == 400) {
                    throw new Error("Invalid email input");
                }
                if (response.status == 403) {
                    throw new Error("email already in use");
                }
                if (response.status == 500) {
                    throw new Error("Internal server error");
                }
                throw new Error(`${response.status} error`);
            }
            navigate("/confirmation-message", {
                replace: true,
                state: { email: values.email },
            });
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            console.error(err);
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
                    <div className="flex flex-col text-center items-center text-gray-700 mb-2">
                        <Webhook size={28} />
                        <h1 className="text-lg font-bold">
                            Create your account
                        </h1>
                        <p className="text-balance text-muted-foreground text-[0.8125rem]">
                            Welcome! Please fill in the email to get started.
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
                                        disabled={isHandlingSignUp}
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
                            "Continue"
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
