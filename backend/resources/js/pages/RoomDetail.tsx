import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePageProps } from '@/hooks/use-page-props';
import { useTranslation } from '@/hooks/use-translation';
import SeoHead from '@/components/SeoHead';
import Layout from '@/components/layout/Layout';
import { localePath } from '@/lib/routes';

interface RoomImages {
    hero: string;
    full1?: string;
    ed1_inset?: string;
    ed1_right?: string;
    full2?: string;
    ed2_inset?: string;
    ed2_right?: string;
    strip?: [string, string, string];
}

interface Neighbour {
    slug: string;
    name: string;
    hero: string | null;
}

interface RoomTexts {
    p1?: string;
    p2?: string;
    p3?: string;
    p4?: string;
}

interface LocalizedRoom {
    slug: string;
    key_prefix: string | null;
    name: string;
    tagline: string | null;
    description: string | null;
    texts: RoomTexts;
    capacity: number;
    size_sqm: number | null;
    bed_type: string | null;
    view: string | null;
    currency: string | null;
    price_per_night: string | null;
    amenities: string[];
    images: RoomImages;
    prev: Neighbour;
    next: Neighbour;
}

const VIEW_LABELS: Record<string, Record<string, string>> = {
    tr: { garden: 'Bahçe Manzarası', lake: 'Göl Manzarası', garden_sea: 'Bahçe & Deniz' },
    en: { garden: 'Garden View', lake: 'Lake View', garden_sea: 'Garden & Sea' },
    de: { garden: 'Gartenblick', lake: 'Seeblick', garden_sea: 'Garten & Meer' },
};

const BED_LABELS: Record<string, Record<string, string>> = {
    tr: { Queen: 'Çift Kişilik', Double: 'Çift Kişilik', 'Queen Brass': 'Pirinç Karyola' },
    en: { Queen: 'Queen Bed', Double: 'Double Bed', 'Queen Brass': 'Brass Bed' },
    de: { Queen: 'Queensize', Double: 'Doppelbett', 'Queen Brass': 'Messingbett' },
};

export default function RoomDetail({ room }: { room: LocalizedRoom }) {
    const { t } = useTranslation();
    const { locale } = usePageProps();

    const [stickyVisible, setStickyVisible] = useState(false);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ctaRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setStickyVisible(!entry.isIntersecting),
            { threshold: 0 },
        );
        obs.observe(ctaRef.current);
        return () => obs.disconnect();
    }, [room]);

    const d = (key: string) => t(`room_detail.${key}`);
    const img = room.images;
    const texts = room.texts ?? { p1: '', p2: '', p3: '', p4: '' };

    const viewLabel = VIEW_LABELS[locale]?.[room.view ?? ''] ?? room.view ?? '';
    const bedLabel = BED_LABELS[locale]?.[room.bed_type ?? ''] ?? room.bed_type ?? '';

    return (
        <>
            <SeoHead title={room.name} description={room.description ?? undefined} />

            {/* Hero */}
            <section className="room-hero">
                <img className="room-hero__image" src={img.hero} alt={room.name}
                    fetchPriority="high" decoding="async" width="1920" height="1280" />
                <div className="room-hero__overlay"></div>
                <div className="room-hero__info">
                    <h1 className="room-hero__title">{room.name}</h1>
                </div>
                <div className="room-hero__scroll">{d('discover')}</div>
            </section>

            {/* Specs strip */}
            <div className="room-specs">
                <div className="room-spec">
                    <span className="room-spec__icon">
                        <img src="/images/icons/garden-view.svg" alt="" width="32" height="32" />
                    </span>
                    <span className="room-spec__value">{viewLabel}</span>
                    <span className="room-spec__label">{d('spec_view')}</span>
                </div>
                {room.size_sqm && (
                    <div className="room-spec">
                        <span className="room-spec__icon">
                            <img src="/images/icons/room-size.svg" alt="" width="32" height="32" />
                        </span>
                        <span className="room-spec__value">{room.size_sqm} m²</span>
                        <span className="room-spec__label">{d('spec_size')}</span>
                    </div>
                )}
                <div className="room-spec">
                    <span className="room-spec__icon">
                        <img src="/images/icons/bed.svg" alt="" width="32" height="32" />
                    </span>
                    <span className="room-spec__value">{bedLabel}</span>
                    <span className="room-spec__label">{d('spec_bed')}</span>
                </div>
                <div className="room-spec">
                    <span className="room-spec__icon"></span>
                    <span className="room-spec__value">{room.capacity} {t('common.guests')}</span>
                    <span className="room-spec__label">{d('spec_capacity')}</span>
                </div>
            </div>

            {/* Full photo 1 */}
            {img.full1 && (
                <div className="room-full-photo">
                    <img src={img.full1} alt={room.name} loading="lazy" width="1920" height="1280" />
                </div>
            )}

            {/* Editorial 1 */}
            {(img.ed1_inset || img.ed1_right) && (
                <div className="room-editorial">
                    <div className="room-editorial__left">
                        <p className="room-editorial__desc">{texts.p1}</p>
                        {img.ed1_inset && (
                            <div className="room-editorial__inset">
                                <img src={img.ed1_inset} alt={room.name} loading="lazy" width="2000" height="1333" />
                            </div>
                        )}
                    </div>
                    {img.ed1_right && (
                        <div className="room-editorial__right">
                            <img src={img.ed1_right} alt={room.name} loading="lazy" width="1920" height="1280" />
                        </div>
                    )}
                </div>
            )}

            {/* Full photo 2 */}
            {img.full2 && (
                <div className="room-full-photo">
                    <img src={img.full2} alt={room.name} loading="lazy" width="2000" height="1333" />
                </div>
            )}

            {/* Editorial 2 */}
            {(img.ed2_inset || img.ed2_right) && (
                <div className="room-editorial room-editorial--reverse">
                    <div className="room-editorial__left">
                        <p className="room-editorial__desc">{texts.p2}</p>
                        {img.ed2_inset && (
                            <div className="room-editorial__inset">
                                <img src={img.ed2_inset} alt={room.name} loading="lazy" width="2000" height="1333" />
                            </div>
                        )}
                    </div>
                    {img.ed2_right && (
                        <div className="room-editorial__right">
                            <img src={img.ed2_right} alt={room.name} loading="lazy" width="1920" height="1280" />
                        </div>
                    )}
                </div>
            )}

            {/* Image strip */}
            {img.strip && (
                <div className="room-strip">
                    {img.strip.map((src, i) => (
                        <div key={i} className="room-strip__item">
                            <img src={src} alt={room.name} loading="lazy" width="1920" height="1280" />
                        </div>
                    ))}
                </div>
            )}

            {/* Amenities */}
            <div className="room-amenities-block">
                <span className="section-label">{d('amenities_label')}</span>
                <p className="room-amenities-block__desc">{texts.p3}</p>
                <ul className="room-amenities__list">
                    {room.amenities.map(a => (
                        <li key={a}>{d(a)}</li>
                    ))}
                </ul>
            </div>

            {/* Full photo 3 (hero repeat) */}
            <div className="room-full-photo">
                <img src={img.hero} alt={room.name} loading="lazy" width="1920" height="1280" />
            </div>

            {/* CTA */}
            <div className="room-cta" ref={ctaRef}>
                <p className="room-cta__quote">{texts.p4}</p>
                <Link href={localePath(locale, `booking?room=${room.slug}`)} className="btn-reserve">{d('check_avail')}</Link>
            </div>

            {/* Sticky booking bar */}
            <div className={`room-sticky-cta${stickyVisible ? ' room-sticky-cta--visible' : ''}`}>
                <span className="room-sticky-cta__name">{room.name}</span>
                <Link href={localePath(locale, `booking?room=${room.slug}`)} className="btn-reserve room-sticky-cta__btn">
                    {d('check_avail')}
                </Link>
            </div>

            {/* Prev / Next */}
            <nav className="room-nav">
                <Link href={localePath(locale, `rooms/${room.prev.slug}`)} className="room-nav__item">
                    {room.prev.hero && (
                        <img className="room-nav__image" src={room.prev.hero} alt={room.prev.name}
                            loading="lazy" width="1920" height="1280" />
                    )}
                    <span className="room-nav__direction">{d('nav_prev')}</span>
                    <span className="room-nav__name">{room.prev.name}</span>
                </Link>
                <Link href={localePath(locale, `rooms/${room.next.slug}`)} className="room-nav__item">
                    {room.next.hero && (
                        <img className="room-nav__image" src={room.next.hero} alt={room.next.name}
                            loading="lazy" width="1920" height="1280" />
                    )}
                    <span className="room-nav__direction">{d('nav_next')}</span>
                    <span className="room-nav__name">{room.next.name}</span>
                </Link>
            </nav>
        </>
    );
}

RoomDetail.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
