import { Meta, StoryObj } from '@storybook/react';
import { HeaderNavigation } from './header-navigation';

declare const meta: Meta<typeof HeaderNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Sticky: Story;
export declare const WithActiveItem: Story;
export declare const Transparent: Story;
