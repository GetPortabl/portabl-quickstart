import createIssuanceWorkflow from '@/lib/api/create-issuance-workflow';
import getUserAccountByDid from '@/lib/api/get-user-account-by-did';
import sendInvitation from '@/lib/api/send-invitation';
import { NextResponse } from 'next/server';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function POST(req: Request) {
  try {
    const { userDID, projectId } = await req.json();

    const {
      data: { userId, datapointsVerified },
    } = await getUserAccountByDid({ userDID, projectId });
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
      statusChangeTerms: {
        status: 'SUSPENDED', // 'SUSPENDED', 'REVOKED'
        statusUpdateTrigger: 'WORKFLOW_COMPLETION', // 'WORKFLOW_CREATION', 'WORKFLOW_COMPLETION'
      },
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
    return new Response(`Error issuing: ${e.message}`, {
      status: 400,
    });
  }
}
