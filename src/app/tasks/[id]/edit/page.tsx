import { TaskForm } from "@/app/new/task-form";
import { createClient } from "@/utils/supabase/client";

const TaskPageEdit = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  console.log({ id });

  const supabase = await createClient();

  const { data, error } = await supabase.from("tasks").select().eq("id", id);

  if (!data) return;

  const task = data ? data[0] : undefined;

  console.log(task);

  return (
    <div className="flex justify-center items-center h-screen">
      <TaskForm task={task} />
    </div>
  );
};

export default TaskPageEdit;
