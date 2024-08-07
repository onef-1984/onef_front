import Button from "../clickable/Button";
import InputWrapper from "../forms/InputWrapper";
import Label from "../forms/Label";
import Input from "@/components/forms/Input";
import Form from "@/components/forms/Form";
import styles from "./ProfileEdit.module.css";
import { handleSubmit, register, handleValidate, ErrorState } from "@/hooks/useSicilian/passwordEdit";
import { usePatchPasswordMutation } from "@/hooks/useMutation/usePatchPasswordMutation";
import { passwordEditValidate } from "@/constants/edit/passwordEditValidate";
import { passwordEditArray } from "@/constants/edit/passwordEditArray";

export default function PasswordEdit() {
  const { mutate } = usePatchPasswordMutation();

  const validator = handleValidate(passwordEditValidate());
  const errorState = ErrorState();

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) => mutate(data))}
      inputWrapper={
        <>
          {passwordEditArray.map(({ inputName, htmlFor }) => (
            <InputWrapper
              key={inputName}
              inputName={inputName}
              errorMessage={errorState[htmlFor]}
              label={
                <Label
                  errorMessage={errorState[htmlFor]}
                  htmlFor={htmlFor}
                  input={() => Input({ ...register(htmlFor, validator[htmlFor]) })}
                />
              }
            />
          ))}
        </>
      }
      button={<Button className={styles.button}>변경</Button>}
    />
  );
}
