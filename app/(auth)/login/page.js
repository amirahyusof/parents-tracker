"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";

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
      const userCredential = await login(email, password);
      router.push(`/mainpage?userId=${userCredential.user.uid}`);
    } catch(error){
      setError("Failed to log in. Please check your credentials.");
      console.log(error);
    }
  };
   
  return (
    <main className="hero bg-[#FFF9CA] h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Login now!</h1>
        </div>

        <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
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

            <div className="form-control mt-4">
              <button className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">Login</button>
            </div>

            <span className="border-2 border-gray-300"></span>
            <p className="text-xs mx-auto justify-center">or login with</p>

            <div className="form-control">
              <button className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">Google</button>
            </div>
          </form>
        </div>

        <div className="row-start-3 mt-2 flex-col items-center justify-center">
          <p className="text-black">
            Not a User? 
            <Link href="/signup" className="link link-hover"> Sign Up </Link>
          </p>
        </div>
      </div>
    </main>
  );
}