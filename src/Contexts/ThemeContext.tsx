import { createContext, useEffect, useState } from "react";

interface ThemeContextProps {
    changeTheme: () => void;
    lightMode: boolean;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export default function ThemeContextProvider(props: any) {
    const [lightMode, setLightMode] = useState<boolean>(false);

    function changeTheme(): void {
        setLightMode(prev => !prev);
    }

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setLightMode(false);
        } else {
            setLightMode(true);
        }
    }, [])

    useEffect(() => {
        if (lightMode) {
            document.documentElement.classList.remove("dark");
        }
        else {
            document.documentElement.classList.add("dark");
        }
    }, [lightMode]);

    return (
        <ThemeContext.Provider value={{ changeTheme, lightMode }}>
            {props.children}
        </ThemeContext.Provider>
    );
};