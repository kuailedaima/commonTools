import { Button, Space } from "antd"

interface Props {
  onFormat: () => void
  onMinify: () => void
  onExpand: () => void
  onCollapse: () => void
}

export default function JsonToolbar({
  onFormat,
  onMinify,
  onExpand,
  onCollapse
}: Props) {
  return (
    <Space style={{ marginBottom: 12 }}>
      <Button type="primary" onClick={onFormat}>
        格式化
      </Button>

      <Button onClick={onMinify}>
        压缩
      </Button>

      <Button onClick={onExpand}>
        全部展开
      </Button>

      <Button onClick={onCollapse}>
        全部收起
      </Button>
    </Space>
  )
}