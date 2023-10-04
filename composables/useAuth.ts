export default () => {
    const useAuthToken = () => useState("auth_token");
    const useAuthUser = () => useState("auth_user");
    const useAuthLoading = () => useState<boolean>("auth_loading", () => true);
    const setToken = (newToken: string) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    };

    const setUser = (newuser: any) => {
        const authUser = useAuthUser();
        authUser.value = newuser;
    };

    const setIsAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading();
        authLoading.value = value;
    };

    const login = ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: any = await $fetch("/api/auth/login", {
                    method: "POST",
                    body: {
                        username,
                        password,
                    },
                });

                setToken(data.access_token);
                setUser(data.user);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = (await $fetch("/api/auth/refresh")) as any;
                setToken(data.access_token);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };
    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = (await useFetchApi("/api/auth/user")) as any;
                setUser(data.user);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true);
            try {
                await refreshToken();
                await getUser();
                return resolve(true);
            } catch (error) {
                reject(error);
            } finally {
                setIsAuthLoading(false);
            }
        });
    };
    return {
        login,
        useAuthToken,
        useAuthUser,
        initAuth,
        useAuthLoading,
    };
};
