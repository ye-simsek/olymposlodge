import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

const EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4469.900768249908!2d30.47331777670837!3d36.40184379005226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b7c8f483ada7%3A0xead3c68b0c46fb38!2sOlympos%20Lodge%20Otel!5e1!3m2!1sen!2str!4v1775126998589!5m2!1sen!2str';

export const DIRECTIONS_URL =
    'https://www.google.com/maps/dir/?api=1&destination=36.40182864027301,30.47590463023936';

/**
 * Google Maps, loaded only when the visitor asks for it. The embed sets Google
 * cookies and sends the visitor's IP to Google, which the cookie bar does not
 * cover, so nothing is requested before the click.
 */
export default function MapEmbed() {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return (
            <iframe
                src={EMBED_URL}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('common.map_title')}
            />
        );
    }

    return (
        <div className="map-consent">
            <p className="map-consent__notice">{t('common.map_notice')}</p>
            <button type="button" className="map-consent__load" onClick={() => setLoaded(true)}>
                {t('common.map_load')}
            </button>
            <a className="map-consent__link" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                {t('common.map_open')}
            </a>
        </div>
    );
}
