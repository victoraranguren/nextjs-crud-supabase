import TaskCard from "@/components/task-card";
import { createClient } from "@/utils/supabase/client";

const HomePage = async () => {
  const supabase = await createClient();
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  console.log(tasks);

  return (
    <div className="grid grid-cols-3 gap-4">
      {tasks?.map((task) => {
        console.log(task);
        return <TaskCard task={task} />;
      })}
    </div>
  );
};

export default HomePage;