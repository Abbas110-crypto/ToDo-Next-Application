let items = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(items);
      break;
    case 'POST':
      const newItem = req.body;
      items.push(newItem);
      res.status(201).json(newItem);
      break;
    case 'PUT':
      const { id, updatedItem } = req.body;
      items = items.map(item => (item.id === id ? updatedItem : item));
      res.status(200).json(updatedItem);
      break;
    case 'DELETE':
      const { itemId } = req.query;
      items = items.filter(item => item.id !== parseInt(itemId));
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
