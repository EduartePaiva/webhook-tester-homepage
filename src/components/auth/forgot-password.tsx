import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Webhook } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailCreateUser, EmailCreateUserType } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { handleErrorResponse } from "@/utils";
import Spinner from "../spinner/spinner";

export default function ForgotPasswordPage() {
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const form = useForm<EmailCreateUserType>({
        resolver: zodResolver(emailCreateUser),
        defaultValues: {
            email: "",
        },
    });

    const handleResetPWSubmit = async (values: EmailCreateUserType) => {
        try {
            setIsSendingEmail(true);
            const response = await fetch(
                `${import.meta.env.VITE_SITE_URL}/api/auth/change-password`,
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(values),
                    mode: "cors",
                },
            );
            if (!response.ok) {
                const errorMsg = await handleErrorResponse(response);
                if (errorMsg.hasError) {
                    throw new Error(errorMsg.message);
                }
                throw new Error(`${response.status} error`);
            }
            toast.success(`A reset link was sent to ${values.email}`, {
                duration: 3000,
                position: "top-center",
                icon: "🔒",
            });
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
            console.error(err);
        } finally {
            setIsSendingEmail(false);
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
            <Card className="w-[360px] p-6 max-w-md bg-gray-50 rounded-lg flex flex-col shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader className="flex flex-col text-center items-center text-gray-700 p-0 mb-4">
                    <Webhook size={28} />
                    <CardTitle className="text-lg font-bold mt-0 p-0">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="mt-0 text-balance text-muted-foreground text-[0.8125rem]">
                        Enter your email to receive a link in the mailbox for
                        resetting the password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleResetPWSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                required
                                                disabled={isSendingEmail}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isSendingEmail}
                                type="submit"
                                className="w-full mt-4"
                            >
                                {isSendingEmail ? (
                                    <Spinner className="stroke-slate-300" />
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}
