import React, { useState } from "react";
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
import { NeonTitle, NeonButton, NeonCard } from "@/components/ui/neon-elements";

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
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");

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
    
    const matchesSpecialization = selectedSpecialization === "all" || 
                                  mentor.specialization.includes(selectedSpecialization);
    
    const matchesAvailability = selectedAvailability === "all" || 
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
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <NeonTitle size="2xl" color="yellow" className="text-center mb-3">
            Connect with <span className="text-neon-teal">Expert Mentors</span>
          </NeonTitle>
          <p className="text-xl text-white/70 text-center mb-10">
            Get personalized guidance from professionals in your field of interest
          </p>
          
          {/* Search and Filters */}
          <NeonCard color="yellow" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search" className="text-white">Search Mentors</Label>
                <Input 
                  id="search" 
                  placeholder="Search by name, role or specialization" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 bg-black/20 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div>
                <Label htmlFor="specialization" className="text-white">Specialization</Label>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger id="specialization" className="mt-1 bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    <SelectItem value="all" className="text-white">All Specializations</SelectItem>
                    {specializations.map((spec, index) => (
                      <SelectItem key={index} value={spec} className="text-white">{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability" className="text-white">Availability</Label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger id="availability" className="mt-1 bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Any Time" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    <SelectItem value="all" className="text-white">Any Time</SelectItem>
                    {availabilities.map((time, index) => (
                      <SelectItem key={index} value={time} className="text-white">{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </NeonCard>
          
          {/* Mentor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <NeonCard key={mentor.id} color="teal" className="transition-transform hover:scale-[1.02]">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={mentor.imageUrl} 
                      alt={mentor.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-neon-teal"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-white">{mentor.name}</h3>
                      <p className="text-white/70">{mentor.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium text-white">{mentor.rating}</span>
                      <span className="text-white/60 text-sm ml-2">({mentor.sessions} sessions)</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-2">{mentor.education}</p>
                    <p className="text-white/70 text-sm">{mentor.experience} years of experience</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-neon-teal/20 text-neon-teal border-neon-teal/50">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center text-sm text-white/70">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{mentor.availability.join(", ")}</span>
                    </div>
                    
                    <div className="space-x-2">
                      <NeonButton variant="outline" size="sm" color="teal">
                        <MessageCircle className="w-4 h-4 mr-1" /> Message
                      </NeonButton>
                      <NeonButton size="sm" color="orange">
                        Book Session
                      </NeonButton>
                    </div>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center p-10">
              <h3 className="text-2xl font-semibold mb-2 text-white">No mentors found</h3>
              <p className="text-white/70">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
