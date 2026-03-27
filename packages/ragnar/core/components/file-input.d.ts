import * as React from "react";
type FileType = "image" | "document" | "video" | "audio" | "archive" | "other";
interface FileInfo {
    file: File;
    preview?: string;
    type: FileType;
}
declare function getFileType(file: File): FileType;
declare function formatFileSize(bytes: number): string;
export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
    value?: File[];
    onChange?: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
    showPreview?: boolean;
    variant?: "default" | "dropzone";
    dragActiveText?: string;
    dragInactiveText?: string;
}
declare const FileInput: React.ForwardRefExoticComponent<FileInputProps & React.RefAttributes<HTMLInputElement>>;
export interface ImageInputProps extends Omit<FileInputProps, "accept"> {
    acceptedFormats?: string[];
}
declare const ImageInput: React.ForwardRefExoticComponent<ImageInputProps & React.RefAttributes<HTMLInputElement>>;
export interface DocumentInputProps extends Omit<FileInputProps, "accept"> {
    acceptedFormats?: string[];
}
declare const DocumentInput: React.ForwardRefExoticComponent<DocumentInputProps & React.RefAttributes<HTMLInputElement>>;
export { FileInput, ImageInput, DocumentInput, formatFileSize, getFileType };
export type { FileType, FileInfo };
