import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import CopyToClipBoard from "./copy-to-clipboard";

export default function HowToUse() {
    return (
        <section className=" mt-20 flex flex-col gap-2 justify-start items-start mb-48">
            <h2 className="font-semibold text-2xl mb-3">How to use:</h2>
            <p className="text-balance text-left max-w-[60ch]">
                1. Create an account on{" "}
                <Link to={"/sign-up"}>
                    <Button
                        size={"sm"}
                        className="rounded-full font-normal text-sm px-3 py-0 my-0 h-7"
                    >
                        Get Started{" "}
                        <ChevronRight
                            size={14}
                            className="text-gray-500 ml-2"
                        />
                    </Button>
                </Link>
            </p>
            <p className="text-balance text-left">
                2. Go to the github repository below{" "}
                <CopyToClipBoard text="https://github.com/EduartePaiva/webhook-tester-client" />
            </p>
            <p>3. Clone the repository</p>
            <p>
                4. <CopyToClipBoard text="cd webhook-tester-client" />
            </p>
            <p>
                5. <CopyToClipBoard text="bun install" />
            </p>
            <p>
                6. <CopyToClipBoard text="bun run index.ts" />
            </p>
            <p className="text-balance max-w-[60ch]">
                7. The app will ask the password, email, and the URL that it'll
                send the webhook message. (this is the url of your backend
                server, for example: "http://localhost:3000")
            </p>
            <p className="text-balance max-w-[60ch]">
                8. Now copy your webhook url <CopyToClipBoard text="asdad" />{" "}
                and use it on your application.
            </p>
            <p className="text-balance max-w-[60ch]">
                9. Any JSON that is sent to the webhook URL will be sent back to
                the app client, including any url params or url path, then the
                client will automatically post this data to the backend that is
                running locally.
            </p>
        </section>
    );
}
