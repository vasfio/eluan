import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';

declare const meta: Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Multiple: Story;
