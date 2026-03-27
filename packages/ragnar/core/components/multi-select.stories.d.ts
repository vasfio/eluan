import { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './multi-select';

declare const meta: Meta<typeof MultiSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithPreselected: Story;
export declare const Searchable: Story;
export declare const MaxSelections: Story;
