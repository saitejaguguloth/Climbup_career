import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Bookmark, Share, Search } from "lucide-react";
import { NeonTitle, NeonButton, NeonCard } from "@/components/ui/neon-elements";

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
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <NeonTitle size="2xl" color="yellow" className="text-center mb-3">
            ClimbUp <span className="text-neon-teal">Community</span>
          </NeonTitle>
          <p className="text-xl text-white/70 text-center mb-10">
            Connect with other students, share knowledge, and find answers
          </p>
          
          {/* Community Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input 
                placeholder="Search discussions" 
                className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <NeonButton color="yellow">
              <MessageCircle className="w-4 h-4 mr-2" /> Start a Discussion
            </NeonButton>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="w-full overflow-x-auto flex justify-start p-1 bg-black/20 backdrop-blur-md rounded-lg">
              <TabsTrigger value="all" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">All Topics</TabsTrigger>
              <TabsTrigger value="engineering" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Engineering</TabsTrigger>
              <TabsTrigger value="medical" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Medical</TabsTrigger>
              <TabsTrigger value="coding" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Coding</TabsTrigger>
              <TabsTrigger value="management" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Management</TabsTrigger>
              <TabsTrigger value="government" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Government</TabsTrigger>
              <TabsTrigger value="creative" className="flex-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">Creative</TabsTrigger>
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
                    <NeonCard color="teal" className="text-center p-10">
                      <h3 className="text-xl font-medium mb-2 text-white">No discussions found</h3>
                      <p className="text-white/70 mb-6">Be the first to start a discussion in this category!</p>
                      <NeonButton color="yellow">
                        <MessageCircle className="w-4 h-4 mr-2" /> Start a Discussion
                      </NeonButton>
                    </NeonCard>
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
    <NeonCard color="teal" className="transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h4 className="font-medium text-white">{post.author.name}</h4>
          <p className="text-sm text-white/60">{post.author.role} • {post.timestamp}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
      <p className="text-white/80 mb-3 line-clamp-3">{post.content}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-white/10 border-white/20 text-white/80">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t border-white/20">
        <div className="flex space-x-4">
          <button 
            className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-400' : 'text-white/70'} hover:text-red-400 transition-colors`}
            onClick={() => toggleLike(post.id)}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-400' : ''}`} />
            <span>{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-white/70 hover:text-blue-400 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button 
            className={`${post.isBookmarked ? 'text-indigo-400' : 'text-white/70'} hover:text-indigo-400 transition-colors`}
            onClick={() => toggleBookmark(post.id)}
          >
            <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-indigo-400' : ''}`} />
          </button>
          
          <button className="text-white/70 hover:text-blue-400 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </NeonCard>
  );
};

export default CommunityPage;
