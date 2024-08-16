import { ChevronRight, Webhook } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
    return (
        <div className="container">
            <header className="flex items-center gap-2 my-2">
                <span className="font-bold text-lg mr-auto flex gap-2">
                    <Webhook />
                    webhook
                </span>
                <Button className="rounded-full" variant={"ghost"}>
                    Sign in
                </Button>
                <Button className="rounded-full">
                    Get Started <ChevronRight size={14} />
                </Button>
            </header>
        </div>
    );
}

export default App;
