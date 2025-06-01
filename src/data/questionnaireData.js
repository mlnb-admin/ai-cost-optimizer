export const questionnaireData = {
  "questionnaire": {
    "metadata": {
      "version": "1.0",
      "title": "Enterprise AI Cost Assessment",
      "description": "Comprehensive questionnaire for AI infrastructure cost estimation",
      "framework": "Three-tier entry point with static/dynamic question flow"
    },
    "entryPointSelection": {
      "id": "entry_point",
      "type": "single_select",
      "question": "Which statement best describes your current AI initiative?",
      "required": true,
      "options": [
        {
          "id": "existing_automation",
          "label": "We have existing automation and want to add AI capabilities",
          "description": "Enhancement of current automated processes"
        },
        {
          "id": "new_initiative", 
          "label": "We have a specific AI use case idea and need implementation guidance",
          "description": "New AI project with defined objectives"
        },
        {
          "id": "exploration",
          "label": "We want to explore AI opportunities but don't know where to start",
          "description": "Discovery phase for AI potential"
        }
      ]
    },
    "staticQuestions": {
      "organizationProfile": {
        "section": "Organization Profile",
        "description": "Core organizational characteristics affecting infrastructure choices",
        "questions": [
          {
            "id": "industry_vertical",
            "type": "single_select",
            "question": "What industry vertical best describes your organization?",
            "required": true,
            "costImpact": "Drives compliance requirements, security levels, and vendor restrictions",
            "options": [
              {"id": "healthcare", "label": "Healthcare"},
              {"id": "financial", "label": "Financial Services"},
              {"id": "manufacturing", "label": "Manufacturing"},
              {"id": "retail", "label": "Retail/E-commerce"},
              {"id": "technology", "label": "Technology"},
              {"id": "government", "label": "Government/Public Sector"},
              {"id": "education", "label": "Education"},
              {"id": "other", "label": "Other"}
            ]
          },
          {
            "id": "organization_size",
            "type": "single_select", 
            "question": "What is your organization size?",
            "required": true,
            "costImpact": "Determines volume pricing tiers, support levels, and capacity optimization",
            "options": [
              {"id": "startup", "label": "Startup (<100 employees)"},
              {"id": "sme", "label": "Small-Medium Enterprise (100-1,000 employees)"},
              {"id": "enterprise", "label": "Enterprise (1,000-10,000 employees)"},
              {"id": "large_enterprise", "label": "Large Enterprise (>10,000 employees)"}
            ]
          },
          {
            "id": "revenue_range",
            "type": "single_select",
            "question": "What is your organization's annual revenue range?",
            "required": true,
            "costImpact": "Influences budget allocation, risk tolerance, and enterprise pricing tiers",
            "options": [
              {"id": "under_1m", "label": "Less than $1M"},
              {"id": "1m_10m", "label": "$1M - $10M"},
              {"id": "10m_100m", "label": "$10M - $100M"},
              {"id": "100m_1b", "label": "$100M - $1B"},
              {"id": "over_1b", "label": "Greater than $1B"}
            ]
          },
          {
            "id": "geographic_presence",
            "type": "single_select",
            "question": "What is your geographic presence?",
            "required": true,
            "costImpact": "Affects data residency costs, multi-region deployment, and cross-border transfer pricing",
            "options": [
              {"id": "single_country", "label": "Single country operations"},
              {"id": "multi_country", "label": "Multi-country presence"},
              {"id": "global", "label": "Global operations"}
            ]
          },
          {
            "id": "technology_maturity",
            "type": "single_select",
            "question": "How would you describe your organization's technology maturity?",
            "required": true,
            "costImpact": "Determines integration complexity costs, modernization needs, and operational overhead",
            "options": [
              {"id": "traditional", "label": "Traditional IT infrastructure"},
              {"id": "cloud_native", "label": "Cloud-native operations"},
              {"id": "ai_ready", "label": "AI-ready infrastructure"},
              {"id": "ai_advanced", "label": "Advanced AI implementations"}
            ]
          }
        ]
      },
      "complianceSecurity": {
        "section": "Compliance & Security Requirements",
        "description": "Regulatory and security constraints affecting infrastructure selection",
        "questions": [
          {
            "id": "regulatory_framework",
            "type": "multi_select",
            "question": "Which regulatory frameworks apply to your organization?",
            "required": true,
            "costImpact": "Mandates specific infrastructure tiers, encryption levels, audit trails",
            "options": [
              {"id": "gdpr", "label": "GDPR (General Data Protection Regulation)"},
              {"id": "hipaa", "label": "HIPAA (Healthcare)"},
              {"id": "sox", "label": "SOX (Sarbanes-Oxley)"},
              {"id": "pci_dss", "label": "PCI-DSS (Payment Card Industry)"},
              {"id": "soc2", "label": "SOC2 (Service Organization Control)"},
              {"id": "iso27001", "label": "ISO27001 (Information Security)"},
              {"id": "none", "label": "None of the above"},
              {"id": "other", "label": "Other regulatory requirements"}
            ]
          },
          {
            "id": "data_residency",
            "type": "single_select",
            "question": "Do you have specific data residency requirements?",
            "required": true,
            "costImpact": "Limits cloud provider options, may require premium regional services",
            "options": [
              {"id": "no_requirements", "label": "No specific requirements"},
              {"id": "specific_country", "label": "Must remain within specific country"},
              {"id": "specific_region", "label": "Must remain within specific region (e.g., EU, North America)"},
              {"id": "multiple_regions", "label": "Multiple regional requirements"}
            ]
          },
          {
            "id": "security_clearance",
            "type": "single_select",
            "question": "What is your data security clearance level?",
            "required": true,
            "costImpact": "Determines deployment model and security premium costs",
            "options": [
              {"id": "public", "label": "Public (no restrictions)"},
              {"id": "internal", "label": "Internal use only"},
              {"id": "confidential", "label": "Confidential"},
              {"id": "restricted", "label": "Restricted/Highly sensitive"},
              {"id": "government", "label": "Government security clearance required"}
            ]
          },
          {
            "id": "audit_requirements",
            "type": "single_select",
            "question": "What are your audit requirements?",
            "required": true,
            "costImpact": "Requires compliance-certified services, audit logging, documentation overhead",
            "options": [
              {"id": "internal_only", "label": "Internal audit only"},
              {"id": "external_audit", "label": "External audit required"},
              {"id": "regulatory_audit", "label": "Regulatory audit compliance"},
              {"id": "no_formal", "label": "No formal audit requirements"}
            ]
          },
          {
            "id": "encryption_standards",
            "type": "single_select",
            "question": "What encryption standards are required?",
            "required": true,
            "costImpact": "Influences storage and compute costs through performance overhead",
            "options": [
              {"id": "standard", "label": "Standard encryption (at-rest and in-transit)"},
              {"id": "advanced", "label": "Advanced encryption with customer-managed keys"},
              {"id": "end_to_end", "label": "End-to-end encryption required"},
              {"id": "none", "label": "No specific encryption requirements"}
            ]
          }
        ]
      },
      "technicalInfrastructure": {
        "section": "Technical Infrastructure Context",
        "description": "Current technical environment and integration requirements",
        "questions": [
          {
            "id": "cloud_provider",
            "type": "single_select",
            "question": "What is your primary cloud infrastructure?",
            "required": true,
            "costImpact": "Determines available AI services, pricing models, data egress costs",
            "options": [
              {"id": "aws", "label": "Amazon Web Services (AWS)"},
              {"id": "azure", "label": "Microsoft Azure"},
              {"id": "gcp", "label": "Google Cloud Platform (GCP)"},
              {"id": "multi_cloud", "label": "Multi-cloud strategy"},
              {"id": "on_premise", "label": "On-premise infrastructure"},
              {"id": "hybrid", "label": "Hybrid cloud model"}
            ]
          },
          {
            "id": "data_infrastructure",
            "type": "single_select",
            "question": "What existing data infrastructure do you have?",
            "required": true,
            "costImpact": "Affects integration costs, data pipeline complexity, storage optimization",
            "options": [
              {"id": "traditional_db", "label": "Traditional databases only"},
              {"id": "data_warehouse", "label": "Data warehouse"},
              {"id": "data_lake", "label": "Data lake"},
              {"id": "streaming", "label": "Real-time streaming platforms"},
              {"id": "modern_stack", "label": "Modern data stack (warehouse + lake + streaming)"},
              {"id": "limited", "label": "Limited data infrastructure"}
            ]
          },
          {
            "id": "ai_ml_maturity",
            "type": "single_select",
            "question": "What is your current AI/ML maturity level?",
            "required": true,
            "costImpact": "Influences operational complexity costs, training needs, MLOps infrastructure",
            "options": [
              {"id": "none", "label": "No AI/ML experience"},
              {"id": "basic", "label": "Basic analytics and reporting"},
              {"id": "intermediate", "label": "Some ML models in production"},
              {"id": "advanced", "label": "Advanced AI implementations"}
            ]
          },
          {
            "id": "integration_complexity",
            "type": "single_select",
            "question": "How would you describe your integration complexity?",
            "required": true,
            "costImpact": "Drives development costs, API gateway needs, middleware requirements",
            "options": [
              {"id": "greenfield", "label": "Greenfield (new implementation)"},
              {"id": "brownfield", "label": "Brownfield (existing systems to integrate)"},
              {"id": "legacy", "label": "Legacy system integration required"},
              {"id": "mixed", "label": "Mixed environment"}
            ]
          },
          {
            "id": "devops_maturity",
            "type": "single_select",
            "question": "What is your DevOps maturity level?",
            "required": true,
            "costImpact": "Affects operational overhead, deployment frequency costs, automation tool requirements",
            "options": [
              {"id": "manual", "label": "Manual deployment processes"},
              {"id": "basic_cicd", "label": "Basic CI/CD pipelines"},
              {"id": "gitops", "label": "GitOps and automation"},
              {"id": "full_automation", "label": "Full DevOps automation"}
            ]
          }
        ]
      },
      "businessContext": {
        "section": "Business Context",
        "description": "Budget, timeline, and business requirements",
        "questions": [
          {
            "id": "budget_range",
            "type": "single_select",
            "question": "What is your project budget range?",
            "required": true,
            "costImpact": "Determines feasible architecture options, influences build vs buy decisions",
            "options": [
              {"id": "under_10k", "label": "Less than $10K"},
              {"id": "10k_100k", "label": "$10K - $100K"},
              {"id": "100k_1m", "label": "$100K - $1M"},
              {"id": "1m_10m", "label": "$1M - $10M"},
              {"id": "over_10m", "label": "Greater than $10M"}
            ]
          },
          {
            "id": "timeline",
            "type": "single_select",
            "question": "What is your project timeline?",
            "required": true,
            "costImpact": "Affects deployment strategy costs, influences managed services vs self-hosted decisions",
            "options": [
              {"id": "poc", "label": "Proof of Concept (<3 months)"},
              {"id": "mvp", "label": "MVP Development (3-6 months)"},
              {"id": "production", "label": "Production Deployment (6-12 months)"},
              {"id": "enterprise", "label": "Enterprise Rollout (>12 months)"}
            ]
          },
          {
            "id": "risk_tolerance",
            "type": "single_select",
            "question": "What is your organization's risk tolerance?",
            "required": true,
            "costImpact": "Influences premium service selection, redundancy levels, experimental technology adoption",
            "options": [
              {"id": "conservative", "label": "Conservative (proven technologies only)"},
              {"id": "moderate", "label": "Moderate (balanced approach)"},
              {"id": "aggressive", "label": "Aggressive (cutting-edge technology adoption)"}
            ]
          },
          {
            "id": "business_criticality",
            "type": "single_select",
            "question": "What is the business criticality of this AI initiative?",
            "required": true,
            "costImpact": "Determines SLA requirements, redundancy needs, support level costs",
            "options": [
              {"id": "experimental", "label": "Experimental/Learning"},
              {"id": "department", "label": "Department-level improvement"},
              {"id": "business_critical", "label": "Business-critical function"},
              {"id": "mission_critical", "label": "Mission-critical operation"}
            ]
          }
        ]
      }
    },
    "entryPointSpecificQuestions": {
      "existing_automation": {
        "section": "Existing Automation Enhancement",
        "description": "Questions specific to enhancing current automation with AI",
        "condition": "entry_point == 'existing_automation'",
        "questions": [
          {
            "id": "current_platform",
            "type": "single_select",
            "question": "What automation platform are you currently using?",
            "required": true,
            "costImpact": "Determines integration architecture complexity and API compatibility costs",
            "options": [
              {"id": "rpa_tools", "label": "RPA tools (UiPath, Automation Anywhere, Blue Prism)"},
              {"id": "workflow_engines", "label": "Workflow engines (Microsoft Power Automate, Zapier)"},
              {"id": "custom_solutions", "label": "Custom-built solutions"},
              {"id": "enterprise_bpm", "label": "Enterprise process management tools"}
            ]
          },
          {
            "id": "integration_systems",
            "type": "single_select",
            "question": "How many systems does your current automation integrate with?",
            "required": true,
            "costImpact": "Drives middleware and orchestration costs for AI enhancement layers",
            "options": [
              {"id": "few", "label": "1-3 systems"},
              {"id": "moderate", "label": "4-10 systems"},
              {"id": "many", "label": "11-25 systems"},
              {"id": "extensive", "label": "More than 25 systems"}
            ]
          },
          {
            "id": "current_data_sources",
            "type": "multi_select",
            "question": "What data sources are currently integrated?",
            "required": true,
            "costImpact": "Affects data pipeline costs and storage optimization through existing connections",
            "options": [
              {"id": "crm", "label": "CRM Systems"},
              {"id": "erp", "label": "ERP Systems"},
              {"id": "databases", "label": "Databases"},
              {"id": "apis", "label": "Third-party APIs"},
              {"id": "files", "label": "File systems"},
              {"id": "cloud_storage", "label": "Cloud storage"}
            ]
          },
          {
            "id": "performance_metrics",
            "type": "text",
            "question": "What are your current performance metrics? (processing volume, response times, error rates)",
            "required": false,
            "costImpact": "Sets baseline for performance improvement ROI and scaling cost projections"
          },
          {
            "id": "change_constraints",
            "type": "multi_select",
            "question": "What change management constraints do you have?",
            "required": true,
            "costImpact": "Influences deployment strategy and redundancy costs during integration",
            "options": [
              {"id": "minimal_downtime", "label": "Minimal downtime tolerance"},
              {"id": "rollback_required", "label": "Rollback capabilities required"},
              {"id": "staged_deployment", "label": "Staged deployment necessary"},
              {"id": "user_training", "label": "Extensive user training needed"}
            ]
          }
        ]
      },
      "new_initiative": {
        "section": "New Automation Initiative",
        "description": "Questions for new AI automation projects",
        "condition": "entry_point == 'new_initiative'", 
        "questions": [
          {
            "id": "process_definition",
            "type": "single_select",
            "question": "How well-defined is your target process?",
            "required": true,
            "costImpact": "Affects requirements gathering costs and solution architecture complexity",
            "options": [
              {"id": "well_defined", "label": "Fully documented and optimized"},
              {"id": "partially_defined", "label": "Partially defined with some gaps"},
              {"id": "conceptual", "label": "Conceptual understanding only"}
            ]
          },
          {
            "id": "success_criteria",
            "type": "multi_select", 
            "question": "What are your primary success criteria?",
            "required": true,
            "costImpact": "Determines performance tier requirements and associated infrastructure costs",
            "options": [
              {"id": "cost_reduction", "label": "Cost reduction (specify target %)"},
              {"id": "efficiency_gains", "label": "Efficiency improvements"},
              {"id": "quality_improvements", "label": "Quality improvements"},
              {"id": "competitive_advantage", "label": "Competitive advantage"}
            ]
          },
          {
            "id": "stakeholder_alignment",
            "type": "single_select",
            "question": "What is the scope of stakeholder involvement?",
            "required": true,
            "costImpact": "Influences deployment complexity, user management costs, and scaling requirements",
            "options": [
              {"id": "single_department", "label": "Single department"},
              {"id": "cross_department", "label": "Cross-department"},
              {"id": "enterprise_wide", "label": "Enterprise-wide"}
            ]
          },
          {
            "id": "competitive_timeline",
            "type": "single_select",
            "question": "What is your competitive positioning timeline?",
            "required": true,
            "costImpact": "Affects build vs buy decisions and premium service selection for faster deployment",
            "options": [
              {"id": "first_mover", "label": "First-mover advantage"},
              {"id": "industry_standard", "label": "Industry standard"},
              {"id": "catching_up", "label": "Catching up to competitors"}
            ]
          }
        ]
      },
      "exploration": {
        "section": "AI Exploration & Discovery",
        "description": "Questions for organizations exploring AI opportunities",
        "condition": "entry_point == 'exploration'",
        "questions": [
          {
            "id": "process_maturity",
            "type": "single_select",
            "question": "What is your business process maturity level?",
            "required": true,
            "costImpact": "Determines process analysis costs and automation-readiness affecting implementation complexity",
            "options": [
              {"id": "ad_hoc", "label": "Ad-hoc processes"},
              {"id": "documented", "label": "Documented processes"},
              {"id": "optimized", "label": "Optimized processes"},
              {"id": "automated", "label": "Fully automated processes"}
            ]
          },
          {
            "id": "digital_transformation",
            "type": "single_select",
            "question": "What is your digital transformation stage?",
            "required": true,
            "costImpact": "Influences infrastructure foundation costs and integration complexity",
            "options": [
              {"id": "planning", "label": "Planning phase"},
              {"id": "in_progress", "label": "In progress"},
              {"id": "advanced", "label": "Advanced implementation"},
              {"id": "complete", "label": "Transformation complete"}
            ]
          },
          {
            "id": "learning_objectives",
            "type": "single_select",
            "question": "What are your primary learning objectives?",
            "required": true,
            "costImpact": "Affects infrastructure commitment level and influences cost vs learning optimization",
            "options": [
              {"id": "proof_concept", "label": "Proof of concept"},
              {"id": "pilot_program", "label": "Pilot program"},
              {"id": "strategic_initiative", "label": "Strategic initiative"}
            ]
          },
          {
            "id": "internal_expertise",
            "type": "single_select",
            "question": "What is your internal AI/technical expertise level?",
            "required": true,
            "costImpact": "Determines training costs, managed service premiums, and operational support requirements",
            "options": [
              {"id": "none", "label": "No internal expertise"},
              {"id": "basic", "label": "Basic understanding"},
              {"id": "intermediate", "label": "Intermediate technical skills"},
              {"id": "advanced", "label": "Advanced AI/ML expertise"}
            ]
          }
        ]
      }
    },
    "dynamicQuestions": {
      "aiApplicationCategory": {
        "id": "ai_category",
        "type": "single_select",
        "question": "What AI application category best describes your use case?",
        "required": true,
        "description": "Primary AI application type",
        "options": [
          {"id": "conversational", "label": "Conversational AI (Chatbots, Virtual Assistants)"},
          {"id": "content_generation", "label": "Content Generation (Marketing, Documentation)"},
          {"id": "data_analysis", "label": "Data Analysis & Insights (Analytics, Predictions)"},
          {"id": "process_automation", "label": "Process Automation (Document processing, Workflows)"},
          {"id": "decision_support", "label": "Decision Support (Recommendations, Risk assessment)"},
          {"id": "monitoring_detection", "label": "Monitoring & Detection (Fraud, Anomaly detection)"}
        ]
      },
      "categorySpecificQuestions": {
        "conversational": {
          "section": "Conversational AI Requirements",
          "condition": "ai_category == 'conversational'",
          "questions": [
            {
              "id": "expected_users",
              "type": "single_select",
              "question": "What is your expected daily user volume?",
              "required": true,
              "costImpact": "Determines compute architecture and API call costs",
              "options": [
                {"id": "under_100", "label": "Less than 100"},
                {"id": "100_1k", "label": "100 - 1,000"},
                {"id": "1k_10k", "label": "1,000 - 10,000"},
                {"id": "10k_100k", "label": "10,000 - 100,000"},
                {"id": "over_100k", "label": "Greater than 100,000"}
              ]
            },
            {
              "id": "conversation_complexity",
              "type": "single_select",
              "question": "What level of conversation complexity do you need?",
              "required": true,
              "costImpact": "Affects model selection and token consumption costs",
              "options": [
                {"id": "simple_qa", "label": "Simple Q&A responses"},
                {"id": "multi_turn", "label": "Multi-turn conversations"},
                {"id": "complex_reasoning", "label": "Complex reasoning and problem-solving"}
              ]
            },
            {
              "id": "response_time",
              "type": "single_select",
              "question": "What are your response time requirements?",
              "required": true,
              "costImpact": "Determines infrastructure tier and caching requirements",
              "options": [
                {"id": "real_time", "label": "Real-time (<2 seconds)"},
                {"id": "near_real_time", "label": "Near real-time (<10 seconds)"},
                {"id": "batch_acceptable", "label": "Batch processing acceptable"}
              ]
            },
            {
              "id": "availability",
              "type": "single_select",
              "question": "What availability requirements do you have?",
              "required": true,
              "costImpact": "Affects redundancy and infrastructure costs",
              "options": [
                {"id": "business_hours", "label": "Business hours only"},
                {"id": "24_7", "label": "24/7 standard availability"},
                {"id": "high_availability", "label": "High availability (99.9%+)"}
              ]
            },
            {
              "id": "knowledge_base_size",
              "type": "single_select",
              "question": "What is the size of your knowledge base?",
              "required": true,
              "costImpact": "Affects vector database and storage costs",
              "options": [
                {"id": "small", "label": "Less than 100 documents"},
                {"id": "medium", "label": "100 - 1,000 documents"},
                {"id": "large", "label": "1,000 - 10,000 documents"},
                {"id": "very_large", "label": "10,000 - 100,000 documents"},
                {"id": "massive", "label": "Greater than 100,000 documents"}
              ]
            },
            {
              "id": "language_support",
              "type": "single_select",
              "question": "What language support do you need?",
              "required": true,
              "costImpact": "Affects model selection and processing costs",
              "options": [
                {"id": "single", "label": "Single language"},
                {"id": "multi", "label": "Multiple languages"},
                {"id": "translation", "label": "Real-time translation required"}
              ]
            }
          ]
        },
        "content_generation": {
          "section": "Content Generation Requirements", 
          "condition": "ai_category == 'content_generation'",
          "questions": [
            {
              "id": "content_types",
              "type": "multi_select",
              "question": "What types of content do you need to generate?",
              "required": true,
              "costImpact": "Determines model requirements and processing costs",
              "options": [
                {"id": "text", "label": "Text content"},
                {"id": "images", "label": "Images"},
                {"id": "video", "label": "Video content"},
                {"id": "code", "label": "Code generation"},
                {"id": "mixed_media", "label": "Mixed media"}
              ]
            },
            {
              "id": "content_volume",
              "type": "single_select",
              "question": "What is your expected daily content volume?",
              "required": true,
              "costImpact": "Affects compute requirements and API costs",
              "options": [
                {"id": "low", "label": "Less than 10 pieces"},
                {"id": "moderate", "label": "10 - 100 pieces"},
                {"id": "high", "label": "100 - 1,000 pieces"},
                {"id": "very_high", "label": "Greater than 1,000 pieces"}
              ]
            },
            {
              "id": "quality_standards",
              "type": "single_select",
              "question": "What quality standards do you require?",
              "required": true,
              "costImpact": "Affects model tier selection and review workflow costs",
              "options": [
                {"id": "draft", "label": "Draft quality (minimal review)"},
                {"id": "review_required", "label": "Review required before use"},
                {"id": "publication_ready", "label": "Publication-ready quality"}
              ]
            },
            {
              "id": "brand_consistency",
              "type": "single_select",
              "question": "What level of brand consistency is required?",
              "required": true,
              "costImpact": "Affects fine-tuning and customization costs",
              "options": [
                {"id": "generic", "label": "Generic content acceptable"},
                {"id": "brand_aware", "label": "Brand-aware content"},
                {"id": "strict_guidelines", "label": "Strict brand guidelines compliance"}
              ]
            }
          ]
        },
        "data_analysis": {
          "section": "Data Analysis & Insights Requirements",
          "condition": "ai_category == 'data_analysis'",
          "questions": [
            {
              "id": "data_volume",
              "type": "single_select",
              "question": "What is your data volume?",
              "required": true,
              "costImpact": "Determines storage and compute requirements",
              "options": [
                {"id": "small", "label": "Less than 1 GB"},
                {"id": "medium", "label": "1 GB - 100 GB"},
                {"id": "large", "label": "100 GB - 1 TB"},
                {"id": "very_large", "label": "1 TB - 1 PB"},
                {"id": "massive", "label": "Greater than 1 PB"}
              ]
            },
            {
              "id": "data_types",
              "type": "multi_select",
              "question": "What types of data do you work with?",
              "required": true,
              "costImpact": "Affects processing complexity and storage costs",
              "options": [
                {"id": "structured", "label": "Structured data"},
                {"id": "unstructured", "label": "Unstructured data"},
                {"id": "time_series", "label": "Time-series data"},
                {"id": "streaming", "label": "Real-time streaming data"},
                {"id": "mixed", "label": "Mixed data types"}
              ]
            },
            {
              "id": "analysis_frequency",
              "type": "single_select",
              "question": "What is your analysis frequency?",
              "required": true,
              "costImpact": "Affects compute scheduling and infrastructure costs",
              "options": [
                {"id": "ad_hoc", "label": "Ad-hoc analysis"},
                {"id": "scheduled", "label": "Scheduled reports"},
                {"id": "real_time", "label": "Real-time analysis"}
              ]
            },
            {
              "id": "query_response_time",
              "type": "single_select", 
              "question": "What are your query response time requirements?",
              "required": true,
              "costImpact": "Determines compute tier and caching strategy costs",
              "options": [
                {"id": "sub_second", "label": "Less than 1 second"},
                {"id": "seconds", "label": "1-10 seconds"},
                {"id": "minutes", "label": "10 seconds - 1 minute"},
                {"id": "longer", "label": "Greater than 1 minute acceptable"}
              ]
            },
            {
              "id": "concurrent_users",
              "type": "single_select",
              "question": "How many concurrent users do you expect?",
              "required": true,
              "costImpact": "Affects compute resources and scaling costs",
              "options": [
                {"id": "few", "label": "Less than 10"},
                {"id": "moderate", "label": "10-100"},
                {"id": "many", "label": "100-1,000"},
                {"id": "massive", "label": "Greater than 1,000"}
              ]
            },
            {
              "id": "historical_data",
              "type": "single_select",
              "question": "How much historical data needs to be accessible?",
              "required": true,
              "costImpact": "Affects storage costs and data archiving strategy",
              "options": [
                {"id": "none", "label": "Current data only"},
                {"id": "short_term", "label": "Less than 1 year"},
                {"id": "medium_term", "label": "1-5 years"},
                {"id": "long_term", "label": "Greater than 5 years"}
              ]
            }
          ]
        },
        "process_automation": {
          "section": "Process Automation Requirements",
          "condition": "ai_category == 'process_automation'",
          "questions": [
            {
              "id": "document_types",
              "type": "multi_select",
              "question": "What types of documents do you need to process?",
              "required": true,
              "costImpact": "Determines OCR and NLP processing costs",
              "options": [
                {"id": "pdfs", "label": "PDF documents"},
                {"id": "images", "label": "Scanned images"},
                {"id": "forms", "label": "Forms and applications"},
                {"id": "invoices", "label": "Invoices and receipts"},
                {"id": "contracts", "label": "Contracts and legal documents"},
                {"id": "emails", "label": "Email processing"}
              ]
            },
            {
              "id": "processing_volume",
              "type": "single_select",
              "question": "What is your daily document processing volume?",
              "required": true,
              "costImpact": "Determines compute requirements and throughput costs",
              "options": [
                {"id": "low", "label": "Less than 100 documents"},
                {"id": "moderate", "label": "100 - 1,000 documents"},
                {"id": "high", "label": "1,000 - 10,000 documents"},
                {"id": "very_high", "label": "Greater than 10,000 documents"}
              ]
            },
            {
              "id": "accuracy_requirements",
              "type": "single_select",
              "question": "What accuracy level is required?",
              "required": true,
              "costImpact": "Affects model complexity and validation workflow costs",
              "options": [
                {"id": "standard", "label": "Standard accuracy (90-95%)"},
                {"id": "high", "label": "High accuracy (95-99%)"},
                {"id": "critical", "label": "Critical accuracy (>99%)"}
              ]
            },
            {
              "id": "human_review",
              "type": "single_select",
              "question": "What level of human review is required?",
              "required": true,
              "costImpact": "Affects workflow complexity and review system costs",
              "options": [
                {"id": "none", "label": "Fully automated"},
                {"id": "exception", "label": "Exception-based review"},
                {"id": "all", "label": "Review all processed documents"}
              ]
            }
          ]
        },
        "decision_support": {
          "section": "Decision Support Requirements",
          "condition": "ai_category == 'decision_support'",
          "questions": [
            {
              "id": "decision_frequency",
              "type": "single_select",
              "question": "How frequently are decisions made?",
              "required": true,
              "costImpact": "Affects real-time compute requirements and model hosting costs",
              "options": [
                {"id": "batch", "label": "Batch processing (daily/weekly)"},
                {"id": "frequent", "label": "Frequent (multiple times per day)"},
                {"id": "real_time", "label": "Real-time decisions"}
              ]
            },
            {
              "id": "decision_complexity",
              "type": "single_select",
              "question": "What is the complexity of decisions?",
              "required": true,
              "costImpact": "Determines model sophistication and compute intensity",
              "options": [
                {"id": "simple", "label": "Simple rules-based decisions"},
                {"id": "moderate", "label": "Multi-factor analysis"},
                {"id": "complex", "label": "Complex multi-variable optimization"}
              ]
            },
            {
              "id": "risk_tolerance",
              "type": "single_select",
              "question": "What is the risk tolerance for automated decisions?",
              "required": true,
              "costImpact": "Affects model validation and confidence threshold requirements",
              "options": [
                {"id": "low_risk", "label": "Low risk (high automation acceptable)"},
                {"id": "moderate_risk", "label": "Moderate risk (human oversight)"},
                {"id": "high_risk", "label": "High risk (human approval required)"}
              ]
            }
          ]
        },
        "monitoring_detection": {
          "section": "Monitoring & Detection Requirements",
          "condition": "ai_category == 'monitoring_detection'",
          "questions": [
            {
              "id": "monitoring_scope",
              "type": "single_select",
              "question": "What is the scope of monitoring?",
              "required": true,
              "costImpact": "Determines data ingestion and processing scale",
              "options": [
                {"id": "limited", "label": "Limited dataset/system"},
                {"id": "department", "label": "Department-wide monitoring"},
                {"id": "enterprise", "label": "Enterprise-wide monitoring"}
              ]
            },
            {
              "id": "detection_speed",
              "type": "single_select",
              "question": "How quickly do you need to detect anomalies?",
              "required": true,
              "costImpact": "Affects real-time processing and alerting infrastructure costs",
              "options": [
                {"id": "real_time", "label": "Real-time detection (<1 minute)"},
                {"id": "near_real_time", "label": "Near real-time (1-15 minutes)"},
                {"id": "batch", "label": "Batch processing (hourly/daily)"}
              ]
            },
            {
              "id": "false_positive_tolerance",
              "type": "single_select",
              "question": "What is your tolerance for false positives?",
              "required": true,
              "costImpact": "Affects model tuning and validation complexity",
              "options": [
                {"id": "high", "label": "High tolerance (favor detection)"},
                {"id": "balanced", "label": "Balanced approach"},
                {"id": "low", "label": "Low tolerance (minimize false alarms)"}
              ]
            }
          ]
        }
      },
      "commonDataCharacteristics": {
        "section": "Data Characteristics",
        "description": "Data-related requirements across all AI categories",
        "questions": [
          {
            "id": "data_sensitivity",
            "type": "single_select",
            "question": "What is the sensitivity level of your data?",
            "required": true,
            "costImpact": "Determines security tier and deployment model costs",
            "options": [
              {"id": "public", "label": "Public information"},
              {"id": "internal", "label": "Internal use only"},
              {"id": "confidential", "label": "Confidential business data"},
              {"id": "highly_sensitive", "label": "Highly sensitive/regulated data"}
            ]
          },
          {
            "id": "data_update_frequency",
            "type": "single_select",
            "question": "How frequently does your data need to be updated?",
            "required": true,
            "costImpact": "Affects data pipeline and storage costs",
            "options": [
              {"id": "static", "label": "Static (rarely changes)"},
              {"id": "weekly", "label": "Weekly updates"},
              {"id": "daily", "label": "Daily updates"},
              {"id": "real_time", "label": "Real-time updates required"}
            ]
          },
          {
            "id": "data_sources",
            "type": "multi_select",
            "question": "What are your primary data sources?",
            "required": true,
            "costImpact": "Affects integration complexity and data pipeline costs",
            "options": [
              {"id": "internal_docs", "label": "Internal documents"},
              {"id": "databases", "label": "Databases"},
              {"id": "apis", "label": "Third-party APIs"},
              {"id": "files", "label": "File systems"},
              {"id": "web_data", "label": "Web/public data"},
              {"id": "streaming", "label": "Real-time streams"}
            ]
          }
        ]
      },
      "performanceIntegration": {
        "section": "Performance & Integration Requirements",
        "description": "Performance and integration requirements",
        "questions": [
          {
            "id": "integration_needs",
            "type": "multi_select",
            "question": "What integration capabilities do you need?",
            "required": true,
            "costImpact": "Affects middleware and API development costs",
            "options": [
              {"id": "standalone", "label": "Standalone solution"},
              {"id": "api_integration", "label": "API integration with existing systems"},
              {"id": "database_integration", "label": "Database integration"},
              {"id": "sso", "label": "Single Sign-On (SSO)"},
              {"id": "webhook", "label": "Webhook notifications"},
              {"id": "complex_integration", "label": "Complex multi-system integration"}
            ]
          },
          {
            "id": "personalization_level",
            "type": "single_select",
            "question": "What level of personalization do you need?",
            "required": true,
            "costImpact": "Affects user management and customization costs",
            "options": [
              {"id": "generic", "label": "Generic responses for all users"},
              {"id": "user_aware", "label": "User-aware responses"},
              {"id": "fully_personalized", "label": "Fully personalized experiences"}
            ]
          },
          {
            "id": "scalability_requirements",
            "type": "single_select",
            "question": "What are your scalability requirements?",
            "required": true,
            "costImpact": "Affects infrastructure design and auto-scaling costs",
            "options": [
              {"id": "fixed", "label": "Fixed capacity"},
              {"id": "moderate_scaling", "label": "Moderate scaling (2-5x growth)"},
              {"id": "high_scaling", "label": "High scaling (5-10x growth)"},
              {"id": "unlimited", "label": "Unlimited scaling capability"}
            ]
          }
        ]
      }
    },
    "additionalConsiderations": {
      "section": "Additional Considerations",
      "description": "Deployment and operational preferences",
      "questions": [
        {
          "id": "deployment_model",
          "type": "single_select",
          "question": "What is your preferred deployment model?",
          "required": true,
          "costImpact": "Determines infrastructure costs and operational overhead",
          "options": [
            {"id": "saas", "label": "Cloud-based SaaS solution"},
            {"id": "managed_cloud", "label": "Managed cloud deployment"},
            {"id": "self_hosted_cloud", "label": "Self-hosted cloud infrastructure"},
            {"id": "on_premise", "label": "On-premise deployment"}
          ]
        },
        {
          "id": "support_level",
          "type": "single_select",
          "question": "What level of support do you require?",
          "required": true,
          "costImpact": "Affects operational costs and support premiums",
          "options": [
            {"id": "community", "label": "Community/self-service support"},
            {"id": "standard", "label": "Standard business support"},
            {"id": "premium", "label": "Premium enterprise support"},
            {"id": "dedicated", "label": "Dedicated support team"}
          ]
        },
        {
          "id": "vendor_restrictions",
          "type": "single_select",
          "question": "Do you have any vendor restrictions or preferences?",
          "required": true,
          "costImpact": "May limit options and affect pricing negotiations",
          "options": [
            {"id": "no_restrictions", "label": "No restrictions"},
            {"id": "approved_list", "label": "Approved vendor list only"},
            {"id": "specific_preferences", "label": "Specific vendor preferences"},
            {"id": "avoid_vendors", "label": "Must avoid certain vendors"}
          ]
        },
        {
          "id": "scaling_approach",
          "type": "single_select",
          "question": "What is your approach to scaling?",
          "required": true,
          "costImpact": "Affects initial infrastructure investment and growth costs",
          "options": [
            {"id": "gradual", "label": "Start small and scale gradually"},
            {"id": "moderate", "label": "Plan for moderate growth"},
            {"id": "rapid", "label": "Anticipate rapid scaling needs"},
            {"id": "enterprise_wide", "label": "Enterprise-wide deployment from start"}
          ]
        }
      ]
    },
    "costCalculationRules": {
      "description": "Rules engine for mapping inputs to infrastructure components and costs",
      "dataSensitivityRules": [
        {
          "condition": "data_sensitivity == 'public' AND regulatory_framework.includes('none')",
          "infrastructure": {
            "deployment": "Third-party API services (OpenAI, Anthropic, Google)",
            "storage": "Public cloud managed services"
          }
        },
        {
          "condition": "data_sensitivity == 'internal' OR regulatory_framework.length > 0",
          "infrastructure": {
            "deployment": "Private deployment OR approved vendor list",
            "storage": "Private cloud OR vendor with compliance certifications"
          }
        },
        {
          "condition": "data_sensitivity == 'confidential' OR regulatory_framework.includes('hipaa') OR regulatory_framework.includes('sox')",
          "infrastructure": {
            "deployment": "Self-hosted OR dedicated tenancy",
            "storage": "Encrypted at rest + in transit, private network",
            "encryption": "Customer-managed keys"
          }
        },
        {
          "condition": "data_sensitivity == 'highly_sensitive' OR security_clearance == 'restricted'",
          "infrastructure": {
            "deployment": "On-premise OR private cloud",
            "storage": "Air-gapped networks, multi-layer encryption", 
            "audit": "Full audit logging and compliance monitoring"
          }
        }
      ],
      "usageVolumeRules": [
        {
          "condition": "expected_users < 100 AND response_time != 'real_time'",
          "compute": {
            "architecture": "Serverless/API-based models",
            "cost_model": "Pay-per-request"
          }
        },
        {
          "condition": "expected_users > 1000 OR response_time == 'real_time'",
          "compute": {
            "architecture": "Dedicated model hosting",
            "cost_model": "Reserved capacity + overflow pay-per-use"
          }
        },
        {
          "condition": "expected_users > 10000 AND availability == 'high_availability'",
          "compute": {
            "architecture": "Multi-region deployment",
            "redundancy": "Load balancing, auto-scaling, failover"
          }
        }
      ],
      "dataVolumeRules": [
        {
          "condition": "knowledge_base_size == 'small'",
          "storage": {
            "architecture": "Vector DB (managed service)",
            "backup": "Standard backup policies"
          }
        },
        {
          "condition": "knowledge_base_size IN ['large', 'very_large'] OR data_volume IN ['large', 'very_large']",
          "storage": {
            "architecture": "Hybrid (Vector DB + Object storage + Caching)",
            "optimization": "Data tiering, compression"
          }
        },
        {
          "condition": "data_volume == 'massive' OR data_update_frequency == 'real_time'",
          "storage": {
            "architecture": "Data lake + Vector DB + Stream processing",
            "pipeline": "Real-time ingestion, ETL automation"
          }
        }
      ]
    }
  }
}