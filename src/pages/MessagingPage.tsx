import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, Users, Search, Plus, Send, 
  Paperclip, MoreVertical, Image, Smile, 
  Mic, UserPlus, Video, Phone 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Types
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  contentType: 'text' | 'image' | 'file'; // For future support of different content types
  status: 'sent' | 'delivered' | 'read';
}

interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  unread: number;
  isMentorGroup?: boolean;
  description?: string;
  tags?: string[];
}

const MessagingPage = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('chats');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupTags, setNewGroupTags] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Mock data for groups
  const [groups, setGroups] = useState<Group[]>([
    { 
      id: '1', 
      name: 'Software Engineering', 
      avatar: 'https://i.pravatar.cc/150?img=1', 
      members: 156, 
      lastMessage: 'Anyone know good resources for system design?',
      lastMessageTime: new Date('2023-11-10T09:35:00'),
      unread: 3,
      isMentorGroup: false,
      tags: ['programming', 'technology', 'career']
    },
    { 
      id: '2', 
      name: 'Data Science Community', 
      avatar: 'https://i.pravatar.cc/150?img=2', 
      members: 89, 
      lastMessage: 'Just posted a new tutorial on pandas!',
      lastMessageTime: new Date('2023-11-09T14:22:00'),
      unread: 0,
      isMentorGroup: false,
      tags: ['data', 'analysis', 'python']
    },
    { 
      id: '3', 
      name: 'Mentors Connect', 
      avatar: 'https://i.pravatar.cc/150?img=3', 
      members: 42, 
      lastMessage: 'Office hours today at 3 PM',
      lastMessageTime: new Date('2023-11-09T15:20:00'),
      unread: 5,
      isMentorGroup: true,
      tags: ['mentoring', 'career', 'advice']
    },
    { 
      id: '4', 
      name: 'Frontend Developers', 
      avatar: 'https://i.pravatar.cc/150?img=4', 
      members: 201, 
      lastMessage: 'What do you think about the new React docs?',
      lastMessageTime: new Date('2023-11-08T11:45:00'),
      unread: 0,
      isMentorGroup: false,
      tags: ['frontend', 'react', 'javascript']
    },
    { 
      id: '5', 
      name: 'Design Principles', 
      avatar: 'https://i.pravatar.cc/150?img=5', 
      members: 78, 
      lastMessage: 'Check out this new design system I found!',
      lastMessageTime: new Date('2023-11-07T08:30:00'),
      unread: 2,
      isMentorGroup: false,
      tags: ['design', 'ui', 'ux']
    },
    { 
      id: '6', 
      name: 'Career Guidance', 
      avatar: 'https://i.pravatar.cc/150?img=6', 
      members: 112, 
      lastMessage: 'How do I prepare for a technical interview?',
      lastMessageTime: new Date('2023-11-06T16:15:00'),
      unread: 0,
      isMentorGroup: true,
      tags: ['career', 'interview', 'jobs']
    },
  ]);
  
  // Mock messages for each group
  const [messages, setMessages] = useState<{ [groupId: string]: Message[] }>({
    '1': [
      {
        id: '1-1',
        senderId: 'user1',
        senderName: 'Aarav Kumar',
        senderAvatar: 'https://i.pravatar.cc/150?img=11',
        content: 'Hey everyone! I\'m working on my first system design project. Any advice?',
        timestamp: new Date('2023-11-10T09:30:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '1-2',
        senderId: 'user2',
        senderName: 'Priya Sharma',
        senderAvatar: 'https://i.pravatar.cc/150?img=12',
        content: 'Start small and focus on the core components. Don\'t try to build everything at once.',
        timestamp: new Date('2023-11-10T09:32:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '1-3',
        senderId: 'user3',
        senderName: 'Dev Patel',
        senderAvatar: 'https://i.pravatar.cc/150?img=13',
        content: 'Check out "System Design Interview" by Alex Xu. It helped me a lot!',
        timestamp: new Date('2023-11-10T09:35:00'),
        contentType: 'text',
        status: 'read'
      }
    ],
    '3': [
      {
        id: '3-1',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Iyer',
        senderAvatar: 'https://i.pravatar.cc/150?img=21',
        content: 'I\'ll be hosting office hours today at 3 PM IST to discuss career paths in AI.',
        timestamp: new Date('2023-11-09T15:00:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '3-2',
        senderId: 'mentor2',
        senderName: 'Sanya Mehta',
        senderAvatar: 'https://i.pravatar.cc/150?img=22',
        content: 'I can review resumes during my slot tomorrow. Please upload them before noon.',
        timestamp: new Date('2023-11-09T15:05:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '3-3',
        senderId: 'user4',
        senderName: 'Arjun Singh',
        senderAvatar: 'https://i.pravatar.cc/150?img=14',
        content: 'I\'ll be there! I have some questions about AI certifications.',
        timestamp: new Date('2023-11-09T15:10:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '3-4',
        senderId: 'user5',
        senderName: 'Neha Gupta',
        senderAvatar: 'https://i.pravatar.cc/150?img=15',
        content: 'Can we also discuss internship opportunities?',
        timestamp: new Date('2023-11-09T15:15:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '3-5',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Iyer',
        senderAvatar: 'https://i.pravatar.cc/150?img=21',
        content: 'Absolutely! I\'ll cover internship strategies as well.',
        timestamp: new Date('2023-11-09T15:20:00'),
        contentType: 'text',
        status: 'read'
      }
    ],
    '2': [
      {
        id: '2-1',
        senderId: 'user6',
        senderName: 'Rohit Verma',
        senderAvatar: 'https://i.pravatar.cc/150?img=16',
        content: 'Has anyone tried the new Python data visualization library?',
        timestamp: new Date('2023-11-09T14:10:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '2-2',
        senderId: 'user7',
        senderName: 'Ananya Patel',
        senderAvatar: 'https://i.pravatar.cc/150?img=17',
        content: 'I just posted a new tutorial on pandas! Check it out here: https://dataanalysis.example.com/pandas-tutorial',
        timestamp: new Date('2023-11-09T14:22:00'),
        contentType: 'text',
        status: 'read'
      }
    ],
    '4': [
      {
        id: '4-1',
        senderId: 'user8',
        senderName: 'Karan Shah',
        senderAvatar: 'https://i.pravatar.cc/150?img=18',
        content: 'The new React docs are so much better organized.',
        timestamp: new Date('2023-11-08T11:30:00'),
        contentType: 'text',
        status: 'read'
      },
      {
        id: '4-2',
        senderId: 'user9',
        senderName: 'Divya Mehta',
        senderAvatar: 'https://i.pravatar.cc/150?img=19',
        content: 'What do you think about the new React docs? I\'m loving the interactive examples.',
        timestamp: new Date('2023-11-08T11:45:00'),
        contentType: 'text',
        status: 'read'
      }
    ]
  });

  // Filter groups based on search query
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.lastMessage && group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (group.tags && group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: `${activeChat}-${Date.now()}`,
      senderId: 'currentUser',
      senderName: 'You',
      content: message,
      timestamp: new Date(),
      contentType: 'text',
      status: 'sent'
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    setMessage('');
    
    // Mark messages as read
    setGroups(prev => 
      prev.map(group => 
        group.id === activeChat ? { 
          ...group, 
          unread: 0,
          lastMessage: message.trim(),
          lastMessageTime: new Date()
        } : group
      )
    );

    // Simulate received message after a delay (for demo purposes)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const responses = [
          "That's interesting! Tell me more.",
          "Great point! I agree with you.",
          "I see what you mean. Have you considered this approach?",
          "Thanks for sharing that information.",
          "I'll look into that and get back to you."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomUser = messages[activeChat]?.find(m => m.senderId !== 'currentUser') || {
          senderId: 'user10',
          senderName: 'Random User',
          senderAvatar: 'https://i.pravatar.cc/150?img=20'
        };
        
        const responseMessage: Message = {
          id: `${activeChat}-${Date.now() + 1}`,
          senderId: randomUser.senderId,
          senderName: randomUser.senderName,
          senderAvatar: randomUser.senderAvatar,
          content: randomResponse,
          timestamp: new Date(),
          contentType: 'text',
          status: 'delivered'
        };
        
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), responseMessage]
        }));
      }, 2000);
    }
  };

  // Handle creating a new group
  const handleCreateGroup = () => {
    setCreateGroupDialogOpen(true);
  };

  // Submit new group
  const submitNewGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }

    const newGroupId = `group-${Date.now()}`;
    const newGroup: Group = {
      id: newGroupId,
      name: newGroupName.trim(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
      members: 1,
      unread: 0,
      description: newGroupDescription.trim(),
      tags: newGroupTags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setGroups(prev => [newGroup, ...prev]);
    setCreateGroupDialogOpen(false);
    setNewGroupName('');
    setNewGroupDescription('');
    setNewGroupTags('');
    
    toast({
      title: "Group created",
      description: `Your group "${newGroupName}" has been created successfully`
    });
    
    // Activate the new chat
    setActiveChat(newGroupId);
    setActiveTab('chats');
  };

  // Format timestamp to a human-readable string
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for message groups
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Joining a group
  const joinGroup = (groupId: string) => {
    setGroups(prev => 
      prev.map(group => 
        group.id === groupId ? { ...group, members: group.members + 1 } : group
      )
    );
    setActiveChat(groupId);
    toast({
      title: "Group joined",
      description: `You've successfully joined ${groups.find(g => g.id === groupId)?.name}`
    });
  };

  // Add handlers for file/image upload and emoji picker
  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };
  const handleSendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !activeChat) return;
    toast({ title: 'File upload', description: 'File upload is a demo feature.' });
  };
  const handleAttachImage = () => {
    imageInputRef.current?.click();
  };
  const handleSendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !activeChat) return;
    toast({ title: 'Image upload', description: 'Image upload is a demo feature.' });
  };
  const handleEmojiPicker = () => {
    toast({ title: 'Emoji picker', description: 'Emoji picker is a demo feature.' });
  };
  const handleVoiceCall = () => {
    toast({ title: 'Voice Call', description: 'Voice call is a demo feature.' });
  };
  const handleVideoCall = () => {
    toast({ title: 'Video Call', description: 'Video call is a demo feature.' });
  };
  const handleAddMembers = () => {
    toast({ title: 'Add Members', description: 'Add members is a demo feature.' });
  };
  const handleMoreOptions = () => {
    toast({ title: 'More Options', description: 'More options is a demo feature.' });
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-black/90 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-neon-yellow neon-shadow-yellow">
            Community <span className="text-neon-teal">Messages</span>
          </h1>
          <p className="text-neon-teal/80">Connect with peers and mentors in your learning journey</p>
        </div>
        
        <Card className="shadow-lg border-0 bg-black/80 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
            {/* Sidebar */}
            <div className="border-r border-neon-yellow/20 md:col-span-1 bg-black/80">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="chats" className="flex items-center gap-1 text-neon-yellow">
                        <MessageSquare className="h-4 w-4" />
                        <span>Chats</span>
                      </TabsTrigger>
                      <TabsTrigger value="groups" className="flex items-center gap-1 text-neon-yellow">
                        <Users className="h-4 w-4" />
                        <span>Groups</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-yellow h-4 w-4" />
                    <Input 
                      placeholder="Search" 
                      className="pl-10 bg-black/70 text-white border-neon-yellow/20" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsContent value="chats" className="mt-0">
                      <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h3 className="font-medium text-neon-yellow">Recent Chats</h3>
                      </div>
                      {filteredGroups
                        .filter(group => !group.isMentorGroup)
                        .map(group => (
                          <div 
                            key={group.id}
                            className={`flex items-center gap-3 p-4 hover:bg-neon-yellow/10 cursor-pointer border-b border-neon-yellow/10 transition-colors ${activeChat === group.id ? 'bg-neon-yellow/10' : ''}`}
                            onClick={() => setActiveChat(group.id)}
                          >
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={group.avatar} />
                              <AvatarFallback>{group.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h4 className="font-medium truncate text-neon-yellow">{group.name}</h4>
                                <span className="text-xs text-neon-yellow/70">
                                  {group.lastMessageTime ? formatTime(group.lastMessageTime) : ''}
                                </span>
                              </div>
                              <p className="text-sm text-neon-teal/80 truncate">{group.lastMessage}</p>
                            </div>
                            {group.unread > 0 && (
                              <span className="bg-neon-yellow text-black text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                                {group.unread}
                              </span>
                            )}
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="groups" className="mt-0">
                      <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h3 className="font-medium text-neon-yellow">All Groups</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={handleCreateGroup}
                        >
                          <Plus className="h-4 w-4" />
                          New
                        </Button>
                      </div>
                      {filteredGroups.map(group => (
                        <div 
                          key={group.id}
                          className={`flex items-center gap-3 p-4 hover:bg-neon-yellow/10 cursor-pointer border-b border-neon-yellow/10 transition-colors ${activeChat === group.id ? 'bg-neon-yellow/10' : ''}`}
                          onClick={() => setActiveChat(group.id)}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>{group.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium truncate text-neon-yellow">
                                {group.name}
                                {group.isMentorGroup && (
                                  <span className="ml-2 text-xs bg-neon-teal/20 text-neon-teal px-2 py-0.5 rounded-full">Mentor</span>
                                )}
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {group.tags?.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs bg-neon-yellow/10 text-neon-yellow px-1.5 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-neon-teal/80 mt-1">{group.members} members</p>
                          </div>
                          {!messages[group.id] && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-neon-yellow"
                              onClick={(e) => {
                                e.stopPropagation();
                                joinGroup(group.id);
                              }}
                            >
                              Join
                            </Button>
                          )}
                          {group.unread > 0 && (
                            <span className="bg-neon-yellow text-black text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                              {group.unread}
                            </span>
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col h-full bg-black/80">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-neon-yellow/20 flex justify-between items-center bg-black/80">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={groups.find(g => g.id === activeChat)?.avatar} />
                        <AvatarFallback>{groups.find(g => g.id === activeChat)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-neon-yellow">{groups.find(g => g.id === activeChat)?.name}</h3>
                        <p className="text-xs text-neon-teal/80">
                          {groups.find(g => g.id === activeChat)?.members} members
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Voice call" onClick={handleVoiceCall}>
                        <Phone className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Video call" onClick={handleVideoCall}>
                        <Video className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Add members" onClick={handleAddMembers}>
                        <UserPlus className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button variant="ghost" size="icon" title="More options" onClick={handleMoreOptions}>
                        <MoreVertical className="h-4 w-4 text-neon-yellow" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/70">
                    {messages[activeChat] ? (
                      messages[activeChat].map((msg, index, array) => {
                        // Check if we should show a date separator
                        const showDateHeader = index === 0 || 
                          formatDate(msg.timestamp) !== formatDate(array[index - 1].timestamp);
                        
                        return (
                          <React.Fragment key={msg.id}>
                            {showDateHeader && (
                              <div className="flex justify-center my-4">
                                <span className="px-2 py-1 bg-neon-yellow/10 text-neon-yellow text-xs rounded-full">
                                  {formatDate(msg.timestamp)}
                                </span>
                              </div>
                            )}
                            <div className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] ${msg.senderId === 'currentUser' ? 'bg-neon-yellow text-black' : 'bg-black/90 text-white'} rounded-lg p-3 shadow-sm border border-neon-yellow/20`}>
                                {msg.senderId !== 'currentUser' && (
                                  <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={msg.senderAvatar} />
                                      <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium text-neon-yellow">{msg.senderName}</span>
                                  </div>
                                )}
                                <p className={`text-sm ${msg.senderId === 'currentUser' ? 'text-black' : 'text-white'}`}>
                                  {msg.content}
                                </p>
                                <div className={`text-xs mt-1 text-right flex items-center justify-end gap-1 ${msg.senderId === 'currentUser' ? 'text-black/70' : 'text-neon-yellow/70'}`}>
                                  <span>{formatTime(msg.timestamp)}</span>
                                  {msg.senderId === 'currentUser' && (
                                    <span>
                                      {msg.status === 'sent' && '✓'}
                                      {msg.status === 'delivered' && '✓✓'}
                                      {msg.status === 'read' && '✓✓'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-neon-yellow/70">
                        <Users className="h-12 w-12 text-neon-yellow mb-2" />
                        <h3 className="font-medium mb-1">Welcome to {groups.find(g => g.id === activeChat)?.name}</h3>
                        <p className="text-sm">Start the conversation by sending a message</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-neon-yellow/20 bg-black/80">
                    <div className="flex gap-2">
                      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleSendFile} />
                      <input type="file" accept="image/*" ref={imageInputRef} style={{ display: 'none' }} onChange={handleSendImage} />
                      <Button variant="ghost" size="icon" title="Attach file" onClick={handleAttachFile}>
                        <Paperclip className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Send image" onClick={handleAttachImage}>
                        <Image className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1 bg-black/70 text-white border-neon-yellow/20"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button variant="ghost" size="icon" title="Add emoji" onClick={handleEmojiPicker}>
                        <Smile className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Voice message" onClick={() => toast({ title: 'Voice message', description: 'Voice message is a demo feature.' })}>
                        <Mic className="h-4 w-4 text-neon-yellow" />
                      </Button>
                      <Button onClick={handleSendMessage} className="bg-neon-yellow text-black hover:bg-neon-yellow/80">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="bg-neon-yellow/10 p-6 rounded-full mb-4">
                    <MessageSquare className="h-12 w-12 text-neon-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neon-yellow">Welcome to Community Messages</h3>
                  <p className="text-neon-teal/80 mb-6 max-w-md">
                    Connect with fellow learners, join specialized groups, and get guidance from mentors.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setActiveChat('1')} className="bg-neon-yellow text-black hover:bg-neon-yellow/80">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Messaging
                    </Button>
                    <Button variant="outline" className="border-neon-yellow/40 text-neon-yellow" onClick={() => setActiveTab('groups')}>
                      <Users className="mr-2 h-4 w-4" />
                      Browse Groups
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Create Group Dialog */}
      <Dialog open={createGroupDialogOpen} onOpenChange={setCreateGroupDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black/90 text-white border-neon-yellow/20">
          <DialogHeader>
            <DialogTitle className="text-neon-yellow">Create a New Group</DialogTitle>
            <DialogDescription className="text-neon-teal/80">
              Create a group to discuss topics with peers and mentors
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="group-name" className="text-sm font-medium text-neon-yellow">Group Name</label>
              <Input 
                id="group-name" 
                placeholder="e.g., Machine Learning Study Group" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="bg-black/80 text-white border-neon-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="group-description" className="text-sm font-medium text-neon-yellow">Group Description</label>
              <Input 
                id="group-description" 
                placeholder="A brief description of your group" 
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                className="bg-black/80 text-white border-neon-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="group-tags" className="text-sm font-medium text-neon-yellow">Tags (comma separated)</label>
              <Input 
                id="group-tags" 
                placeholder="e.g., python, data-science, beginners" 
                value={newGroupTags}
                onChange={(e) => setNewGroupTags(e.target.value)}
                className="bg-black/80 text-white border-neon-yellow/20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-neon-yellow/40 text-neon-yellow" onClick={() => setCreateGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-neon-yellow text-black hover:bg-neon-yellow/80" onClick={submitNewGroup}>
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagingPage;
