"use client";
import { useState, useEffect } from 'react';

export default function ToDo() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editItem, setEditItem] = useState(null);

  // Fetch items from API
  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Add a new item
  const addItem = async () => {
    if (!itemName) return;
    const newItem = { id: Date.now(), name: itemName };
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setItems([...items, newItem]);
    setItemName('');
  };

  // Edit an item
  const editItemName = async () => {
    if (!editItem) return;
    await fetch('/api/items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editItem.id, updatedItem: { ...editItem, name: itemName } }),
    });
    setItems(items.map(item => (item.id === editItem.id ? { ...item, name: itemName } : item)));
    setEditItem(null);
    setItemName('');
  };

  // Delete an item
  const deleteItem = async (id) => {
    await fetch(`/api/items?itemId=${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD Operations</h1>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item name"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      {editItem ? (
        <button onClick={editItemName} style={{ padding: '5px' }}>Save Changes</button>
      ) : (
        <button onClick={addItem} style={{ padding: '5px' }}>Add Item</button>
      )}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => { setEditItem(item); setItemName(item.name); }}>Edit</button>{' '}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
