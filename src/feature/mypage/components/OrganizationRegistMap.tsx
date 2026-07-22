"use client";

import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { UseFormSetValue } from "react-hook-form";

// Daum 우편번호 검색에서 선택된 주소 데이터 타입
interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
}

// Kakao 주소 검색 API에서 반환하는 좌표 데이터 타입
interface KakaoAddressResult {
  x: string; // 경도
  y: string; // 위도
  address_name: string;
}

interface OrganizationRegistMapProps {
  setValue: UseFormSetValue<OrganizationApplicationFormValue>;
}

// Kakao 주소 검색 API 응답 상태 타입
type KakaoAddressStatus = "OK" | "ZERO_RESULT" | "ERROR";

export default function OrganizationRegistMap({ setValue}: OrganizationRegistMapProps) {
  const [isKakaoLoading, kakaoError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? "",
    libraries: ["services"],
  });

  // 우편번호 검색창 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);

  // SDK 로딩 및 주소-좌표 변환 오류 메시지
  const [addressError, setAddressError] = useState("");

  // 도로명 주소 상태
  const [roadAddress, setRoadAddress] = useState("");

  // 지번 주소 상태
  const [jibunAddress, setJibunAddress] = useState("");

  // 위도 상태
  const [latitude, setLatitude] = useState("");

  // 경도 상태
  const [longitude, setLongitude] = useState("");

  // 우편번호 검색에서 주소 선택 시 실행되는 함수
  const handleComplete = (data: DaumPostcodeData) => {
    if (isKakaoLoading) {
      setAddressError("지도 서비스를 준비 중입니다. 잠시 후 다시 선택해주세요.");
      return;
    }

    if (kakaoError || !window.kakao?.maps?.services) {
      setAddressError("지도 서비스를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.");
      return;
    }

    setAddressError("");

    // 사용자가 선택한 도로명 주소
    const selectedRoadAddress = data.roadAddress;

    // 사용자가 선택한 지번 주소
    const selectedJibunAddress = data.jibunAddress;

    // 선택한 주소 값을 상태에 저장
    setRoadAddress(selectedRoadAddress);
    // 지번 주소 (추후 활용 예정)
    setJibunAddress(selectedJibunAddress);

    // 주소 선택 후 우편번호 검색창 닫기
    setIsOpen(false);

    // useKakaoLoader가 SDK 초기화까지 완료한 뒤에만 Geocoder를 생성한다.
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 도로명 주소로 좌표 검색 실행
    geocoder.addressSearch(
      selectedRoadAddress,
      (result: KakaoAddressResult[], status: KakaoAddressStatus) => {
        // 검색 성공 시 첫 번째 결과의 좌표 저장
        if (status !== "OK" || !result[0]) {
          setAddressError("선택한 주소의 좌표를 찾지 못했습니다. 다른 주소를 선택해주세요.");
          return;
        }

        setLongitude(result[0].x);
        setLatitude(result[0].y);

        setValue("roadAddress", selectedRoadAddress, {
          shouldValidate: true,
          shouldDirty: true,
        });

        setValue("jibunAddress", selectedJibunAddress, {
          shouldDirty: true,
        });

        setValue("longitude", result[0].x, {
          shouldDirty: true,
        });

        setValue("latitude", result[0].y, {
          shouldDirty: true,
        });
      }
    );
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-[14px] font-medium text-white">
        사업장 주소
      </label>

      <input
        value={roadAddress}
        readOnly
        onClick={() => {
          setAddressError("");
          setIsOpen(!isOpen);
        }}
        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none cursor-pointer"
        type="text"
        placeholder="주소를 클릭해서 검색해주세요"
        aria-invalid={Boolean(addressError)}
        aria-describedby={addressError ? "organization-address-error" : undefined}
      />

      {addressError && (
        <p id="organization-address-error" className="text-sm text-red-400">
          {addressError}
        </p>
      )}


      {/* 주소 입력창 클릭 시 Daum 우편번호 검색창 표시 */}
      {isOpen && (
        <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 w-[80%] mt-3 overflow-hidden rounded-[10px]">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </div>
  );
}
