import { EmailTemplateDeleted } from "@/components/email/email-template-deleted";
import { NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function POST(req: Request, res: NextApiResponse) {
  try {
    const { id } = await req.json();
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["victoraranguren.dev@gmail.com"],
      subject: "Task Created",
      react: EmailTemplateDeleted({ id }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
