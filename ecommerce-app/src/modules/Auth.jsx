import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8800/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if(!response.ok) throw new Error('Something went wrong')

      const data = await response.json()
      console.log(data)
      const { token, user } = data

      if (token) {
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('user', JSON.stringify(user))
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong')
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      // navigate('/admin/dashboard')
      window.location.href = '/admin/dashboard'
    }
  }, [])

  return (
    <>
      <div className="flex min-h-full h-[70vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input 
                label="Email address" 
                name="email" 
                type="email" 
                required={true} 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <Input 
              label="Password" 
              name="password" 
              type="password" 
              required={true} 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            </div>

            <div>
              <Button type="submit">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
