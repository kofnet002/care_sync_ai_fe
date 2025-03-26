import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { PhoneOff, PhoneOutgoing, Video } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

interface PageProps {
  doctor: { image: string; name: string };
  isVideoCall?: boolean;
}

export function CallModal({ doctor, isVideoCall }: PageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isVideoCall ? (
          <Video className="hover:text-white" size={16} />
        ) : (
          <PhoneOutgoing className="hover:text-white" size={16} />
        )}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center p-12">
        <div className="rounded-full space-x-2">
          <div className="relative flex items-center justify-center h-48">
            <div className="absolute w-32 h-32 border-4 border-blue-500/30 rounded-full animate-[ping_2s_ease-out_infinite]"></div>
            <div className="absolute w-32 h-32 border-4 border-blue-500/20 rounded-full animate-[ping_2s_ease-out_infinite_500ms]"></div>
            <div className="absolute w-32 h-32 border-4 border-blue-500/10 rounded-full animate-[ping_2s_ease-out_infinite_1000ms]"></div>
            <Avatar className="w-32 h-32 relative">
              <AvatarImage src={doctor.image} />
              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-xl font-medium">{doctor.name}</h3>
            <p className="text-base text-black text-center">Connecting...</p>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button className="ring-0 rounded-full w-16 h-16 p-4 bg-red-400 hover:bg-red-600">
              <PhoneOff size={16} />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
