"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function TaskForm({ task }) {
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [priority, setPriority] = useState<any>("");

  useEffect(() => {
    if (task) {
      setName(task?.name);
      setDescription(task?.description);
      setPriority(task?.priority);
    }
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    console.log({ name, description, priority });

    const supabase = await createClient();
    const { data: tasks, error } = await supabase
      .from("tasks")
      .insert([{ name, description, priority }])
      .select();

    console.log(tasks);

    await fetch("/api/send", { method: "POST" });

    redirect("/");
  };

  const updateTask = async (e) => {
    e.preventDefault();

    console.log({ name, description, priority });

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tasks")
      .update({ name, description, priority })
      .eq("id", task?.id)
      .select();

    console.log(data);

    await fetch("/api/send", { method: "POST" });

    redirect("/");
  };

  const functionAction = task?.id ? updateTask : createTask;
  return (
    <form onSubmit={functionAction}>
      <input hidden value={task?.id} name="id" />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{task?.id ? "Edit" : "Create"} Task</CardTitle>
          <CardDescription>
            Fill out the form below to create a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of your task"
                defaultValue={task?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description of your task"
                defaultValue={task?.description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Priority</Label>
              <Select
                name="priority"
                defaultValue={task?.priority}
                onValueChange={(value: string) => {
                  setPriority(value);
                }}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </Link>
          <Button type="submit">{task?.id ? "Edit" : "Create"} Task</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
