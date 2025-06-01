import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CustomTable, CustomTableHeader, CustomTableRow, CustomTableCell } from '../pages/ChatbotPage';
import { containsMarkdownTable, preprocessContent } from '../utils/contentParser';

const TableDebugTest = () => {
  const tableContent1 = `
| Vendor | Integration Fit | Cost | Accuracy |
|-------------|---------------------|----------|--------------|
| AWS Bedrock | Strong (native AWS) | $$ | 95-99% |
| Azure Cognitive | Moderate | $$ | 95-99% |
| Anthropic Pro | High (open API) | $$ | 97-99% |
`;

  const tableContent2 = `## Cost Analysis

| Service | Monthly Cost | Usage | ROI |
|---------|-------------|-------|-----|
| Service A | $100 | High | 85% |
| Service B | $50 | Medium | 70% |
| Service C | $200 | Low | 45% |

This is the breakdown of costs.`;

  const tableContent3 = `
Cost Optimization Recommendations
Budget Allocation Strategy

| Vendor | Integration Fit | Cost | Accuracy |
|-------------|---------------------|----------|--------------|
| AWS Bedrock | Strong (native AWS) | $$ | 95-99% |
| Azure Cognitive | Moderate | $$ | 95-99% |
| Anthropic Pro | High (open API) | $$ | 97-99% |

Phase 2: Full Integration (3-6 months)
`;

  const testContents = [tableContent1, tableContent2, tableContent3];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Table Detection and Rendering Test</h1>
      
      {testContents.map((content, index) => (
        <div key={index} className="mb-8 p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Case {index + 1}</h2>
          
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="font-bold mb-2">Detection Results:</h3>
            <p>Contains table: {containsMarkdownTable(content) ? '✅ Yes' : '❌ No'}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Raw Content:</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
              {content}
            </pre>
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Preprocessed Content:</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
              {preprocessContent(content)}
            </pre>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Rendered Output:</h3>
            <div className="border p-4 rounded bg-white dark:bg-gray-900">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 leading-relaxed">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 leading-relaxed">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 leading-relaxed">{children}</h3>,
                  hr: () => <hr className="my-6 border-primary-300 dark:border-primary-600" />,
                  table: CustomTable,
                  thead: CustomTableHeader,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: CustomTableRow,
                  th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
                  td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>,
                }}
              >
                {preprocessContent(content)}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableDebugTest; 