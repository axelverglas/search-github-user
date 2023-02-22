import { UserDataProps } from "../../types";
import Links from "./Links";
import Profile from "./Profile";
import Stats from "./Stats";

export default function Index({ user }: UserDataProps) {
    return (
        <div className="w-full py-12 px-10 dark:bg-slate-800 bg-white rounded-3xl mt-6 max-w-6xl flex shadow-lg">
            <img className="h-[117px] w-[117px] rounded-[50%] mr-14 hidden spe:block" src={user.pfp} alt={user.username} />

            <div className="w-full">
                <Profile
                    username={user.username}
                    bio={user.bio}
                    name={user.name}
                    joinedAt={user.joinedAt}
                    pfp={user.pfp}
                />

                <Stats
                    repos={user.repos}
                    followers={user.followers}
                    following={user.following}
                />

                <Links links={user.links} />
            </div>
        </div>
    )
}