"use client";
import TableView from "@/components/table-view";
import { createClient } from "@/utils/supabase/client";
import { Task } from "../db/db.types";
import { useEffect, useState } from "react";

const TableViewPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const getData = async () => {
      const supabase = await createClient();
      let { data, error } = await supabase.from("tasks").select("*");

      const tasks: Task[] = data || [];

      setTasks(tasks);
    };
    getData();
  }, []);

  return (
    <div>
      <TableView tasks={tasks} />
    </div>
  );
};

export default TableViewPage;
