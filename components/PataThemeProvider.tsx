import { ReactNode } from "react";
import { User, UserType } from "@prisma/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useUserData from "../hooks/useUserData";
import { Mascotero } from "../models/Mascotero";
import { getTheme } from "../theme";


type PataThemeProvider = {
    children: ReactNode
};

export function PataThemeProvider ({ children }: PataThemeProvider) {
    const { data } = useUserData();
    const userType = (data as User)?.type || (data as Mascotero)?.user?.type;
    const selectedTheme = getTheme(userType as UserType);

    return (
        <ThemeProvider theme={selectedTheme}>
            <>
                <CssBaseline />
                {children}
            </>
        </ThemeProvider>
    );
}
