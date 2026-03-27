import { Meta, StoryObj } from '@storybook/react';
import { CookieBanner } from './cookie-banner';

declare const meta: Meta<typeof CookieBanner>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithTitle: Story;
export declare const Corner: Story;
export declare const Dark: Story;
export declare const Preferences: Story;
