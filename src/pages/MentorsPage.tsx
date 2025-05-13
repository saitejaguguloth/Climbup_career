
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, MessageCircle } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  specialization: string[];
  education: string;
  experience: number;
  rating: number;
  sessions: number;
  availability: string[];
  imageUrl: string;
}

const MentorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");

  const mentors: Mentor[] = [
    {
      id: 1,
      name: "Dr. Aisha Patel",
      role: "Software Engineering Lead",
      specialization: ["Software Engineering", "Web Development", "Career Counseling"],
      education: "PhD in Computer Science, Stanford University",
      experience: 12,
      rating: 4.9,
      sessions: 230,
      availability: ["Weekdays", "Evenings"],
      imageUrl: "https://i.pravatar.cc/300?img=28"
    },
    {
      id: 2,
      name: "Prof. Rajiv Mehta",
      role: "Medical Sciences Professor",
      specialization: ["NEET Preparation", "Medical Career", "Biotechnology"],
      education: "MBBS, MD in Neurology, AIIMS Delhi",
      experience: 15,
      rating: 4.8,
      sessions: 186,
      availability: ["Weekends", "Mornings"],
      imageUrl: "https://i.pravatar.cc/300?img=60"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "IAS Officer",
      specialization: ["Civil Services", "UPSC Preparation", "Public Administration"],
      education: "IAS, Delhi University",
      experience: 8,
      rating: 4.7,
      sessions: 142,
      availability: ["Weekends", "Evenings"],
      imageUrl: "https://i.pravatar.cc/300?img=5"
    },
    {
      id: 4,
      name: "Michael Johnson",
      role: "UX/UI Design Lead",
      specialization: ["UX/UI Design", "Product Design", "Creative Career"],
      education: "MFA in Design, Rhode Island School of Design",
      experience: 10,
      rating: 4.9,
      sessions: 215,
      availability: ["Weekdays", "Afternoons"],
      imageUrl: "https://i.pravatar.cc/300?img=12"
    },
    {
      id: 5,
      name: "Ananya Desai",
      role: "Data Science Director",
      specialization: ["Data Science", "Machine Learning", "Analytics"],
      education: "MS in Statistics, Indian Statistical Institute",
      experience: 9,
      rating: 4.8,
      sessions: 163,
      availability: ["Flexible", "Weekdays"],
      imageUrl: "https://i.pravatar.cc/300?img=20"
    },
    {
      id: 6,
      name: "Dr. Sameer Khan",
      role: "Engineering Professor",
      specialization: ["JEE Preparation", "Engineering", "Mathematics"],
      education: "PhD in Mechanical Engineering, IIT Bombay",
      experience: 14,
      rating: 4.9,
      sessions: 267,
      availability: ["Weekdays", "Evenings", "Weekends"],
      imageUrl: "https://i.pravatar.cc/300?img=65"
    }
  ];

  // Filter mentors based on search term and filters
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialization = selectedSpecialization === "" || 
                                  mentor.specialization.includes(selectedSpecialization);
    
    const matchesAvailability = selectedAvailability === "" || 
                                mentor.availability.includes(selectedAvailability);
    
    return matchesSearch && matchesSpecialization && matchesAvailability;
  });

  // Get unique specializations for filter dropdown
  const specializations = Array.from(new Set(mentors.flatMap(mentor => mentor.specialization)));
  
  // Get unique availabilities for filter dropdown
  const availabilities = Array.from(new Set(mentors.flatMap(mentor => mentor.availability)));

  return (
    <div className="min-h-screen py-16 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            Connect with <span className="gradient-text">Expert Mentors</span>
          </h1>
          <p className="text-xl text-gray-600 text-center mb-10">
            Get personalized guidance from professionals in your field of interest
          </p>
          
          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search Mentors</Label>
                <Input 
                  id="search" 
                  placeholder="Search by name, role or specialization" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger id="specialization" className="mt-1">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specializations</SelectItem>
                    {specializations.map((spec, index) => (
                      <SelectItem key={index} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger id="availability" className="mt-1">
                    <SelectValue placeholder="Any Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Time</SelectItem>
                    {availabilities.map((time, index) => (
                      <SelectItem key={index} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Mentor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 transition-transform hover:scale-[1.02]">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={mentor.imageUrl} 
                      alt={mentor.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <p className="text-gray-600">{mentor.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-gray-500 text-sm ml-2">({mentor.sessions} sessions)</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{mentor.education}</p>
                    <p className="text-gray-600 text-sm">{mentor.experience} years of experience</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{mentor.availability.join(", ")}</span>
                    </div>
                    
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700">
                        <MessageCircle className="w-4 h-4 mr-1" /> Message
                      </Button>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" size="sm">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center p-10">
              <h3 className="text-2xl font-semibold mb-2">No mentors found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
