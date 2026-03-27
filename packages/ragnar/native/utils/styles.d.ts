import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { spacing, fontSizes, fontWeights } from "@ragnar/tokens";
declare const colors: {
    readonly blazeorange: {
        readonly 50: "#fff6ed";
        readonly 100: "#ffead3";
        readonly 200: "#ffd1a7";
        readonly 300: "#ffaf69";
        readonly 400: "#ff7900";
        readonly 500: "#ff5100";
        readonly 600: "#fd2900";
        readonly 700: "#d11600";
        readonly 800: "#a61a00";
        readonly 900: "#842007";
        readonly 950: "#470d04";
    };
    readonly bluechill: {
        readonly 50: "#edfefd";
        readonly 100: "#cbfbfa";
        readonly 200: "#99f6f5";
        readonly 300: "#3decef";
        readonly 400: "#00d6e0";
        readonly 500: "#00bbc9";
        readonly 600: "#0096a9";
        readonly 700: "#007888";
        readonly 800: "#00606e";
        readonly 900: "#00505c";
        readonly 950: "#00333d";
    };
    readonly blueribbon: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeaff";
        readonly 200: "#bedaff";
        readonly 300: "#8dc4ff";
        readonly 400: "#529fff";
        readonly 500: "#317aff";
        readonly 600: "#2355ff";
        readonly 700: "#213eef";
        readonly 800: "#2135bf";
        readonly 900: "#1f3593";
        readonly 950: "#182258";
    };
    readonly bostonblue: {
        readonly 50: "#ecfdff";
        readonly 100: "#d2f8ff";
        readonly 200: "#a6f0ff";
        readonly 300: "#57e4ff";
        readonly 400: "#00cdfa";
        readonly 500: "#00b4e5";
        readonly 600: "#008fc2";
        readonly 700: "#00729c";
        readonly 800: "#005d7e";
        readonly 900: "#0a4d69";
        readonly 950: "#043247";
    };
    readonly cerise: {
        readonly 50: "#fdf2f6";
        readonly 100: "#fce7ef";
        readonly 200: "#fbcfe0";
        readonly 300: "#fba7c7";
        readonly 400: "#f76da2";
        readonly 500: "#f14285";
        readonly 600: "#df2066";
        readonly 700: "#bf1751";
        readonly 800: "#9d1945";
        readonly 900: "#821d3e";
        readonly 950: "#4d0c20";
    };
    readonly crimson: {
        readonly 50: "#fdf2f2";
        readonly 100: "#fde3e4";
        readonly 200: "#fcccce";
        readonly 300: "#fca5a9";
        readonly 400: "#f96c74";
        readonly 500: "#f33f4b";
        readonly 600: "#df1d30";
        readonly 700: "#bb1727";
        readonly 800: "#9a1b26";
        readonly 900: "#7f1f27";
        readonly 950: "#450c10";
    };
    readonly electriclime: {
        readonly 50: "#f9fee2";
        readonly 100: "#f1fcbf";
        readonly 200: "#e2f87e";
        readonly 300: "#ccf100";
        readonly 400: "#b3e200";
        readonly 500: "#98cb00";
        readonly 600: "#79a200";
        readonly 700: "#5e7a00";
        readonly 800: "#4d6100";
        readonly 900: "#425100";
        readonly 950: "#222d00";
    };
    readonly electricviolet: {
        readonly 50: "#f9f5ff";
        readonly 100: "#f2e8fe";
        readonly 200: "#e7d5ff";
        readonly 300: "#d7b4ff";
        readonly 400: "#bd7fff";
        readonly 500: "#a750ff";
        readonly 600: "#9329f4";
        readonly 700: "#7d1ad5";
        readonly 800: "#6a1eac";
        readonly 900: "#561d88";
        readonly 950: "#390b63";
    };
    readonly forestgreen: {
        readonly 50: "#eeffec";
        readonly 100: "#d6ffd5";
        readonly 200: "#adffad";
        readonly 300: "#60fd6a";
        readonly 400: "#00ed00";
        readonly 500: "#00d500";
        readonly 600: "#00ae00";
        readonly 700: "#008700";
        readonly 800: "#006a00";
        readonly 900: "#005806";
        readonly 950: "#003102";
    };
    readonly gossamer: {
        readonly 50: "#effefa";
        readonly 100: "#c5fdf1";
        readonly 200: "#87fae4";
        readonly 300: "#00f0d5";
        readonly 400: "#00d9be";
        readonly 500: "#00bea8";
        readonly 600: "#00998a";
        readonly 700: "#007a70";
        readonly 800: "#00615b";
        readonly 900: "#00504b";
        readonly 950: "#00302f";
    };
    readonly lochmara: {
        readonly 50: "#f0f9ff";
        readonly 100: "#def1ff";
        readonly 200: "#b8e5ff";
        readonly 300: "#77d2ff";
        readonly 400: "#00b8ff";
        readonly 500: "#00a0fb";
        readonly 600: "#007fdb";
        readonly 700: "#0066b4";
        readonly 800: "#005693";
        readonly 900: "#014877";
        readonly 950: "#072d4d";
    };
    readonly maitai: {
        readonly 50: "#fefaef";
        readonly 100: "#fdf1d4";
        readonly 200: "#fbe1a6";
        readonly 300: "#f9cd75";
        readonly 400: "#f4b24b";
        readonly 500: "#ef973f";
        readonly 600: "#d57634";
        readonly 700: "#ae562c";
        readonly 800: "#8c4426";
        readonly 900: "#713923";
        readonly 950: "#3f1d0f";
    };
    readonly mono: {
        readonly 0: "#ffffff";
        readonly 50: "#fafafa";
        readonly 100: "#f5f5f5";
        readonly 200: "#e5e5e5";
        readonly 300: "#d4d4d4";
        readonly 400: "#a1a1a1";
        readonly 500: "#737373";
        readonly 600: "#525252";
        readonly 700: "#404040";
        readonly 800: "#262626";
        readonly 900: "#171717";
        readonly 950: "#0a0a0a";
    };
    readonly purpleheart: {
        readonly 50: "#f0f2ff";
        readonly 100: "#e4e7ff";
        readonly 200: "#ced2ff";
        readonly 300: "#aeb3ff";
        readonly 400: "#8b85ff";
        readonly 500: "#715aff";
        readonly 600: "#6032f9";
        readonly 700: "#5225dc";
        readonly 800: "#4324b2";
        readonly 900: "#3a278b";
        readonly 950: "#231854";
    };
    readonly redviolet: {
        readonly 50: "#fcf4fe";
        readonly 100: "#fae8f6";
        readonly 200: "#f7d0ee";
        readonly 300: "#f5aae2";
        readonly 400: "#f06fcc";
        readonly 500: "#e944b7";
        readonly 600: "#d62098";
        readonly 700: "#b7177b";
        readonly 800: "#971965";
        readonly 900: "#7c1d55";
        readonly 950: "#4d0b32";
    };
    readonly rockspray: {
        readonly 50: "#fff6ef";
        readonly 100: "#feebda";
        readonly 200: "#fdd584";
        readonly 300: "#fdb782";
        readonly 400: "#f88b4a";
        readonly 500: "#f66e31";
        readonly 600: "#e65527";
        readonly 700: "#bd4122";
        readonly 800: "#963621";
        readonly 900: "#78301f";
        readonly 950: "#40160e";
    };
    readonly seagreen: {
        readonly 50: "#eafef4";
        readonly 100: "#ccfbe3";
        readonly 200: "#9cf6cd";
        readonly 300: "#44ecb2";
        readonly 400: "#00d88d";
        readonly 500: "#00c078";
        readonly 600: "#009b62";
        readonly 700: "#007c53";
        readonly 800: "#006243";
        readonly 900: "#00503a";
        readonly 950: "#002d22";
    };
    readonly teak: {
        readonly 50: "#fcfbf3";
        readonly 100: "#f9f7e0";
        readonly 200: "#f6ecc2";
        readonly 300: "#eedda2";
        readonly 400: "#e0c787";
        readonly 500: "#ceaf78";
        readonly 600: "#ac8b5f";
        readonly 700: "#876747";
        readonly 800: "#6d503a";
        readonly 900: "#5a4231";
        readonly 950: "#332319";
    };
    readonly torchred: {
        readonly 50: "#fff1f1";
        readonly 100: "#ffe0e0";
        readonly 200: "#ffc5c5";
        readonly 300: "#ff999a";
        readonly 400: "#ff4855";
        readonly 500: "#ff0000";
        readonly 600: "#fd0000";
        readonly 700: "#d30000";
        readonly 800: "#ad0000";
        readonly 900: "#8e0002";
        readonly 950: "#4d0000";
    };
    readonly violeteggplant: {
        readonly 50: "#fcf4fe";
        readonly 100: "#f9e9fd";
        readonly 200: "#f3d2fa";
        readonly 300: "#eeadf9";
        readonly 400: "#e578f5";
        readonly 500: "#d84aec";
        readonly 600: "#bf2bd0";
        readonly 700: "#a024ac";
        readonly 800: "#84218b";
        readonly 900: "#6d2271";
        readonly 950: "#470d4a";
    };
};
declare const darkColors: {
    readonly blazeorange: {
        readonly 50: "#fff6ed";
        readonly 100: "#ffead3";
        readonly 200: "#ffd1a7";
        readonly 300: "#ffaf69";
        readonly 400: "#ff7900";
        readonly 500: "#ff5100";
        readonly 600: "#fd2900";
        readonly 700: "#d11600";
        readonly 800: "#a61a00";
        readonly 900: "#842007";
        readonly 950: "#470d04";
    };
    readonly bluechill: {
        readonly 50: "#edfefd";
        readonly 100: "#cbfbfa";
        readonly 200: "#99f6f5";
        readonly 300: "#3decef";
        readonly 400: "#00d6e0";
        readonly 500: "#00bbc9";
        readonly 600: "#0096a9";
        readonly 700: "#007888";
        readonly 800: "#00606e";
        readonly 900: "#00505c";
        readonly 950: "#00333d";
    };
    readonly blueribbon: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeaff";
        readonly 200: "#bedaff";
        readonly 300: "#8dc4ff";
        readonly 400: "#529fff";
        readonly 500: "#317aff";
        readonly 600: "#2355ff";
        readonly 700: "#213eef";
        readonly 800: "#2135bf";
        readonly 900: "#1f3593";
        readonly 950: "#182258";
    };
    readonly bostonblue: {
        readonly 50: "#ecfdff";
        readonly 100: "#d2f8ff";
        readonly 200: "#a6f0ff";
        readonly 300: "#57e4ff";
        readonly 400: "#00cdfa";
        readonly 500: "#00b4e5";
        readonly 600: "#008fc2";
        readonly 700: "#00729c";
        readonly 800: "#005d7e";
        readonly 900: "#0a4d69";
        readonly 950: "#043247";
    };
    readonly cerise: {
        readonly 50: "#fdf2f6";
        readonly 100: "#fce7ef";
        readonly 200: "#fbcfe0";
        readonly 300: "#fba7c7";
        readonly 400: "#f76da2";
        readonly 500: "#f14285";
        readonly 600: "#df2066";
        readonly 700: "#bf1751";
        readonly 800: "#9d1945";
        readonly 900: "#821d3e";
        readonly 950: "#4d0c20";
    };
    readonly crimson: {
        readonly 50: "#fdf2f2";
        readonly 100: "#fde3e4";
        readonly 200: "#fcccce";
        readonly 300: "#fca5a9";
        readonly 400: "#f96c74";
        readonly 500: "#f33f4b";
        readonly 600: "#df1d30";
        readonly 700: "#bb1727";
        readonly 800: "#9a1b26";
        readonly 900: "#7f1f27";
        readonly 950: "#450c10";
    };
    readonly electriclime: {
        readonly 50: "#f9fee2";
        readonly 100: "#f1fcbf";
        readonly 200: "#e2f87e";
        readonly 300: "#ccf100";
        readonly 400: "#b3e200";
        readonly 500: "#98cb00";
        readonly 600: "#79a200";
        readonly 700: "#5e7a00";
        readonly 800: "#4d6100";
        readonly 900: "#425100";
        readonly 950: "#222d00";
    };
    readonly electricviolet: {
        readonly 50: "#f9f5ff";
        readonly 100: "#f2e8fe";
        readonly 200: "#e7d5ff";
        readonly 300: "#d7b4ff";
        readonly 400: "#bd7fff";
        readonly 500: "#a750ff";
        readonly 600: "#9329f4";
        readonly 700: "#7d1ad5";
        readonly 800: "#6a1eac";
        readonly 900: "#561d88";
        readonly 950: "#390b63";
    };
    readonly forestgreen: {
        readonly 50: "#eeffec";
        readonly 100: "#d6ffd5";
        readonly 200: "#adffad";
        readonly 300: "#60fd6a";
        readonly 400: "#00ed00";
        readonly 500: "#00d500";
        readonly 600: "#00ae00";
        readonly 700: "#008700";
        readonly 800: "#006a00";
        readonly 900: "#005806";
        readonly 950: "#003102";
    };
    readonly gossamer: {
        readonly 50: "#effefa";
        readonly 100: "#c5fdf1";
        readonly 200: "#87fae4";
        readonly 300: "#00f0d5";
        readonly 400: "#00d9be";
        readonly 500: "#00bea8";
        readonly 600: "#00998a";
        readonly 700: "#007a70";
        readonly 800: "#00615b";
        readonly 900: "#00504b";
        readonly 950: "#00302f";
    };
    readonly lochmara: {
        readonly 50: "#f0f9ff";
        readonly 100: "#def1ff";
        readonly 200: "#b8e5ff";
        readonly 300: "#77d2ff";
        readonly 400: "#00b8ff";
        readonly 500: "#00a0fb";
        readonly 600: "#007fdb";
        readonly 700: "#0066b4";
        readonly 800: "#005693";
        readonly 900: "#014877";
        readonly 950: "#072d4d";
    };
    readonly maitai: {
        readonly 50: "#fefaef";
        readonly 100: "#fdf1d4";
        readonly 200: "#fbe1a6";
        readonly 300: "#f9cd75";
        readonly 400: "#f4b24b";
        readonly 500: "#ef973f";
        readonly 600: "#d57634";
        readonly 700: "#ae562c";
        readonly 800: "#8c4426";
        readonly 900: "#713923";
        readonly 950: "#3f1d0f";
    };
    readonly mono: {
        readonly 0: "#ffffff";
        readonly 50: "#fafafa";
        readonly 100: "#f5f5f5";
        readonly 200: "#e5e5e5";
        readonly 300: "#d4d4d4";
        readonly 400: "#a1a1a1";
        readonly 500: "#737373";
        readonly 600: "#525252";
        readonly 700: "#404040";
        readonly 800: "#262626";
        readonly 900: "#171717";
        readonly 950: "#0a0a0a";
    };
    readonly purpleheart: {
        readonly 50: "#f0f2ff";
        readonly 100: "#e4e7ff";
        readonly 200: "#ced2ff";
        readonly 300: "#aeb3ff";
        readonly 400: "#8b85ff";
        readonly 500: "#715aff";
        readonly 600: "#6032f9";
        readonly 700: "#5225dc";
        readonly 800: "#4324b2";
        readonly 900: "#3a278b";
        readonly 950: "#231854";
    };
    readonly redviolet: {
        readonly 50: "#fcf4fe";
        readonly 100: "#fae8f6";
        readonly 200: "#f7d0ee";
        readonly 300: "#f5aae2";
        readonly 400: "#f06fcc";
        readonly 500: "#e944b7";
        readonly 600: "#d62098";
        readonly 700: "#b7177b";
        readonly 800: "#971965";
        readonly 900: "#7c1d55";
        readonly 950: "#4d0b32";
    };
    readonly rockspray: {
        readonly 50: "#fff6ef";
        readonly 100: "#feebda";
        readonly 200: "#fdd584";
        readonly 300: "#fdb782";
        readonly 400: "#f88b4a";
        readonly 500: "#f66e31";
        readonly 600: "#e65527";
        readonly 700: "#bd4122";
        readonly 800: "#963621";
        readonly 900: "#78301f";
        readonly 950: "#40160e";
    };
    readonly seagreen: {
        readonly 50: "#eafef4";
        readonly 100: "#ccfbe3";
        readonly 200: "#9cf6cd";
        readonly 300: "#44ecb2";
        readonly 400: "#00d88d";
        readonly 500: "#00c078";
        readonly 600: "#009b62";
        readonly 700: "#007c53";
        readonly 800: "#006243";
        readonly 900: "#00503a";
        readonly 950: "#002d22";
    };
    readonly teak: {
        readonly 50: "#fcfbf3";
        readonly 100: "#f9f7e0";
        readonly 200: "#f6ecc2";
        readonly 300: "#eedda2";
        readonly 400: "#e0c787";
        readonly 500: "#ceaf78";
        readonly 600: "#ac8b5f";
        readonly 700: "#876747";
        readonly 800: "#6d503a";
        readonly 900: "#5a4231";
        readonly 950: "#332319";
    };
    readonly torchred: {
        readonly 50: "#fff1f1";
        readonly 100: "#ffe0e0";
        readonly 200: "#ffc5c5";
        readonly 300: "#ff999a";
        readonly 400: "#ff4855";
        readonly 500: "#ff0000";
        readonly 600: "#fd0000";
        readonly 700: "#d30000";
        readonly 800: "#ad0000";
        readonly 900: "#8e0002";
        readonly 950: "#4d0000";
    };
    readonly violeteggplant: {
        readonly 50: "#fcf4fe";
        readonly 100: "#f9e9fd";
        readonly 200: "#f3d2fa";
        readonly 300: "#eeadf9";
        readonly 400: "#e578f5";
        readonly 500: "#d84aec";
        readonly 600: "#bf2bd0";
        readonly 700: "#a024ac";
        readonly 800: "#84218b";
        readonly 900: "#6d2271";
        readonly 950: "#470d4a";
    };
};
declare const radii: {
    readonly none: "0rem";
    readonly 1: "0.0625rem";
    readonly 2: "0.125rem";
    readonly 4: "0.25rem";
    readonly 8: "0.5rem";
    readonly 12: "0.75rem";
    readonly 16: "1rem";
    readonly 20: "1.25rem";
    readonly 24: "1.5rem";
    readonly 32: "2rem";
    readonly 40: "2.5rem";
    readonly 80: "5rem";
    readonly full: "62.4375rem";
};
type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export type ColorScheme = "light" | "dark";
/**
 * Creates themed styles using Ragnar design tokens
 *
 * @example
 * const styles = createThemedStyles((tokens, scheme) => ({
 *   container: {
 *     backgroundColor: tokens.colors.background,
 *     padding: tokens.spacing[4],
 *     borderRadius: tokens.radii.lg,
 *   },
 *   text: {
 *     color: tokens.colors.foreground,
 *     fontSize: tokens.fontSizes.base,
 *   },
 * }))
 *
 * // In component:
 * const colorScheme = useColorScheme()
 * <View style={styles(colorScheme).container}>
 */
export declare function createThemedStyles<T extends NamedStyles<T>>(styleCreator: (tokens: {
    colors: typeof colors | typeof darkColors;
    spacing: typeof spacing;
    radii: typeof radii;
    fontSizes: typeof fontSizes;
    fontWeights: typeof fontWeights;
}, scheme: ColorScheme) => T): (scheme?: ColorScheme) => T;
/**
 * Helper to convert HSL string to RGB for React Native
 * Since RN doesn't support HSL, we need to convert
 */
export declare function hslToRgb(hsl: string): string;
export {};
//# sourceMappingURL=styles.d.ts.map