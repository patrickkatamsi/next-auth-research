import React, { useRef, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Login() {
  const emailRef = useRef('')
  const pwdRef = useRef('')
  const [err, setErr] = useState('')
  const router = useRouter()
  const session = useSession()

  if(session.status === 'authenticated') {
    return (
      <Layout>
        You have logged in. Return to <Link href="/"> dashboard </Link>
      </Layout>
    )
  }

  const handleSubmit = async (e) => {
    setErr('')
    e.preventDefault()
    const result = await signIn('credentials', {
      email: emailRef.current.value,
      password: pwdRef.current.value,
      redirect: false
    })

    if(result.ok) {
      router.push('/')
      return
    }

    setErr(result.error === "CredentialsSignin"? 'Invalid credentials' : 'Server Error')
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
      <label>
        Username
        <input ref={emailRef} name="username" type="text" />
      </label>
      <label>
        Password
        <input ref={pwdRef} name="password" type="password" />
      </label>
      {err}
      <button type="submit">Sign in</button>
    </form>
    </Layout>
  )
}
