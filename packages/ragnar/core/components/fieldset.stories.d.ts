import { Meta, StoryObj } from '@storybook/react';
import { Fieldset } from './fieldset';

declare const meta: Meta<typeof Fieldset>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithCheckboxes: Story;
export declare const Disabled: Story;
