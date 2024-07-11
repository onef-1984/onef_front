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
    minLength: {
      number: 8,
      message: "비밀번호는 8자 이상이어야 합니다",
    },
    maxLength: {
      number: 16,
      message: "비밀번호는 16자 이하여야 합니다",
    },
    RegExp: [
      {
        RegExp: new RegExp("^[A-Za-z0-9!@#$%^&*()_+{}|:<>?~-]+$"),
        message: "비밀번호는 공백을 포함할 수 없습니다.",
      },
      {
        RegExp: new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[!@#$%^&*()._-]+$"),
        message: "비밀번호는 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다",
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
    minLength: {
      number: 2,
      message: "닉네임은 2자 이상이어야 합니다",
    },
    maxLength: {
      number: 8,
      message: "닉네임은 8자 이하여야 합니다",
    },
  };

  return { email, nickname, password, passwordCheck };
};
