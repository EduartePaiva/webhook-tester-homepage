import { ChevronRight } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
    return (
        <div className="bg-background">
            <header className="flex items-center gap-2 mx-6 my-2">
                <span className="font-semibold text-lg mr-auto">Webhook</span>
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
