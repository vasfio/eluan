import { ShaderCanvasOGLProps } from './shader-canvas-ogl';
import { BaseShaderProps } from './types';
import * as React from "react";
export interface ShaderBackgroundProps extends Omit<ShaderCanvasOGLProps, "preset">, React.HTMLAttributes<HTMLDivElement> {
    /** Shader preset */
    shader: ShaderCanvasOGLProps["preset"];
    /** Children to render on top */
    children?: React.ReactNode;
    /** Overlay opacity (0-1) for better text readability */
    overlay?: number;
    /** Overlay color */
    overlayColor?: string;
    /** Whether to use fixed positioning */
    fixed?: boolean;
}
declare const ShaderBackground: React.ForwardRefExoticComponent<ShaderBackgroundProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderGradientProps extends BaseShaderProps {
    className?: string;
    /** Gradient colors (3 colors) */
    colors?: [string, string, string];
}
declare const ShaderGradient: React.ForwardRefExoticComponent<ShaderGradientProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderAuroraProps extends BaseShaderProps {
    className?: string;
    /** Aurora colors (3 colors) */
    colors?: [string, string, string];
}
declare const ShaderAurora: React.ForwardRefExoticComponent<ShaderAuroraProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderBlobProps extends BaseShaderProps {
    className?: string;
    /** Blob colors (3 colors) */
    colors?: [string, string, string];
}
declare const ShaderBlob: React.ForwardRefExoticComponent<ShaderBlobProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderNoiseProps extends BaseShaderProps {
    className?: string;
    /** Noise color */
    color?: string;
}
declare const ShaderNoise: React.ForwardRefExoticComponent<ShaderNoiseProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderWaveProps extends BaseShaderProps {
    className?: string;
    /** Wave colors (2 colors) */
    colors?: [string, string];
}
declare const ShaderWave: React.ForwardRefExoticComponent<ShaderWaveProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderMeshProps extends BaseShaderProps {
    className?: string;
    /** Mesh gradient colors (4 colors for corners) */
    colors?: [string, string, string, string];
}
declare const ShaderMesh: React.ForwardRefExoticComponent<ShaderMeshProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderParticlesProps extends BaseShaderProps {
    className?: string;
    /** Particle colors (2 colors) */
    colors?: [string, string];
}
declare const ShaderParticles: React.ForwardRefExoticComponent<ShaderParticlesProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderHeroProps extends ShaderBackgroundProps {
    /** Title text */
    title?: string;
    /** Subtitle text */
    subtitle?: string;
    /** Hero size */
    size?: "sm" | "default" | "lg" | "full";
    /** Content alignment */
    align?: "left" | "center" | "right";
}
declare const ShaderHero: React.ForwardRefExoticComponent<ShaderHeroProps & React.RefAttributes<HTMLDivElement>>;
export interface ShaderCardProps extends Omit<ShaderBackgroundProps, "children"> {
    /** Card content */
    children?: React.ReactNode;
    /** Card padding */
    padding?: "sm" | "default" | "lg";
    /** Border radius */
    rounded?: "sm" | "default" | "lg" | "xl" | "2xl" | "full";
}
declare const ShaderCard: React.ForwardRefExoticComponent<ShaderCardProps & React.RefAttributes<HTMLDivElement>>;
export { ShaderBackground, ShaderGradient, ShaderAurora, ShaderBlob, ShaderNoise, ShaderWave, ShaderMesh, ShaderParticles, ShaderHero, ShaderCard, };
