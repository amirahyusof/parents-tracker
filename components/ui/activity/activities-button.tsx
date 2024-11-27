import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"


export function CreateTask(){
  return(
    <div>
      <Button asChild>
        <Link href="/activities/create">
          <PlusIcon />
          <span className="hidden md:block"></span>{' '} 
          Create New Task
        </Link>
      </Button>
    </div>
  )
}

export function ViewButton(){
  return(
    <div>
      <Button asChild>
        <Link href="">View</Link>
      </Button>
    </div>
  )
}

export function EditButton(){
  return(
    <div>
      <Button asChild>
        <Link href="">Edit</Link>
      </Button>
    </div>
  )
}

export function DeleteButton(){
  return(
    <div>
      <Button variant="destructive" asChild>
        <Link href="">Delete</Link>
      </Button>
    </div>
  )
}

export function FeedbackButton(){
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Feedback</DialogTitle>
        </DialogHeader>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="feedback" className="text-left">
              Your Feedback & Notes
            </Label>
            <Textarea placeholder="Type your feedback here." id="feedback" />
            <p className="text-sm text-muted-foreground">
              Your feedback and notes will be appear on logs.
            </p>
          </div>
        <DialogFooter>
          <Button type="submit">Add Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
  )
}
