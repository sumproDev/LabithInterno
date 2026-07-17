export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const absoluteUrl = (path: string) => `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.labithinterno.com"}${path}`;
