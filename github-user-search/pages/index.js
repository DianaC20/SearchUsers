import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Home({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Por favor, ingresa un término de búsqueda.');
      setUsers([]);
      return;
    }

    setError(''); 
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();
      
      if (data.items) {
        setUsers(data.items);
      } else {
        setUsers([]);
        setError('No se encontraron resultados.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Hubo un error al realizar la búsqueda.');
      setUsers([]); 
    }
  };

  const handleUserClick = (username) => {
    console.log('Usuario seleccionado:', username);
    window.location.href = `http://localhost:4200/user-detail/${username}` ;
  };

  return (
    <div className="container-fluid">

    <form onSubmit={handleSearch}>
      <div className='row'>
        <div className='col-lg-8 my-5 ps-3'>
           <h2 className="text-uppercase">User Search</h2>
        </div>
        <div className="col-lg-4 text-center my-5 mx-auto">
          <div className='input-group mb-3 px-3'>
            <input type="text" className="form-control" id="staticEmail2" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" className="btn btn-outline-info">Search</button>
          </div>
        </div>
      </div>
      <div>
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
        {users.map((user) => (
          
          <div className='col text-center '  key={user.id}>
            <div className=" rounded shadow bg-light h-100 border p-3">
              <img src={user.avatar_url} alt={user.login}  width="150" class="rounded-circle"/>
                <div className="">
                  <h5 className=" ">{user.login}</h5>
                <button onClick={() => handleUserClick(user.login)} className='btn btn-outline-secondary'>Ver más</button>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  );

}
export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/search/users?q=YOUR_NAME');
  const data = await res.json();
  return {
    props: {
      initialUsers: data.items || [], 
    },
  };
}
