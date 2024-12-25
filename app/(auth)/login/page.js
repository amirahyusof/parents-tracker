"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await login(email, password);
      if(userCredential.user && userCredential.user.uid){
        router.push(`/mainpage?userId=${userCredential.user.uid}`);
      } else {
        throw new Error("No user Id received");
      }
    } catch(error){
      setError("Failed to log in. Please check your credentials.");
      console.log(error);
    }
  };

  const handleLoginWithGoogle = async() => {
    setError('');

    try {
      const userCredential = await loginWithGoogle()
      if(userCredential.user && userCredential.user.uid){
        router.push(`/mainpage?userId=${userCredential.user.uid}`);
      } else {
        throw new Error("No user Id received from Google login");
      }
    } catch(error){
      setError("Failed to log in with Google");
      console.log(error);
    }
  };
   
  return (
    <main className="flex w-full bg-[#FFF9CA] h-screen">
      <div className="m-4 flex flex-col mx-auto justify-center w-[400px]">
        <div className="bg-white w-full rounded-2xl shadow-2xl space-y-2">
          <h1 className="pl-4 pt-4 text-3xl font-bold text-[#FFB4B4]">Log In now!</h1>
          
          <form onSubmit={handleLogin} className="p-6">
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
              <button className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">Log In</button>
            </div>
          </form>

          <div className="px-6 pb-6 flex justify-center">
            <button 
              onClick={()=> handleLoginWithGoogle()}
              className="btn w-full border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
            >
                Log In with Google
            </button>
          </div>
        </div>
        <div className="row-start-3 mt-2 flex items-center justify-center">
          <p className="text-black">
            Not a User? 
            <Link href="/signup" className="link link-hover"> Sign Up </Link>
          </p>
        </div>
      </div>
    </main>
  );
}