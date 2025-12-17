
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

import {
  EmailAddress,
  SimpleEmailOptions,
  TemplatedEmailOptions,
} from "../types/contact-page-email/types";


const createSESClient = () => {
  return new SESv2Client({
    region: process.env.AWS_REGION || "eu-central-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
};

const sesClient = createSESClient();



function formatEmailAddress(email: EmailAddress): string {
  return email.name ? `${email.name} <${email.email}>` : email.email;
}

function normalizeRecipients(to: string | string[]): string[] {
  return Array.isArray(to) ? to : [to];
}

function getEmailRecipients(to: string | string[]): string[] {
  const recipients = normalizeRecipients(to);

  if (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  ) {
    return recipients;
  }

  const testEmail = process.env.DEV_TEST_EMAIL || "wyachou95@gmail.com";
  return [testEmail];
}


export async function sendEmail(options: SimpleEmailOptions): Promise<void> {
  const recipients = getEmailRecipients(options.to);

  const configurationSetName = options.configurationSetName || "default";

  const command = new SendEmailCommand({
    FromEmailAddress: formatEmailAddress(options.from),
    Destination: {
      ToAddresses: recipients,
    },
    ConfigurationSetName: configurationSetName,
    TenantName: options.tenantName,
    ReplyToAddresses: options.replyTo ? [options.replyTo] : undefined,
    Content: {
      Simple: {
        Subject: {
          Data: options.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: options.html
            ? {
                Data: options.html,
                Charset: "UTF-8",
              }
            : undefined,
          Text: options.text
            ? {
                Data: options.text,
                Charset: "UTF-8",
              }
            : undefined,
        },
      },
    },
  });

  await sesClient.send(command);
}

// Send templated email
export async function sendTemplatedEmail(
  options: TemplatedEmailOptions
): Promise<void> {
  const recipients = getEmailRecipients(options.to);

  const configurationSetName = options.configurationSetName || "default";

  const command = new SendEmailCommand({
    FromEmailAddress: formatEmailAddress(options.from),
    Destination: {
      ToAddresses: recipients,
    },
    ConfigurationSetName: configurationSetName,
    TenantName: options.tenantName,
    ReplyToAddresses: options.replyTo ? [options.replyTo] : undefined,
    Content: {
      Template: {
        TemplateName: options.templateName,
        TemplateData: JSON.stringify(options.templateData),
      },
    },
  });

  await sesClient.send(command);
}