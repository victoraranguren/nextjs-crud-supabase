import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./theme-toggle-button";

function Navbar() {
  return (
    <nav className="flex justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          NextSupabaseCRUD
        </h1>
      </Link>

      <div className="flex gap-x-2 items-center">
        <Link href="/new" className={buttonVariants({ variant: "secondary" })}>
          Create Task
        </Link>

        <Link
          href="/table-view"
          className={buttonVariants({ variant: "secondary" })}
        >
          Table View
        </Link>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
