import { Meta, StoryObj } from '@storybook/react';
import { FileInput } from './file-input';

declare const meta: Meta<typeof FileInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Dropzone: Story;
export declare const MultipleFiles: Story;
export declare const WithMaxSize: Story;
export declare const ImageOnly: Story;
export declare const DocumentOnly: Story;
export declare const NoPreview: Story;
export declare const CustomDropzoneText: Story;
export declare const Disabled: Story;
