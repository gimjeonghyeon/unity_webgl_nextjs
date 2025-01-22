"use client"; // Next.js 13+ 에서 클라이언트 컴포넌트임을 명시

import { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl"; // Unity WebGL을 React에서 사용하기 위한 라이브러리 임포트

export default function Home() {
  // Unity로부터 받은 메시지를 저장할 상태
  const [unityMessage, setUnityMessage] = useState<string>("");

  // Unity WebGL 컨텍스트 초기화
  // unityProvider: Unity 인스턴스를 제어하기 위한 프로바이더
  // sendMessage: Unity로 메시지를 전송하기 위한 함수
  // addEventListener: Unity 이벤트 리스너 등록
  // removeEventListener: Unity 이벤트 리스너 제거
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/Build/Build.loader.js", // Unity WebGL 로더 스크립트
      dataUrl: "/Build/Build.data", // Unity 게임 데이터 파일
      frameworkUrl: "/Build/Build.framework.js", // Unity 프레임워크 스크립트
      codeUrl: "/Build/Build.wasm", // WebAssembly 바이너리 파일
    });

  // Unity로 메시지를 전송하는 핸들러 함수
  const handleClick = () => {
    const input = document.querySelector("input"); // 입력 필드 요소 선택
    // 입력값 유효성 검사
    // 1. input 요소가 존재하는지
    // 2. HTMLInputElement 타입인지
    // 3. 입력값이 비어있지 않은지 확인
    if (
      !input ||
      !(input instanceof HTMLInputElement) ||
      input.value.trim() === ""
    )
      return;

    // Unity의 GameManager 오브젝트의 OnNextJsToUnityButtonClicked 메서드 호출
    // input.value를 매개변수로 전달
    sendMessage("GameManager", "OnNextJsToUnityButtonClicked", input.value);
    input.value = ""; // 메시지 전송 후 입력 필드 초기화
  };

  // Unity로부터 메시지를 받았을 때 실행되는 콜백 함수
  const handleUnityMessage = useCallback((message: string) => {
    setUnityMessage(message); // 받은 메시지를 상태에 저장
  }, []);

  // Unity 이벤트 리스너 등록 및 정리
  useEffect(() => {
    // Unity의 'userInputEvent' 이벤트 구독
    addEventListener("userInputEvent", handleUnityMessage);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => removeEventListener("userInputEvent", handleUnityMessage);
  }, [addEventListener, removeEventListener, handleUnityMessage]);

  return (
    <div>
      {/* 사용자 입력 UI 섹션 */}
      <div>
        <input 
          type="text" 
          placeholder="Unity로 전송할 메시지를 입력하세요" 
          style={{ width: "700px" }}
        />
        <button 
          onClick={handleClick} 
          style={{ width: "90px" }}
        >
          메시지 전송
        </button>
      </div>

      {/* Unity WebGL 게임 렌더링 영역 */}
      <Unity
        unityProvider={unityProvider} tabIndex={1}
        style={{ width: "800px", height: "800px", marginTop: "32px" }}
      />
      {/* Unity로부터 받은 메시지 표시 */}
      <p>{unityMessage}</p>
    </div>
  );
}
