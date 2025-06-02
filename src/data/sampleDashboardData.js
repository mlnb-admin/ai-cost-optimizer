export const sampleDashboardData = {
  executiveSummary: {
    recommendedSolution: {
      name: "Enterprise AI Assistant Platform",
      vendor: "OpenAI Enterprise",
      confidenceScore: 87,
      alignmentPercentage: 92,
      keyBenefits: [
        "Reduce customer support costs by 60%",
        "Improve response time from 24hrs to 2 minutes",
        "Increase customer satisfaction by 35%",
        "Scale support operations without proportional staffing"
      ],
      riskLevel: "Low",
      implementationTimeframe: "3-4 months"
    },
    costImpact: {
      monthlyTCO: {
        year1: 45000,
        year2: 52000,
        year3: 58000
      },
      roiProjection: {
        breakEvenMonths: 8,
        threeYearROI: 320,
        npv: 890000
      },
      costOptimizationOpportunities: [
        "Automate 80% of tier-1 support tickets",
        "Reduce manual data entry by 70%",
        "Optimize resource allocation through predictive analytics"
      ]
    },
    riskAssessment: {
      securityRisk: "Low",
      complianceRisk: "Medium",
      implementationRisk: "Low",
      vendorRisk: "Low",
      dataRisk: "Medium"
    },
    implementationComplexity: {
      overallComplexity: "Medium",
      integrationEffort: 12,
      skillsRequired: ["AI/ML expertise", "API integration", "Change management"],
      timelineEstimate: "3-4 months",
      dependenciesCount: 3
    }
  },
  vendorComparison: {
    alternatives: [
      {
        vendorId: "openai",
        vendorName: "OpenAI Enterprise",
        solution: "GPT-4 Enterprise Platform",
        overallScore: 87,
        ranking: 1,
        securityCompliance: {
          score: 92,
          certifications: ["SOC 2", "ISO 27001", "GDPR"],
          dataResidency: "US/EU available"
        },
        performanceMetrics: {
          score: 89,
          latency: "< 200ms",
          throughput: "1000 req/sec",
          availability: "99.9%"
        },
        costAnalysis: {
          monthlyCost: 15000,
          scalingCosts: 8000,
          totalCostRank: 2
        },
        integrationComplexity: {
          score: 85,
          apiCompatibility: 95,
          implementationEffort: "Medium"
        },
        vendorMaturity: {
          score: 94,
          marketPresence: 98,
          financialStability: "Excellent"
        }
      },
      {
        vendorId: "anthropic",
        vendorName: "Anthropic",
        solution: "Claude Enterprise",
        overallScore: 82,
        ranking: 2,
        securityCompliance: {
          score: 88,
          certifications: ["SOC 2", "ISO 27001"],
          dataResidency: "US only"
        },
        performanceMetrics: {
          score: 86,
          latency: "< 300ms",
          throughput: "800 req/sec",
          availability: "99.8%"
        },
        costAnalysis: {
          monthlyCost: 12000,
          scalingCosts: 6000,
          totalCostRank: 1
        },
        integrationComplexity: {
          score: 82,
          apiCompatibility: 90,
          implementationEffort: "Medium"
        },
        vendorMaturity: {
          score: 78,
          marketPresence: 75,
          financialStability: "Good"
        }
      },
      {
        vendorId: "google",
        vendorName: "Google Cloud AI",
        solution: "Vertex AI Platform",
        overallScore: 79,
        ranking: 3,
        securityCompliance: {
          score: 91,
          certifications: ["SOC 2", "ISO 27001", "FedRAMP"],
          dataResidency: "Global"
        },
        performanceMetrics: {
          score: 83,
          latency: "< 250ms",
          throughput: "1200 req/sec",
          availability: "99.95%"
        },
        costAnalysis: {
          monthlyCost: 18000,
          scalingCosts: 10000,
          totalCostRank: 3
        },
        integrationComplexity: {
          score: 79,
          apiCompatibility: 88,
          implementationEffort: "High"
        },
        vendorMaturity: {
          score: 89,
          marketPresence: 95,
          financialStability: "Excellent"
        }
      }
    ]
  },
  riskAnalysis: {
    riskCategories: [
      {
        category: "Security",
        risks: [
          {
            riskId: "SEC-001",
            description: "Data exposure during API calls",
            probability: "Low",
            impact: "High",
            riskScore: 25,
            mitigation: "Implement end-to-end encryption"
          }
        ]
      },
      {
        category: "Compliance",
        risks: [
          {
            riskId: "COMP-001",
            description: "GDPR compliance for EU customers",
            probability: "Medium",
            impact: "Medium",
            riskScore: 50,
            mitigation: "Data residency controls and privacy controls"
          }
        ]
      }
    ],
    riskMatrix: {
      totalRiskScore: 35,
      riskTolerance: "Moderate",
      acceptableRiskThreshold: 40
    }
  },
  costBenefitAnalysis: {
    costs: {
      implementation: {
        software: 50000,
        hardware: 15000,
        services: 75000,
        training: 25000,
        total: 165000
      },
      operational: {
        yearlyLicensing: 180000,
        infrastructure: 60000,
        support: 40000,
        maintenance: 20000,
        total: 300000
      }
    },
    benefits: {
      quantifiable: [
        {
          benefit: "Customer support cost reduction",
          yearlyValue: 400000,
          confidenceLevel: 85
        },
        {
          benefit: "Productivity improvements",
          yearlyValue: 200000,
          confidenceLevel: 75
        },
        {
          benefit: "Error reduction savings",
          yearlyValue: 100000,
          confidenceLevel: 90
        }
      ],
      qualitative: [
        "Improved customer satisfaction",
        "Better employee experience",
        "Enhanced brand reputation"
      ]
    },
    financialMetrics: {
      paybackPeriod: 8,
      irr: 45,
      npv: 890000,
      roi: 320
    }
  },
  implementationRoadmap: {
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Foundation & Setup",
        duration: "4-6 weeks",
        objectives: ["Environment setup", "Security configuration", "Basic integration"],
        deliverables: ["Development environment", "Security protocols", "API integration"],
        resources: {
          internalFTE: 2,
          externalConsultants: 1,
          budget: 45000
        }
      },
      {
        phaseNumber: 2,
        phaseName: "Core Implementation",
        duration: "6-8 weeks",
        objectives: ["AI model training", "Core features", "Testing"],
        deliverables: ["Trained models", "Core platform", "Test results"],
        resources: {
          internalFTE: 3,
          externalConsultants: 2,
          budget: 85000
        }
      },
      {
        phaseNumber: 3,
        phaseName: "Deployment & Optimization",
        duration: "2-4 weeks",
        objectives: ["Production deployment", "Performance optimization", "Training"],
        deliverables: ["Live system", "Performance metrics", "Training completion"],
        resources: {
          internalFTE: 2,
          externalConsultants: 1,
          budget: 35000
        }
      }
    ],
    totalTimeline: "12-18 weeks",
    totalBudget: 165000
  }
}; 