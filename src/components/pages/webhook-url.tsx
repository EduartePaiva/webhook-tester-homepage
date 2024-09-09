import { useUser } from "@/hooks/use-user-context";
import CopyToClipBoard from "../copy-to-clipboard";

export default function WebhookUrlPage() {
    const { user } = useUser();
    return <CopyToClipBoard text={user?.webhookURL ?? ""} />;
}
