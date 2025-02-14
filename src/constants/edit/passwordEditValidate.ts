export const passwordEditValidate = () => {
  const oldPassword = {
    required: { required: true, message: "비밀번호를 입력해주세요" },
    minLength: { number: 8, message: "비밀번호는 8자 이상이어야 합니다" },
    maxLength: { number: 16, message: "비밀번호는 16자 이하여야 합니다" },
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
    custom: {
      checkFn: (newPassword: string, store: { oldPassword: string }) => newPassword !== store.oldPassword,
      message: "신규 비밀번호는 기존 비밀번호와 일치하지 않아야 합니다",
    },
  };

  const newPasswordConfirm = {
    ...oldPassword,
    custom: {
      checkFn: (newPasswordConfirm: string, store: { newPassword: string }) => newPasswordConfirm === store.newPassword,
      message: "신규 비밀번호가 일치하지 않습니다",
    },
  };

  return { oldPassword, newPassword, newPasswordConfirm };
};
