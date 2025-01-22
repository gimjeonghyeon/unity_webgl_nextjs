using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void UnityToNextJs(string userInput);


    public TextMeshProUGUI nextJsToUnityText;
    public TMP_InputField unityToNextJsInputField;

    private void Start()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        WebGLInput.captureAllKeyboardInput = false;
#endif
    }

    public void OnNextJsToUnityButtonClicked(string text)
    {
        nextJsToUnityText.text = text;
    }

    public void OnUnityToNextJsButtonClicked()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        UnityToNextJs(unityToNextJsInputField.text);
#endif
    }
}
