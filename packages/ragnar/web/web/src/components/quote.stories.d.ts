import { Meta, StoryObj } from '@storybook/react';
import { Quote } from './quote';

declare const meta: Meta<typeof Quote>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Centered: Story;
export declare const Card: Story;
export declare const Minimal: Story;
