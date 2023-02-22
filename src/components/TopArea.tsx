import { useEffect, useRef, useState, useContext } from "react";
import { UserProps, TopAreaProps } from "../types";
import { joinedDate } from "../utils/formatter";
import { ThemeContext } from "../Contexts/ThemeContext";


export default function TopArea({ setUser }: TopAreaProps) {
  const { changeTheme, lightMode } = useContext(ThemeContext);
  const [empty, setEmpty] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [inputUser] = useState("axelverglas");

  function handleSubmit() {
    if (
      usernameRef.current?.value.trim() === "" ||
      usernameRef.current?.value === undefined
    ) {
      setEmpty(true);
      setUser(null);
      return;
    }

    setEmpty(false);
    fetchUser(usernameRef.current.value);
  }

  async function fetchUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status != 200) {
      setNotFound(true);
      setUser(null);
      return;
    }

    setNotFound(false);

    const user: UserProps = {
      pfp: data.avatar_url,
      name: data.name,
      joinedAt: joinedDate(data.created_at),
      username: data.login,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      links: {
        location: data.location,
        twitter: data.twitter_username,
        company: data.company,
        blog: data.blog,
      },
    };
    console.log(data);

    setUser(user);
  }

  useEffect(() => {
    fetchUser(inputUser)
  }, [inputUser])


  return (
    <div className="w-full max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-4xl dark:text-white">Github Profile</h1>
        <button
          className="flex items-center border-0 font-bold dark:text-white text-gray-special text-2xl cursor-pointer"
          type="button"
          onClick={changeTheme}
        >
          {lightMode ? (
            <>
              DARK
              <img
                src="/assets/icon-moon.svg"
                alt="dark mode"
                className="ml-6"
              />
            </>
          ) : (
            <>
              LIGHT
              <img
                src="/assets/icon-sun.svg"
                alt="light mode"
                className="ml-6"
              />
            </>
          )}
        </button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} className="mt-14 rounded-3xl shadow-lg w-full h-24 md:h-28 flex items-center justify-between pt-3 pr-3 pb-3 pl-6 transition relative dark:bg-slate-800 bg-white">
        <label className="cursor-pointer h-10">
          <img src="/assets/icon-search.svg" alt="Rechercher..." />
        </label>

        <input ref={usernameRef} type="text" name="username" id="username" className="flex-1 dark:text-white text-[1.4rem] border-none my-0 mx-3 md:text-[1.7rem] md:mx-10 bg-inherit focus:outline-dashed focus:outline-1 focus:outline-blue-special leading-[192%]" placeholder="Rechercher un utilisateur..." />

        {empty && <div className="font-bold text-2xl text-red-600 mr-10">Entrer un utilisateur</div>}
        {notFound && <div className="font-bold text-2xl text-red-600 mr-10">Aucun utilisateur trouvé</div>}

        <button
          type="submit"
          className="bg-blue-special border-none h-full w-40 rounded-2xl font-bold text-white text-2xl cursor-pointer transition ease-out hover:filter hover:brightness-105 hover:shadow-special md:w-44 md:text-[1.7rem]"
        >
          Rechercher
        </button>
      </form>


    </div>
  );
};