const WMO_TR: Record<number, string> = {
  0:'Açık',1:'Çoğunlukla açık',2:'Parçalı bulutlu',3:'Kapalı',
  45:'Sisli',48:'Sisli',51:'Hafif çiseleme',53:'Çiseleme',55:'Yoğun çiseleme',
  61:'Hafif yağmur',63:'Yağmur',65:'Şiddetli yağmur',
  71:'Hafif kar',73:'Kar',75:'Yoğun kar',
  80:'Sağanak',81:'Sağanak',82:'Yoğun sağanak',
  95:'Fırtına',99:'Fırtına',
}
const WMO_EN: Record<number, string> = {
  0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
  45:'Foggy',48:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',
  61:'Light rain',63:'Rain',65:'Heavy rain',
  71:'Light snow',73:'Snow',75:'Heavy snow',
  80:'Showers',81:'Showers',82:'Heavy showers',
  95:'Thunderstorm',99:'Thunderstorm',
}
const WMO_DE: Record<number, string> = {
  0:'Klar',1:'Überwiegend klar',2:'Teilweise bewölkt',3:'Bedeckt',
  45:'Neblig',48:'Neblig',51:'Leichter Nieselregen',53:'Nieselregen',55:'Starker Nieselregen',
  61:'Leichter Regen',63:'Regen',65:'Starker Regen',
  71:'Leichter Schnee',73:'Schnee',75:'Starker Schnee',
  80:'Schauer',81:'Schauer',82:'Starke Schauer',
  95:'Gewitter',99:'Gewitter',
}
const WMO: Record<string, Record<number, string>> = { tr: WMO_TR, en: WMO_EN, de: WMO_DE }

export function wmoDesc(code: number, lang: string): string {
  return (WMO[lang] ?? WMO.en)[code] ?? 'Clear sky'
}

export function degCompass(deg: number): string {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8]
}
