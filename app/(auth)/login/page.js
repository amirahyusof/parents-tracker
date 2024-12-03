"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/hook";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/mainpage');
    } catch(error){
      setError("Failed to log in. Please check your credentials.");
      console.log(error);
    }
  };
   
  return (
    <div className="hero bg-[#FFF9CA]">
      <main className="hero-content flex-col lg:flex-row-reserve mt-20">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Login now!</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forget password?</a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">Login</button>
            </div>
          </form>

        </div>
        
      </main>

      <footer className="row-start-3 mt-4 flex-col items-center justify-center">
        <p className="">
          Not a User? 
          <Link href="/signup" className="link link-hover"> Sign Up </Link>
        </p>
      </footer>
    </div>
  );
}