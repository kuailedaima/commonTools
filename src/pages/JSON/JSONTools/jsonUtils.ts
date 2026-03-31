export function formatJSON(text: string) {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

export function minifyJSON(text: string) {
  try {
    return JSON.stringify(JSON.parse(text))
  } catch {
    return text
  }
}