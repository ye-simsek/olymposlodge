import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

export default function PrivacyPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <div className="legal-page">
      <PageMeta
        lang={lang}
        path="/privacy"
        title={t('meta.privacy_title')}
        description={t('meta.privacy_desc')}
      />
      <div className="container">
        {lang === 'de' ? (
          <>
            <h1>Datenschutz & KVKK</h1>
            <p>Diese Seite informiert Sie über die Erhebung und Verarbeitung personenbezogener Daten durch Olympos Lodge Otel im Rahmen des türkischen Gesetzes Nr. 6698 (KVKK) und der EU-Datenschutzgrundverordnung (DSGVO).</p>
            <h2>Verantwortliche Stelle</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Türkei<br />E-Mail: info@olymposlodge.com.tr</p>
            <h2>Erhobene Daten</h2>
            <p>Wir verarbeiten personenbezogene Daten, die Sie uns direkt mitteilen (z. B. über das Kontaktformular oder die Newsletter-Anmeldung): Name, E-Mail-Adresse, Telefonnummer sowie alle Inhalte, die Sie uns in Nachrichten senden.</p>
            <h2>Zweck der Verarbeitung</h2>
            <p>Die Daten werden ausschließlich zur Beantwortung Ihrer Anfragen, zur Abwicklung von Reservierungen und — bei entsprechender Einwilligung — für den Newsletter-Versand verwendet.</p>
            <h2>Weitergabe an Dritte</h2>
            <p>Wir geben Ihre Daten nicht an Dritte weiter, es sei denn, dies ist zur Vertragserfüllung erforderlich oder gesetzlich vorgeschrieben.</p>
            <h2>Speicherdauer</h2>
            <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist, maximal jedoch 3 Jahre nach Ihrem letzten Kontakt mit uns.</p>
            <h2>Ihre Rechte</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Richten Sie entsprechende Anfragen bitte an: info@olymposlodge.com.tr</p>
            <h2>Cookies</h2>
            <p>Diese Website verwendet technisch notwendige Cookies sowie — mit Ihrer Einwilligung — analytische Cookies. Ihre Cookie-Einstellungen können Sie jederzeit über das Cookie-Symbol unten links anpassen.</p>
          </>
        ) : lang === 'en' ? (
          <>
            <h1>Privacy Policy & KVKK Notice</h1>
            <p>This page informs you about the collection and processing of personal data by Olympos Lodge Otel under Turkish Law No. 6698 (KVKK) and the EU General Data Protection Regulation (GDPR).</p>
            <h2>Data Controller</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Turkey<br />Email: info@olymposlodge.com.tr</p>
            <h2>Data Collected</h2>
            <p>We process personal data you provide directly (e.g. via the contact form or newsletter sign-up): name, email address, phone number and any content included in your messages.</p>
            <h2>Purpose of Processing</h2>
            <p>Data is used solely to respond to your enquiries, process reservations and — with your consent — to send our newsletter.</p>
            <h2>Third-Party Disclosure</h2>
            <p>We do not share your data with third parties unless required for the fulfilment of a contract or by law.</p>
            <h2>Retention Period</h2>
            <p>Personal data is retained only as long as necessary for the relevant purpose, and no longer than 3 years from your last contact with us.</p>
            <h2>Your Rights</h2>
            <p>You have the right to access, rectify, erase and restrict the processing of your data. Please send requests to: info@olymposlodge.com.tr</p>
            <h2>Cookies</h2>
            <p>This website uses technically necessary cookies and — with your consent — analytics cookies. You can adjust your cookie preferences at any time via the cookie icon at the bottom left.</p>
          </>
        ) : (
          <>
            <h1>Gizlilik ve KVKK Bilgilendirme</h1>
            <p>Bu sayfa, Olympos Lodge Otel'in 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizi nasıl işlediğini açıklamaktadır.</p>
            <h2>Veri Sorumlusu</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Türkiye<br />E-posta: info@olymposlodge.com.tr</p>
            <h2>Toplanan Veriler</h2>
            <p>İletişim formu veya bülten kaydı aracılığıyla doğrudan bize ilettiğiniz kişisel veriler işlenmektedir: ad-soyad, e-posta adresi, telefon numarası ve mesaj içerikleri.</p>
            <h2>İşleme Amacı</h2>
            <p>Veriler yalnızca taleplerinizi yanıtlamak, rezervasyonlarınızı işleme koymak ve — açık rızanız dahilinde — bülten göndermek amacıyla kullanılmaktadır.</p>
            <h2>Üçüncü Taraflarla Paylaşım</h2>
            <p>Kişisel verileriniz, sözleşme ifası için zorunlu olmadıkça veya yasal yükümlülük bulunmadıkça üçüncü taraflarla paylaşılmamaktadır.</p>
            <h2>Saklama Süresi</h2>
            <p>Kişisel veriler, ilgili amaç için gerekli olan süre boyunca, en fazla son iletişiminizden itibaren 3 yıl saklanmaktadır.</p>
            <h2>Haklarınız</h2>
            <p>Verilerinize erişim, düzeltme, silme ve işlemenin kısıtlanmasını talep etme haklarına sahipsiniz. Taleplerinizi şu adrese iletebilirsiniz: info@olymposlodge.com.tr</p>
            <h2>Çerezler</h2>
            <p>Bu site teknik açıdan zorunlu çerezler ve — onayınız dahilinde — analitik çerezler kullanmaktadır. Çerez tercihlerinizi sol alttaki çerez simgesi aracılığıyla istediğiniz zaman güncelleyebilirsiniz.</p>
          </>
        )}
      </div>
    </div>
  )
}
