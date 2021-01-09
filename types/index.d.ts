declare module "md5" {
    export = md5;
    function md5(s: any): any;
}
declare module "avatar" {
    export = Avatar;
    class Avatar {
        static from(element: HTMLImageElement, options: object): Avatar;
        static initialAvatar(settings: {
            size: number;
            initials: string;
            initial_bg: string;
            initial_fg: string;
            initial_size: number;
            initial_weight: number;
            initial_font_family: string;
        }): string;
        static gravatarUrl(settings?: {
            size: number;
            email: string;
            hash: string;
            fallback: string;
            rating: string;
            forcedefault: boolean;
        }): string;
        static githubAvatar(settings?: {
            github_id: number | string;
            size: number;
        }): string;
        constructor(element: HTMLImageElement, options?: object);
        element: HTMLImageElement;
        settings: any;
        setSource(source: string): void;
        gravatarValid(): void;
        gravatarValidOnLoad(): void;
        gravatarValidOnError(): void;
    }
}
