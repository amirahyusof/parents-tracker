import React from 'react';
// import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import DisplayCharts from './charts';
import { CreateTask } from '@/components/ui/activity/activities-button';


const Dashboard = async () => {
  // const user = await currentUser();
  // const creator = user?.firstName || '';
  /* const categories = await prisma.category.findMany({
    where: {
      creator: creator
    }
  }); */

  const tasks = [
    { id: 1, title: "Baca Buku", progress: 25, status: "on progress" },
    { id: 2, title: "Siapkan Kerja Sekolah", time: "9.00am - 10.00am", progress: 25, status: "on progress" },
    { id: 3, title: "Basuh pinggan", progress: 0, status: "new" },
    { id: 4, title: "Kemas rumah", time: "5.00pm - 6.00pm", progress: 100, status: "completed" },

    // Add more tasks as needed
  ];


  return (
    <section className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <CreateTask />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Today's Progress Summary */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Today Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-8">5 Tasks</p>
          <div>
            <p>Progress <span>25%</span></p>
            <Progress value={25} className="bg-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Progress Chart */}
        <div className="col-span-2 flex flex-col space-y-4">
          <DisplayCharts />
        </div>
      </div>

      {/* Upcoming Activities */}
      <div className="mb-4 w-full">
        <div className="flex justify-between">
          <h2>Upcoming Activities</h2>
          <p className="cursor-pointer">See All</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tasks.map(task => (
            <Card key={task.id} className="mt-4 py-4 w-full h-[150px]">
              <CardContent>
                <h3 className='mb-10'>{task.title}</h3>
                <div>
                  <p>{task.progress}%</p>
                  <Progress value={task.progress} className="bg-blue-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="w-full">
        <div className="flex justify-between">
          <h2>Today Task</h2>
          <p className="cursor-pointer">See All</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <Card key={task.id} className="mt-4 py-4 w-full h-[100px]">
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.time}</p>
                </div>
                <div>
                  <Button asChild>
                    <Label>{task.status}</Label>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

