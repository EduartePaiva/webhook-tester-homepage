import { z } from "zod";

export const createUser = z.object({
    userName: z
        .string()
        .min(3, "user name should be at least 3 characters long")
        .max(20, "user name should be at max 20 characters long"),
    email: z.string().email("invalid email"),
    password: z.string().superRefine((val, ctx) => {
        if (val.length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_small,
                minimum: 8,
                type: "string",
                inclusive: true,
                message: "password should be at least 8 characters long",
            });
        }
        if (val.toUpperCase() === val) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "password must contain at least one lowercase letter",
            });
        }
        if (val.toLowerCase() === val) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "password must contain at least one uppercase letter",
            });
        }
        let haveNumber = false;
        const numbers = new Set([
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ]);
        for (const char of val) {
            if (numbers.has(char)) {
                haveNumber = true;
                break;
            }
        }
        if (!haveNumber) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "password must contain at least one number",
            });
        }
    }),
});
export type createUserType = z.infer<typeof createUser>;

export const loginUser = z.object({
    email: z.string().email("invalid email"),
    password: z.string(),
});
export type loginUserType = z.infer<typeof loginUser>;