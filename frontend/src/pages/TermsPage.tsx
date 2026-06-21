import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'

export default function TermsPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'

  return (
    <div className="legal-page">
      <PageMeta
        lang={lang}
        path="/terms"
        title={t('meta.terms_title')}
        description={t('meta.terms_desc')}
      />
      <div className="container">
        {lang === 'de' ? (
          <>
            <h1>Vorinformationsformular</h1>
            <p>Gemäß den türkischen Verbrauchervorschriften (6502 Sayılı Kanun) sind wir verpflichtet, Sie vor dem Abschluss einer Buchung über folgende Punkte zu informieren.</p>
            <h2>Verkäufer</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Türkei<br />Tel: +90 532 308 34 86<br />E-Mail: info@olymposlodge.com.tr</p>
            <h2>Leistung</h2>
            <p>Unterkunft im Olympos Lodge, Çıralı, Antalya. Art, Zeitraum und Preis werden auf der Buchungsbestätigung aufgeführt.</p>
            <h2>Zahlung</h2>
            <p>Die Zahlung erfolgt gemäß den Bedingungen der Buchungsbestätigung. Preise verstehen sich in Euro oder türkischen Lira inklusive aller Steuern.</p>
            <h2>Stornierung & Rücktritt</h2>
            <p>Stornierungsbedingungen werden individuell mit der Buchung mitgeteilt. Bei Nichterscheinen (No-Show) wird in der Regel die erste Übernachtung berechnet.</p>
            <h2>Streitbeilegung</h2>
            <p>Bei Streitigkeiten sind die Verbrauchergerichte und -ausschüsse des Kreises Kemer / Antalya zuständig.</p>
          </>
        ) : lang === 'en' ? (
          <>
            <h1>Pre-Information Form</h1>
            <p>In accordance with Turkish consumer regulations (Law No. 6502), we are required to inform you of the following before completing a reservation.</p>
            <h2>Seller</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Turkey<br />Tel: +90 532 308 34 86<br />Email: info@olymposlodge.com.tr</p>
            <h2>Service</h2>
            <p>Accommodation at Olympos Lodge, Çıralı, Antalya. The type, period and price of the service will be stated in the booking confirmation.</p>
            <h2>Payment</h2>
            <p>Payment is made in accordance with the terms stated in the booking confirmation. Prices are quoted in Euros or Turkish Lira inclusive of all applicable taxes.</p>
            <h2>Cancellation & Withdrawal</h2>
            <p>Cancellation conditions are communicated individually with each booking. In the event of a no-show, the first night is generally charged.</p>
            <h2>Dispute Resolution</h2>
            <p>In the event of a dispute, the Consumer Courts and Arbitration Committees of the Kemer / Antalya district are competent.</p>
          </>
        ) : (
          <>
            <h1>Ön Bilgilendirme Formu</h1>
            <p>6502 Sayılı Tüketicinin Korunması Hakkında Kanun kapsamında, rezervasyon öncesinde aşağıdaki bilgileri sunmakla yükümlüyüz.</p>
            <h2>Satıcı</h2>
            <p><strong>Olympos Lodge Otel</strong><br />Çıralı Yolu 9, Ulupınar Mahallesi<br />Kemer / Antalya, Türkiye<br />Tel: +90 532 308 34 86<br />E-posta: info@olymposlodge.com.tr</p>
            <h2>Hizmet</h2>
            <p>Çıralı, Antalya'da Olympos Lodge bünyesinde konaklama hizmeti. Hizmetin türü, süresi ve bedeli rezervasyon onayında belirtilmektedir.</p>
            <h2>Ödeme</h2>
            <p>Ödeme, rezervasyon onayında belirtilen koşullara göre gerçekleştirilir. Fiyatlar Euro veya Türk Lirası cinsinden, tüm vergiler dahil olmak üzere belirtilmektedir.</p>
            <h2>İptal & Cayma</h2>
            <p>İptal koşulları her rezervasyon ile birlikte ayrıca iletilmektedir. No-show (gelmeme) durumunda ilk gece bedeli tahsil edilebilir.</p>
            <h2>Uyuşmazlık Çözümü</h2>
            <p>Uyuşmazlık halinde Kemer / Antalya ilçe Tüketici Mahkemeleri ve Hakem Heyetleri yetkilidir.</p>
          </>
        )}
      </div>
    </div>
  )
}
