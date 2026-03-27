import { Meta, StoryObj } from '@storybook/react';
import { NavigationDrawer } from './navigation-drawer';

declare const meta: Meta<typeof NavigationDrawer>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithGroups: Story;
export declare const Collapsed: Story;
