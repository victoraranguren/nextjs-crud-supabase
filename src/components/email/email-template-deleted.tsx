import * as React from "react";

interface EmailTemplateDeletedProps {
  id: string;
}

export const EmailTemplateDeleted: React.FC<
  Readonly<EmailTemplateDeletedProps>
> = ({ id }) => (
  <div>
    <h1>Hi,you deleted this task</h1>
    <h2>Id: {id}!</h2>
  </div>
);
