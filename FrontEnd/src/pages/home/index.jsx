import { useEffect, useState,useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api.js'

function Home() {

  const [users,setUsers] =useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('users')

    setUsers(usersFromApi.data);
  }

  async function createUsers(){
    const usersFromApi = await api.post('users',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })

    getUsers()
  }

  async function deleteUser(id){
    await api.delete(`users/${id}`)

    getUsers()
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Registo Utilizador</h1>
          <input placeholder='Name' name='name' type='text' ref={inputName}/>
          <input placeholder='Age' age='age' type='number' ref={inputAge} />
          <input placeholder='Email' email='email' type='email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Email: {user.email}</p>
            </div>
            <button onClick={() =>deleteUser(user.id)}>
              <img src={Trash} />
            </button>
          </div>
        ))}
        
      </div>
    </>
  )
}

export default Home
