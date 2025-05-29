
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

const PlannerPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample tasks for demonstration
  const tasks = [
    {
      id: 1,
      title: "Complete JavaScript Course Module 3",
      category: "Learning",
      priority: "High",
      status: "pending",
      dueDate: new Date(2025, 4, 15)
    },
    {
      id: 2,
      title: "Work on Portfolio Project",
      category: "Project",
      priority: "Medium",
      status: "in-progress",
      dueDate: new Date(2025, 4, 18)
    },
    {
      id: 3,
      title: "Mock Interview Practice",
      category: "Career",
      priority: "High",
      status: "completed",
      dueDate: new Date(2025, 4, 12)
    },
    {
      id: 4,
      title: "DSA Practice - Linked Lists",
      category: "Learning",
      priority: "Medium",
      status: "pending",
      dueDate: new Date(2025, 4, 16)
    },
    {
      id: 5,
      title: "Review Resume with Mentor",
      category: "Career",
      priority: "Low",
      status: "pending",
      dueDate: new Date(2025, 4, 20)
    }
  ];
  
  // Filter tasks for today's date
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  
  const todaysTasks = tasks.filter(task => {
    const taskDate = format(task.dueDate, 'yyyy-MM-dd');
    return taskDate === formattedToday;
  });
  
  const upcomingDeadlines = tasks
    .filter(task => task.dueDate > today && task.status !== "completed")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  
  const renderTaskList = (taskList: typeof tasks) => {
    return (
      <div className="space-y-4">
        {taskList.map((task) => (
          <NeonCard key={task.id} color="teal" className={`border-l-4 ${
            task.status === "completed" 
              ? "border-l-green-400" 
              : task.priority === "High" 
                ? "border-l-red-400" 
                : task.priority === "Medium" 
                  ? "border-l-yellow-400" 
                  : "border-l-blue-400"
          }`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className={`text-base text-white ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">{task.category}</CardDescription>
                </div>
                <Badge variant={
                  task.priority === "High" 
                    ? "destructive" 
                    : task.priority === "Medium"
                      ? "secondary"
                      : "outline"
                }>
                  {task.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 flex justify-between">
              <div className="flex items-center text-sm text-white/70">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>{format(task.dueDate, "MMM dd, yyyy")}</span>
              </div>
              {task.status === "completed" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <CheckCircle className="mr-1 h-3 w-3" /> Completed
                </Badge>
              ) : (
                <NeonButton variant="outline" size="sm" color="yellow">Mark Complete</NeonButton>
              )}
            </CardFooter>
          </NeonCard>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <NeonTitle size="2xl" color="yellow" className="mb-4">
            My <span className="text-neon-teal">Planner</span>
          </NeonTitle>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Organize your learning journey, track tasks, and never miss important deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <NeonCard color="yellow">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <NeonIcon color="yellow" size="sm" className="mr-2">
                    <CalendarIcon className="h-5 w-5" />
                  </NeonIcon>
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border bg-black/20 text-white"
                />
              </CardContent>
              <CardFooter>
                <NeonButton color="yellow" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Task
                </NeonButton>
              </CardFooter>
            </NeonCard>
            
            <NeonCard color="teal">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <NeonIcon color="teal" size="sm" className="mr-2">
                    <CheckCircle className="h-5 w-5" />
                  </NeonIcon>
                  Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysTasks.length > 0 ? (
                  renderTaskList(todaysTasks)
                ) : (
                  <div className="text-center py-6 text-white/70">
                    <p>No tasks scheduled for today</p>
                    <NeonButton variant="outline" size="sm" color="teal" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" /> Add Task
                    </NeonButton>
                  </div>
                )}
              </CardContent>
            </NeonCard>
          </div>
          
          <div className="lg:col-span-2">
            <NeonCard color="orange">
              <CardHeader>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4 bg-black/20">
                    <TabsTrigger value="tasks" className="text-white data-[state=active]:bg-neon-orange/20 data-[state=active]:text-neon-orange">All Tasks</TabsTrigger>
                    <TabsTrigger value="deadlines" className="text-white data-[state=active]:bg-neon-orange/20 data-[state=active]:text-neon-orange">Upcoming Deadlines</TabsTrigger>
                    <TabsTrigger value="completed" className="text-white data-[state=active]:bg-neon-orange/20 data-[state=active]:text-neon-orange">Completed</TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="tasks">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">All Tasks</CardTitle>
                      <NeonButton size="sm" color="orange">
                        <Plus className="mr-2 h-4 w-4" /> New Task
                      </NeonButton>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deadlines">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
                      <Badge variant="outline" className="flex items-center bg-red-500/20 text-red-400 border-red-400">
                        <AlertCircle className="mr-1 h-3 w-3" /> 
                        {upcomingDeadlines.length} pending
                      </Badge>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">Completed Tasks</CardTitle>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" /> 
                        {tasks.filter(t => t.status === "completed").length} done
                      </Badge>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="tasks">
                  <TabsContent value="tasks" className="mt-0">
                    {renderTaskList(tasks)}
                  </TabsContent>
                  
                  <TabsContent value="deadlines" className="mt-0">
                    {renderTaskList(upcomingDeadlines)}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="mt-0">
                    {renderTaskList(tasks.filter(task => task.status === "completed"))}
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 text-center">
                  <NeonButton variant="outline" color="orange">Load More</NeonButton>
                </div>
              </CardContent>
            </NeonCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
