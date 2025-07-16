import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState("last-30-days");

  const reportTypes = [
    { value: "work-order-summary", label: "Work Order Summary" },
    { value: "asset-maintenance", label: "Asset Maintenance Report" },
    { value: "space-utilization", label: "Space Utilization Report" },
    { value: "cost-analysis", label: "Cost Analysis Report" }
  ];

  const dateRanges = [
    { value: "last-7-days", label: "Last 7 Days" },
    { value: "last-30-days", label: "Last 30 Days" },
    { value: "last-90-days", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" }
  ];

  const handleGenerateReport = () => {
    console.log("Generate report:", selectedReport, dateRange);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports</h1>
        <p className="text-slate-600">
          Generate comprehensive reports for your facility operations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Report Configuration
            </h3>
            
            <div className="space-y-4">
              <Select
                label="Report Type"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="">Select a report type</option>
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>

              <Select
                label="Date Range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </Select>

              <Button
                onClick={handleGenerateReport}
                disabled={!selectedReport}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="h-4 w-4" />
                <span>Generate Report</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Report Preview
            </h3>
            
            {selectedReport ? (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">
                    {reportTypes.find(t => t.value === selectedReport)?.label}
                  </h4>
                  <p className="text-sm text-slate-600">
                    This report will include data from {dateRanges.find(r => r.value === dateRange)?.label.toLowerCase()}.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon name="BarChart3" className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-slate-900">Charts & Graphs</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Visual representations of your data
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon name="Table" className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-slate-900">Data Tables</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Detailed tabular data and statistics
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon name="TrendingUp" className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-slate-900">Trends</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Performance trends and insights
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ApperIcon name="FileText" className="h-5 w-5 text-primary-600" />
                      <span className="font-medium text-slate-900">Summary</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Executive summary and recommendations
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ApperIcon name="FileText" className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">
                  Select a report type to see the preview
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Quick Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => (
            <motion.div
              key={report.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  setSelectedReport(report.value);
                  handleGenerateReport();
                }}
              >
                <ApperIcon name="Download" className="h-6 w-6" />
                <span className="text-sm font-medium">{report.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default Reports;