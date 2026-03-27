import { Meta, StoryObj } from '@storybook/react';
import { CreditCardInput } from './credit-card-input';

declare const meta: Meta<typeof CreditCardInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const IndividualInputs: Story;
export declare const AmexCVV: Story;
export declare const Disabled: Story;
