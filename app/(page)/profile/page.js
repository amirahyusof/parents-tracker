import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";

export default function ChildProfile({userData}){
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [error, setError] = useState('');
  const { addChild } = useAuth();
  const router = useRouter();

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await addChild(userData.uid, {childName, childAge})
      router.push('/mainpage');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }

    console.log({childName, childAge})
  };

  return (
    <section>
      <div className="hero-content flex-col lg:flex-row-reserve mt-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Add Child Profile</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleAddChildProfile} className="card-body">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Name</span>
              </label>
              <input 
                type="name"
                placeholder="child name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input 
                type="number"
                placeholder="Age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="input input-bordered bg-white input-accent"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black"
              >
                Add Child
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

