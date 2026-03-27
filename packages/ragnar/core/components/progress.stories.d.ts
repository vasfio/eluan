import { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

declare const meta: Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
export declare const Full: Story;
export declare const Indeterminate: Story;
export declare const AllValues: Story;
