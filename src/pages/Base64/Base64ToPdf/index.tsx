import { Button, Input, message  } from 'antd';
import './index.scss'
import React, { useState, useRef } from 'react';
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function Base64ToPdf () {
  const [base64Data, setBase64Data] = useState('')
  const [pdfData, setPdfData] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // 输入域内容发生变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64Data(e.target.value)
  }
  // 清除内容
  const clearContent = () => {
    setBase64Data('')
  }
  // 提交
  const submit = () => {
    if (base64Data === '') {
      message.info('请输入内容!');
      return
    }
    if (base64Data.includes('data:application/pdf;base64,')) {
      setPdfData(base64Data)
    } else {
      setPdfData('data:application/pdf;base64,' + base64Data)
    }
  }
  // 下载
  const downloadPdfViaBlob = () => {
    if (!base64Data) return

    try {
      // 1、创建 Blob 并下载
      const byteCharacters = atob(base64Data)
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // 2. 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = String(new Date().getTime());
      document.body.appendChild(link);
      link.click();
      
      // 3. 清理
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      message.info('下载失败！');
      console.log(error);
      
    }
  }

  return (
    <div className='base64'>
      <div className='title'>
        base64转换pdf
      </div>
      <div className='content'>
        <div className='left'>
          <TextArea
            rows={24}
            placeholder="请输入base64编码"
            value={base64Data}
            onChange={handleInputChange}
          />
          <div className='leftFooter'>
            <Button type="primary" onClick={submit}>提交</Button>
            <Button type="primary" onClick={clearContent} style={{ marginLeft: '10px' }}>清除</Button>
          </div>
        </div>
        <div className='right'>
          { pdfData !== '' ?
            <>
              <iframe
                ref={iframeRef}
                src={pdfData}
                title="Base64 Content Viewer"
                width="100%"
                height="95%"
              />
              <Button type="primary" icon={<DownloadOutlined />} onClick={downloadPdfViaBlob} style={{ marginTop: '10px' }}>下载</Button>
            </>
            :
            <div className='empty'>
              <FileTextOutlined style={{ fontSize: '60px', marginBottom: '10px' }}/>
              <div>等待转换中</div>
              <div className='emptyTip'>请在左侧输入 Base64 字符串后点击转换</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Base64ToPdf