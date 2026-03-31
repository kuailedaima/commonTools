import Editor from "@monaco-editor/react"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function JsonEditor({ value, onChange }: Props) {
  return (
    <Editor
      height="600px"
      language="json"
      theme="vs-light"
      value={value}
      onChange={(v) => onChange(v || "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false
      }}
    />
  )
}