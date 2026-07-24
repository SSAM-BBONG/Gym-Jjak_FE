"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const NAV_ITEMS = [
  { href: "/pt", label: "PT ZONE" },
  { href: "/meal", label: "식단" },
  { href: "/community?page=0", label: "커뮤니티" },
  { href: "/calendar", label: "캘린더", prefetch: false },
] as const;

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex size-10 items-center justify-center rounded-lg border border-[#364153] text-white transition hover:border-[#BFFF0B] hover:text-[#BFFF0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFFF0B]"
      >
        {isOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setIsOpen(false)}
            className="fixed inset-x-0 top-17.5 bottom-0 z-10 cursor-default bg-black/50"
          />
          <nav
            id={menuId}
            aria-label="모바일 메인 메뉴"
            className="fixed top-17.5 left-0 z-20 w-full border-b border-[#364153] bg-[#111827] px-4 py-3 shadow-xl sm:px-10"
          >
            <div className="mx-auto grid max-w-5xl gap-1">
              {NAV_ITEMS.map(({ href, label, ...linkProps }) => (
                <Link
                  key={href}
                  href={href}
                  {...linkProps}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-[#D1D5DC] transition hover:bg-[#1E2939] hover:text-[#BFFF0B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFFF0B]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
