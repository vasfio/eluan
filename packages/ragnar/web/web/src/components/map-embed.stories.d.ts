import { Meta, StoryObj } from '@storybook/react';
import { GoogleMapEmbed } from './map-embed';

declare const meta: Meta<typeof GoogleMapEmbed>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Google: Story;
export declare const OpenStreetMap: Story;
export declare const StaticImage: Story;
export declare const WithInfoCard: Story;
export declare const AspectRatios: Story;
export declare const RoundedVariants: Story;
export declare const SatelliteView: Story;
