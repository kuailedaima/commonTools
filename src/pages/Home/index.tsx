import { useEffect, useState } from 'react'
import './home.scss'
import { useNavigate } from 'react-router-dom'
import { Input } from 'antd'

function Home () {
  interface carditem {
    path: string,
    title: string,
    desc: string,
  }
  const list = [
    {
      path: '/Base64ToPdf',
      title: 'Base64转pdf',
      desc: '能够将baase64转换成预览的pdf'
    },
    {
      path: '/JsonTools',
      title: 'json功能',
      desc: 'json格式化、预览工具'
    },
  ]
  const [toolList, setToolList] = useState<carditem[]>([])
  const navigate = useNavigate()
  const { Search } = Input

  useEffect(() => {
    setToolList(list)
  }, [])

  // 查询
  const onSearch = (value: string) => {
    if (value === '') {
      setToolList(list)
      return
    }
    const searchList = list.filter(item => item.title.includes(value) || item.desc.includes(value))
    setToolList(searchList)
  }
  // 跳转
  const jump = (obj: carditem) => {
    const { path } = obj
    navigate(path)
  }
  
  return (
    <div className="home">
      <div className="search">
        <Search
        className='searchInput'
          placeholder="请输入"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="toolContent">
        {toolList.map((item, key) => (
          <div className="shadowCard" key={key} onClick={() => jump(item)}>
            <div className='cardTitle'>{item.title}</div>
            <div className='cardDescription'>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home