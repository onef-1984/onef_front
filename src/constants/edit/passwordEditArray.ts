const oldPassword = {
  inputName: "기존 비밀번호",
  htmlFor: "oldPassword",
} as const;

const newPassword = {
  inputName: "신규 비밀번호",
  htmlFor: "newPassword",
} as const;

const newPasswordConfirm = {
  inputName: "신규 비밀번호 확인",
  htmlFor: "newPasswordConfirm",
} as const;

export const passwordEditArray = [oldPassword, newPassword, newPasswordConfirm];
