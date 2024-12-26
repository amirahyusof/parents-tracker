"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";
import { routeDB } from "@/app/firebase/api/route";

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const { createUserDocument, checkIfUserExists } = routeDB()
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { user } = await signup(email, password, name);
      await createUserDocument(user.uid, {name, username, email, password})
      console.log({name, username, email, password})
      router.push(`/mainpage/profile/parent?userId=${user.uid}`);
    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        setError("Email is already registered. Please use a different email or just login.");
      } else {
        setError("Failed to create an account")
      }
      console.error(err);
    }
  };

  const handleLoginWithGoogle = async() => {
    setError('');

    try {
      const userCredential = await loginWithGoogle()
      if(userCredential.user && userCredential.user.uid){
        const {uid, displayName, email} = userCredential.user;
        const userExists = await checkIfUserExists(uid);

        if(!userExists){
          await createUserDocument(uid, {
            name: displayName,
            username: username, 
            email: email, 
            signupMethod: 'google'
          });
        }
        router.push(`/mainpage/profile/parent?userId=${userCredential.user.uid}`);
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
      <div className="flex flex-col mx-auto justify-center lg:flex-row-reserve mt-2">
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
                <span className="label-text">UserName</span>
              </label>
              <input 
                type="name"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="input visible input-bordered bg-white input-accent"
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
                className="input visible bg-white input-accent"
                required
              />
            </div>

            <div className="form-control mt-4">
              <button 
                type="submit" 
                className="btn  border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="px-6 pb-6 flex justify-center">
            <button 
              onClick={()=> handleLoginWithGoogle()}
              className="btn w-full border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
            >
                Sign Up with Google
            </button>
          </div>
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