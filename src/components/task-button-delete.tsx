import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export const TaskButtonDelete = ({ taskId }: { taskId: number }) => {
  const deleteTask = async () => {
    "use server";
    const supabase = await createClient();
    const taskDeleted = await supabase.from("tasks").delete().eq("id", taskId);

    if (taskDeleted.status == 204) {
      console.log(`Task Deleted where id is: ${taskId}`);

      const emailSending = await fetch("http://localhost:3000/api/send", {
        method: "POST",
      });

      if (emailSending.status == 200) {
        console.log("Email delivered: ", emailSending);

        revalidatePath("/");
      }
    } else {
      console.error("Error deleting task");
    }
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
