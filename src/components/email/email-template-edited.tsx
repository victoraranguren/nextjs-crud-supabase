import * as React from "react";

interface EmailTemplateEditedProps {
  id: string;
  name: string;
  description: string;
  priority: string;
}

export const EmailTemplateEdited: React.FC<
  Readonly<EmailTemplateEditedProps>
> = ({ id, name, description, priority }) => (
  <div>
    <h1>Hi,you edited this task</h1>
    <h2>Id: {id}!</h2>
    <h2>Name: {name}!</h2>
    <h2>Description: {description}!</h2>
    <h2>Priority: {priority}!</h2>
  </div>
);
