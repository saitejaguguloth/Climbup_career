
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Bookmark, Share, Search } from "lucide-react";

interface Post {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: string;
  tags: string[];
}

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const posts: Post[] = [
    {
      id: 1,
      author: {
        name: "Rahul Sharma",
        role: "JEE Aspirant",
        avatar: "https://i.pravatar.cc/300?img=33"
      },
      category: "engineering",
      title: "How to prepare for JEE Advanced in 6 months?",
      content: "I've been studying for JEE Main and cleared it with a good rank. Now focusing on Advanced. Any tips on how to structure my preparation for the next 6 months? I'm especially worried about Physics...",
      likes: 24,
      comments: 15,
      isLiked: false,
      isBookmarked: false,
      timestamp: "2 hours ago",
      tags: ["JEE Advanced", "Engineering", "Physics", "Study Plan"]
    },
    {
      id: 2,
      author: {
        name: "Priya Patel",
        role: "NEET Qualifier",
        avatar: "https://i.pravatar.cc/300?img=5"
      },
      category: "medical",
      title: "NEET preparation strategy that got me into a top medical college",
      content: "I scored 650+ in NEET last year and got into my dream medical college. Here's my complete study strategy, including resources I used, time management, and how I approached each subject...",
      likes: 48,
      comments: 32,
      isLiked: true,
      isBookmarked: true,
      timestamp: "1 day ago",
      tags: ["NEET", "Medical", "Study Tips", "Success Story"]
    },
    {
      id: 3,
      author: {
        name: "Aditya Verma",
        role: "BTech Student",
        avatar: "https://i.pravatar.cc/300?img=11"
      },
      category: "coding",
      title: "Best resources to learn DSA for placement preparation",
      content: "I'm in my 3rd year of BTech and looking to prepare for campus placements. Can anyone recommend good resources for Data Structures and Algorithms? I've started with GeeksforGeeks but would appreciate other suggestions...",
      likes: 36,
      comments: 28,
      isLiked: false,
      isBookmarked: false,
      timestamp: "2 days ago",
      tags: ["DSA", "Placements", "Coding", "Computer Science"]
    },
    {
      id: 4,
      author: {
        name: "Neha Singh",
        role: "MBA Aspirant",
        avatar: "https://i.pravatar.cc/300?img=23"
      },
      category: "management",
      title: "CAT preparation alongside my job - Is it possible?",
      content: "I'm working full-time but want to prepare for CAT this year. Is it feasible to manage both? Looking for advice from people who've done this successfully. How many hours should I study daily?...",
      likes: 19,
      comments: 24,
      isLiked: false,
      isBookmarked: false,
      timestamp: "3 days ago",
      tags: ["CAT", "MBA", "Working Professional", "Time Management"]
    },
    {
      id: 5,
      author: {
        name: "Arjun Kapoor",
        role: "UPSC Aspirant",
        avatar: "https://i.pravatar.cc/300?img=17"
      },
      category: "government",
      title: "How to approach UPSC optional subject selection?",
      content: "I'm starting my UPSC preparation and confused about which optional subject to choose. My background is in Economics, but I'm also interested in Sociology. Can someone guide me on how to evaluate which would be better for me?...",
      likes: 42,
      comments: 37,
      isLiked: true,
      isBookmarked: false,
      timestamp: "5 days ago",
      tags: ["UPSC", "Civil Services", "Optional Subject", "IAS"]
    },
    {
      id: 6,
      author: {
        name: "Meera Joshi",
        role: "Design Student",
        avatar: "https://i.pravatar.cc/300?img=3"
      },
      category: "creative",
      title: "Portfolio tips for UX/UI design internships?",
      content: "I'm in my final year of design school and want to apply for UX/UI design internships. What kind of projects should I include in my portfolio? And how many projects are typically expected?...",
      likes: 27,
      comments: 18,
      isLiked: false,
      isBookmarked: true,
      timestamp: "1 week ago",
      tags: ["UX/UI Design", "Portfolio", "Internship", "Creative Career"]
    }
  ];

  // Filter posts based on search term and active category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Toggle like status for a post
  const toggleLike = (postId: number) => {
    // In a real app, this would make an API call
    console.log(`Toggling like for post ${postId}`);
  };

  // Toggle bookmark status for a post
  const toggleBookmark = (postId: number) => {
    // In a real app, this would make an API call
    console.log(`Toggling bookmark for post ${postId}`);
  };

  return (
    <div className="min-h-screen py-16 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            ClimbUp <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-600 text-center mb-10">
            Connect with other students, share knowledge, and find answers
          </p>
          
          {/* Community Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search discussions" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <MessageCircle className="w-4 h-4 mr-2" /> Start a Discussion
            </Button>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="w-full overflow-x-auto flex justify-start p-1 bg-white/60 backdrop-blur-md rounded-lg">
              <TabsTrigger value="all" className="flex-1">All Topics</TabsTrigger>
              <TabsTrigger value="engineering" className="flex-1">Engineering</TabsTrigger>
              <TabsTrigger value="medical" className="flex-1">Medical</TabsTrigger>
              <TabsTrigger value="coding" className="flex-1">Coding</TabsTrigger>
              <TabsTrigger value="management" className="flex-1">Management</TabsTrigger>
              <TabsTrigger value="government" className="flex-1">Government</TabsTrigger>
              <TabsTrigger value="creative" className="flex-1">Creative</TabsTrigger>
            </TabsList>
            
            {/* Posts for each category */}
            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} toggleLike={toggleLike} toggleBookmark={toggleBookmark} />
                ))}
              </div>
            </TabsContent>
            
            {/* We're using filteredPosts which already applies the category filter based on activeCategory */}
            {["engineering", "medical", "coding", "management", "government", "creative"].map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <PostCard key={post.id} post={post} toggleLike={toggleLike} toggleBookmark={toggleBookmark} />
                    ))
                  ) : (
                    <div className="text-center p-10 bg-white/80 backdrop-blur-md rounded-xl">
                      <h3 className="text-xl font-medium mb-2">No discussions found</h3>
                      <p className="text-gray-600 mb-6">Be the first to start a discussion in this category!</p>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                        <MessageCircle className="w-4 h-4 mr-2" /> Start a Discussion
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Post Card Component
interface PostCardProps {
  post: Post;
  toggleLike: (postId: number) => void;
  toggleBookmark: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, toggleLike, toggleBookmark }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h4 className="font-medium">{post.author.name}</h4>
          <p className="text-sm text-gray-500">{post.author.role} • {post.timestamp}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-50">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-4">
          <button 
            className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
            onClick={() => toggleLike(post.id)}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
            <span>{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button 
            className={`${post.isBookmarked ? 'text-indigo-600' : 'text-gray-500'} hover:text-indigo-600 transition-colors`}
            onClick={() => toggleBookmark(post.id)}
          >
            <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-indigo-600' : ''}`} />
          </button>
          
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
