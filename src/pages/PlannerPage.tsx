
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const PlannerPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "tasks" | "deadlines">("calendar");
  
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
          <Card key={task.id} className={`border-l-4 ${
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
                  <CardTitle className={`text-base ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </CardTitle>
                  <CardDescription>{task.category}</CardDescription>
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
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>{format(task.dueDate, "MMM dd, yyyy")}</span>
              </div>
              {task.status === "completed" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <CheckCircle className="mr-1 h-3 w-3" /> Completed
                </Badge>
              ) : (
                <Button variant="outline" size="sm">Mark Complete</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Planner</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your learning journey, track tasks, and never miss important deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/90 backdrop-blur shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" /> Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border bg-white"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="mr-2 h-4 w-4" /> Add New Task
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" /> Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysTasks.length > 0 ? (
                  renderTaskList(todaysTasks)
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <p>No tasks scheduled for today</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur shadow-md">
              <CardHeader>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="tasks">All Tasks</TabsTrigger>
                    <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="tasks">
                    <div className="flex justify-between items-center">
                      <CardTitle>All Tasks</CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> New Task
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deadlines">
                    <div className="flex justify-between items-center">
                      <CardTitle>Upcoming Deadlines</CardTitle>
                      <Badge variant="outline" className="flex items-center">
                        <AlertCircle className="mr-1 h-3 w-3" /> 
                        {upcomingDeadlines.length} pending
                      </Badge>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <div className="flex justify-between items-center">
                      <CardTitle>Completed Tasks</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
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
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
