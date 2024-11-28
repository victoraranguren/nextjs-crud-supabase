import TableView from "@/components/table-view";
import { createClient } from "@/utils/supabase/client";

const TableViewPage = async () => {
  const supabase = await createClient();
  let { data: tasks, error } = await supabase.from("tasks").select("*");

  console.log(tasks);

  return (
    <div>
      <TableView tasks={tasks} />
    </div>
  );
};

export default TableViewPage;
