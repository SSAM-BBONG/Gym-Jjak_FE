import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import StatusButton from "@/feature/admin/components/StatusButton";

export default function UserDataItem({ user }: { user: Users }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid md:grid-cols-11 grid-cols-9 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3">{user.username}</p>
            <p className="col-span-2">{user.name}</p>
            <p className="col-span-2 hidden md:block">{user.nickname}</p>
            <div className="col-span-2"><ActiveStatus text={user.status} nickname={user.nickname} /></div>
            <div className="col-span-2"><StatusButton userId={user.userId} nickname={user.nickname} status={user.status} /></div>
        </div>
    );
}