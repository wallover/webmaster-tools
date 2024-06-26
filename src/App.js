import React, { useState } from 'react';

const Tool = ({ title, description, children }) => (
  <div className="mb-4 border p-4 rounded">
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{description}</p>
    {children}
  </div>
);

const EncryptionTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('md5');

  const encrypt = () => {
    switch (method) {
      case 'md5':
        // 注意：这只是一个演示用的简单MD5实现，不适合实际使用
        setOutput(btoa(input).split('').reverse().join(''));
        break;
      case 'base64':
        setOutput(btoa(input));
        break;
      case 'reverse':
        setOutput(input.split('').reverse().join(''));
        break;
      default:
        setOutput('Unsupported method');
    }
  };

  return (
    <Tool title="加密工具" description="支持多种加密方法">
      <div className="space-y-4">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="md5">MD5加密（模拟）</option>
          <option value="base64">Base64编码</option>
          <option value="reverse">字符串反转</option>
        </select>
        <textarea
          placeholder="输入文本"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={encrypt} className="p-2 bg-blue-500 text-white rounded">加密</button>
        <textarea value={output} readOnly className="w-full p-2 border rounded" />
      </div>
    </Tool>
  );
};

const EncodingTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('unicode');

  const convert = () => {
    switch (method) {
      case 'unicode':
        setOutput(input.split('').map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`).join(''));
        break;
      case 'url':
        setOutput(encodeURIComponent(input));
        break;
      case 'base64':
        setOutput(btoa(input));
        break;
      default:
        setOutput('Unsupported method');
    }
  };

  return (
    <Tool title="编码转换" description="支持多种编码转换方法">
      <div className="space-y-4">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="unicode">Unicode编码</option>
          <option value="url">URL编码</option>
          <option value="base64">Base64编码</option>
        </select>
        <textarea
          placeholder="输入文本"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={convert} className="p-2 bg-blue-500 text-white rounded">转换</button>
        <textarea value={output} readOnly className="w-full p-2 border rounded" />
      </div>
    </Tool>
  );
};

const WebsiteAnalysisTool = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const analyzeWebsite = (action) => {
    // 这里应该实现实际的网站分析逻辑
    setResult(`分析结果: ${action} - ${url}`);
  };

  return (
    <Tool title="网站分析" description="提供基本的网站分析工具">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="输入网址 (例如: https://www.example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div>
          <button onClick={() => analyzeWebsite('source')} className="p-2 bg-blue-500 text-white rounded mr-2">查看源代码</button>
          <button onClick={() => analyzeWebsite('security')} className="p-2 bg-blue-500 text-white rounded mr-2">安全检测</button>
          <button onClick={() => analyzeWebsite('deadlink')} className="p-2 bg-blue-500 text-white rounded">死链检测</button>
        </div>
        <textarea value={result} readOnly className="w-full p-2 border rounded h-32" />
      </div>
    </Tool>
  );
};

const WebmasterTools = () => {
  const [activeTab, setActiveTab] = useState('encrypt');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">站长工具</h1>
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('encrypt')} 
          className={`p-2 ${activeTab === 'encrypt' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
        >
          加密工具
        </button>
        <button 
          onClick={() => setActiveTab('encode')} 
          className={`p-2 ${activeTab === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
        >
          编码转换
        </button>
        <button 
          onClick={() => setActiveTab('analyze')} 
          className={`p-2 ${activeTab === 'analyze' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
        >
          网站分析
        </button>
      </div>
      {activeTab === 'encrypt' && <EncryptionTool />}
      {activeTab === 'encode' && <EncodingTool />}
      {activeTab === 'analyze' && <WebsiteAnalysisTool />}
    </div>
  );
};

export default WebmasterTools;