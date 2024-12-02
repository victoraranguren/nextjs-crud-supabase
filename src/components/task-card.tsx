import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { TaskButtonDelete } from "./task-button-delete";
import Link from "next/link";
import { Task } from "@/app/db/db.types";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card>
      <CardHeader className=" flex flex-row justify-between items-center">
        <CardTitle className="text-2xl">{task.name}</CardTitle>
        <Badge
          className={clsx({
            "bg-red-500": task.priority == "high",
            "bg-yellow-500": task.priority == "medium",
            "bg-green-500": task.priority == "low",
            "bg-purple-500": task.priority == "urgent",
          })}
        >
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <span className="text-slate-600">
          {new Date(task.created_at).toLocaleDateString()}
        </span>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <TaskButtonDelete taskId={task.id} />
        <Link
          href={`/tasks/${task.id}/edit`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Edit
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
