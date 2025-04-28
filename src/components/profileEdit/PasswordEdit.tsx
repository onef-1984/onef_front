import Form from "@/components/forms/Form";
import styles from "./PasswordEdit.module.css";
import { Map } from "utilinent";
import Clickable from "../clickable/Clickable";
import { handleSubmit, register, getErrors } from "@/hooks/useSicilian/passwordEdit";
import { passwordEditArray } from "@/constants/edit/passwordEditArray";
import { SicilianProvider } from "sicilian/provider";
import omit from "@/utils/omit";
import { useUserMutator } from "@/hooks/useMutator/useUserMutator";

export default function PasswordEdit() {
  const { ChangePasswordMutate } = useUserMutator();

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) => ChangePasswordMutate(omit(data, ["newPasswordConfirm"])))}
    >
      <Map each={passwordEditArray}>
        {({ inputName, htmlFor }) => (
          <SicilianProvider value={{ register, name: htmlFor, getErrors }}>
            <Form.InputWrapper key={inputName} inputName={inputName}>
              <Form.Input />
            </Form.InputWrapper>
          </SicilianProvider>
        )}
      </Map>
      <Clickable className={styles.button}>변경</Clickable>
    </Form>
  );
}
