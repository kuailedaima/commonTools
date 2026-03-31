import { useEffect, useState } from "react"

interface Stats {
  object: number
  array: number
  string: number
  number: number
  boolean: number
  null: number
}

function countJSON(data: any, stats: Stats) {

  if (data === null) {
    stats.null++
    return
  }

  if (Array.isArray(data)) {
    stats.array++
    data.forEach(i => countJSON(i, stats))
    return
  }

  if (typeof data === "object") {
    stats.object++
    Object.values(data).forEach(v => countJSON(v, stats))
    return
  }

  if (typeof data === "string") stats.string++
  if (typeof data === "number") stats.number++
  if (typeof data === "boolean") stats.boolean++
}

export default function JsonStats({ json }: { json: any }) {

  const [stats, setStats] = useState<Stats>({
    object: 0,
    array: 0,
    string: 0,
    number: 0,
    boolean: 0,
    null: 0
  })

  useEffect(() => {

    if (!json) return

    const s: Stats = {
      object: 0,
      array: 0,
      string: 0,
      number: 0,
      boolean: 0,
      null: 0
    }

    countJSON(json, s)

    setStats(s)

  }, [json])

  return (
    <div style={{ marginBottom: 10 }}>
      Object:{stats.object} | Array:{stats.array} |
      String:{stats.string} | Number:{stats.number} |
      Boolean:{stats.boolean} | Null:{stats.null}
    </div>
  )
}