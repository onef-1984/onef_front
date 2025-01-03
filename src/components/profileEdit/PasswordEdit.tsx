import Form from "@/components/forms/Form";
import styles from "./PasswordEdit.module.css";
import { Map } from "utilinent";
import Clickable from "../clickable/Clickable";
import { handleSubmit, register, ErrorState } from "@/hooks/useSicilian/passwordEdit";
import { usePatchPasswordMutation } from "@/hooks/useMutation/usePatchPasswordMutation";
import { passwordEditArray } from "@/constants/edit/passwordEditArray";
import { SicilianProvider } from "sicilian";
import omit from "@/utils/omit";

export default function PasswordEdit() {
  const { mutate } = usePatchPasswordMutation();

  return (
    <Form className={styles.root} onSubmit={handleSubmit((data) => mutate(omit(data, ["newPasswordConfirm"])))}>
      <Map each={passwordEditArray}>
        {({ inputName, htmlFor }) => (
          <SicilianProvider value={{ register, name: htmlFor, ErrorState }}>
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
