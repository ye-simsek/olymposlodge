import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ClientOnly from './ClientOnly';

describe('ClientOnly', () => {
    it('renders children after mount', () => {
        render(<ClientOnly><span data-testid="child">x</span></ClientOnly>);
        expect(screen.getByTestId('child')).toBeDefined();
    });

    it('renders fallback when provided and not yet mounted is acceptable', () => {
        render(<ClientOnly fallback={<span data-testid="fb">loading</span>}><span>x</span></ClientOnly>);
        // Nach Mount im jsdom: Kinder sichtbar
        expect(screen.queryByText('x')).not.toBeNull();
    });

    it('renders fallback (not children) during SSR via renderToStaticMarkup', () => {
        // SSR-safety property: before mount (server pass), only fallback is rendered
        const html = renderToStaticMarkup(
            <ClientOnly fallback={<span>ssr-fallback</span>}>
                <span>browser-content</span>
            </ClientOnly>,
        );
        expect(html).toContain('ssr-fallback');
        expect(html).not.toContain('browser-content');
    });
});
