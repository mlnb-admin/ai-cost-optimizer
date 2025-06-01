// Utility functions for parsing and detecting special content in chatbot responses

/**
 * Detects if content contains a mermaid graph
 * @param {string} content - The content to check
 * @returns {boolean} - True if content contains mermaid graph syntax
 */
export const containsMermaidGraph = (content) => {
  const mermaidPatterns = [
    /```mermaid\s*\n([\s\S]*?)\n```/,
    /graph\s+(TD|LR|TB|RL)\s*\n/,
    /flowchart\s+(TD|LR|TB|RL)\s*\n/,
    /graph\s+(TD|LR|TB|RL)\s*$/m
  ];
  
  return mermaidPatterns.some(pattern => pattern.test(content));
};

/**
 * Extracts mermaid graph code from content
 * @param {string} content - The content to extract from
 * @returns {string|null} - The extracted mermaid code or null
 */
export const extractMermaidGraph = (content) => {
  const mermaidMatch = content.match(/```mermaid\s*\n([\s\S]*?)\n```/);
  if (mermaidMatch) {
    return mermaidMatch[1].trim();
  }
  
  // Check for graph without code block markers
  const graphMatch = content.match(/(graph\s+(?:TD|LR|TB|RL)[\s\S]*?)(?=\n\n|\n[A-Z]|\n\s*$|$)/);
  if (graphMatch) {
    return graphMatch[1].trim();
  }
  
  return null;
};

/**
 * Detects if content contains markdown tables
 * @param {string} content - The content to check
 * @returns {boolean} - True if content contains table syntax
 */
export const containsMarkdownTable = (content) => {
  // Look for table patterns: | header | header | followed by separator row
  const tablePattern = /^\s*\|.*\|\s*\n\s*\|[\s\-:]+\|\s*\n(\s*\|.*\|\s*\n)*/m;
  return tablePattern.test(content);
};

/**
 * Preprocesses content to ensure proper markdown formatting
 * @param {string} content - The raw content
 * @returns {string} - Processed content with proper formatting
 */
export const preprocessContent = (content) => {
  let processed = content;
  
  // Convert lines of underscores or dashes to horizontal rules
  processed = processed.replace(/^_{3,}\s*$/gm, '\n---\n');
  processed = processed.replace(/^-{3,}\s*$/gm, '\n---\n');
  
  // Ensure mermaid graphs are properly wrapped in code blocks
  if (containsMermaidGraph(processed) && !processed.includes('```mermaid')) {
    const graphCode = extractMermaidGraph(processed);
    if (graphCode) {
      processed = processed.replace(graphCode, `\`\`\`mermaid\n${graphCode}\n\`\`\``);
    }
  }
  
  // Ensure tables have proper spacing
  if (containsMarkdownTable(processed)) {
    processed = processed.replace(/(\|[\s\S]*?\|[\s\S]*?\n)/g, '\n$1');
  }
  
  // Add extra spacing around headings
  processed = processed.replace(/^(#{1,6}\s+.+)$/gm, '\n$1\n');
  
  return processed;
};

/**
 * Parses workflow-style content and converts to mermaid syntax
 * @param {string} content - Content that might contain workflow descriptions
 * @returns {string} - Content with workflows converted to mermaid graphs
 */
export const parseWorkflowToMermaid = (content) => {
  // This could be expanded to convert text-based workflows to mermaid syntax
  // For now, it just ensures existing mermaid syntax is properly formatted
  return preprocessContent(content);
}; 