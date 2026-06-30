export function localePath(locale: string, path = ''): string {
    const clean = path.replace(/^\/+/, '');
    return clean ? `/${locale}/${clean}` : `/${locale}`;
}
