import React,{useContext} from 'react'
import './Header.css'
import AuthContext from '../../context/AuthContext'

import {useNavigate,Link} from 'react-router-dom'

function Header() {
  let {user ,logoutUser} = useContext(AuthContext)
  const history = useNavigate()
  return (
 
      <div className='Parentdiv'>
        <div className='childdiv'>
          <div className='heading'>
            { user ? (  <h2 className='text-xl'>Welcome  {user.email}</h2>) : <h1 className='text-xl'>Welcome </h1> }
      
        </div>
        <div>
          <h1 className='text-gray-500 text-sm px-5'>Moonhive@gmail.com </h1>
        </div>
      
        </div>
      </div>



 
  )
}

export default Header