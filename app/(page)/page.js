
import Link from "next/link";
import Image from "next/image";
import MainImage from "@/public/asset/front-page.jpeg"

export default function Page() {
  return (
    <main className="hero bg-[#FFF9CA] mt-16">
      <div className="hero-content flex-col lg:flex-row-reserve">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Parent Tracker</h1>
          <Image
          src={MainImage}
          width={350}
          height={400}
          loading="lazy"
          placeholder="blur"
          alt="Front Image"
          className="w-auto h-auto object-contain"
          />
        </div>

        <div className="mt-4 w-full max-w-sm">
          <Link href="/login">
            <button className="btn border-white w-full bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
