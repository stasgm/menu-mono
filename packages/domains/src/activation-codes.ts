export interface IActivationCode {
  id: string;
  userId: string;
  code: string;
  attempts: number;
}

export const getActivationCode = (
  activationCodes: IActivationCode[],
  activationCodeId: string,
): IActivationCode => {
  const activationCode = activationCodes.find((p) => p.id === activationCodeId);

  if (!activationCode) {
    throw new Error('ActivationCode not found');
  }

  return activationCode;
};
