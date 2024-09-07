import {
    loginUserData,
    parseErrorFromFetch,
    type loginUserDataType,
} from "./zod/schemas";

export function setupUser(
    setIsLogged: (value: boolean) => void,
    setUser: (value: loginUserDataType) => void,
) {
    const data = window.localStorage.getItem("user_data");
    const jsonData = JSON.parse(data ?? "{}");
    const newUser = loginUserData.safeParse(jsonData);
    if (newUser.success && newUser.data.expirationDate > Date.now()) {
        setIsLogged(true);
        setUser(newUser.data);
    } else {
        window.localStorage.removeItem("user_data");
    }
}

type handleErrorRes = Promise<
    { message: string; hasError: true } | { hasError: false }
>;
export async function handleErrorResponse(res: Response): handleErrorRes {
    try {
        const err = await res.json();
        const errMsg = parseErrorFromFetch.parse(err);
        return { message: errMsg.error, hasError: true };
    } catch (e) {
        console.error(e);
        return { hasError: false };
    }
}
