import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MapEmbed from './MapEmbed';

vi.mock('@/hooks/use-translation', () => ({
    useTranslation: () => ({ t: (k: string) => k, tRaw: () => undefined }),
}));

describe('MapEmbed', () => {
    it('does not contact Google until the visitor asks for the map', () => {
        const { container, getByText } = render(<MapEmbed />);

        expect(container.querySelector('iframe')).toBeNull();
        expect(getByText('common.map_notice')).toBeDefined();
    });

    it('loads the map after a click', () => {
        const { container, getByText } = render(<MapEmbed />);

        fireEvent.click(getByText('common.map_load'));

        expect(container.querySelector('iframe')?.getAttribute('src')).toContain('google.com/maps/embed');
    });

    it('always offers a plain link to the map as well', () => {
        const { container } = render(<MapEmbed />);

        expect(container.querySelector('a[href^="https://www.google.com/maps"]')).not.toBeNull();
    });
});
