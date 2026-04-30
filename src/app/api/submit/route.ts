import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

type LeadPayload = {
  situation?: string | null;
  urgency?: string | null;
  amount?: string | null;
  income?: string | null;
  credit?: string | null;
  resources?: string[];
  employment?: string | null;
  state?: string | null;
  firstName?: string;
  email?: string;
  phone?: string;
  comment?: string;
  score?: number;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

let clientPromise: Promise<MongoClient> | null = null;

function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  return clientPromise;
}

async function saveLeadToMongo(payload: LeadPayload): Promise<void> {
  const client = await getMongoClient();
  if (!client) return;

  const dbName = process.env.MONGODB_DB || 'emergencyfundguides';
  const collectionName = process.env.MONGODB_COLLECTION || 'leads';

  await client.db(dbName).collection(collectionName).insertOne({
    ...payload,
    createdAt: new Date(),
  });
}

async function sendLeadEmail(payload: LeadPayload): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'EmergencyFundGuides <onboarding@resend.dev>';
  if (!resendApiKey || !notifyEmail) return;

  const html = `
    <h2>New EmergencyFundGuides lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.firstName || '-')}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email || '-')}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || '-')}</p>
    <p><strong>State:</strong> ${escapeHtml(payload.state || '-')}</p>
    <p><strong>Score:</strong> ${String(payload.score ?? '-')}</p>
    <p><strong>Situation:</strong> ${escapeHtml(payload.situation || '-')}</p>
    <p><strong>Urgency:</strong> ${escapeHtml(payload.urgency || '-')}</p>
    <p><strong>Amount:</strong> ${escapeHtml(payload.amount || '-')}</p>
    <p><strong>Income:</strong> ${escapeHtml(payload.income || '-')}</p>
    <p><strong>Credit:</strong> ${escapeHtml(payload.credit || '-')}</p>
    <p><strong>Employment:</strong> ${escapeHtml(payload.employment || '-')}</p>
    <p><strong>Resources:</strong> ${escapeHtml((payload.resources || []).join(', ') || '-')}</p>
    <p><strong>Comment:</strong> ${escapeHtml(payload.comment || '-')}</p>
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject: `New lead: ${payload.email ?? 'unknown email'}`,
      html,
    }),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    if (!body.email || !String(body.email).includes('@')) {
      return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 400 });
    }

    await Promise.allSettled([saveLeadToMongo(body), sendLeadEmail(body)]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to submit lead' }, { status: 500 });
  }
}
