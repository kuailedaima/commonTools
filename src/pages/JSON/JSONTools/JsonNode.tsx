import { useState, useEffect } from "react"
import { Dropdown } from "antd"
import "./jsonTree.css"

interface Props {
  name?: string
  value: any
  path: string
  level?: number
  expandAll?: boolean
  isLast?: boolean
  highlight?: string
  matchPaths?: string[]
}

export default function JsonNode({
  name,
  value,
  path,
  level = 0,
  expandAll = true,
  isLast = false,
  highlight,
  matchPaths = []
}: Props) {

  const [open, setOpen] = useState(expandAll)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    setOpen(expandAll)
  }, [expandAll])

  // ✅ 构建标准 JSONPath
  const buildJsonPath = () => {

    if (!path) return "$"

    const parts = path.split(".")

    let result = "$"

    parts.forEach(p => {
      if (/^\d+$/.test(p)) {
        result += `[${p}]`
      } else {
        result += `['${p}']`
      }
    })

    return result
  }

  const jsonPath = buildJsonPath()

  // ✅ 自动展开匹配节点（核心修复）
  useEffect(() => {

    if (!matchPaths.length) return

    const shouldOpen = matchPaths.some(p => {
      // 去掉 $ 前缀
      const clean = p.replace(/^\$/, "")
      // 转成统一结构：['user']['skills'][0]
      const segments = clean.match(/\[['"]?.+?['"]?\]|\[\d+\]/g) || []
      // 当前节点路径转 segments
      const currentParts = path
        ? path.split(".").map(p =>
            /^\d+$/.test(p) ? `[${p}]` : `['${p}']`
          )
        : []
      // 拼接当前 JSONPath 结构
      const currentPath = currentParts.join("")
      // 判断是否是子路径
      return segments.join("").startsWith(currentPath)
    })

    if (shouldOpen) {
      setOpen(true)
    }

  }, [matchPaths, jsonPath])

  const padding = level * 14

  const isObject = typeof value === "object" && value !== null
  const isArray = Array.isArray(value)

  const comma = isLast ? "" : ","

  const items = [
    {
      key: "copyKey",
      label: "复制 Key",
      onClick: () => navigator.clipboard.writeText(name || "")
    },
    {
      key: "copyValue",
      label: "复制 Value",
      onClick: () =>
        navigator.clipboard.writeText(JSON.stringify(value, null, 2))
    },
    {
      key: "copyObject",
      label: "复制 Object",
      onClick: () =>
        navigator.clipboard.writeText(JSON.stringify(value, null, 2))
    },
    {
      key: "copyPath",
      label: "复制 Path",
      onClick: () => navigator.clipboard.writeText(jsonPath)
    }
  ]

  const lineStyle: React.CSSProperties = {
    paddingLeft: padding,
    position: "relative",
    fontFamily: "Consolas, Monaco, monospace",
    fontSize: 15,
    lineHeight: "22px"
  }

  const highlightText = (text: string) => {

    if (!highlight) return text

    const lower = text.toLowerCase()
    const key = highlight.toLowerCase()

    const parts = []
    let start = 0

    while (true) {

      const index = lower.indexOf(key, start)

      if (index === -1) {
        parts.push(text.slice(start))
        break
      }

      parts.push(text.slice(start, index))

      parts.push(
        <span style={{ background: "#ffe58f" }} key={index}>
          {text.slice(index, index + highlight.length)}
        </span>
      )

      start = index + highlight.length
    }

    return <>{parts}</>
  }

  const preview = () => {

    if (!isObject) return ""

    const entries = Object.entries(value).slice(0, 3)

    const text = entries
      .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
      .join(", ")

    return `${text}${entries.length < Object.keys(value).length ? ", …" : ""}`
  }

  const toggle = isObject ? (
    <span
      onClick={() => setOpen(!open)}
      style={{
        position: "absolute",
        left: padding - 12,
        width: 12,
        cursor: "pointer",
        color: "#888",
        userSelect: "none"
      }}
    >
      {open ? "▾" : "▸"}
    </span>
  ) : null

  const renderValue = () => {

    if (typeof value === "string")
      return (
        <span style={{ color: "#0b7500" }}>
          "
          {highlight ? highlightText(value) : value}
          "
        </span>
      )

    if (typeof value === "number")
      return (
        <span style={{ color: "#1c00cf" }}>
          {highlight ? highlightText(String(value)) : value}
        </span>
      )

    if (typeof value === "boolean")
      return (
        <span style={{ color: "#aa0d91" }}>
          {highlight ? highlightText(String(value)) : String(value)}
        </span>
      )

    if (value === null)
      return <span style={{ color: "#999" }}>null</span>

    return null
  }

  // ================= 普通节点 =================
  if (!isObject) {
    return (
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <div
          className="json-line"
          style={lineStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {toggle}

          {name !== undefined && (
            <>
              <span style={{ color: "#922" }}>
                "{highlightText(name)}"
              </span>
              <span>: </span>
            </>
          )}

          {renderValue()}
          {comma}

          {hover && (
            <span
              className="json-copy"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(value))
              }
            >
              📋
            </span>
          )}
        </div>
      </Dropdown>
    )
  }

  // ================= 对象 / 数组 =================
  const entries = Object.entries(value)

  return (
    <div>
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <div
          className="json-line"
          style={lineStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {toggle}

          {name !== undefined && (
            <>
              <span style={{ color: "#922" }}>
                "{highlightText(name)}"
              </span>
              <span>: </span>
            </>
          )}

          <span>{isArray ? "[" : "{"}</span>

          {!open && (
            <>
              <span style={{ color: "#888", marginLeft: 6 }}>
                {preview()}
              </span>
              <span>{isArray ? "]" : "}"}</span>
              {comma}
            </>
          )}

          {hover && (
            <span
              className="json-copy"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(value))
              }
            >
              📋
            </span>
          )}
        </div>
      </Dropdown>

      {open &&
        entries.map(([k, v], i) => (
          <JsonNode
            key={k}
            name={isArray ? undefined : k}
            value={v}
            path={path ? `${path}.${k}` : k}
            level={level + 1}
            expandAll={expandAll}
            isLast={i === entries.length - 1}
            highlight={highlight}
            matchPaths={matchPaths}
          />
        ))}

      {open && (
        <div className="json-line" style={lineStyle}>
          {isArray ? "]" : "}"}
          {comma}
        </div>
      )}
    </div>
  )
}