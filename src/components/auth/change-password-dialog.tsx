import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import Spinner from "../spinner/spinner";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/use-user-context";
import { parseErrorFromFetch } from "@/zod/schemas";

type ChangePasswordDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChangePasswordDialog({
    open,
    setOpen,
}: ChangePasswordDialogProps) {
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const { user } = useUser();

    const handleSendingEmail = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        event.preventDefault();
        try {
            setIsSendingEmail(true);

            const response = await fetch(
                `${import.meta.env.VITE_SITE_URL}/api/auth/change-password`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                },
            );

            if (!response.ok) {
                const errorResp = parseErrorFromFetch.safeParse(
                    await response.json(),
                );
                if (!errorResp.success) {
                    console.error(errorResp.error);
                    throw new Error(
                        `Some unknown error, status: ${response.status}`,
                    );
                }
                throw new Error(errorResp.data.error);
            }
            toast.success(
                "A change password link has been sent! Check out your email.",
            );
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
                console.error(err);
            }
        } finally {
            setIsSendingEmail(false);
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-balance">
                        Are you sure about changing the password?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-balance text-left">
                        By clicking in continue a password change link will be
                        sent to your email where you'll be able to reset the
                        password, this process is for security reasons.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSendingEmail}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="min-w-24"
                        disabled={isSendingEmail}
                        onClick={handleSendingEmail}
                    >
                        {isSendingEmail ? (
                            <Spinner className="stroke-slate-300" />
                        ) : (
                            "Continue"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
