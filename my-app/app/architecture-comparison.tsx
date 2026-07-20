'use client'; // This tells Next.js this file runs entirely on the client

import { Table, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export function ArchitectureComparison() {
  const comparisonColumns = [
    {
      title: 'JavaScript-based Bundlers',
      dataIndex: 'javascript',
      key: 'javascript',
      width: '50%',
      render: (text: string[]) => (
        <div>
          {text.map((point, index) => (
            <Paragraph key={index} style={{ marginBottom: 12 }}>{point}</Paragraph>
          ))}
        </div>
      ),
    },
    {
      title: 'Native-based Bundlers',
      dataIndex: 'native',
      key: 'native',
      width: '50%',
      render: (text: string[]) => (
        <div>
          {text.map((point, index) => (
            <Paragraph key={index} style={{ marginBottom: 12 }}>{point}</Paragraph>
          ))}
        </div>
      ),
    },
  ];

  const comparisonData = [
    {
      key: '1',
      javascript: [
        'Use JavaScript-based when you have a legacy set of JavaScript modules which you need to integrate with.',
        'The JavaScript approach allows you to edit or extend the bundler code easily beforehand, but this comes with an extra cost for the runtime overhead.',
        'Extremely mature plugin ecosystems (e.g., Rollup/Webpack plugins) make it easy to find off-the-shelf solutions for niche build requirements.',
        'Easier to run and configure in constrained environments or customized CI/CD pipelines without worrying about platform-specific binary compatibility.'
      ],
      native: [
        'Use native compiled bundlers when the performance is critical and you don\'t need to integrate with legacy systems.',
        'Because the actual shipped bundler is a pre-compiled binary, it can be trickier to debug the internal bundler code itself compared to plain-text JavaScript.',
        'Leverages multi-core processors efficiently via multithreading (written in languages like Rust or Go), drastically reducing build times on large codebases.',
        'Eliminates the JavaScript runtime startup overhead and garbage collection pauses during massive compilation tasks.'
      ],
    },
  ];

  return (
    <>
      <Title level={3} style={{ marginTop: 40, marginBottom: 16 }}>Architecture Comparison</Title>
      <Table 
        columns={comparisonColumns} 
        dataSource={comparisonData} 
        pagination={false} 
        bordered
        style={{ marginBottom: 24 }}
      />
    </>
  );
}
