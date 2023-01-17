import { EvidenceDocumentTypeEnum, EvidenceTypeEnum, IEvidence } from '../interfaces';

export const MOCKED_EVIDENCES: Array<IEvidence> = [
  {
    id: 'https://api.getportabl.com/api/v1/idv/sessions/12978f1a-3d70-486a-9ee5-921e91375bed',
    type: EvidenceTypeEnum.TraceableEvidence,
    verifier: {
      id: 'https://veriff.com',
      name: 'Veriff',
    },
    evidenceDocument: [
      {
        id: 'https://api.getportabl.com/api/v1/idv/sessions/12978f1a-3d70-486a-9ee5-921e91375bed/files/7398539e-3079-4cab-85ac-ea7c762d1fc4',
        type: EvidenceDocumentTypeEnum.Passport2023,
        'mime-type': 'image/jpg',
      },
    ],
    evidencedClaim: [
      '$.credentialSubject.firstName',
      '$.credentialSubject.lastName',
      '$.credentialSubject.birthDate',
      '$.credentialSubject.nationality',
    ],
  },
];
