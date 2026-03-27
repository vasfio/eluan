import { Meta, StoryObj } from '@storybook/react';
import { Banner } from './banner';

declare const meta: Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Info: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const Destructive: Story;
export declare const AllVariants: Story;
