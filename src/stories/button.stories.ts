import Clickable from "@/components/clickable/Clickable";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Button",
  component: Clickable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // 👇 This story expects a label arg

    children: {
      control: "text",
      description: "Overwritten description",
    },
    Component: {},
  },
  args: {
    onClick: fn(() => console.log("Clicked")),
    children: "Click me",
  },
} satisfies Meta<typeof Clickable>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: StoryObj<typeof meta> = {
  args: {},
};
