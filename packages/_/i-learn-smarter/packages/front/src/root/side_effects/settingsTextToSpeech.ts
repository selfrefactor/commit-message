export function settingsTextToSpeech(
  action: Action,
  state: Store,
): Store {
  const newValue = !state.textToSpeechFlag
  const roughData = {
    ...state.roughData,
    textToSpeech: {
      ...state.roughData.textToSpeech,
      active: newValue,
    },
  }

  return {
    ...state,
    roughData,
    textToSpeechFlag: newValue,
  }
}
