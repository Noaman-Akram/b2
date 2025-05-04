import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import { Customer } from '../../types';
import { CustomerService } from '../../services/CustomerService';

const CustomersList: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const service = new CustomerService();
    service.getAll()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);
  
  const columns = [
    {
      header: 'Name',
      accessor: (customer: Customer) => (
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full text-gray-600 mr-3">
            <User size={18} />
          </div>
          <div>
            <div className="font-medium text-gray-900">{customer.name}</div>
            <div className="text-gray-500 text-xs">{customer.company}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: (customer: Customer) => (
        <div>
          <div className="text-gray-900">{customer.phone_number}</div>
          <div className="text-gray-500 text-xs truncate max-w-xs">{customer.address}</div>
        </div>
      ),
    },
    {
      header: 'Paid',
      accessor: (customer: Customer) => (
        <div className="font-medium text-gray-900">
          ${customer.paid_total.toLocaleString()}
        </div>
      ),
    },
    {
      header: 'Outstanding',
      accessor: (customer: Customer) => (
        <div className={`font-medium ${customer.to_be_paid > 0 ? 'text-red-600' : 'text-gray-500'}`}>
          ${customer.to_be_paid.toLocaleString()}
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: (customer: Customer) => new Date(customer.created_at).toLocaleDateString(),
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your customer database</p>
        </div>
        <Button 
          onClick={() => navigate('/customers/new')}
          className="flex items-center space-x-2"
        >
          <PlusCircle size={16} />
          <span>Add Customer</span>
        </Button>
      </div>
      
      <Card>
        <DataTable
          data={customers}
          columns={columns}
          keyExtractor={(customer) => customer.id}
          onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
        />
      </Card>
    </div>
  );
};

export default CustomersList;