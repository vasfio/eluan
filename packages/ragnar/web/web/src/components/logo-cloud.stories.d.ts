import { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from './logo-cloud';

declare const meta: Meta<typeof LogoCloud>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Muted: Story;
export declare const Bordered: Story;
export declare const WithLinks: Story;
