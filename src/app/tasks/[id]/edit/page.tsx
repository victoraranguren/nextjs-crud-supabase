"use client";

import { TaskForm } from "@/app/new/task-form";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const TaskPageEdit = ({ params }: { params: Promise<{ id: string }> }) => {
  const [task, setTask] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      const { id } = await params;

      const supabase = await createClient();

      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("id", id);

      if (!data) return;

      const task = data ? data[0] : undefined;
      setTask(task);
    };
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <TaskForm task={task} />
    </div>
  );
};

export default TaskPageEdit;
