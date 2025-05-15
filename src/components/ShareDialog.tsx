
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, Copy, Link, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/roadmapUtils';

interface ShareDialogProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

const ShareDialog = ({ title, url, children }: ShareDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const handleShare = async (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this ${title}: ${url}`)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${title}`)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'copy':
        await copyToClipboard(url);
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              text: `Check out this ${title}`,
              url: url,
            });
            toast({
              description: "Shared successfully"
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          await copyToClipboard(url);
        }
    }
    
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Input
            value={url}
            readOnly
            className="flex-1"
          />
          <Button size="sm" onClick={() => handleShare('copy')}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button variant="outline" className="flex-1" onClick={() => handleShare('whatsapp')}>
            <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
            WhatsApp
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => handleShare('twitter')}>
            <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
            Twitter
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => handleShare('linkedin')}>
            <Link className="h-4 w-4 mr-2 text-blue-700" />
            LinkedIn
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => handleShare('default')}>
            <Share2 className="h-4 w-4 mr-2" />
            More
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
