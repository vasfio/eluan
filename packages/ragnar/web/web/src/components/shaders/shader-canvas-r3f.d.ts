import { BaseShaderProps, ShaderPreset } from './types';
import * as React from "react";
export interface ShaderCanvasR3FProps extends BaseShaderProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Shader preset to use */
    preset?: ShaderPreset;
    /** Custom fragment shader (overrides preset) */
    fragmentShader?: string;
    /** Custom vertex shader */
    vertexShader?: string;
    /** Fourth color (for mesh gradient) */
    color4?: string;
    /** Enable 3D mode (perspective camera) */
    mode3D?: boolean;
}
/**
 * React Three Fiber shader canvas - full 3D WebGL renderer
 * Best for: 3D effects, complex animations, post-processing
 *
 * Note: Requires three.js as a peer dependency.
 * Install with: npm install three @types/three
 */
declare const ShaderCanvasR3F: React.ForwardRefExoticComponent<ShaderCanvasR3FProps & React.RefAttributes<HTMLDivElement>>;
export { ShaderCanvasR3F };
