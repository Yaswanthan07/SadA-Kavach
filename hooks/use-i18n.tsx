"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Dict = Record<string, string>

const dicts: Record<string, Dict> = {
  en: {
    app_name: "SadA Kavach",
    login_title: "Sign in to continue",
    role: "Role",
    select_role: "Select role",
    Worker: "Worker",
    Supervisor: "Supervisor",
    "Safety Officer": "Safety Officer",
    Admin: "Admin",
    worker_id: "Worker ID",
    enter_worker_id: "Enter worker ID",
    rfid_or_qr: "RFID or QR",
    rfid_placeholder: "RFID tag number",
    rfid: "RFID",
    scan_qr: "Scan QR",
    qr_simulated: "QR scanning simulated",
    biometric_login: "Biometric login (device)",
    signing_in: "Signing in...",
    sign_in: "Sign In",
    login_disclaimer: "Smart PPE compliance simulation",
    dashboard: "Dashboard",
    welcome_role: "Welcome, {role}",
    online: "Online",
    offline: "Offline",
    alerts: "Alerts",
    logout: "Logout",
    worker_vitals: "Worker Vitals",
    heart_rate: "Heart Rate",
    spo2: "SpO₂",
    temperature: "Temperature",
    respiration: "Respiration",
    ppe_compliance: "PPE Compliance",
    complete: "Complete",
    missing: "Missing",
    ok: "OK",
    not_ok: "Not OK",
    environment: "Environment",
    humidity: "Humidity",
    active: "active",
    no_active_alerts: "No active alerts",
    worker_profile: "Worker Profile",
    ppe_assigned: "PPE Assigned",
  },
  hi: {
    app_name: "सदा कवच",
    login_title: "जारी रखने के लिए साइन इन करें",
    role: "भूमिका",
    select_role: "भूमिका चुनें",
    Worker: "श्रमिक",
    Supervisor: "पर्यवेक्षक",
    "Safety Officer": "सुरक्षा अधिकारी",
    Admin: "प्रशासक",
    worker_id: "श्रमिक आईडी",
    enter_worker_id: "श्रमिक आईडी दर्ज करें",
    rfid_or_qr: "RFID या QR",
    rfid_placeholder: "RFID टैग नंबर",
    rfid: "RFID",
    scan_qr: "QR स्कैन करें",
    qr_simulated: "QR स्कैनिंग सिम्युलेटेड",
    biometric_login: "बायोमेट्रिक लॉगिन (डिवाइस)",
    signing_in: "साइन इन हो रहा है...",
    sign_in: "साइन इन",
    login_disclaimer: "यह एक डेमो लॉगिन है। प्रोडक्शन के लिए सुरक्षित प्रमाणीकरण इंटीग्रेट करें।",
    dashboard: "डैशबोर्ड",
    welcome_role: "स्वागत है, {role}",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    alerts: "अलर्ट",
    logout: "लॉगआउट",
    worker_vitals: "कर्मी स्वास्थ्य",
    heart_rate: "हार्ट रेट",
    spo2: "SpO₂",
    temperature: "तापमान",
    respiration: "श्वसन दर",
    ppe_compliance: "PPE अनुपालन",
    complete: "पूर्ण",
    missing: "अनुपस्थित",
    ok: "ठीक",
    not_ok: "ठीक नहीं",
    environment: "वातावरण",
    humidity: "आर्द्रता",
    active: "सक्रिय",
    no_active_alerts: "कोई सक्रिय अलर्ट नहीं",
    worker_profile: "कर्मी प्रोफ़ाइल",
    ppe_assigned: "PPE असाइन",
  },
  ta: {
    app_name: "சதா கவச்",
    login_title: "தொடர உள்நுழைக",
    role: "பங்கு",
    select_role: "பங்கு தேர்வு",
    Worker: "தொழிலாளர்",
    Supervisor: "மேற்பார்வையாளர்",
    "Safety Officer": "பாதுகாப்பு அதிகாரி",
    Admin: "நிர்வாகி",
    worker_id: "ஊழியர் ஐடி",
    enter_worker_id: "ஊழியர் ஐடி உள்ளிடவும்",
    rfid_or_qr: "RFID அல்லது QR",
    rfid_placeholder: "RFID குறிச்சொல் எண்",
    rfid: "RFID",
    scan_qr: "QR ஸ்கேன்",
    qr_simulated: "QR ஸ்கேன் உருவகம்",
    biometric_login: "உயிர்முறை உள்நுழைவு",
    signing_in: "உள்நுழைகிறது...",
    sign_in: "உள்நுழைக",
    login_disclaimer: "டெமோ உள்நுழைவு. உற்பத்திக்கு பாதுகாப்பான அங்கீகாரம் சேர்க்கவும்.",
    dashboard: "டாஷ்போர்ட்",
    welcome_role: "வரவேற்பு, {role}",
    online: "ஆன்லைன்",
    offline: "ஆஃப்லைன்",
    alerts: "எச்சரிக்கைகள்",
    logout: "வெளியேறு",
    worker_vitals: "உடல் நிலை",
    heart_rate: "இதய துடிப்பு",
    spo2: "SpO₂",
    temperature: "வெப்பநிலை",
    respiration: "மூச்சு வீதம்",
    ppe_compliance: "PPE இணக்கம்",
    complete: "முழு",
    missing: "இல்லை",
    ok: "சரி",
    not_ok: "சரி இல்லை",
    environment: "சுற்றுப்புறம்",
    humidity: "ஈரப்பதம்",
    active: "செயலில்",
    no_active_alerts: "செயலில் உள்ள எச்சரிக்கைகள் இல்லை",
    worker_profile: "பணியாளர் சுயவிவரம்",
    ppe_assigned: "PPE ஒதுக்கீடு",
  },
  te: {
    app_name: "సదా కవచ్",
    login_title: "కొనసాగేందుకు సైన్ ఇన్ చేయండి",
    role: "పాత్ర",
    select_role: "పాత్ర ఎంచుకోండి",
    Worker: "కార్మికుడు",
    Supervisor: "పర్యవేక్షకుడు",
    "Safety Officer": "సేఫ్టీ ఆఫీసర్",
    Admin: "వ్యవస్థాపకుడు",
    worker_id: "వర్కర్ ఐడి",
    enter_worker_id: "వర్కర్ ఐడి ఇవ్వండి",
    rfid_or_qr: "RFID లేదా QR",
    rfid_placeholder: "RFID ట్యాగ్ నంబర్",
    rfid: "RFID",
    scan_qr: "QR స్కాన్",
    qr_simulated: "QR స్కాన్ అనుకరణ",
    biometric_login: "బయోమెట్రిక్ లాగిన్",
    signing_in: "సైన్ ఇన్ అవుతోంది...",
    sign_in: "సైన్ ఇన్",
    login_disclaimer: "ఇది డెమో లాగిన్. ఉత్పత్తికి సురక్షిత ధృవీకరణ కలపండి.",
    dashboard: "డ్యాష్‌బోర్డ్",
    welcome_role: "స్వాగతం, {role}",
    online: "ఆన్‌లైన్",
    offline: "ఆఫ్‌లైన్",
    alerts: "అలర్ట్స్",
    logout: "లాగ్ అవుట్",
    worker_vitals: "ఆరోగ్య సూచికలు",
    heart_rate: "హృదయ స్పందన",
    spo2: "SpO₂",
    temperature: "ఉష్ణోగ్రత",
    respiration: "శ్వాస రేటు",
    ppe_compliance: "PPE అనుగుణత",
    complete: "పూర్తి",
    missing: "కలదు కాదు",
    ok: "సరే",
    not_ok: "సరై లేదు",
    environment: "పర్యావరణం",
    humidity: "ఆర్ద్రత",
    active: "క్రియాశీల",
    no_active_alerts: "ఏ క్రియాశీల అలర్ట్స్ లేవు",
    worker_profile: "వర్కర్ ప్రొఫైల్",
    ppe_assigned: "PPE కేటాయింపు",
  },
}

type Lang = "en" | "hi" | "ta" | "te"
const defaultLang: Lang = "en"

const I18nCtx = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  languages: Array<{ code: Lang; label: string }>
} | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang)
  useEffect(() => {
    const saved = localStorage.getItem("minesafe_lang") as Lang | null
    if (saved) setLangState(saved)
  }, [])
  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("minesafe_lang", l)
  }
  const t = (key: string, vars?: Record<string, string | number>) => {
    const d = dicts[lang] ?? dicts.en
    let s = d[key] ?? key
    if (vars)
      Object.entries(vars).forEach(([k, v]) => {
        s = s.replace(`{${k}}`, String(v))
      })
    return s
  }
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      languages: [
        { code: "en", label: "English" },
        { code: "hi", label: "हिंदी" },
        { code: "ta", label: "தமிழ்" },
        { code: "te", label: "తెలుగు" },
      ],
    }),
    [lang],
  )
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
