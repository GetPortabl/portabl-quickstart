const PORTABL_API_DOMAIN = process.env.PORTABL_API_DOMAIN;
const PORTABL_CLIENT_ID = process.env.PORTABL_CLIENT_ID;
const PORTABL_CLIENT_SECRET = process.env.PORTABL_CLIENT_SECRET;
const baseUrl = `${PORTABL_API_DOMAIN}/api/v1`;
const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function POST(req: Request) {
  try {
    const tokenResponse = await fetch(`${baseUrl}/provider/token`, {
      method: 'POST',
      body: JSON.stringify({
        clientId: PORTABL_CLIENT_ID,
        clientSecret: PORTABL_CLIENT_SECRET,
      }),
    });

    const { accessToken } = await tokenResponse.json();

    const {
      params: { userAccountId },
    } = await req.json();

    const userDataResponse = await fetch(`${baseUrl}/provider/users/${userAccountId}`, { method: 'GET' });
    const { userId, projectId, datapointsVerified, userDID } = await userDataResponse.json();

    // Create Offer
    const createOfferResponse = await fetch(`${baseUrl}/issuance/offers`, {
      method: 'POST',
      body: JSON.stringify({
        projectId,
        userId,
        datapoints: datapointsVerified,
        expiresIn: DAY_IN_MS * 30, // 30 days
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    const { issuanceOffer } = await createOfferResponse.json();

    // Send Offer
    await fetch(`${baseUrl}/issuance/offers/${issuanceOffer.id}/send`, {
      method: 'POST',
      body: JSON.stringify({
        destinations: [
          {
            channel: 'DIDCOMM',
            target: userDID,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    return { issuanceOffer };
  } catch (e: any) {
    return new Response(`Error handling webhook: ${e.message}`, {
      status: 400,
    });
  }
}
