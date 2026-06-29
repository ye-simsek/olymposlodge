import { usePage } from '@inertiajs/react';

type Replacements = Record<string, string | number>;
type Tree = Record<string, Record<string, unknown>>;

function lookup(tree: Tree, key: string): string | undefined {
    const [ns, ...rest] = key.split('.');
    const leaf = rest.join('.');
    const value = tree?.[ns]?.[leaf];
    return typeof value === 'string' ? value : undefined;
}

export function useTranslation() {
    const { translations } = usePage().props;

    const t = (key: string, replacements?: Replacements, count?: number): string => {
        let value = lookup(translations as Tree, key) ?? key;

        if (typeof count === 'number' && value.includes('|')) {
            const [singular, plural] = value.split('|');
            value = count === 1 ? singular : plural;
        }

        if (replacements) {
            for (const [token, replacement] of Object.entries(replacements)) {
                value = value.replace(
                    new RegExp(`:${token}(?![A-Za-z0-9_])`, 'g'),
                    String(replacement),
                );
            }
        }

        return value;
    };

    return { t } as const;
}
