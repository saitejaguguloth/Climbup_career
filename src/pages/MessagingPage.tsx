
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Users, Search, Plus, Send, Paperclip, MoreVertical } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Message type definition
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
}

// Group type definition
interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: number;
  lastMessage?: string;
  unread: number;
  isMentorGroup?: boolean;
}

const MessagingPage = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    { 
      id: '1', 
      name: 'Software Engineering', 
      avatar: 'https://i.pravatar.cc/150?img=1', 
      members: 156, 
      lastMessage: 'Anyone know good resources for system design?', 
      unread: 3,
      isMentorGroup: false
    },
    { 
      id: '2', 
      name: 'Data Science Community', 
      avatar: 'https://i.pravatar.cc/150?img=2', 
      members: 89, 
      lastMessage: 'Just posted a new tutorial on pandas!', 
      unread: 0,
      isMentorGroup: false
    },
    { 
      id: '3', 
      name: 'Mentors Connect', 
      avatar: 'https://i.pravatar.cc/150?img=3', 
      members: 42, 
      lastMessage: 'Office hours today at 3 PM', 
      unread: 5,
      isMentorGroup: true
    },
    { 
      id: '4', 
      name: 'Frontend Developers', 
      avatar: 'https://i.pravatar.cc/150?img=4', 
      members: 201, 
      lastMessage: 'What do you think about the new React docs?', 
      unread: 0,
      isMentorGroup: false
    },
  ]);
  
  const [messages, setMessages] = useState<{ [groupId: string]: Message[] }>({
    '1': [
      {
        id: '1-1',
        senderId: 'user1',
        senderName: 'Aarav Kumar',
        senderAvatar: 'https://i.pravatar.cc/150?img=11',
        content: 'Hey everyone! I\'m working on my first system design project. Any advice?',
        timestamp: new Date('2023-11-10T09:30:00')
      },
      {
        id: '1-2',
        senderId: 'user2',
        senderName: 'Priya Sharma',
        senderAvatar: 'https://i.pravatar.cc/150?img=12',
        content: 'Start small and focus on the core components. Don\'t try to build everything at once.',
        timestamp: new Date('2023-11-10T09:32:00')
      },
      {
        id: '1-3',
        senderId: 'user3',
        senderName: 'Dev Patel',
        senderAvatar: 'https://i.pravatar.cc/150?img=13',
        content: 'Check out "System Design Interview" by Alex Xu. It helped me a lot!',
        timestamp: new Date('2023-11-10T09:35:00')
      }
    ],
    '3': [
      {
        id: '3-1',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Iyer',
        senderAvatar: 'https://i.pravatar.cc/150?img=21',
        content: 'I\'ll be hosting office hours today at 3 PM IST to discuss career paths in AI.',
        timestamp: new Date('2023-11-09T15:00:00')
      },
      {
        id: '3-2',
        senderId: 'mentor2',
        senderName: 'Sanya Mehta',
        senderAvatar: 'https://i.pravatar.cc/150?img=22',
        content: 'I can review resumes during my slot tomorrow. Please upload them before noon.',
        timestamp: new Date('2023-11-09T15:05:00')
      },
      {
        id: '3-3',
        senderId: 'user4',
        senderName: 'Arjun Singh',
        senderAvatar: 'https://i.pravatar.cc/150?img=14',
        content: 'I\'ll be there! I have some questions about AI certifications.',
        timestamp: new Date('2023-11-09T15:10:00')
      },
      {
        id: '3-4',
        senderId: 'user5',
        senderName: 'Neha Gupta',
        senderAvatar: 'https://i.pravatar.cc/150?img=15',
        content: 'Can we also discuss internship opportunities?',
        timestamp: new Date('2023-11-09T15:15:00')
      },
      {
        id: '3-5',
        senderId: 'mentor1',
        senderName: 'Dr. Rajesh Iyer',
        senderAvatar: 'https://i.pravatar.cc/150?img=21',
        content: 'Absolutely! I\'ll cover internship strategies as well.',
        timestamp: new Date('2023-11-09T15:20:00')
      }
    ]
  });

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.lastMessage && group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: `${activeChat}-${Date.now()}`,
      senderId: 'currentUser',
      senderName: 'You',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    setMessage('');
    
    // Mark messages as read
    setGroups(prev => 
      prev.map(group => 
        group.id === activeChat ? { ...group, unread: 0 } : group
      )
    );
  };

  const handleCreateGroup = () => {
    // In a real app, this would open a modal with a form
    toast({
      title: "Create Group",
      description: "Group creation would be implemented here with a form"
    });
  };

  // Format timestamp to a human-readable string
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
                              <span className="text-xs text-gray-500">12:30 PM</span>
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
                          <p className="text-xs text-gray-500">{group.members} members</p>
                        </div>
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
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages[activeChat] ? (
                      messages[activeChat].map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}>
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
                            <p className={`text-xs mt-1 text-right ${msg.senderId === 'currentUser' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Select a chat to start messaging
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
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
                  <p className="text-gray-500 mb-4 max-w-md">
                    Connect with fellow learners, join specialized groups, and get guidance from mentors.
                  </p>
                  <Button onClick={() => setActiveChat('1')}>Start Messaging</Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessagingPage;
