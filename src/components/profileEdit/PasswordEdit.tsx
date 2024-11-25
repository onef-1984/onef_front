import Form from "@/components/forms/Form";
import styles from "./ProfileEdit.module.css";
import Map from "../util/Map";
import Clickable from "../clickable/Clickable";
import { handleSubmit, register, ErrorState } from "@/hooks/useSicilian/passwordEdit";
import { usePatchPasswordMutation } from "@/hooks/useMutation/usePatchPasswordMutation";
import { passwordEditArray } from "@/constants/edit/passwordEditArray";

export default function PasswordEdit() {
  const { mutate } = usePatchPasswordMutation();
  const errorState = ErrorState();

  return (
    <Form className={styles.root} onSubmit={handleSubmit((data) => mutate(data))}>
      <Map each={passwordEditArray}>
        {({ inputName, htmlFor }) => (
          <Form.InputWrapper key={inputName} htmlFor={htmlFor} inputName={inputName} errorMessage={errorState[htmlFor]}>
            <Form.Input {...register(htmlFor)} />
          </Form.InputWrapper>
        )}
      </Map>
      <Clickable className={styles.button}>변경</Clickable>
    </Form>
  );
}
