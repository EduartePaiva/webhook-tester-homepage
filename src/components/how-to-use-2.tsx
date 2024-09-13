import { Fragment, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import CopyToClipBoard from "./copy-to-clipboard";
import CoolLink from "./cool-link";
import { useUser } from "@/hooks/use-user-context";

type Step = {
    title: string;
    body: {
        description: string;
        code?: string;
        isLink?: true;
    }[];
};

const accountStep: Step = {
    title: "Account",
    body: [
        {
            description:
                "First it's necessary to have an account. Create an account on the link below and then come back to this page.",
            code: `${import.meta.env.VITE_CURRENT_LOCALHOST}/sign-up`,
            isLink: true,
        },
    ],
};
const installationStep: Step = {
    title: "Installation",
    body: [
        {
            description:
                "Clone and install the client app from the link below, follow the instructions of the github repository.",
            code: "https://github.com/EduartePaiva/webhook-tester-client",
            isLink: true,
        },
        {
            description:
                "For the client app to work properly it's recommended to have Bun installed. Check Bun official website",
            code: "https://bun.sh",
            isLink: true,
        },
    ],
};
const loginStep: Step = {
    title: "Login",
    body: [
        {
            description:
                "Now you need to Login into your account then come back to step 1 to proceed.",
            code: `${import.meta.env.VITE_CURRENT_LOCALHOST}/sign-in`,
            isLink: true,
        },
    ],
};

export default function HowToUse() {
    const { isLogged, user } = useUser();
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () =>
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const usageStep: Step = {
        title: "Usage",
        body: [
            {
                description:
                    "Start your client app that you have installed, it'll ask a the email, password and the localhost url of your backend that will receive the webhook, for example (http://loaclhost:3000) ",
            },
            {
                description:
                    "Next copy you webhook URL below and paste it in your application.",
                code: user?.webhookURL ?? "you need to login to see this data",
            },
            {
                description:
                    "If everything is working whenever a POST request is made to this URL above the app client will receive this post and redirect it automatically to your local backend.",
            },
        ],
    };

    const handleUsage = (): Step[] => {
        if (!isLogged) {
            return [accountStep, loginStep, installationStep];
        }
        return [installationStep, usageStep];
    };
    const steps = handleUsage();

    return (
        <Card className="w-full max-w-3xl mx-auto mt-8 bg-white/40 border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold capitalize">
                    how to use webhook tester
                </CardTitle>
                <CardDescription>
                    Follow these steps to get up and running
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs
                    value={currentStep.toString()}
                    onValueChange={(value) => setCurrentStep(parseInt(value))}
                >
                    <TabsList className={"flex w-full  mb-6"}>
                        {steps.map((_, index) => (
                            <TabsTrigger
                                key={index}
                                value={index.toString()}
                                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                                Step {index + 1}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {steps.map((step, index) => (
                        <TabsContent
                            key={index}
                            value={index.toString()}
                            className="mt-6"
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                {step.title}
                            </h3>
                            {step.body.map((content, index) => (
                                <Fragment key={index}>
                                    <p className="text-gray-600 mb-4 max-w-[45ch] text-balance">
                                        {content.description}
                                    </p>
                                    {content.code && (
                                        <div className="mb-4">
                                            {content.isLink ? (
                                                <CoolLink text={content.code} />
                                            ) : (
                                                <CopyToClipBoard
                                                    text={content.code}
                                                />
                                            )}
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                            <div className="flex justify-between mt-6">
                                <Button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    variant="outline"
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />{" "}
                                    Previous
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={currentStep === steps.length - 1}
                                >
                                    Next{" "}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
