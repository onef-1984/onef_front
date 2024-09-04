import InputWrapper from "../forms/InputWrapper";
import Input from "@/components/forms/Input";
import Form from "@/components/forms/Form";
import styles from "./ProfileEdit.module.css";
import { handleSubmit, register, handleValidate, ErrorState } from "@/hooks/useSicilian/passwordEdit";
import { usePatchPasswordMutation } from "@/hooks/useMutation/usePatchPasswordMutation";
import { passwordEditValidate } from "@/constants/edit/passwordEditValidate";
import { passwordEditArray } from "@/constants/edit/passwordEditArray";
import { Map } from "../util/Map";
import Clickable from "../clickable/Clickable";

export default function PasswordEdit() {
  const { mutate } = usePatchPasswordMutation();

  const validator = handleValidate(passwordEditValidate());
  const errorState = ErrorState();

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) => mutate(data))}
      inputWrapper={
        <Map each={passwordEditArray}>
          {({ inputName, htmlFor }) => (
            <InputWrapper key={inputName} htmlFor={htmlFor} inputName={inputName} errorMessage={errorState[htmlFor]}>
              <Input {...register(htmlFor, validator[htmlFor])} />
            </InputWrapper>
          )}
        </Map>
      }
      button={<Clickable className={styles.button}>변경</Clickable>}
    />
  );
}
