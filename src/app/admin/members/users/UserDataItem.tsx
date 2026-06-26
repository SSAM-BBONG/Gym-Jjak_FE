import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import StatusButton from "@/feature/admin/components/StatusButton";

export default function UserDataItem({ user }: { user: Users }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-11 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{user.username}</p>
            <p className="col-span-2">{user.name}</p>
            <p className="col-span-2">{user.nickname}</p>
            <div className="col-span-2"><ActiveStatus text={user.status} nickname={user.nickname} /></div>
            <div className="col-span-2"><StatusButton userId={user.userId} nickname={user.nickname} status={user.status} /></div>
        </div>
    );
}