export const passwordEditValidate = () => {
  const oldPassword = {
    required: true,
    minLength: 8,
    maxLength: 16,
    RegExp: [
      {
        RegExp: new RegExp("^[^\\s]+$"),
        message: "비밀번호는 공백을 포함할 수 없습니다.",
      },
      {
        RegExp: new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]+$"),
        message: "비밀번호는 소문자, 숫자, 특수문자를 모두 포함해야 합니다",
      },
    ],
  };

  const newPassword = {
    ...oldPassword,
    customChecker: {
      checkFn: (newPassword: string, store: { oldPassword: string }) => newPassword === store.oldPassword,
      message: "신규 비밀번호는 기존 비밀번호와 일치하지 않아야 합니다",
    },
  };

  const newPasswordConfirm = {
    ...oldPassword,
    customChecker: {
      checkFn: (newPasswordConfirm: string, store: { newPassword: string }) => newPasswordConfirm !== store.newPassword,
      message: "신규 비밀번호가 일치하지 않습니다",
    },
  };

  return { oldPassword, newPassword, newPasswordConfirm };
};
