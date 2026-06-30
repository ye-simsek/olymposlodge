import React from 'react';
import { Link } from '@inertiajs/react';
import { usePageProps } from '@/hooks/use-page-props';
import { useTranslation } from '@/hooks/use-translation';
import SeoHead from '@/components/SeoHead';
import Layout from '@/components/layout/Layout';
import { localePath } from '@/lib/routes';

export default function NotFound() {
    const { t } = useTranslation();
    const { locale } = usePageProps();

    return (
        <div className="not-found-page">
            <SeoHead title={t('common.not_found')} />
            <div className="not-found-page__bg" aria-hidden="true" />
            <div className="not-found-page__inner">
                <span className="not-found-page__code">404</span>
                <p className="not-found-page__eyebrow">Olympos Lodge</p>
                <h1 className="not-found-page__title">{t('common.not_found')}</h1>
                <div className="not-found-page__divider" />
                <Link href={localePath(locale)} className="btn-reserve not-found-page__cta">
                    {t('common.go_home')}
                </Link>
            </div>
        </div>
    );
}

NotFound.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
