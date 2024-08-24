import { ChevronLeft, Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser, type createUserType } from "@/zod/schemas";
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
    const form = useForm<createUserType>({
        resolver: zodResolver(createUser),
        defaultValues: {
            email: "",
            userName: "",
            password: "",
        },
    });

    const handleSignUp = (values: createUserType) => {
        console.log(values);
    };
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
                                    <Input type="text" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                            <FormItem>
                                <FormLabel>Password</FormLabel>
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
                    <Button type="submit">Create Account</Button>
                    <div className="mt-4 text-center text-[0.8125rem] text-muted-foreground">
                        Already have an account?{" "}
                        <Link to={"/sign-in"} className="underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}
