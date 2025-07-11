export interface ValidateInvitationResponse {
  isValid: boolean;
  message?: string;
  email?: string;
  organizationId?: string;
}
