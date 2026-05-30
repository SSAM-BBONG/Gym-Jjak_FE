"use client";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

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

// Kakao 주소 검색 API 응답 상태 타입
type KakaoAddressStatus = "OK" | "ZERO_RESULT" | "ERROR";

export default function OrganizationRegistMap() {
  // 우편번호 검색창 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);

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

    // Kakao Maps SDK 로드 후 주소를 위도/경도로 변환
    window.kakao.maps.load(() => {
      // 주소를 좌표로 변환해주는 Geocoder 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 도로명 주소로 좌표 검색 실행
      geocoder.addressSearch(
        selectedRoadAddress,
        (result: KakaoAddressResult[], status: KakaoAddressStatus) => {
          // 검색 성공 시 첫 번째 결과의 좌표 저장
          if (status === "OK") {
            setLongitude(result[0].x);
            setLatitude(result[0].y);
          }
        }
      );
    });
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-[14px] font-medium text-white">
        사업장 주소
      </label>

      <input
        value={roadAddress}
        readOnly
        onClick={() => setIsOpen(true)}
        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none cursor-pointer"
        type="text"
        placeholder="주소를 클릭해서 검색해주세요"
      />

      {/* 조직 등록시 주소/좌표 값을 함께 보내기 위한 input hidden으로 보이지 않고 값만 전달되도록 설정 */}
      <input type="hidden" name="roadAddress" value={roadAddress} />
      <input type="hidden" name="jibunAddress" value={jibunAddress} />
      <input type="hidden" name="latitude" value={latitude} />
      <input type="hidden" name="longitude" value={longitude} />

      {/* 주소 입력창 클릭 시 Daum 우편번호 검색창 표시 */}
      {isOpen && (
        <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 w-[80%] mt-3 overflow-hidden rounded-[10px]">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </div>
  );
}