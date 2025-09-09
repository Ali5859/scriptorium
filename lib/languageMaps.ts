import { LanguageConfig, LanguageCode, Direction, CustomMaps } from '../types';

const qwertyBase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890-=[]\\;',./~!@#$%^&*()_+{}|:\"<>?";
const baseMap = Object.fromEntries(qwertyBase.split('').map(c => [c, c]));

const languages: Record<LanguageCode, LanguageConfig> = {
  en: { code: 'en', name: 'English', dir: 'ltr', map: { ...baseMap } },
  fa: { code: 'fa', name: 'Persian (فارسی)', dir: 'rtl', map: { 'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'چ', 'a': 'ش', 's': 'س', 'd': 'ی', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ک', '\'': 'گ', 'z': 'ظ', 'x': 'ط', 'c': 'ز', 'v': 'ر', 'b': 'ذ', 'n': 'د', 'm': 'پ', ',': 'و', 'Q': 'ض', 'W': 'ص', 'E': 'ث', 'R': 'ق', 'T': 'ف', 'Y': 'غ', 'U': 'ع', 'I': 'ه', 'O': 'خ', 'P': 'ح', '{': 'ج', '}': 'چ', 'A': 'ش', 'S': 'س', 'D': 'ی', 'F': 'ب', 'G': 'ل', 'H': 'ا', 'J': 'ت', 'K': 'ن', 'L': 'م', ':': 'ک', '"': 'گ', 'Z': 'ظ', 'X': 'ط', 'C': 'ز', 'V': 'ر', 'B': 'ذ', 'N': 'د', 'M': 'پ', '<': 'و', } },
  ru: { code: 'ru', name: 'Russian (Русский)', dir: 'ltr', map: { 'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', 'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Y': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З', '{': 'Х', '}': 'Ъ', 'A': 'Ф', 'S': 'Ы', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', ':': 'Ж', '"': 'Э', 'Z': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', '<': 'Б', '>': 'Ю', } },
  de: { code: 'de', name: 'German (Deutsch)', dir: 'ltr', map: { ...baseMap, 'y': 'z', 'z': 'y', 'Y': 'Z', 'Z': 'Y', '[': 'ü', '{': 'Ü', ']': '+', '}': '*', ';': 'ö', ':': 'Ö', '\'': 'ä', '"': 'Ä', '-': 'ß', '_': '?', } },
  es: { code: 'es', name: 'Spanish (Español)', dir: 'ltr', map: { ...baseMap, ';': 'ñ', ':': 'Ñ', } },
  ar: { code: 'ar', name: 'Arabic (العربية)', dir: 'rtl', map: { 'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د', 'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك', '\'': 'ط', 'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا', 'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ', '`': 'ذ' } },
  hi: { code: 'hi', name: 'Hindi (हिन्दी)', dir: 'ltr', map: { 'q': 'ौ', 'w': 'ै', 'e': 'ा', 'r': 'ी', 't': 'ू', 'y': 'ब', 'u': 'ह', 'i': 'ग', 'o': 'द', 'p': 'ज', '[': 'ड', ']': '़', 'a': 'ो', 's': 'े', 'd': '्', 'f': 'ि', 'g': 'ु', 'h': 'प', 'j': 'र', 'k': 'क', 'l': 'त', ';': 'च', '\'': 'ट', 'z': 'ॉ', 'x': 'ं', 'c': 'म', 'v': 'न', 'b': 'व', 'n': 'ल', 'm': 'स', ',': 'ष', '.': '।', 'E': 'आ', 'R': 'ई', 'T': 'ऊ', 'Y': 'भ', 'U': 'ङ', 'I': 'घ', 'O': 'ध', 'P': 'झ', '{': 'ढ', 'A': 'ओ', 'S': 'ए', 'D': 'श्र', 'F': 'इ', 'G': 'उ', 'H': 'फ', 'J': 'ऱ', 'K': 'ख', 'L': 'थ', ':': 'छ', '"': 'ठ', 'X': 'ँ', 'C': 'ण', 'V': 'ञ', 'B': 'ॅ', 'N': 'ळ', 'M': 'श', '?': 'ऋ' } },
  he: { code: 'he', name: 'Hebrew (עברית)', dir: 'rtl', map: { 'q': '/', 'w': '\'', 'e': 'ק', 'r': 'ר', 't': 'א', 'y': 'ט', 'u': 'ו', 'i': 'ן', 'o': 'ם', 'p': 'פ', 'a': 'ש', 's': 'ד', 'd': 'ג', 'f': 'כ', 'g': 'ע', 'h': 'י', 'j': 'ח', 'k': 'ל', 'l': 'ך', ';': 'ף', '\'': ',', 'z': 'ז', 'x': 'ס', 'c': 'ב', 'v': 'ה', 'b': 'נ', 'n': 'מ', 'm': 'צ', ',': 'ת', '.': 'ץ', '/': '.' } },
  el: { code: 'el', name: 'Greek (Ελληνικά)', dir: 'ltr', map: { 'q': ';', 'w': 'ς', 'e': 'ε', 'r': 'ρ', 't': 'τ', 'y': 'υ', 'u': 'θ', 'i': 'ι', 'o': 'ο', 'p': 'π', 'a': 'α', 's': 'σ', 'd': 'δ', 'f': 'φ', 'g': 'γ', 'h': 'η', 'j': 'ξ', 'k': 'κ', 'l': 'λ', 'z': 'ζ', 'x': 'χ', 'c': 'ψ', 'v': 'ω', 'b': 'β', 'n': 'ν', 'm': 'μ', 'W': 'Σ', 'E': 'Ε', 'R': 'Ρ', 'T': 'Τ', 'Y': 'Υ', 'U': 'Θ', 'I': 'Ι', 'O': 'Ο', 'P': 'Π', 'A': 'Α', 'S': 'Σ', 'D': 'Δ', 'F': 'Φ', 'G': 'Γ', 'H': 'Η', 'J': 'Ξ', 'K': 'Κ', 'L': 'Λ', 'Z': 'Ζ', 'X': 'Χ', 'C': 'Ψ', 'V': 'Ω', 'B': 'Β', 'N': 'Ν', 'M': 'Μ' } },
  ja: { code: 'ja', name: 'Japanese (日本語)', dir: 'ltr', map: { 'q': 'た', 'w': 'て', 'e': 'い', 'r': 'す', 't': 'か', 'y': 'ん', 'u': 'な', 'i': 'に', 'o': 'ら', 'p': 'せ', '[': '「', ']': '」', 'a': 'ち', 's': 'と', 'd': 'し', 'f': 'は', 'g': 'き', 'h': 'く', 'j': 'ま', 'k': 'の', 'l': 'り', ';': 'れ', '\'': 'け', 'z': 'つ', 'x': 'さ', 'c': 'そ', 'v': 'ひ', 'b': 'こ', 'n': 'み', 'm': 'も', ',': 'ね', '.': 'る', '/': 'め' } },
  ko: { code: 'ko', name: 'Korean (한국어)', dir: 'ltr', map: { 'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ', 'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ', 'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ', 'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ', 'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ', 'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ', 'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ', 'O': 'ㅒ', 'P': 'ㅖ' } },
  th: { code: 'th', name: 'Thai (ไทย)', dir: 'ltr', map: { 'q': 'ๆ', 'w': 'ไ', 'e': 'ำ', 'r': 'พ', 't': 'ะ', 'y': 'ั', 'u': 'ี', 'i': 'ร', 'o': 'น', 'p': 'ย', '[': 'บ', ']': 'ล', 'a': 'ฟ', 's': 'ห', 'd': 'ก', 'f': 'ด', 'g': 'เ', 'h': '้', 'j': '่', 'k': 'า', 'l': 'ส', ';': 'ว', '\'': 'ง', 'z': 'ผ', 'x': 'ป', 'c': 'แ', 'v': 'อ', 'b': 'ิ', 'n': 'ื', 'm': 'ท', ',': 'ม', '.': 'ใ', '/': 'ฝ' } },
  uk: { code: 'uk', name: 'Ukrainian (Українська)', dir: 'ltr', map: { 'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ї', 'a': 'ф', 's': 'і', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', '\'': 'є', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю' } },
  bg: { code: 'bg', name: 'Bulgarian (Български)', dir: 'ltr', map: { 'q': 'я', 'w': 'в', 'e': 'е', 'r': 'р', 't': 'т', 'y': 'ъ', 'u': 'у', 'i': 'и', 'o': 'о', 'p': 'п', 'a': 'а', 's': 'с', 'd': 'д', 'f': 'ф', 'g': 'г', 'h': 'х', 'j': 'й', 'k': 'к', 'l': 'л', 'z': 'з', 'x': 'ь', 'c': 'ц', 'v': 'ж', 'b': 'б', 'n': 'н', 'm': 'м' } },
  ka: { code: 'ka', name: 'Georgian (ქართული)', dir: 'ltr', map: { 'q': 'ქ', 'w': 'წ', 'e': 'ე', 'r': 'რ', 't': 'ტ', 'y': 'ყ', 'u': 'უ', 'i': 'ი', 'o': 'ო', 'p': 'პ', 'a': 'ა', 's': 'ს', 'd': 'დ', 'f': 'ფ', 'g': 'გ', 'h': 'ჰ', 'j': 'ჯ', 'k': 'კ', 'l': 'ლ', 'z': 'ზ', 'x': 'ხ', 'c': 'ც', 'v': 'ვ', 'b': 'ბ', 'n': 'ნ', 'm': 'მ' } },
  hy: { code: 'hy', name: 'Armenian (Հայերեն)', dir: 'ltr', map: { 'q': 'ք', 'w': 'ո', 'e': 'ե', 'r': 'ր', 't': 'տ', 'y': 'ը', 'u': 'ւ', 'i': 'ի', 'o': 'օ', 'p': 'պ', 'a': 'ա', 's': 'ս', 'd': 'դ', 'f': 'ֆ', 'g': 'գ', 'h': 'հ', 'j': 'յ', 'k': 'կ', 'l': 'լ', 'z': 'զ', 'x': 'խ', 'c': 'ց', 'v': 'վ', 'b': 'բ', 'n': 'ն', 'm': 'մ' } },
  sr: { code: 'sr', name: 'Serbian (Српски)', dir: 'ltr', map: { 'q': 'љ', 'w': 'њ', 'e': 'е', 'r': 'р', 't': 'т', 'y': 'з', 'u': 'у', 'i': 'и', 'o': 'о', 'p': 'п', 'a': 'а', 's': 'с', 'd': 'д', 'f': 'ф', 'g': 'г', 'h': 'х', 'j': 'ј', 'k': 'к', 'l': 'л', 'z': 'ж', 'x': 'ѕ', 'c': 'ц', 'v': 'в', 'b': 'б', 'n': 'н', 'm': 'м' } },
  mk: { code: 'mk', name: 'Macedonian (Македонски)', dir: 'ltr', map: { 'q': 'љ', 'w': 'њ', 'e': 'е', 'r': 'р', 't': 'т', 'y': 'ѕ', 'u': 'у', 'i': 'и', 'o': 'о', 'p': 'п', 'a': 'а', 's': 'с', 'd': 'д', 'f': 'ф', 'g': 'г', 'h': 'х', 'j': 'ј', 'k': 'к', 'l': 'л', 'z': 'ж', 'x': 'џ', 'c': 'ц', 'v': 'в', 'b': 'б', 'n': 'н', 'm': 'м' } },
  be: { code: 'be', name: 'Belarusian (Беларуская)', dir: 'ltr', map: { 'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'ў', 'p': 'з', 'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'і', 'n': 'т', 'm': 'ь' } },
  am: { code: 'am', name: 'Amharic (አማርኛ)', dir: 'ltr', map: { 'q': 'ქ', 'w': 'წ', 'e': 'ე', 'r': 'ር', 't': 'ት', 'y': 'ይ', 'u': 'ኡ', 'i': 'ኢ', 'o': 'ኦ', 'p': 'ፕ', 'a': 'አ', 's': 'ስ', 'd': 'ድ', 'f': 'ፍ', 'g': 'ግ', 'h': 'ህ', 'j': 'ጅ', 'k': 'ክ', 'l': 'ል', 'z': 'ז', 'x': 'ხ', 'c': 'ች', 'v': 'ቭ', 'b': 'ብ', 'n': 'ን', 'm': 'ም' } },
  my: { code: 'my', name: 'Burmese (မြန်မာ)', dir: 'ltr', map: { 'q': 'ဆ', 'w': 'တ', 'e': 'န', 'r': 'မ', 't': 'အ', 'y': 'ပ', 'u': 'က', 'i': 'င', 'o': 'သ', 'p': 'စ', 'a': 'ေ', 's': 'ျ', 'd': 'ိ', 'f': '်', 'g': 'ါ', 'h': '့', 'j': 'ြ', 'k': 'ု', 'l': 'ူ', 'z': 'ဖ', 'x': 'ထ', 'c': 'ခ', 'v': 'လ', 'b': 'ဘ', 'n': 'ည', 'm': 'ာ' } },
  km: { code: 'km', name: 'Khmer (ខ្មែរ)', dir: 'ltr', map: { 'q': 'ឆ', 'w': 'ត', 'e': 'န', 'r': 'ម', 't': 'អ', 'y': 'យ', 'u': 'ក', 'i': 'ង', 'o': 'ោ', 'p': 'ផ', 'a': 'ា', 's': 'ស', 'd': 'ដ', 'f': 'ថ', 'g': 'ហ', 'h': '្', 'j': 'ㅓ', 'k': 'ក', 'l': 'ល', 'z': 'ឋ', 'x': 'ខ', 'c': 'ឃ', 'v': 'វ', 'b': 'ប', 'n': 'ណ', 'm': 'ម' } },
  lo: { code: 'lo', name: 'Lao (ລາວ)', dir: 'ltr', map: { 'q': ' nowoczes', 'w': 'ໄ', 'e': 'ໍາ', 'r': 'ພ', 't': 'ະ', 'y': 'ັ', 'u': 'ີ', 'i': 'ຣ', 'o': 'ນ', 'p': 'ຍ', 'a': 'ຟ', 's': 'ຫ', 'd': 'ກ', 'f': 'ດ', 'g': 'ເ', 'h': '້', 'j': '່', 'k': 'າ', 'l': 'ສ', 'z': 'ຜ', 'x': 'ປ', 'c': 'ແ', 'v': 'ອ', 'b': 'ິ', 'n': 'ື', 'm': 'ທ' } },
  si: { code: 'si', name: 'Sinhala (සිංහල)', dir: 'ltr', map: { 'q': 'ணு', 'w': 'ඔ', 'e': 'ඒ', 'r': 'ර්‍', 't': 'ට්', 'y': 'ශ', 'u': 'උ', 'i': 'ඉ', 'o': 'ඕ', 'p': 'פּ', 'a': 'අ', 's': 'ස්', 'd': 'ඩ්', 'f': 'ෆ්', 'g': 'ග්', 'h': 'හ්', 'j': 'ජ්', 'k': 'ක්', 'l': 'ල්', 'z': 'ශ්', 'x': 'ඥ', 'c': 'ච්', 'v': 'ව්', 'b': 'බ්', 'n': 'න්', 'm': 'ම්' } },
  dv: { code: 'dv', name: 'Divehi (ދިވެހި)', dir: 'rtl', map: { 'q': 'ޤ', 'w': 'ޢ', 'e': '孀', 'r': 'ތ', 't': 'ޓ', 'y': 'ޔ', 'u': 'ު', 'i': 'ި', 'o': 'ޮ', 'p': 'ޕ', 'a': 'ަ', 's': 'ސ', 'd': 'ޑ', 'f': 'ފ', 'g': 'ގ', 'h': 'ހ', 'j': 'ޖ', 'k': 'ކ', 'l': 'ލ', 'z': 'ޒ', 'x': 'ޝ', 'c': 'ޗ', 'v': 'ޥ', 'b': 'ބ', 'n': 'ނ', 'm': 'މ' } },
  ti: { code: 'ti', name: 'Tigrinya (ትግርኛ)', dir: 'ltr', map: { 'q': 'ಕು', 'w': 'ዉ', 'e': 'ኤ', 'r': 'ር', 't': 'ት', 'y': 'ይ', 'u': 'ኡ', 'i': 'ኢ', 'o': 'ኦ', 'p': 'ፕ', 'a': 'አ', 's': 'ስ', 'd': 'ድ', 'f': 'ፍ', 'g': 'ግ', 'h': 'ህ', 'j': 'ጅ', 'k': 'ክ', 'l': 'ል', 'z': 'ዝ', 'x': 'ሽ', 'c': 'ች', 'v': 'ቭ', 'b': 'ብ', 'n': 'ን', 'm': 'ም' } },
  iu: { code: 'iu', name: 'Inuktitut (ᐃᓄᒃᑎᑐᑦ)', dir: 'ltr', map: { 'w': 'ᐃ', 'e': 'ᐁ', 'r': 'ᐅ', 't': 'ᐊ', 'a': 'ᐋ', 's': 'ᓯ', 'd': 'ᓴ', 'f': 'ᕖ', 'g': 'ᕙ', 'j': 'ᔨ', 'k': 'ᔭ', 'l': 'ᓚ', 'c': 'ᖏ', 'v': 'ᖑ', 'b': 'ᓂ', 'n': 'ᓇ', 'm': 'ᒥ', 'i': 'ᑭ', 'o': 'ᑯ', 'p': 'ᐸ' } },
};

const inverseMaps: Record<LanguageCode, { [key: string]: string }> = {} as any;

for (const langCode in languages) {
  const code = langCode as LanguageCode;
  const inverseMap: { [key: string]: string } = {};
  const sortedKeys = Object.keys(languages[code].map).sort((a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA !== lowerB) { return lowerA.localeCompare(lowerB); }
    if (a === lowerA && b !== lowerB) return -1;
    if (a !== lowerA && b === lowerB) return 1;
    return 0;
  });
  for (const key of sortedKeys) {
    const value = languages[code].map[key];
    if (inverseMap[value] === undefined) { inverseMap[value] = key; }
  }
  inverseMaps[code] = inverseMap;
}

export const translate = (text: string, from: LanguageCode, to: LanguageCode, customMaps: CustomMaps = {}): string => {
  if (from === to) return text;
  const toQwertyMap = from === 'en' ? languages.en.map : inverseMaps[from];
  let qwertyText = '';
  for (const char of text) { qwertyText += toQwertyMap[char] || char; }
  
  const customMapForTarget = customMaps[to];
  const defaultMap = languages[to].map;
  const fromQwertyMap = customMapForTarget ? { ...defaultMap, ...customMapForTarget } : defaultMap;
  
  let result = '';
  for (const char of qwertyText) { result += fromQwertyMap[char] || char; }
  return result;
};

export { languages };

export const practiceContent: Record<LanguageCode, { words: string[], shortSentences: string[], longSentences: string[] }> = {
    en: {
        words: ["hello", "world", "keyboard", "language", "practice", "style", "script", "quick"],
        shortSentences: ["The sun is shining brightly.", "She sings a beautiful song.", "He runs faster than the wind."],
        longSentences: [ "The quick brown fox jumps over the lazy dog.", "How vexingly quick daft zebras jump!", "A wizard's job is to vex chumps quickly in fog." ],
    },
    de: {
        words: ["hallo", "welt", "tastatur", "sprache", "übung", "stil", "schrift", "schnell"],
        shortSentences: ["Die Sonne scheint hell.", "Sie singt ein schönes Lied.", "Er rennt schneller als der Wind."],
        longSentences: [ "Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.", "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern." ],
    },
    es: {
        words: ["hola", "mundo", "teclado", "idioma", "práctica", "estilo", "escritura", "rápido"],
        shortSentences: ["El sol brilla intensamente.", "Ella canta una hermosa canción.", "Él corre más rápido que el viento."],
        longSentences: [ "El veloz murciélago hindú comía feliz cardillo y kiwi.", "El pingüino Wenceslao hizo kilómetros bajo exhaustiva lluvia y frío." ],
    },
    ru: {
        words: ["привет", "мир", "клавиатура", "язык", "практика", "стиль", "сценарий", "быстрый"],
        shortSentences: ["Солнце светит ярко.", "Она поет красивую песню.", "Он бежит быстрее ветра."],
        longSentences: [ "Съешь ещё этих мягких французских булок, да выпей чаю.", "В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!" ],
    },
    fa: {
        words: ["سلام", "دنیا", "صفحه کلید", "زبان", "تمرین", "سبک", "خط", "سریع"],
        shortSentences: ["خورشید به روشنی می درخشد.", "او آهنگ زیبایی می خواند.", "او سریعتر از باد می دود."],
        longSentences: [ "در صورت حذف این چند جمله شاید خواننده عادی هرگز ملتفت کمبود آن نشود.", "چرا این قدر آب می نوشی؟" ],
    },
    // Add default content for new languages
    ar: { words: ["مرحبا", "عالم", "كيبورد"], shortSentences: ["الشمس تشرق.", "هو يركض بسرعة."], longSentences: ["تحتوي اللغة العربية على العديد من اللهجات المختلفة."] },
    hi: { words: ["नमस्ते", "दुनिया", "कीबोर्ड"], shortSentences: ["सूरज चमक रहा है।", "वह तेजी से दौड़ता है।"], longSentences: ["हिंदी भारत की आधिकारिक भाषाओं में से एक है।"] },
    he: { words: ["שלום", "עולם", "מקלדת"], shortSentences: ["השמש זורחת.", "הוא רץ מהר."], longSentences: ["עברית נכתבת מימין לשמאל."] },
    el: { words: ["γεια", "κόσμος", "πληκτρολόγιο"], shortSentences: ["Ο ήλιος λάμπει.", "Τρέχει γρήγορα."], longSentences: ["Η ελληνική γλώσσα έχει μακρά ιστορία."] },
    ja: { words: ["こんにちは", "世界", "キーボード"], shortSentences: ["太陽が輝いています。", "彼は速く走ります。"], longSentences: ["日本語には三つの文字体系があります。"] },
    ko: { words: ["안녕하세요", "세계", "건반"], shortSentences: ["해가 빛나고 있습니다.", "그는 빨리 달린다."], longSentences: ["한글은 조선시대에 만들어졌습니다."] },
    th: { words: ["สวัสดี", "โลก", "แป้นพิมพ์"], shortSentences: ["พระอาทิตย์กำลังส่องแสง", "เขาวิ่งเร็ว"], longSentences: ["ภาษาไทยมีวรรณยุกต์ห้าเสียง"] },
    uk: { words: ["привіт", "світ", "клавіатура"], shortSentences: ["Сонце світить.", "Він швидко біжить."], longSentences: ["Українська мова є слов'янською мовою."] },
    bg: { words: ["здравей", "свят", "клавиатура"], shortSentences: ["Слънцето грее.", "Той тича бързо."], longSentences: ["Българският език използва кирилицата."] },
    ka: { words: ["გამარჯობა", "სამყარო", "კლავიატურა"], shortSentences: ["მზე ანათებს.", "ის სწრაფად დარბის."], longSentences: ["ქართულს აქვს უნიკალური დამწერლობა."] },
    hy: { words: ["բարև", "աշխարհ", "ստեղնաշար"], shortSentences: ["Արևը փայլում է.", "Նա արագ է վազում:"], longSentences: ["Հայերենը հնդեվրոպական լեզու է։"] },
    sr: { words: ["здраво", "свет", "тастатура"], shortSentences: ["Сунце сија.", "Он брзо трчи."], longSentences: ["Српски може користити и ћирилицу и латиницу."] },
    mk: { words: ["здраво", "свет", "тастатура"], shortSentences: ["Сонцето сјае.", "Тој трча брзо."], longSentences: ["Македонскиот јазик е јужнословенски јазик."] },
    be: { words: ["прывітанне", "свет", "клавіятура"], shortSentences: ["Сонца свеціць.", "Ён хутка бяжыць."], longSentences: ["Беларуская мова падобная на рускую і ўкраінскую."] },
    am: { words: ["ሰላም", "ዓለም", "የቦርድ"], shortSentences: ["ፀሐይ ታበራለች።", "እሱ በፍጥነት ይሮጣል።"], longSentences: ["አማርኛ የኢትዮጵያ рабочая ቋንቋ ነው።"] },
    my: { words: ["မင်္ဂလာပါ", "ကမ္ဘာကြီး", "ကီးဘုတ်"], shortSentences: ["နေသာနေတယ်။", "သူအမြန်ပြေးတယ်။"], longSentences: ["မြန်မာဘာသာစကားတွင် ကိုယ်ပိုင်အက္ခရာရှိသည်။"] },
    km: { words: ["សួស្តី", "ពិភពលោក", "ក្តារចុច"], shortSentences: ["ព្រះអាទិត្យកំពុងរះ។", "គាត់រត់លឿនណាស់។"], longSentences: ["ភាសាខ្មែរជាភាសារបស់ប្រទេសកម្ពុជា។"] },
    lo: { words: ["ສະບາຍດີ", "ໂລກ", "ແປ້ນພິມ"], shortSentences: ["ຕາເວັນກຳລັງສ່ອງແສງ.", "ລາວແລ່ນໄວ."], longSentences: ["ພາສາລາວເປັນພາສາທາງການຂອງລາວ."] },
    si: { words: ["හෙලෝ", "ලෝකය", "යතුරු පුවරුව"], shortSentences: ["හිරු පායනවා.", "ඔහු වේගයෙන් දුවනවා."], longSentences: ["සිංහල යනු ශ්‍රී ලංකාවේ භාෂාවකි."] },
    dv: { words: ["އައްސަލާމް", "ދުނިޔެ", "ކީބޯޑު"], shortSentences: ["އިރު އެބައަރයි.", "އޭނާ އަވަހަށް ދުවයි."], longSentences: ["ދިވެހިބަސް ދިވެހިރާއްޖޭގައި ވާހަކަ ދައްކයි."] },
    ti: { words: ["ሰላም", "ዓለም", " ሰሌዳ"], shortSentences: ["ጸሓይ ትበርቕ ኣላ።", "ንሱ ብቕልጡፍ ይጎዪ።"], longSentences: ["ትግርኛ ኣብ ኤርትራን ኢትዮጵያን ይዝረብ።"] },
    iu: { words: ["ᐊᐃ", "ᓄᓇ", "ᑭ"]), shortSentences: ["ᓯᕿᓂᖅ  shone.", "ᐊပြေး nhanh."], longSentences: ["ᐃᓄᒃᑎᑐᑦ ພາສາ  arctic."] },
};
