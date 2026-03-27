import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarBadge: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
} & React.RefAttributes<HTMLSpanElement>>;
type AvatarStatusProps = {
    status: "online" | "offline" | "busy" | "away";
    position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
    className?: string;
};
declare const AvatarStatus: {
    ({ status, position, className }: AvatarStatusProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const AvatarWithStatus: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarStatus, AvatarWithStatus };
