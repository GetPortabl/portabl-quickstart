import createIssuanceWorkflow from '@/lib/api/create-issuance-workflow';
import getUserAccount from '@/lib/api/get-user-account';
import sendInvitation from '@/lib/api/send-invitation';
import { PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID } from '@/lib/constants';
import { NextResponse } from 'next/server';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function POST(req: Request) {
  try {
    const {
      params: { userAccountId },
    } = await req.json();

    const {
      data: { projectId, userDID, userId, datapointsVerified },
    } = await getUserAccount({ userAccountId });

    if (projectId !== PORTABL_VERIFY_ISSUE_AUTH_PROJECT_ID) {
      return NextResponse.json({
        status: 200,
      });
    }

    const { id, ...datapoints } = datapointsVerified;

    // Create Issuance Workflow
    const {
      data: { issuanceWorkflow },
    } = await createIssuanceWorkflow({
      projectId,
      userDID,
      userId,
      datapoints,
      expiresIn: DAY_IN_MS * 30, // 30 days
    });

    // Send Invitation
    await sendInvitation({
      issuanceWorkflowId: issuanceWorkflow.id,
      destinations: [
        {
          channel: 'DIDCOMM',
        },
      ],
    });

    return NextResponse.json(
      { issuanceWorkflow },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return new Response(`Error handling webhook: ${e.message}`, {
      status: 400,
    });
  }
}
