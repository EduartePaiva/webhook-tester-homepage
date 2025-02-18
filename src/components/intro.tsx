import { ChevronRight, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/use-user-context";

export default function Intro() {
    const { isLogged } = useUser();
    return (
        <section
            id="home"
            className="scroll-mt-96 mb-28 text-center sm:text-left sm:mb-0 px-4 sm:px-0"
        >
            <div className=" flex flex-col gap-6">
                <span className="font-bold text-5xl">
                    Webhook for developers
                </span>
                <div className="">
                    <p>
                        The best and easy way to test your webhooks in local
                        development.
                    </p>
                    <p>Iterate your applications faster than ever.</p>
                </div>
                <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                    {!isLogged && (
                        <Link to={"/sign-up"}>
                            <Button className="rounded-full font-semibold text-base">
                                Get Started{" "}
                                <ChevronRight
                                    size={14}
                                    className="text-gray-500 ml-2"
                                />
                            </Button>
                        </Link>
                    )}
                    <a
                        href="https://github.com/EduartePaiva/webhook-tester"
                        target="_blank"
                    >
                        <Button
                            className="rounded-full font-semibold text-base"
                            variant={isLogged ? "default" : "ghost"}
                        >
                            Documentation{" "}
                            <Github className="ml-2" size={20}></Github>
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}
