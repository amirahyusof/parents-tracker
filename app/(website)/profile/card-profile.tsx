"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import ActivitySummary from "./activity-summary";


export default function CardProfile(){
  return(
    <section>
      {/*Profile Header*/}
      <Card className="mb-4 p-4">
        <h2 className="text-xl">Profile</h2>
        {/* <Image /> */}
        <h3>Aminah01</h3>
        <h4>Mom</h4>
        <h4>aminah29@gmail.com</h4>
        
        <div>
          {/* <EditProfile /> */}
        </div>
      </Card>

      {/*Activity Summary section*/}
      <Card className="mb-4 p-4">
        <h2 className="text-xl">Activity Summary</h2>
        <ActivitySummary />
      </Card>

      {/*Setting Section*/}
      <Card className="mb-4 p-4">
        <h2 className="text-xl">Setting Section</h2>
      </Card>
    </section>
  )
}