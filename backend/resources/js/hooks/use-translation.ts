import { usePage } from '@inertiajs/react';

type Replacements = Record<string, string | number>;
type Tree = Record<string, Record<string, unknown>>;

function resolve(tree: Tree, key: string): unknown {
    const [ns, ...rest] = key.split('.');
    const leaf = rest.join('.');
    return tree?.[ns]?.[leaf];
}

export function useTranslation() {
    const tree = usePage().props.translations as Tree;

    const t = (key: string, replacements?: Replacements, count?: number): string => {
        const raw = resolve(tree, key);
        let value = typeof raw === 'string' ? raw : key;

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

    // Returns the raw translation value for keys whose content is structured —
    // e.g. JSON arrays/objects that TranslationRepository decodes server-side.
    // `t()` is for strings (interpolation/pluralization); `tRaw()` is for lists
    // and nested objects. Returns undefined when the key is absent.
    const tRaw = <T = unknown>(key: string): T | undefined => {
        const raw = resolve(tree, key);
        return raw === undefined ? undefined : (raw as T);
    };

    return { t, tRaw } as const;
}
