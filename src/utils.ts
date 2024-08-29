import { loginUserData, type loginUserDataType } from "./zod/schemas";

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
