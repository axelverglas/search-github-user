interface ProfileProps {
    username: string;
    bio: string;
    name: string;
    joinedAt: string;
    pfp: string;
}

export default function Profile({ username, bio, name, joinedAt, pfp }: ProfileProps) {
    return (
        <div className="flex items-center">
            <img className="h-[75pxpx] w-[75px] rounded-[50%] mr-8 md:h-[117px] md:w-[117px] md:mr-16 spe:hidden" src={pfp} alt={username} />

            <div className="grid spe:grid-cols-2 spe:w-full">
                <strong className="font-bold text-[1.7rem] md:text-[2.7rem] dark:text-white">{name}</strong>
                <span className="text-[1.4rem] text-blue-special mb-2 md:text-[1.6rem] md:mt-2">
                    <a href={`https://github.com/${username}`}>@{username}</a>
                </span>

                <span className="text-[1.4rem] dark:text-white md:text-[1.6rem]
                spe:justify-self-end spe:col-span-special spe:row-span-special">{joinedAt}</span>
            </div>
        </div>
    )
}