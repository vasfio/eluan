import { Meta, StoryObj } from '@storybook/react';
import { Newsletter } from './newsletter';

declare const meta: Meta<typeof Newsletter>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithIcon: Story;
export declare const Primary: Story;
export declare const Gradient: Story;
export declare const Card: Story;
