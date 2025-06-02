import Plot from 'react-plotly.js';
import { Calendar, Users, DollarSign, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ImplementationTimeline = ({ roadmapData }) => {
  const phases = roadmapData?.phases || [];
  
  // Gantt Chart Data
  const ganttData = phases.map((phase, index) => ({
    Task: phase.phaseName,
    Start: new Date(2024, index * 2, 1), // Starting every 2 months
    Finish: new Date(2024, index * 2 + 2, 0), // 2 months duration
    Resource: `Phase ${phase.phaseNumber}`
  }));

  const ganttChart = ganttData.map((item, index) => ({
    x: [item.Start, item.Finish],
    y: [item.Task, item.Task],
    mode: 'lines',
    line: {
      color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4],
      width: 20
    },
    name: item.Task,
    type: 'scatter'
  }));

  // Budget Distribution Pie Chart
  const budgetData = {
    values: phases.map(phase => phase.resources?.budget || 0),
    labels: phases.map(phase => phase.phaseName),
    type: 'pie',
    hole: 0.4,
    marker: {
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    }
  };

  // Cost of Ownership Data
  const totalBudget = phases.reduce((sum, phase) => sum + (phase.resources?.budget || 0), 0);
  const costOfOwnershipData = [
    {
      name: 'Implementation',
      value: Math.round(totalBudget * 0.4),
      color: '#3B82F6'
    },
    {
      name: 'Training & Change Management',
      value: Math.round(totalBudget * 0.15),
      color: '#10B981'
    },
    {
      name: 'Infrastructure & Tools',
      value: Math.round(totalBudget * 0.25),
      color: '#F59E0B'
    },
    {
      name: 'Maintenance & Support',
      value: Math.round(totalBudget * 0.2),
      color: '#EF4444'
    }
  ];

  // Resource Allocation Chart
  const resourceData = [
    {
      x: phases.map(phase => phase.phaseName),
      y: phases.map(phase => phase.resources?.internalFTE || 0),
      name: 'Internal FTE',
      type: 'bar',
      marker: { color: '#3B82F6' }
    },
    {
      x: phases.map(phase => phase.phaseName),
      y: phases.map(phase => phase.resources?.externalConsultants || 0),
      name: 'External Consultants',
      type: 'bar',
      marker: { color: '#10B981' }
    }
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">
          Implementation Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-primary-900 dark:text-white">
              {roadmapData?.totalTimeline || 'TBD'}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-300">Total Timeline</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-primary-900 dark:text-white">
              ${roadmapData?.totalBudget?.toLocaleString() || 0}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-300">Total Budget</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-primary-900 dark:text-white">
              {phases.length}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-300">Implementation Phases</p>
          </div>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Cost of Ownership Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
            Total Cost of Ownership
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costOfOwnershipData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costOfOwnershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-primary-700 dark:text-primary-300">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
            Budget Distribution by Phase
          </h3>
          <Plot
            data={[budgetData]}
            layout={{
              width: 400,
              height: 300,
              margin: { t: 0, b: 0, l: 0, r: 0 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: '#6B7280' },
              showlegend: true,
              annotations: [
                {
                  text: 'Budget<br>Allocation',
                  x: 0.5,
                  y: 0.5,
                  font: { size: 14, color: '#6B7280' },
                  showarrow: false
                }
              ]
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="card">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
          Resource Allocation by Phase
        </h3>
        <Plot
          data={resourceData}
          layout={{
            width: 800,
            height: 300,
            barmode: 'group',
            xaxis: { title: 'Implementation Phases' },
            yaxis: { title: 'Number of Resources' },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: '#6B7280' },
            showlegend: true
          }}
          config={{ displayModeBar: false }}
        />
      </div>

      {/* Phase Details */}
      <div className="grid gap-6">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-white">
          Phase Details
        </h3>
        {phases.map((phase, index) => (
          <div key={index} className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                {phase.phaseNumber}
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-primary-900 dark:text-white">
                    {phase.phaseName}
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-300">
                    Duration: {phase.duration}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
                      Objectives
                    </h5>
                    <ul className="space-y-1">
                      {(phase.objectives || []).map((objective, objIndex) => (
                        <li key={objIndex} className="text-sm text-primary-600 dark:text-primary-300 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
                      Deliverables
                    </h5>
                    <ul className="space-y-1">
                      {(phase.deliverables || []).map((deliverable, delIndex) => (
                        <li key={delIndex} className="text-sm text-primary-600 dark:text-primary-300 flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-200 dark:border-primary-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {phase.resources?.internalFTE || 0}
                    </div>
                    <div className="text-xs text-primary-500 dark:text-primary-400">Internal FTE</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {phase.resources?.externalConsultants || 0}
                    </div>
                    <div className="text-xs text-primary-500 dark:text-primary-400">External Consultants</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      ${phase.resources?.budget?.toLocaleString() || 0}
                    </div>
                    <div className="text-xs text-primary-500 dark:text-primary-400">Budget</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationTimeline; 