import { Input } from "antd"
import { JSONPath } from "jsonpath-plus"
import { useState } from "react"

interface Props {
  json: any
  onResult: (paths: string[]) => void
  onKeyword: (keyword: string) => void
}

export default function JsonSearch({ json, onResult, onKeyword }: Props) {

  const [count, setCount] = useState(0)

  const handleSearch = (value: string) => {

    onKeyword(value)

    if (!value || !json) {
      setCount(0)
      onResult([])
      return
    }

    const result = JSONPath({
      path: "$..*",
      json,
      resultType: "all"
    })

    const keyword = value.toLowerCase()

    const matched = result.filter((item: any) => {

      const path = item.path.toLowerCase()

      const val =
        typeof item.value === "object"
          ? JSON.stringify(item.value)
          : String(item.value)

      return (
        path.includes(keyword) ||
        val.toLowerCase().includes(keyword)
      )
    })

    const paths = matched.map((i: any) => i.path)

    setCount(paths.length)

    onResult(paths)
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

      <Input.Search
        placeholder="搜索 key / value"
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={(value) => handleSearch(value)}
        style={{ width: 300 }}
        allowClear
      />

      {count > 0 && (
        <span style={{ color: "#888" }}>
          {count} matches
        </span>
      )}

    </div>
  )
}