import PartNavLink from "./PartNavLink"



export default function PartSidebar({ part }: { part: PartKo }) {
    return (
        <ul className="flex gap-2 my-3">
            <li><PartNavLink part={part} href="/admin/systems/exercises">전체</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=가슴">가슴</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=등">등</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=어깨">어깨</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=팔">팔</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=복근">복근</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=코어">코어</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=하체">하체</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=둔근">둔근</PartNavLink></li>
            <li><PartNavLink part={part} href="/admin/systems/exercises?part=전신">전신</PartNavLink></li>
        </ul>
    );
}