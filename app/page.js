
import Link from "next/link";

export default function Page() {
  return (
    <main className="hero bg-[#FFF9CA] mt-44">
      <div className="hero-content flex-col lg:flex-row-reserve">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Parent Tracker</h1>
        </div>

        <div className="mt-4 w-full max-w-sm">
          <button className="btn border-white w-full bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">
            <Link href="/login">Sign Up</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
