"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, createUserDocument } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { user }  = await signup(email, password);
      await createUserDocument(user.uid, {email, name})
      router.push('/login');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }

    console.log({email, password})
  };

  return (
    <main className="hero bg-[#FFF9CA]">
      <div className="hero-content flex-col lg:flex-row-reserve mt-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Create an Account</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignup} className="card-body">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input 
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        
        <footer className="row-start-3 mt-4 flex-col items-center justify-center">
          <p>
            Already a User? 
            <Link href="/login" className="link link-hover"> Login </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}