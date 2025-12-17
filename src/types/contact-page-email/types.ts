// lib/types/ses-email.types.ts

export type EmailAddress = {
  email: string;
  name?: string;
};

export type SimpleEmailOptions = {
  to: string | string[];
  from: EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  tenantName?: string;
  configurationSetName?: string;
};

export type TemplatedEmailOptions = {
  to: string | string[];
  from: EmailAddress;
  templateName: string;
  templateData: Record<string, any>;
  replyTo?: string;
  tenantName?: string;
  configurationSetName?: string;
};

// for api

export type ContactFormData = {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export type  RequestBody =  {
  emails: string[]; // recipients
  dynamicTemplateData: ContactFormData;
  tenantName?: string;
}