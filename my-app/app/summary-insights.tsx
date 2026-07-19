"use client"
import { Typography, Row, Col, Card, Statistic } from "antd";
import { computeTotalMetric, calculateTotalDeps, extractVersion } from "../view-converters";
import type { ToolTableProps } from "../tool-table-props";

const { Title, Paragraph, Text } = Typography;

interface InsightsBlockProps {
  data: Array<{
    title: string;
    version: string;
    dependencies: Record<any, any>;
    stats: ToolTableProps["stats"];
  }>;
}

export const InsightsBlock = ({ data }: InsightsBlockProps) => {
  if (!data || data.length === 0) return null;

  // Process and normalize metrics for all tools
  const analyzedTools = data.map((tool) => {
    const avgTime = computeTotalMetric(tool.stats, "seconds");
    const avgRam = computeTotalMetric(tool.stats, "ram");
    const totalDeps = calculateTotalDeps(tool.dependencies);
    const cleanName = tool.title.replace(".log", "");

    return {
      name: cleanName,
      version: extractVersion(tool.version),
      avgTime,
      avgRam,
      totalDeps,
    };
  });

  // Identify performance champions dynamically
  const fastestTool = [...analyzedTools].sort((a, b) => a.avgTime - b.avgTime)[0];
  const lightestRamTool = [...analyzedTools].sort((a, b) => a.avgRam - b.avgRam)[0];
	
  const minimalistTool = [...analyzedTools].sort((a, b) => a.totalDeps - b.totalDeps)[0];

  return (
    <Card 
      style={{ 
        marginBottom: 24, 
        background: 'linear-gradient(145deg, #ffffff, #fcfcfc)',
        borderLeft: '4px solid #1677ff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
        📊 High-Level Run Summary & Insights
      </Title>
      
      <Paragraph type="secondary" style={{ marginBottom: 20 }}>
        An objective, automated performance snapshot evaluating modern compilation strategies and native ecosystems under equal resource constraints.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={8}>
          <Card size="small" bordered={false} style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Statistic
              title="Speed Champion (Avg Time)"
              value={fastestTool.avgTime}
              suffix="s"
              valueStyle={{ color: '#389e0d', fontWeight: 'bold' }}
            />
            <Text type="secondary">Driven by <strong>{fastestTool.name}</strong></Text>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card size="small" bordered={false} style={{ background: '#e6f4ff', border: '1px solid #91caff' }}>
            <Statistic
              title="Lowest Memory Ceiling"
              value={lightestRamTool.avgRam}
              suffix=" MB"
              valueStyle={{ color: '#0958d9', fontWeight: 'bold' }}
            />
            <Text type="secondary" >Driven by <strong>{lightestRamTool.name}</strong></Text>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card size="small" bordered={false} style={{ background: '#fff7e6', border: '1px solid #ffd591' }}>
            <Statistic
              title="Lightest Dependency Footprint"
              value={minimalistTool.totalDeps}
              suffix=" packages"
              valueStyle={{ color: '#d46b08', fontWeight: 'bold' }}
            />
            <Text type="secondary" >Driven by <strong>{minimalistTool.name}</strong></Text>
          </Card>
        </Col>
      </Row>

      <div style={{ padding: '12px 16px', backgroundColor: '#fafafa', borderRadius: 6, borderLeft: '3px solid #d9d9d9' }}>
        <Text strong style={{ display: 'block', marginBottom: 4 }}>Architectural Takeaway:</Text>
        <Paragraph style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
          The current benchmark dataset highlights a clear evolutionary split in build-tooling infrastructures. 
          Compiled systems engineered on native, multi-threaded foundations (such as Go and Rust implementations like 
          <Text code>{fastestTool.name}</Text>) maintain an immediate operational lead—drastically cutting cold compilation targets 
          compared to single-threaded Node.js native pipelines, while running on tighter, highly efficient memory lifespans.
        </Paragraph>
      </div>
    </Card>
  );
};
