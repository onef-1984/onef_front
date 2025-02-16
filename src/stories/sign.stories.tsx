import type { Meta, StoryObj } from "@storybook/react";
import Form from "@/components/forms/Form";
import { SicilianProvider } from "sicilian/provider";
import { register } from "../hooks/useSicilian/signIn";

function InputForm() {
  return (
    <Form>
      <SicilianProvider value={{ register, name: "email" }}>
        <Form.InputWrapper>
          <Form.Input type="text" placeholder="email" />
        </Form.InputWrapper>
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "password" }}>
        <Form.InputWrapper>
          <Form.Input type="text" placeholder="password" />
        </Form.InputWrapper>
      </SicilianProvider>
    </Form>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "signin",
  component: InputForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputForm>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: StoryObj<typeof meta> = {
  args: {},
};
