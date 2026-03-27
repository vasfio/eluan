import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

declare const meta: Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Disabled: Story;
export declare const WithLabel: Story;
export declare const WithHelperText: Story;
