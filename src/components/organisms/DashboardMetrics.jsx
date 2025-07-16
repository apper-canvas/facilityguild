import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import MetricCard from "@/components/molecules/MetricCard";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { workOrderService } from "@/services/api/workOrderService";
import { assetService } from "@/services/api/assetService";
import { spaceService } from "@/services/api/spaceService";

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    openWorkOrders: 0,
    assetsNeedingMaintenance: 0,
    spaceUtilization: 0,
    completedThisWeek: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({
    workOrderTrend: [],
    spaceUtilization: []
  });

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [workOrders, assets, spaces] = await Promise.all([
        workOrderService.getAll(),
        assetService.getAll(),
        spaceService.getAll()
      ]);

      // Calculate metrics
      const openWorkOrders = workOrders.filter(wo => wo.status !== "Completed").length;
      const assetsNeedingMaintenance = assets.filter(asset => {
        const nextMaintenance = new Date(asset.nextMaintenance);
        const now = new Date();
        return nextMaintenance <= now;
      }).length;

      const totalCapacity = spaces.reduce((sum, space) => sum + space.capacity, 0);
      const totalOccupancy = spaces.reduce((sum, space) => sum + space.currentOccupancy, 0);
      const spaceUtilization = Math.round((totalOccupancy / totalCapacity) * 100);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const completedThisWeek = workOrders.filter(wo => 
        wo.status === "Completed" && new Date(wo.createdDate) >= oneWeekAgo
      ).length;

      setMetrics({
        openWorkOrders,
        assetsNeedingMaintenance,
        spaceUtilization,
        completedThisWeek
      });

      // Prepare chart data
      const workOrdersByStatus = workOrders.reduce((acc, wo) => {
        acc[wo.status] = (acc[wo.status] || 0) + 1;
        return acc;
      }, {});

      const spaceUtilizationData = spaces.map(space => ({
        name: space.name,
        utilization: Math.round((space.currentOccupancy / space.capacity) * 100)
      }));

      setChartData({
        workOrderTrend: Object.entries(workOrdersByStatus).map(([status, count]) => ({
          status,
          count
        })),
        spaceUtilization: spaceUtilizationData
      });
    } catch (err) {
      setError("Failed to load dashboard metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMetrics} />;
  }

  const workOrderChartOptions = {
    chart: {
      type: "donut",
      height: 300,
      toolbar: { show: false }
    },
    labels: chartData.workOrderTrend.map(item => item.status),
    colors: ["#3B82F6", "#F59E0B", "#10B981", "#64748B"],
    legend: {
      position: "bottom"
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%"
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }]
  };

  const spaceChartOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false }
    },
    xaxis: {
      categories: chartData.spaceUtilization.map(item => item.name)
    },
    yaxis: {
      title: {
        text: "Utilization %"
      }
    },
    colors: ["#2563EB"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Open Work Orders"
          value={metrics.openWorkOrders}
          change={5}
          icon="ClipboardList"
          color="primary"
        />
        <MetricCard
          title="Assets Need Maintenance"
          value={metrics.assetsNeedingMaintenance}
          change={-12}
          icon="AlertTriangle"
          color="amber"
        />
        <MetricCard
          title="Space Utilization"
          value={`${metrics.spaceUtilization}%`}
          change={8}
          icon="Map"
          color="green"
        />
        <MetricCard
          title="Completed This Week"
          value={metrics.completedThisWeek}
          change={15}
          icon="CheckCircle"
          color="green"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Work Order Status
            </h3>
            <Chart
              options={workOrderChartOptions}
              series={chartData.workOrderTrend.map(item => item.count)}
              type="donut"
              height={300}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Space Utilization
            </h3>
            <Chart
              options={spaceChartOptions}
              series={[{
                name: "Utilization",
                data: chartData.spaceUtilization.map(item => item.utilization)
              }]}
              type="bar"
              height={300}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardMetrics;