import React from 'react';
import { LayoutDashboard, Users, ClipboardList, DollarSign } from 'lucide-react';
import Card from '../components/ui/Card';
import StatsCard from '../components/ui/StatsCard';
import { customers, orders } from '../lib/data';

const Dashboard: React.FC = () => {
  // Calculate some statistics
  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.order_status === 'pending').length;
  const inProgressOrders = orders.filter(order => order.order_status === 'in_progress').length;
  const completedOrders = orders.filter(order => order.order_status === 'completed').length;
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.order_price, 0);
  const totalProfit = orders.reduce((sum, order) => sum + (order.order_price - order.order_cost), 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your business</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Customers" 
          value={totalCustomers}
          icon={<Users size={24} />}
          change={{ value: 12, positive: true }}
        />
        <StatsCard 
          title="Total Orders" 
          value={totalOrders}
          icon={<ClipboardList size={24} />}
          change={{ value: 8, positive: true }}
        />
        <StatsCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          change={{ value: 5, positive: true }}
        />
        <StatsCard 
          title="Total Profit" 
          value={`$${totalProfit.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          change={{ value: 3, positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Order Status">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="mt-2 text-2xl font-semibold text-yellow-600">{pendingOrders}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="mt-2 text-2xl font-semibold text-blue-600">{inProgressOrders}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="mt-2 text-2xl font-semibold text-green-600">{completedOrders}</p>
            </div>
          </div>
        </Card>
        
        <Card title="Recent Activity">
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <ClipboardList size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New order #{order.code}</p>
                  <p className="text-sm text-gray-500">From {order.customer_name}</p>
                  <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;