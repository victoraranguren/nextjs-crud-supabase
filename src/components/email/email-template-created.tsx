import * as React from "react";

interface EmailTemplateProps {
  id: string;
  name: string;
  description: string;
  priority: string;
}

export const EmailTemplateCreated: React.FC<Readonly<EmailTemplateProps>> = ({
  id,
  name,
  description,
  priority,
}) => (
  <div>
    <h1>Hi, did you do this task</h1>
    <h2>Id: {id}</h2>
    <h2>Name: {name}!</h2>
    <h2>Description: {description}!</h2>
    <h2>Priority: {priority}!</h2>
  </div>
);
