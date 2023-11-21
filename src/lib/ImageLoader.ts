interface ImageLoaderProps {
    src: string;
    width?: number;
    height?: number;
    quality?: number;
    format?: "contain" | "cover" | "fill" | "inside" | "outside";
}

export default function ImageLoader({ src, width = 720, height = 480, quality = 45, format = "cover" }: ImageLoaderProps) {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}