import { BaseShaderProps, ShaderPreset } from './types';
import * as React from "react";
export interface ShaderCanvasOGLProps extends BaseShaderProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Shader preset to use */
    preset?: ShaderPreset;
    /** Custom fragment shader (overrides preset) */
    fragmentShader?: string;
    /** Custom vertex shader */
    vertexShader?: string;
    /** Fourth color (for mesh gradient) */
    color4?: string;
}
/**
 * OGL-based shader canvas - lightweight WebGL shader renderer
 * Best for: 2D effects, backgrounds, simple animations
 */
declare const ShaderCanvasOGL: React.ForwardRefExoticComponent<ShaderCanvasOGLProps & React.RefAttributes<HTMLDivElement>>;
export { ShaderCanvasOGL };
