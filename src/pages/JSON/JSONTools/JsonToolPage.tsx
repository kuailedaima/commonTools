import { useState, useEffect } from "react"
import JsonEditor from "./JsonEditor"
import JsonTree from "./JsonTree"
import JsonToolbar from "./JsonToolbar"
import JsonSearch from "./JsonSearch"
import JsonStats from "./JsonStats"
import { formatJSON, minifyJSON } from "./jsonUtils"

export default function JsonToolPage() {

  const [jsonText, setJsonText] = useState(`{
  "user": {
    "name": "张三",
    "age": 18,
    "skills": ["React","TypeScript"]
  }
}`)

  const [jsonObj, setJsonObj] = useState<any>()
  const [expandAll, setExpandAll] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [matchPaths, setMatchPaths] = useState<string[]>([])

  useEffect(() => {
    try {
      setJsonObj(JSON.parse(jsonText))
    } catch {}
  }, [jsonText])

  return (
    <div style={{ padding: 20 }}>

      <JsonToolbar
        onFormat={() => setJsonText(formatJSON(jsonText))}
        onMinify={() => setJsonText(minifyJSON(jsonText))}
        onExpand={() => setExpandAll(true)}
        onCollapse={() => setExpandAll(false)}
      />

      <JsonStats json={jsonObj} />

      <JsonSearch
        json={jsonObj}
        onResult={setMatchPaths}
        onKeyword={setKeyword}
      />

      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>

        <div style={{ flex: 1 }}>
          <JsonEditor
            value={jsonText}
            onChange={setJsonText}
          />
        </div>

        <div
          style={{
            flex: 1,
            border: "1px solid #eee",
            padding: 12,
            overflow: "auto",
            maxHeight: 600,
            fontFamily: "Consolas, Monaco, monospace",
            fontSize: 15,
            lineHeight: "24px",
            color: "#333"
          }}
        >
          <JsonTree
            data={jsonObj}
            expandAll={expandAll}
            highlight={keyword}
            matchPaths={matchPaths}
          />
        </div>

      </div>

    </div>
  )
}