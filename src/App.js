import React, { useState, useEffect, useMemo } from 'react';
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));

    const prevSearch = localStorage.getItem('prevSearchTerm');
    if (prevSearch) {
      setPrevSearchTerm(prevSearch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('prevSearchTerm', prevSearchTerm);
  }, [prevSearchTerm]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.trim() !== '') {
      setPrevSearchTerm(value);
    }
  };

  const handleSortByNameAsc = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const handleSortByNameDec = () => {
    const sortedUsers = [...users].sort((a,b) => b.name.localeCompare(a.name));
    setUsers(sortedUsers);
  }

  const handleViewUserInfo = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='wrapper'>
      <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <button onClick={handleSortByNameAsc}>Sort by Name Asc</button>
          <button onClick={handleSortByNameDec}> Sort by Name Dec</button>
        </div>
      </nav>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <button onClick={() => handleViewUserInfo(user)}>
                    {user.name}
                  </button>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedUser && (
          <div>
            <h3>Selected User Info:</h3>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{selectedUser.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{selectedUser.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{selectedUser.phone}</td>
                </tr>
                <tr>
                  <td>Website:</td>
                  <td>{selectedUser.website}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className='prev'>
          <h3>Previous Search Term:</h3>
          <p>{prevSearchTerm}</p>
        </div>
    </div>
  );
};

export default App;


