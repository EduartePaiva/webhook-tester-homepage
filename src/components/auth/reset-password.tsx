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
import { resetPassword, ResetPasswordType } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function ResetPasswordPage() {
    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPassword),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleResetPWSubmit = ({
        password,
        confirmPassword,
    }: ResetPasswordType) => {
        // Here you would typically call an API to reset the password
        // For this example, we'll just simulate a successful reset
        toast.success("Password reset successfully!", {
            duration: 3000,
            position: "top-center",
            icon: "🔒",
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
            <Card className="w-[360px] p-6 max-w-md bg-gray-50 rounded-lg flex flex-col shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader className="flex flex-col text-center items-center text-gray-700 p-0 mb-4">
                    <Webhook size={28} />
                    <CardTitle className="text-lg font-bold mt-0 p-0">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="mt-0 text-balance text-muted-foreground text-[0.8125rem]">
                        Enter your new password below.
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>Confirm Password</FormLabel>
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
                            <Button type="submit" className="w-full mt-4">
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}
