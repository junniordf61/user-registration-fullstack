import { useEffect, useState, useRef } from "react";
import "./style.css";
import "./index.jsx";
import Trash from "../../../assets/trash.svg";
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])


const inputName = useRef()
const inputAge = useRef()
const inputMail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  };

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      mail: inputMail.current.value
  })};
    
    getUsers()

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
  };

  useEffect(() => {
   getUsers()
  }, [])

  return (
    <div className="conteiner">
      <form>
        <h1>User registration</h1>
        <input placeholder='Name' name="Name" type="text" ref={inputName} />
        <input placeholder=' Age' name=" Age" type="number" ref={inputAge}/>
        <input placeholder=' Mail' name="Mail" type="email" ref={inputMail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Mail: {user.mail}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Lixeira" className="trash-icon" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;