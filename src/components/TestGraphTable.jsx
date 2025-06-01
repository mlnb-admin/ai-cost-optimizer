import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidGraph, CustomTable, CustomTableHeader, CustomTableRow, CustomTableCell, CustomCode } from '../pages/ChatbotPage';

const TestGraphTable = () => {
  const sampleContent = `
# Cost Optimization Recommendations
## Budget Allocation Strategy

Here's the workflow for your AI processing system:

\`\`\`mermaid
graph TD  
    A[Forms/Application Entry] --> B{Workflow Engine}  
    B --> C[Real-Time Streaming Platform]  
    C --> D{AI Processing Layer}  
    D --> E[Webhook Notifications]  
    D --> F[Exception-Based Human Review]  
    F -->|Approved| G[Persist Results]  
    F -->|Rejected| H[Escalation Workflow]  
\`\`\`

## Vendor Comparison

| Vendor | Integration Fit | Cost | Accuracy |
|-------------|---------------------|----------|--------------|
| AWS Bedrock | Strong (native AWS) | $$ | 95-99% |
| Azure Cognitive | Moderate | $$ | 95-99% |
| Anthropic Pro | High (open API) | $$ | 97-99% |

### Implementation Timeline
- **Phase 1**: Initial Setup (1-2 months)
- **Phase 2**: Full Integration (3-6 months)
- **Phase 3**: Optimization (6+ months)
`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Graph and Table Rendering Demo</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="mb-3 last:mb-0 pl-4">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 leading-relaxed">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 leading-relaxed">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 leading-relaxed">{children}</h3>,
            hr: () => <hr className="my-6 border-primary-300 dark:border-primary-600" />,
            code: CustomCode,
            pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto my-4">{children}</pre>,
            table: CustomTable,
            thead: CustomTableHeader,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: CustomTableRow,
            th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
            td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>,
          }}
        >
          {sampleContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TestGraphTable; 