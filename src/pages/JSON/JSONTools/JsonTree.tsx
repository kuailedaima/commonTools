import JsonNode from "./JsonNode"

export default function JsonTree({
  data,
  expandAll,
  highlight,
  matchPaths
}: {
  data: any
  expandAll: boolean
  highlight?: string
  matchPaths?: string[]
}) {

  if (!data) return null

  const entries = Object.entries(data)

  return (
    <div>

      <div className="json-line">{"{"}</div>

      {entries.map(([k, v], i) => (
        <JsonNode
          key={k}
          name={k}
          value={v}
          path={k}
          level={1}
          expandAll={expandAll}
          isLast={i === entries.length - 1}
          highlight={highlight}
          matchPaths={matchPaths}
        />
      ))}

      <div className="json-line">{"}"}</div>

    </div>
  )
}