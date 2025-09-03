import { test as base, request, expect } from '@playwright/test';
import { url } from './urls';
import 'dotenv/config'

export const test = base.extend<{
  token: string;
}>({
  token: async ({}, use) => {
    const ctx = await request.newContext();
    const clientId = process.env.HUB_TOKEN_LOGIN;
    const clientSecret = process.env.HUB_TOKEN_PASSWORD;

    if (!clientId || !clientSecret) {
      throw new Error('Missing CLIENT_ID ou CLIENT_SECRET in .env')
    }

    const resp = await ctx.post(url.hub.auth, {
      form: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
    });
    expect(resp.ok()).toBeTruthy();

    const data = await resp.json();
    const token = data.access_token;

    await ctx.dispose();

    await use(token);
  },
});
