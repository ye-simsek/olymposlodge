import { useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { getLenis } from '@/lib/lenis';
import { localePath } from '@/lib/routes';

const NUM_PANELS = 3;

export default function ExploreMoreSection() {
    const { t } = useTranslation();
    const { locale } = usePage().props as { locale: string };
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track   = scrollRef.current;
        if (!wrapper || !track) return;

        const lenisInstance = getLenis();
        if (!lenisInstance) return;

        const headerEl = document.getElementById('header');
        let lastFraction = 0;
        let snapped = false;

        const onLenisScroll = ({ velocity }: { velocity: number }) => {
            const hh          = headerEl?.offsetHeight ?? 70;
            const wRect       = wrapper.getBoundingClientRect();
            const panelH      = window.innerHeight - hh;
            const maxProgress = (NUM_PANELS - 1) * panelH;
            const progress    = hh - wRect.top;

            if (progress < 0 || progress > maxProgress) return;

            lastFraction = progress / maxProgress;

            if (velocity === 0) {
                if (!snapped) {
                    snapped = true;
                    const nearest         = Math.round(lastFraction * (NUM_PANELS - 1));
                    const targetFraction  = nearest / (NUM_PANELS - 1);
                    const targetProgress  = targetFraction * maxProgress;
                    const currentProgress = hh - wRect.top;
                    const delta           = targetProgress - currentProgress;

                    if (Math.abs(delta) > 0.5) {
                        // Lenis animates vertical — transform follows naturally, locked at end
                        lenisInstance.scrollTo(window.scrollY + delta, {
                            duration: 0.8,
                            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        });
                    } else {
                        // Already close enough — lock to exact pixel-perfect position
                        track.style.transform = `translateX(-${nearest * 100}%)`;
                    }
                }
            } else {
                // Actively scrolling — horizontal tracks vertical 1:1
                snapped = false;
                track.style.transform = `translateX(-${lastFraction * (NUM_PANELS - 1) * 100}%)`;
            }
        };

        lenisInstance.on('scroll', onLenisScroll);
        return () => { lenisInstance.off('scroll', onLenisScroll); };
    }, []);

    return (
        <section className="story-philosophy story-philosophy--explore-more">
            <div className="explore-more-wrapper" ref={wrapperRef}>
                <div className="explore-more-sticky">
                    <div className="explore-more-label">
                        <h2 className="story-philosophy__title">{t('explore_more.title')}</h2>
                    </div>
                    <div className="explore-more-clip">
                    <div className="explore-more-scroll" ref={scrollRef}>

                        {/* Panel 1: Çıralı — text left, image right */}
                        <div className="story-block story-block--linker-tall">
                            <div className="story-block__content">
                                <span className="story-block__eyebrow">{t('explore_more.cirali_label')}</span>
                                <h3 className="story-block__heading">{t('explore_more.cirali_heading')}</h3>
                                <p>{t('explore_more.cirali_body')}</p>
                                <Link href={localePath(locale, 'experiences')} className="room-row__link">{t('explore_more.cirali_cta')}</Link>
                            </div>
                            <div className="story-block__image">
                                <img
                                    src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5510-1.jpg"
                                    alt="Çıralı"
                                    loading="lazy"
                                    width={1600}
                                    height={2277}
                                />
                            </div>
                        </div>

                        {/* Panel 2: At The Lodge — text left, image right */}
                        <div className="story-block story-block--linker-tall">
                            <div className="story-block__content">
                                <span className="story-block__eyebrow">{t('explore_more.lodge_label')}</span>
                                <h3 className="story-block__heading">{t('explore_more.lodge_heading')}</h3>
                                <p>{t('explore_more.lodge_body')}</p>
                                <Link href={localePath(locale, 'rooms')} className="room-row__link">{t('explore_more.lodge_cta')}</Link>
                            </div>
                            <div className="story-block__image">
                                <img
                                    src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/IMG_5400.jpg"
                                    alt="Olympos Lodge"
                                    loading="lazy"
                                    width={2000}
                                    height={1333}
                                />
                            </div>
                        </div>

                        {/* Panel 3: Location — text left, image right */}
                        <div className="story-block story-block--linker-tall">
                            <div className="story-block__content">
                                <h3 className="story-block__heading">
                                    <span>{t('explore_more.loc_title_l1')}</span>{' '}
                                    <span>{t('explore_more.loc_title_l2')}</span>
                                </h3>
                                <p>{t('explore_more.loc_body')}</p>
                                <Link href={localePath(locale, 'location')} className="room-row__link">{t('explore_more.loc_cta')}</Link>
                            </div>
                            <div className="story-block__image">
                                <img
                                    src="https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/DJI_0118-Large-e1731100925618.jpg"
                                    alt="Çıralı vadisi havadan görünüm"
                                    loading="lazy"
                                    width={1520}
                                    height={1075}
                                />
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
