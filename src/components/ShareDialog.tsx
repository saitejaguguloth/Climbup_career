
import React, { useState } from 'react';
import { Check, Copy, Facebook, Link, Twitter, WhatsApp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { copyToClipboard } from '@/utils/roadmapUtils';
import { toast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange, title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The roadmap link has been copied to your clipboard."
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this career roadmap: ${title}`)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`Check out this career roadmap: ${title}`)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this career roadmap: ${title} ${url}`)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Roadmap</DialogTitle>
          <DialogDescription>
            Share this roadmap with your friends or classmates
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mt-4">
          <Input 
            value={url} 
            readOnly 
            className="flex-1"
          />
          <Button size="icon" variant="outline" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Button 
            onClick={() => handleShare('twitter')} 
            size="lg"
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 px-6"
          >
            <Twitter className="h-8 w-8 text-sky-500" />
            <span className="text-sm">Twitter</span>
          </Button>
          
          <Button 
            onClick={() => handleShare('facebook')} 
            size="lg"
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 px-6"
          >
            <Facebook className="h-8 w-8 text-blue-600" />
            <span className="text-sm">Facebook</span>
          </Button>
          
          <Button 
            onClick={() => handleShare('whatsapp')} 
            size="lg"
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 px-6"
          >
            <WhatsApp className="h-8 w-8 text-green-500" />
            <span className="text-sm">WhatsApp</span>
          </Button>
        </div>

        <DialogFooter className="sm:justify-center mt-4">
          <Button 
            variant="ghost" 
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            <Link className="h-4 w-4" />
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
