// app/api/ses/route.ts
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/ses-email'

import { ContactFormData, RequestBody } from '@/types/contact-page-email/types'

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()

    const fromEmail = {
      name: 'WY Studio',
      email: 'info@wystudio.be',
    }

    const subject = 'Nieuwe contactaanvraag'
    const data = body.dynamicTemplateData

    const html = `
      <p><strong>Naam:</strong> ${data.name || ''}</p>
      <p><strong>E-mail:</strong> ${data.email || ''}</p>
      <p><strong>Telefoonnummer:</strong> ${data.phoneNumber || ''}</p>
      <br>
      <p><strong>Bericht:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
    `

    const text = `
Naam: ${data.name || ''}
E-mail: ${data.email || ''}
Telefoonnummer: ${data.phoneNumber || ''}

Bericht:
${data.message || ''}
    `.trim()

    await sendEmail({
      to: body.emails,
      from: fromEmail,
      subject,
      html,
      text,
      replyTo: data.email,
      tenantName: body.tenantName,
    })

    return new NextResponse('Email sent successfully', { status: 200 })
  } catch (err) {
    console.error('Failed to send email:', err)
    return new NextResponse(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}