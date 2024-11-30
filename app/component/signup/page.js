"use client"
import Image from "next/image";

export default function Home() {
  return (
    <div className="hero bg-[#FFF9CA]">
      <main className="hero-content flex-col lg:flex-row-reserve">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Not a User?</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="text"
                placeholder="name"
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
                className="input input-bordered bg-white input-accent"
                required
              />
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
          <a href="#" className="link link-hover"> Sign Up </a>
        </p>
      </footer>
    </div>
  );
}