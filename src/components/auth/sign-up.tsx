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

export default function SignUp() {
    const navigate = useNavigate();

    const form = useForm<EmailCreateUserType>({
        resolver: zodResolver(emailCreateUser),
        defaultValues: {
            email: "",
        },
    });

    const handleSignUp = (values: EmailCreateUserType) => {
        console.log(values);
        navigate("/confirmation-message", {
            replace: true,
            state: { email: values.email },
        });
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
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Continue</Button>
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
