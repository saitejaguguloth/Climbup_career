
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, FileText, Play, GraduationCap, Clock, Calendar } from 'lucide-react';

interface LearningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    title: string;
    description: string;
    duration: string;
    level: string;
    instructor: string;
    resources: {
      videos: Array<{ title: string; url: string; duration: string }>;
      readings: Array<{ title: string; url: string; type: string }>;
      exercises: Array<{ title: string; description: string }>;
    };
  };
}

const LearningDialog: React.FC<LearningDialogProps> = ({ open, onOpenChange, course }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{course.title}</DialogTitle>
          <DialogDescription className="text-base">
            {course.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium">{course.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-purple-50 rounded-lg p-3">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Level</p>
              <p className="font-medium">{course.level}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-3">
            <Calendar className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <p className="font-medium">{course.instructor}</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(90vh-200px)]">
          <Tabs defaultValue="videos">
            <TabsList className="mb-6">
              <TabsTrigger value="videos" className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="readings" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Readings</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>Exercises</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="space-y-4">
              {course.resources.videos.map((video, index) => (
                <Card key={index}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Play className="h-4 w-4 text-red-500" />
                      {video.title}
                    </CardTitle>
                    <CardDescription>{video.duration}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      onClick={() => window.open(video.url, '_blank')}
                      className="bg-gradient-to-r from-red-500 to-red-600"
                    >
                      Watch on YouTube
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="readings" className="space-y-4">
              {course.resources.readings.map((reading, index) => (
                <Card key={index}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      {reading.title}
                    </CardTitle>
                    <CardDescription>{reading.type}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      variant="outline"
                      onClick={() => window.open(reading.url, '_blank')}
                    >
                      Open Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-4">
              {course.resources.exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-600">{exercise.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LearningDialog;
