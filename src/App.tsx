import { useState } from "react";
import TopArea from "./components/TopArea";
import { UserProps } from "./types";
import Index from "./components/UserData";
import ThemeContextProvider from "./Contexts/ThemeContext";

export default function App() {
  const [user, setUser] = useState<UserProps | null>(null)

  function setUserData(user: UserProps | null): void {
    setUser(user)
  }

  return (
    <ThemeContextProvider>
      <div className="h-screen flex flex-col items-center justify-center py-12 px-10 md:px-28">
        <TopArea setUser={setUserData} />
        {user && <Index user={user} />}
      </div>
    </ThemeContextProvider>
  );
}
