import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { ref, remove, get, child } from 'firebase/database';
import { database } from '../firebase-config';

interface InventoryItem {
  key: string;
  name: string;
  quantity: number;
  status: string;
}

const InventoryList: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryRef = ref(database, 'Inventory');
        const snapshot = await get(inventoryRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const inventoryItems: InventoryItem[] = Object.keys(data).map(key => ({
            key,
            ...data[key],
          }));
          setInventory(inventoryItems);
        } else {
          message.warning('No inventory items found');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        message.error('Failed to fetch inventory');
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (key: string) => {
    try {
      await remove(ref(database, `Inventory/${key}`));
      setInventory(prev => prev.filter(item => item.key !== key));
      message.success('Inventory item deleted successfully!');
    } catch (error) {
      console.error('Error deleting inventory:', error);
      message.error('Failed to delete inventory item');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: InventoryItem) => (
        <span>
          <Link to={`/edit/${record.key}`}>
            <Button type="primary" style={{ marginRight: 8 }}>
              Edit
            </Button>
          </Link>
          <Button type="primary" onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/add-inventory">
          <Button type="primary">Add Inventory</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={inventory} />
    </div>
  );
};

export default InventoryList;
