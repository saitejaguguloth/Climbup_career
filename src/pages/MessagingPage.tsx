
import React, { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen py-6 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Community <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Messages</span>
          </h1>
          <p className="text-gray-600">Connect with peers and mentors in your learning journey</p>
        </div>
        
        <Card className="shadow-lg border-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[700px]">
            {/* Sidebar */}
            <div className="border-r border-gray-200 md:col-span-1">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="chats" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Chats</span>
                      </TabsTrigger>
                      <TabsTrigger value="groups" className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Groups</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search" 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <TabsContent value="chats" className="m-0">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="font-medium">Recent Chats</h3>
                    </div>
                    {filteredGroups
                      .filter(group => !group.isMentorGroup)
                      .map(group => (
                        <div 
                          key={group.id}
                          className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${activeChat === group.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setActiveChat(group.id)}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>{group.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium truncate">{group.name}</h4>
                              <span className="text-xs text-gray-500">
                                {group.lastMessageTime ? formatTime(group.lastMessageTime) : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{group.lastMessage}</p>
                          </div>
                          {group.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                              {group.unread}
                            </span>
                          )}
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="groups" className="m-0">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="font-medium">All Groups</h3>
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
                        className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${activeChat === group.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setActiveChat(group.id)}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback>{group.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium truncate">
                              {group.name}
                              {group.isMentorGroup && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Mentor</span>
                              )}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {group.tags?.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{group.members} members</p>
                        </div>
                        {!messages[group.id] && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              joinGroup(group.id);
                            }}
                          >
                            Join
                          </Button>
                        )}
                        {group.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                            {group.unread}
                          </span>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                </div>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col h-full">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={groups.find(g => g.id === activeChat)?.avatar} />
                        <AvatarFallback>{groups.find(g => g.id === activeChat)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{groups.find(g => g.id === activeChat)?.name}</h3>
                        <p className="text-xs text-gray-500">
                          {groups.find(g => g.id === activeChat)?.members} members
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Voice call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Video call">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Add members">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="More options">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages[activeChat] ? (
                      messages[activeChat].map((msg, index, array) => {
                        // Check if we should show a date separator
                        const showDateHeader = index === 0 || 
                          formatDate(msg.timestamp) !== formatDate(array[index - 1].timestamp);
                        
                        return (
                          <React.Fragment key={msg.id}>
                            {showDateHeader && (
                              <div className="flex justify-center my-4">
                                <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                                  {formatDate(msg.timestamp)}
                                </span>
                              </div>
                            )}
                            <div className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] ${msg.senderId === 'currentUser' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-3 shadow-sm`}>
                                {msg.senderId !== 'currentUser' && (
                                  <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={msg.senderAvatar} />
                                      <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-medium">{msg.senderName}</span>
                                  </div>
                                )}
                                <p className={`text-sm ${msg.senderId === 'currentUser' ? 'text-white' : 'text-gray-800'}`}>
                                  {msg.content}
                                </p>
                                <div className={`text-xs mt-1 text-right flex items-center justify-end gap-1 ${msg.senderId === 'currentUser' ? 'text-blue-100' : 'text-gray-500'}`}>
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
                      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Users className="h-12 w-12 text-gray-300 mb-2" />
                        <h3 className="font-medium mb-1">Welcome to {groups.find(g => g.id === activeChat)?.name}</h3>
                        <p className="text-sm">Start the conversation by sending a message</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Attach file">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Send image">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button variant="ghost" size="icon" title="Add emoji">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Voice message">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="bg-blue-100 p-6 rounded-full mb-4">
                    <MessageSquare className="h-12 w-12 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to Community Messages</h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    Connect with fellow learners, join specialized groups, and get guidance from mentors.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setActiveChat('1')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Messaging
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('groups')}>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Group</DialogTitle>
            <DialogDescription>
              Create a group to discuss topics with peers and mentors
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="group-name" className="text-sm font-medium">Group Name</label>
              <Input 
                id="group-name" 
                placeholder="e.g., Machine Learning Study Group" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="group-description" className="text-sm font-medium">Group Description</label>
              <Input 
                id="group-description" 
                placeholder="A brief description of your group" 
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="group-tags" className="text-sm font-medium">Tags (comma separated)</label>
              <Input 
                id="group-tags" 
                placeholder="e.g., python, data-science, beginners" 
                value={newGroupTags}
                onChange={(e) => setNewGroupTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitNewGroup}>
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagingPage;
