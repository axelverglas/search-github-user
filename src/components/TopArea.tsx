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
              <svg className="ml-6" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill="#697C9A" fill-rule="nonzero" /></svg>
            </>
          ) : (
            <>
              LIGHT
              <svg className="ml-6" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z" /></g></svg>
            </>
          )}
        </button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} className="mt-14 rounded-3xl shadow-lg w-full h-24 md:h-28 flex items-center justify-between pt-3 pr-3 pb-3 pl-6 transition relative dark:bg-slate-800 bg-white">
        <label className="cursor-pointer h-10">
          <svg height="24" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z" fill="#0079ff" /></svg>
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