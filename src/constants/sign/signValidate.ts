export const SignValidate = () => {
  const email = {
    required: true,
    RegExp: {
      RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      message: "이메일 형식과 맞지 않습니다",
    },
  };

  const password = {
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

  const passwordCheck = {
    ...password,
    customChecker: {
      checkFn: (value: string, store: { password: string }) => value !== store.password,
      message: "비밀번호가 일치하지 않습니다",
    },
  };

  const nickname = {
    required: true,
    minLength: 2,
    maxLength: 8,
  };

  return { email, nickname, password, passwordCheck };
};
