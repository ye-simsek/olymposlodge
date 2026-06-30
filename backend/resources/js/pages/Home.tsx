import React from 'react';
import { Link } from '@inertiajs/react';
import { usePageProps } from '@/hooks/use-page-props';
import { useTranslation } from '@/hooks/use-translation';
import { useSiteMedia } from '@/hooks/use-site-media';
import SeoHead from '@/components/SeoHead';
import ExploreMoreSection from '@/components/ExploreMoreSection';
import Layout from '@/components/layout/Layout';
import { localePath } from '@/lib/routes';

const WP = 'https://www.olymposlodge.com.tr/wp-content/uploads';

const GALLERY: { key: string; alt: string; fallback: string }[] = [
    { key: 'gallery.1', alt: 'Super Deluxe Room',  fallback: `${WP}/2024/11/olympos-lodge-super-deluxe-double-room-6.jpg` },
    { key: 'gallery.2', alt: 'Lodge garden',        fallback: `${WP}/2025/04/IMG_5376-1.jpg` },
    { key: 'gallery.3', alt: 'Nature view',         fallback: `${WP}/2024/11/IMG_5150.jpg` },
    { key: 'gallery.4', alt: 'Lodge atmosphere',    fallback: `${WP}/2024/11/IMG_5400.jpg` },
    { key: 'gallery.5', alt: 'Olympos ruins',       fallback: `${WP}/2024/11/olympos-e1731029804798.jpg` },
    { key: 'gallery.6', alt: 'Lodge detail',        fallback: `${WP}/2025/04/IMG_5434-e1731093615320-1.jpg` },
];

const HERO_POSTER_FB = `${WP}/2024/11/DJI_0071-Large-e1731205515573.jpg`;
const STORY_GARDEN_FB = `${WP}/2024/11/IMG_5510-1.jpg`;
const STORY_NATURE_FB = `${WP}/2024/11/MG_7191.jpg`;

interface LocalizedRoom {
    slug: string;
    key_prefix: string | null;
    name: string;
    tagline: string | null;
    description: string | null;
    texts: Record<string, string>;
    capacity: number;
    size_sqm: number | null;
    bed_type: string | null;
    view: string | null;
    currency: string | null;
    price_per_night: string | null;
    amenities: string[];
    images: Record<string, string> | null;
}

export default function Home({ rooms }: { rooms: LocalizedRoom[] }) {
    const { t, tRaw } = useTranslation();
    const { locale } = usePageProps();
    const media = useSiteMedia();

    const heroPoster    = media('hero.poster',      HERO_POSTER_FB);
    const heroWebm      = media('hero.video_webm',  '/hero.webm');
    const heroMp4       = media('hero.video_mp4',   '/hero.mp4');
    const storyGarden   = media('story.garden',     STORY_GARDEN_FB);
    const storyNature   = media('story.nature',     STORY_NATURE_FB);
    const convictionImg = media('conviction.image', STORY_GARDEN_FB);

    return (
        <>
            <SeoHead title={t('meta.home_title')} description={t('meta.home_desc')} />

            {/* Hero */}
            <section className="hero" id="hero">
                <div className="hero-image">
                    <video autoPlay muted loop playsInline preload="metadata" poster={heroPoster}>
                        <source src={heroWebm} type="video/webm" />
                        <source src={heroMp4} type="video/mp4" />
                        <img src={heroPoster} alt="Olympos Lodge havadan görünüm" fetchPriority="high" />
                    </video>
                </div>
            </section>

            {/* Intro */}
            <section className="intro" id="intro">
                <div className="intro-title">{t('intro.title')}</div>
                <div className="intro-body">
                    <div className="intro-col">
                        <p>{t('intro.p1')}</p>
                        <p>{t('intro.p2')}</p>
                    </div>
                    <div className="intro-col">
                        <p>{t('intro.p4')}</p>
                        <p>{t('intro.p6')}</p>
                    </div>
                </div>
            </section>

            {/* Glance */}
            <section className="glance">
                <div className="glance__inner">
                    <div className="glance__stat reveal">
                        <span className="glance__number ink-bleed">{t('glance.rooms_num')}</span>
                        <span className="glance__label">{t('glance.rooms_label')}</span>
                    </div>
                    <div className="glance__rule"></div>
                    <div className="glance__stat reveal">
                        <span className="glance__number ink-bleed">{t('glance.garden_num')}</span>
                        <span className="glance__label">{t('glance.garden_label')}</span>
                    </div>
                    <div className="glance__rule"></div>
                    <div className="glance__stat reveal">
                        <span className="glance__number ink-bleed">{t('glance.since_num')}</span>
                        <span className="glance__label">{t('glance.since_label')}</span>
                    </div>
                </div>
            </section>

            <div className="gold-divider"></div>

            {/* Conviction */}
            <section className="conviction">
                <div className="conviction__text">
                    <p className="conviction__sentence">{t('conviction.sentence')}</p>
                    <div className="conviction__sig">
                        <div className="conviction__rule"></div>
                        <span className="conviction__byline">{t('conviction.byline')}</span>
                    </div>
                </div>
                <div className="conviction__image">
                    <img src={convictionImg} alt="Olympos Lodge garden" loading="lazy" width="1600" height="2277" />
                </div>
            </section>

            <div className="gold-divider"></div>

            {/* Rooms */}
            <section className="rooms" id="rooms">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t('rooms.label')}</span>
                    </div>
                </div>
                <div className="rooms-list">
                    {rooms.map((room, i) => {
                        const viewLabel = room.view === 'lake' ? t('rooms.view_lake') : t('rooms.view_garden');
                        return (
                            <React.Fragment key={room.slug}>
                                <div className={`room-row room-row--landscape${i % 2 === 1 ? ' room-row--reverse' : ''}`}>
                                    <Link href={localePath(locale, `rooms/${room.slug}`)} className="room-row__image">
                                        <img src={room.images?.hero} alt={room.name} loading="lazy" />
                                    </Link>
                                    <div className="room-row__content">
                                        <Link href={localePath(locale, `rooms/${room.slug}`)}><h3>{room.name}</h3></Link>
                                        <p>{room.description}</p>
                                        <div className="room-row__specs">
                                            {room.size_sqm && <>{room.size_sqm} m²<span className="room-row__spec-sep">·</span></>}
                                            <span>{viewLabel}</span>
                                        </div>
                                        <Link href={localePath(locale, `rooms/${room.slug}`)} className="room-row__link">{t('rooms.view_more')}</Link>
                                    </div>
                                </div>
                                {i < rooms.length - 1 && <div className="room-separator"></div>}
                            </React.Fragment>
                        );
                    })}
                </div>
            </section>

            <div className="gold-divider"></div>

            {/* Story & Philosophy */}
            <section className="story-philosophy" id="about">
                <div className="story-philosophy__header">
                    <h2 className="story-philosophy__title">{t('story.section_title')}</h2>
                </div>

                <div className="story-block">
                    <div className="story-block__content">
                        <span className="story-block__eyebrow">{t('story.eyebrow_story')}</span>
                        <h3 className="story-block__heading" dangerouslySetInnerHTML={{ __html: t('story.heading_story') }} />
                        <p>{t('story.p1')}</p>
                        <p>{t('story.p2')}</p>
                        <p>{t('story.p3')}</p>
                    </div>
                    <div className="story-block__image">
                        <img src={storyGarden} alt="Olympos Lodge garden pathway" loading="lazy" width="1600" height="2277" />
                    </div>
                </div>

                <div className="story-block story-block--reverse">
                    <div className="story-block__image">
                        <img src={storyNature} alt="Olympos Lodge natural landscape" loading="lazy" width="1920" height="1280" />
                    </div>
                    <div className="story-block__content">
                        <span className="story-block__eyebrow">{t('story.eyebrow_nature')}</span>
                        <h3 className="story-block__heading" dangerouslySetInnerHTML={{ __html: t('story.heading_nature') }} />
                        <p>{t('story.nature_p1')}</p>
                        <p>{t('story.nature_p2')}</p>
                    </div>
                </div>
            </section>

            <div className="gold-divider"></div>

            <ExploreMoreSection />

            <div className="gold-divider"></div>

            {/* Guest Voices */}
            <section className="voices" id="voices">
                <div className="container">
                    <div className="section-header section-header--center">
                        <span className="section-label">{t('voices.label')}</span>
                        <h2>{t('voices.heading')}</h2>
                    </div>
                    <div className="voices-grid">
                        {(tRaw<{ text: string; author: string }[]>('voices.items') ?? []).map((v, i) => (
                            <div key={i} className="voice-card">
                                <p className="voice-text">{v.text}</p>
                                <span className="voice-author" dangerouslySetInnerHTML={{ __html: v.author }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Teaser */}
            <section className="gallery-teaser" id="gallery">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t('gallery.label')}</span>
                        <h2>{t('gallery.heading')}</h2>
                    </div>
                </div>
                <div className="gallery-scroll">
                    {GALLERY.map((img, i) => (
                        <div key={i} className="gallery-item">
                            <img src={media(img.key, img.fallback)} alt={img.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
