import { useState } from "react";
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

type Step = {
    title: string;
    description: string;
    code?: string;
};

const steps: Step[] = [
    {
        title: "Installation",
        description: "First, install the package using npm or yarn.",
        code: "npm install your-package-name",
    },
    {
        title: "Import",
        description: "Import the component in your React file.",
        code: "import { YourComponent } from 'your-package-name'",
    },
    {
        title: "Usage",
        description: "Use the component in your JSX.",
        code: "<YourComponent prop1='value1' prop2='value2' />",
    },
    {
        title: "Customization",
        description: "Customize the component using props or CSS.",
        code: "// Example of customization\n<YourComponent\n  theme='dark'\n  fontSize={16}\n/>",
    },
];

export default function HowToUse() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () =>
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    How to Use Our Component
                </CardTitle>
                <CardDescription>
                    Follow these steps to integrate our component into your
                    project
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs
                    value={currentStep.toString()}
                    onValueChange={(value) => setCurrentStep(parseInt(value))}
                >
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        {steps.map((step, index) => (
                            <TabsTrigger
                                key={index}
                                value={index.toString()}
                                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
                            <p className="text-gray-600 mb-4">
                                {step.description}
                            </p>
                            {step.code && (
                                <div className="mb-4">
                                    <CopyToClipBoard text={step.code} />
                                </div>
                            )}
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
