import { ICredential } from '@sphereon/ssi-types';

export type EnvType = 'dev' | 'production';

export interface IKYCRegistrationAddressDetailsInput {
  readonly streetAddress?: string;
  readonly locality?: string;
  readonly region?: string;
  readonly postalCode?: string;
  readonly country?: string;
}

export interface IKYCClaimsInput {
  readonly emailAddress?: string;
  readonly phoneNumber?: string;
  readonly firstName?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly honorificPrefix?: string;
  readonly honorificSuffix?: string;
  readonly birthDate?: string;
  readonly birthPlace?: string;
  readonly nationality?: string;
  readonly sex?: string;
  readonly passportNumber?: string;
  readonly driverLicenseId?: string;
  readonly socialSecurityNumber?: string;
  readonly registrationAddressDetails?: IKYCRegistrationAddressDetailsInput;
}

export interface IAuthenticateBackupSessionRequestDto {
  readonly env: EnvType;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly correlationId?: string;
  readonly dataProfileVersion?: string;
}

export interface IAuthResponse {
  readonly tokenType: 'Bearer';
  readonly scope: string;
  readonly accessToken: string;
  readonly expiresIn: number;
  readonly refreshToken?: string;
  readonly idToken?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuthenticateBackupSessionResponseDto extends IAuthResponse {}

export interface ILoadBackupDataRequestDto {
  readonly nativeUserId: string;
  readonly claims: IKYCClaimsInput;
  readonly evidences?: Array<IEvidence>;
}

export interface ICredentialStatus {
  readonly id: string;
  readonly type: string;
}

export enum EvidenceTypeEnum {
  TraceableEvidence = 'TraceableEvidence',
  // TraceableEvidence2023 = 'TraceableEvidence2023',
}

export interface IImageDescriptor {
  readonly uri: string;
  readonly alt: string;
}

export interface IStyleObject {
  readonly color: string;
}

export interface IEntityStyleDescriptor {
  readonly thumbnail?: IImageDescriptor;
  readonly hero?: IImageDescriptor;
  readonly background?: IStyleObject;
  readonly text?: IStyleObject;
}

export interface IVerifierObject {
  readonly id: string;
  readonly name?: string;
  readonly styles?: IEntityStyleDescriptor;
}

export enum EvidenceDocumentTypeEnum {
  IdCard2023 = 'IdCard2023',
  Passport2023 = 'Passport2023',
  DriversLicense2023 = 'DriversLicense2023',
  SocialSecurity2023 = 'SocialSecurity2023',
  ResidencePermit2023 = 'ResidencePermit2023',
}

export interface IEvidenceDocument {
  readonly id: string;
  readonly type: EvidenceDocumentTypeEnum;
  readonly 'mime-type': string;
  readonly name?: string;
  readonly size?: string;
  readonly timestamp?: string;
}

export interface IEvidence {
  readonly id: string;
  readonly type: EvidenceTypeEnum.TraceableEvidence;
  readonly verifier: string | IVerifierObject;
  readonly evidenceDocument: IEvidenceDocument | Array<IEvidenceDocument>;
  readonly evidencedClaim?: string | Array<string>;
  readonly acceptanceTime?: string;
  readonly decisionTime?: string;
}

export interface IJsonLdCredential extends ICredential {
  readonly credentialStatus?: ICredentialStatus;
  readonly evidence?: IEvidence | Array<IEvidence>;
}

export interface IVerifiableDocumentMetaModel {
  readonly correlationId?: string;
  readonly credentialManifestId?: string;
}

export interface IVerifiableDocumentModel {
  readonly id: string;
  readonly data: IJsonLdCredential;
  readonly meta?: IVerifiableDocumentMetaModel;
}

export interface ILoadBackupDataResponseDto {
  readonly verifiableDocument: IVerifiableDocumentModel;
}
