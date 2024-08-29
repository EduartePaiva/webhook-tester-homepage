import { userContextType } from "@/components/app-layout";
import { useOutletContext } from "react-router-dom";

export function useUser() {
    const context = useOutletContext<userContextType>();
    return context;
}
