interface StatsProps {
    repos: string;
    followers: string;
    following: string;
}

interface DataProps {
    name: string;
    value: string;
}

const Data = ({ value, name }: DataProps) => {
    return (
        <li className="flex flex-col items-center justify-center md:items-start">
            <span className="text-[1.3rem] text-center dark:text-white text-gray-special-2 md:text-2xl">{name}</span>
            <strong className="text-bold text-[1.8rem] mt-[0.8rem] dark:text-white md:mt-4 md:text-[2.4rem]">{value}</strong>
        </li>
    )
}

export default function Stats({ repos, followers, following }: StatsProps) {
    return (
        <ul className="rounded-2xl list-none flex items-center justify-between dark:bg-slate-900 bg-slate-100 py-[1.8rem] px-[1.4rem] mt-14 md:grid md:grid-cols-3 md:px-[3.2rem]">
            <Data name="Repos" value={repos} />
            <Data name="Suivie par" value={followers} />
            <Data name="Suit" value={following} />
        </ul>
    )
}