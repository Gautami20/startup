import React from 'react'
import { createContext, useState } from 'react'

const authContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [success, setSuccess] = useState(false)
  const [startups, setStartups] = useState([])
  const [investments, setInvestments] = useState([])

  const registerUser = async (name, email, pass, org_size, valuation) => {
    if (!name || !email || !pass || !org_size || !valuation) {
      console.log('ERROR')
    } else {
      const body = new URLSearchParams()
      body.append('name', name)
      body.append('email', email)
      body.append('password', pass)
      body.append('org_size', org_size)
      body.append('valuation', valuation)

      const response = await fetch(
        `http://localhost:5000/api/startup/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body,
        }
      )

      const data = await response.json()
      console.log(data)
      setSuccess(data.success)
      if (data.sucess) {
        localStorage.setItem('token', data.token)
        console.log(localStorage.getItem('token'))
      }
    }
  }

  const loginUser = async (email, pass) => {
    const body = new URLSearchParams()
    body.append('email', email)
    body.append('password', pass)

    const response = await fetch(`http://localhost:5000/api/startup/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    })

    const data = await response.json()
    console.log(data)
    if (data.success) {
      setSuccess(true)
      setLoggedIn(true)
      window.localStorage.setItem('token', data.token)
      window.localStorage.setItem('user_id', data.id)
      setStartups(data.startups)
    } else {
      setSuccess(false)
    }
  }

  const getStartups = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/startup/getStartup',
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      console.log(data)
      setStartups(data.startups)
    } catch (err) {
      console.log(err)
    }
  }

  const getInvestments = async () => {
    const id = window.localStorage.getItem('user_id')
    const body = new URLSearchParams()
    body.append('id', id)
    try {
      const response = await fetch('http://localhost:5000/api/getInvestments', {
        method: 'POST',
        body: body,
      })
      const data = await response.json()
      setInvestments(data.investments)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addInvestment = async (s_id, name, amount) => {
    const id = window.localStorage.getItem('user_id')
    const body = new URLSearchParams()
    body.append('id', id)
    body.append('name', name)
    body.append('amount', amount)
    body.append('startup_id', s_id)
    try {
      const response = await fetch('http://localhost:5000/api/addInvestment', {
        method: 'POST',
        body: body,
      })
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <authContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        registerUser,
        loginUser,
        success,
        getStartups,
        startups,
        getInvestments,
        investments,
        addInvestment,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default authContext
