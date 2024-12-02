import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

export const TaskButtonDelete = ({ taskId }: { taskId: number }) => {
  const deleteTask = async () => {
    "use server";
    const supabase = await createClient();
    const taskDeleted = await supabase.from("tasks").delete().eq("id", taskId);

    console.log(taskDeleted);

    axios.post("/api/send").then((res) => console.log(res));

    revalidatePath("/");
  };
  return (
    <form action={deleteTask}>
      <input hidden value={1} />
      <Button type="submit" variant="destructive" onClick={deleteTask}>
        Delete
      </Button>
    </form>
  );
};
