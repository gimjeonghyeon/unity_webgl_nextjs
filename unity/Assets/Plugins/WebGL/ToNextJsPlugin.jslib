mergeInto(LibraryManager.library, {
    // Unity에서 NextJs로 문자열을 보내는 함수 (유니티에서 호출시 UnityToNextJs 함수명으로 선언하여 호출)
    UnityToNextJs: function (userInput) {
        // NextJs로 문자열을 보내는 이벤트를 발생 (NextJs에서 userInputEvent 이벤트 이름으로 받음)
        window.dispatchReactUnityEvent("userInputEvent", UTF8ToString(userInput));
    }
});
