import TableView from "@/components/table-view";
import { createClient } from "@/utils/supabase/client";
import { Task } from "../db/db.types";

const TableViewPage = async () => {
  const supabase = await createClient();
  let { data, error } = await supabase.from("tasks").select("*");

  const tasks: Task[] = data || [];

  console.log(tasks);

  return (
    <div>
      <TableView tasks={tasks} />
    </div>
  );
};

export default TableViewPage;
