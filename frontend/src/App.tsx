import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch('http://localhost:3001/stream');
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let buffer = '';

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Son incomplete satırı sakla

        for (const line of lines) {
          if (line.trim()) {
            const json = JSON.parse(line);
            setUsers(prev => [...prev, json]);
          }
        }
      }
    };

    fetchStream();
  }, []);

  return (
    <div>
      <h1>Kullanıcılar (Stream ile geliyor)</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="typewriter">
            {user.id} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

