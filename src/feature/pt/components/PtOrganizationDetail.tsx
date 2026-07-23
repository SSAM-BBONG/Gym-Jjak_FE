import type { OrganizationPublicDetailData } from "@/feature/organization/type";
import {
  AtSign,
  ChevronRight,
  Globe,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

interface PtOrganizationDetailProps {
  organization: OrganizationPublicDetailData;
}

const ContactRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string | null;
}) => (
  <div className="grid grid-cols-[20px_92px_minmax(0,1fr)] items-center gap-3 border-b border-[#273244] px-5 py-4 last:border-b-0 sm:px-6">
    <span className="text-[#BFFF0B]">{icon}</span>
    <span className="text-sm text-[#98A2B3]">{label}</span>
    {href ? (
      <a
        className="truncate text-sm text-white underline underline-offset-4 transition hover:text-[#BFFF0B]"
        href={href}
        rel="noreferrer"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {value}
      </a>
    ) : (
      <span className="truncate text-sm text-white">{value}</span>
    )}
  </div>
);

export default function PtOrganizationDetail({ organization }: PtOrganizationDetailProps) {
  const fullAddress = [organization.roadAddress, organization.detailAddress]
    .filter(Boolean)
    .join(" ");

  const contacts = [
    {
      icon: <MapPin aria-hidden size={16} />,
      label: "주소",
      value: fullAddress,
    },
    organization.facilityPhone
      ? {
          icon: <Phone aria-hidden size={16} />,
          label: "전화번호",
          value: organization.facilityPhone,
          href: `tel:${organization.facilityPhone}`,
        }
      : null,
    organization.instagramUrl
      ? {
          icon: <AtSign aria-hidden size={16} />,
          label: "인스타그램",
          value: organization.instagramUrl,
          href: organization.instagramUrl,
        }
      : null,
    organization.blogUrl
      ? {
          icon: <Globe aria-hidden size={16} />,
          label: "블로그",
          value: organization.blogUrl,
          href: organization.blogUrl,
        }
      : null,
    organization.websiteUrl
      ? {
          icon: <Globe aria-hidden size={16} />,
          label: "웹사이트",
          value: organization.websiteUrl,
          href: organization.websiteUrl,
        }
      : null,
  ].filter((contact): contact is NonNullable<typeof contact> => Boolean(contact));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <section 
        className="relative min-h-70 overflow-hidden rounded-2xl border border-[#2A3445] bg-[radial-gradient(circle_at_80%_0%,rgba(191,255,11,0.2),transparent_30%),linear-gradient(135deg,#0F1725_0%,#182437_52%,#091018_100%)] p-6 sm:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.1),rgba(0,0,0,0.7))]" />
        <div className="relative flex min-h-54 flex-col justify-end gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#BFFF0B] px-2.5 py-1 text-xs font-bold text-[#101828]">PT</span>
            <span className="rounded-full bg-[#BFFF0B] px-2.5 py-1 text-xs font-bold text-[#101828]">헬스장</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{organization.businessName}</h1>
          <div className="flex items-center gap-2 text-sm text-[#D0D5DD]">
            <MapPin aria-hidden size={16} />
            <span>{organization.roadAddress}</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#2A3445] bg-[#121A2B] px-3 py-5 text-center">
          <p className="text-xl font-extrabold text-[#BFFF0B]">{organization.avgRating.toFixed(1)}</p>
          <p className="mt-1 text-xs text-[#98A2B3]">평균 트레이너 평점</p>
        </div>
        <div className="rounded-xl border border-[#2A3445] bg-[#121A2B] px-3 py-5 text-center">
          <p className="text-xl font-extrabold text-white">{organization.trainerCount}</p>
          <p className="mt-1 text-xs text-[#98A2B3]">트레이너</p>
        </div>
        <div className="rounded-xl border border-[#2A3445] bg-[#121A2B] px-3 py-5 text-center">
          <p className="text-xl font-extrabold text-white">{organization.accumulatedMembers}</p>
          <p className="mt-1 text-xs text-[#98A2B3]">누적 회원</p>
        </div>
      </section>

      <section id="organization-contact" className="overflow-hidden rounded-2xl border border-[#2A3445] bg-[#121A2B]">
        {contacts.map((contact) => <ContactRow key={contact.label} {...contact} />)}
      </section>

      <section className="rounded-2xl border border-[#2A3445] bg-[#121A2B] p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-extrabold text-white">소속 트레이너</h2>
        {organization.trainers.length > 0 ? (
          <ul className="space-y-3">
            {organization.trainers.map((trainer) => (
              <li key={`${trainer.trainerName}-${trainer.reviewCount}`} className="flex items-center gap-3 rounded-xl bg-[#192235] px-4 py-3.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#344156] bg-[#202C40] text-sm font-bold text-[#BFFF0B]">
                  {trainer.trainerName.slice(0, 1)}
                </div>
                <p className="min-w-0 flex-1 truncate text-sm font-bold text-white">{trainer.trainerName} 트레이너</p>
                <span className="flex items-center gap-1 text-sm font-bold text-white">
                  <Star aria-hidden size={15} fill="currentColor" className="text-[#BFFF0B]" />
                  {trainer.averageRating.toFixed(1)}
                  </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-[#192235] px-4 py-6 text-center text-sm text-[#98A2B3]">등록된 트레이너 정보가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
