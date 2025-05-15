
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  text: string;
  timestamp: Date;
}

interface GroupChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  currentUser: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const GroupChat: React.FC<GroupChatProps> = ({ open, onOpenChange, groupName, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=32', initials: 'PS' },
      text: 'Hello everyone! I just joined the Software Engineering group.',
      timestamp: new Date(Date.now() - 35 * 60000)
    },
    {
      id: 2,
      sender: { name: 'Raj Kumar', avatar: 'https://i.pravatar.cc/150?img=60', initials: 'RK' },
      text: 'Welcome Priya! I\'m currently studying DSA. Anyone else working on that?',
      timestamp: new Date(Date.now() - 30 * 60000)
    },
    {
      id: 3,
      sender: { name: 'Aisha Patel', avatar: 'https://i.pravatar.cc/150?img=23', initials: 'AP' },
      text: 'Yes, I\'m studying DSA too. The roadmap has been really helpful!',
      timestamp: new Date(Date.now() - 25 * 60000)
    },
    {
      id: 4,
      sender: { name: 'Mentor Vikram', avatar: 'https://i.pravatar.cc/150?img=68', initials: 'MV' },
      text: 'Great to see everyone engaged! Don\'t forget to check out the YouTube resources on algorithms. Let me know if you need any help!',
      timestamp: new Date(Date.now() - 15 * 60000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: currentUser,
        text: newMessage.trim(),
        timestamp: new Date()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {groupName} Group Chat
          </DialogTitle>
          <DialogDescription>
            Connect with other students and mentors
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 border rounded-md mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-3 ${message.sender.name === currentUser.name ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender.name !== currentUser.name && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>{message.sender.initials}</AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender.name === currentUser.name 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : message.sender.name.includes('Mentor') 
                        ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-gray-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.sender.name !== currentUser.name && (
                    <p className={`text-xs font-medium mb-1 ${message.sender.name.includes('Mentor') ? 'text-amber-700' : 'text-gray-600'}`}>
                      {message.sender.name}
                    </p>
                  )}
                  <p>{message.text}</p>
                  <p className={`text-xs text-right mt-1 ${message.sender.name === currentUser.name ? 'text-gray-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                
                {message.sender.name === currentUser.name && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>{message.sender.initials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupChat;
