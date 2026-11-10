const SITE_NAME = 'Olympos Lodge';

/** Browser-tab and search-result title: "Rooms & Suites | Olympos Lodge". */
export function pageTitle(title?: string): string {
    if (!title) return SITE_NAME;

    return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}
