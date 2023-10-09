import {useState} from 'react'

const userStorage = (key) => {
  const [state, setState] = useState(localStorage.getItem(key))

  const setStorage = (value) => {
    localStorage.setItem(key, value)
    setState(value)
  }

  return [state, setStorage]
}

export default userStorage