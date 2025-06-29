// script.js

// --- PERFORMANCE & INTERACTIVITY ENHANCEMENTS ---
// 1. Efficient DOMContentLoaded: Only run after DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if any)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    entry.target.removeAttribute('data-src');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });
        images.forEach(img => observer.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    // Show body after critical JS runs
    requestAnimationFrame(() => {
        document.body.style.visibility = 'visible';
    });
});

// 2. Debounce utility for resize/scroll events
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 3. Debounced resize event for responsive logic
window.addEventListener('resize', debounce(function() {
    // Add responsive logic here if needed
}, 150));

// 4. Passive scroll event for smoothness
window.addEventListener('scroll', function() {}, { passive: true });

// 5. Idle callback for non-critical tasks (if supported)
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Place analytics or non-critical JS here
    });
}

// 6. Preload fonts for better rendering (if needed)
// (Handled in HTML with preconnect)

// 7. Minimize forced reflows: batch DOM reads/writes
// (Handled above with requestAnimationFrame)

// 8. Use strict mode for safer JS
'use strict';

// --- DYNAMIC CATEGORY RENDERING & INTERACTIVITY ---
// DATA (moved from HTML)
const categories = [
    {
        title: '🤖 چاتبووتێن زیرەک',
        tools: [
            { name: 'ChatGPT', desc: 'چاتبووتی زانای OpenAI بۆ پرسیار و وەڵام', url: 'https://chat.openai.com' },
            { name: 'Google Bard', desc: 'چاتبووتی گووگڵ بۆ زانست و وەڵامدان', url: 'https://bard.google.com' },
            { name: 'Microsoft Copilot', desc: 'یارمەتی‌دەر و چاتبووتی مایکروسۆفت', url: 'https://www.microsoft.com/copilot' },
            { name: 'Claude', desc: 'چاتبووتی زانای Anthropic بۆ وتار و وەڵام', url: 'https://claude.ai' },
            { name: 'Gemini', desc: 'چاتبووتی گووگڵ بۆ زانست و چاوپێکەوتن', url: 'https://gemini.google.com' },
            { name: 'DeepSeek', desc: 'چاتبووتی DeepSeek بۆ زانست و گەڕان', url: 'https://chat.deepseek.com' },
            { name: 'Manus', desc: 'چاتبووتی تایبەتی Manus بۆ یارمەتی', url: 'https://manus.ai' },
            { name: 'ChatSonic', desc: 'چاتبووتی نوێ بۆ نوسین و وەڵامدان', url: 'https://writesonic.com/chat' },
            { name: 'Jasper', desc: 'چاتبووتی مارکێتینگ و نوسین بۆ کۆمپانیاکان', url: 'https://www.jasper.ai' },
            { name: 'Copy.ai', desc: 'چاتبووتی تایبەتی بۆ دروستکردنی کۆپی', url: 'https://www.copy.ai' },
            { name: 'Rytr', desc: 'چاتبووتی نوسین بۆ هەموو جۆرێک', url: 'https://rytr.me' },
            { name: 'Wordtune', desc: 'یارمەتی بۆ گۆڕینی و پەرەپێدانی وتار', url: 'https://www.wordtune.com' },
            { name: 'Quillbot', desc: 'چاتبووتی پارافڕێزکردن و گۆڕینی جوملە', url: 'https://quillbot.com' },
            { name: 'INK Editor', desc: 'ئامێری نوسین و سەرجەمکردنی وتار', url: 'https://inkforall.com' },
            { name: 'Text Blaze', desc: 'دروستکردنی شابلۆن و نوسینی خێرا', url: 'https://blaze.today' },
            { name: 'Anyword', desc: 'نوسینی تایبەتی بۆ مارکێتینگ و پەیام', url: 'https://anyword.com' },
            { name: 'Writesonic', desc: 'دروستکردنی نوسین و چاتبووتی تایبەتی', url: 'https://writesonic.com' },
            { name: 'Snazzy AI', desc: 'چاتبووتی نوسین بۆ پەیام و مارکێتینگ', url: 'https://snazzy.ai' },
            { name: 'AI Dungeon', desc: 'یاری چاتبووتی بۆ دروستکردنی چیرۆک', url: 'https://play.aidungeon.io' },
            { name: 'Poe', desc: 'پلاتفۆرمی چاتبووتی جۆراوجۆر', url: 'https://poe.com' },
            { name: 'Character AI', desc: 'چاتبووتی دروستکردنی کاراکتەر و گفتوگۆ', url: 'https://character.ai' },
            { name: 'Replika', desc: 'چاتبووتی هاوڕێ و یارمەتی روانی', url: 'https://replika.ai' },
            { name: 'AI Picasso', desc: 'دروستکردنی وێنە بە هوشە مصنوعی', url: 'https://aipicasso.com' },
            { name: 'DeepAI', desc: 'پلاتفۆرمی وێنەسازی و زانست', url: 'https://deepai.org' },
            { name: 'NightCafe', desc: 'دروستکردنی وێنە و هونەر بە AI', url: 'https://nightcafe.studio' },
            { name: 'Artbreeder', desc: 'گۆڕینی و دروستکردنی وێنە بە AI', url: 'https://www.artbreeder.com' },
            { name: 'Runway ML', desc: 'پلاتفۆرمی وێنە و ڤیدیۆی AI', url: 'https://runwayml.com' },
            { name: 'Craiyon', desc: 'دروستکردنی وێنە بە دەستکاری AI', url: 'https://www.craiyon.com' },
            { name: 'StarryAI', desc: 'دروستکردنی وێنە و هونەر بە زانایەتی', url: 'https://starryai.com' },
            { name: 'Deep Dream Generator', desc: 'دروستکردنی وێنەی خەیاڵی بە AI', url: 'https://deepdreamgenerator.com' },
            { name: 'Photosonic', desc: 'دروستکردنی وێنە و گۆڕینی وێنە', url: 'https://photosonic.ai' },
            { name: 'PaintsChainer', desc: 'وێنەسازی بە شێوازی کاریکاتور', url: 'https://paintschainer.preferred.tech' },
            { name: 'AI Gahaku', desc: 'دروستکردنی پۆرترێت بە شێوازی هونەری', url: 'https://ai-art.tokyo/en/' },
            { name: 'AI Painter', desc: 'وێنەسازی و هونەر بە هوشە مصنوعی', url: 'https://www.aipainter.ai' },
            { name: 'AI Art Generator', desc: 'دروستکردنی هونەر و وێنەی نوێ', url: 'https://www.artificial-intelligence.art' },
            { name: 'Botpress', desc: 'پلاتفۆرمی دروستکردنی چاتبووتی تایبەتی', url: 'https://botpress.com' },
            { name: 'ManyChat', desc: 'چاتبووتی مارکێتینگ بۆ فەیسبووک و واتساپ', url: 'https://manychat.com' },
            { name: 'Tidio', desc: 'چاتبووتی پشتگیری و بازرگانی', url: 'https://www.tidio.com' },
            { name: 'MobileMonkey', desc: 'چاتبووتی مارکێتینگ بۆ فەیسبووک', url: 'https://mobilemonkey.com' },
            { name: 'Chatfuel', desc: 'دروستکردنی چاتبووت بێ کۆد', url: 'https://chatfuel.com' },
            { name: 'Pandorabots', desc: 'پلاتفۆرمی چاتبووتی زانایەتی', url: 'https://www.pandorabots.com' },
            { name: 'Flow XO', desc: 'دروستکردنی چاتبووت بۆ وێبسایت و مەسجەر', url: 'https://flowxo.com' },
            { name: 'Landbot', desc: 'چاتبووتی وێبسایت بە ڕووکارێ کشان و دابەزاندن', url: 'https://landbot.io' }
        ]
    },
    {
        title: '🌐 وێبسایتە زانیارییەکان',
        tools: [
            { name: 'Wikipedia', desc: 'پەیجی زانیارییەکان بۆ هەموو شتێک', url: 'https://www.wikipedia.org' },
            { name: 'Wiktionary', desc: 'ویکی پەیجی فەرمی و وەشانی نووسین', url: 'https://www.wiktionary.org' },
            { name: 'Wikidata', desc: 'داتابەیسی زانیارییەکان بۆ ویکیپیدیا', url: 'https://www.wikidata.org' },
            { name: 'Internet Archive', desc: 'ئارشیڤی ئینتەرنێت بۆ گەڕانی زانیاری', url: 'https://archive.org' },
            { name: 'Wayback Machine', desc: 'گەرەکی پەیوەندیدانی ماوەی پێشوو', url: 'https://web.archive.org' },
            { name: 'Google Scholar', desc: 'گەڕانی زانیاری بەرز و توانا', url: 'https://scholar.google.com' },
            { name: 'Microsoft Academic', desc: 'زانیاری و ماوەی پەیوەندیدانی توانا', url: 'https://academic.microsoft.com' },
            { name: 'Semantic Scholar', desc: 'گەڕانی زانیاری بەرز بۆ زانست', url: 'https://www.semanticscholar.org' },
            { name: 'PubMed', desc: 'زانیاری بەرز بۆ پزیشکی و زانست', url: 'https://pubmed.ncbi.nlm.nih.gov' },
            { name: 'arXiv', desc: 'پەیجی زانیاری بەرز بۆ فیزیا و زانستەکان', url: 'https://arxiv.org' },
            { name: 'bioRxiv', desc: 'زانیاری بەرز بۆ زانستە ژینگەییەکان', url: 'https://www.biorxiv.org' },
            { name: 'SSRN', desc: 'زانیاری بەرز بۆ کۆمەڵایەتی و زانستەکان', url: 'https://www.ssrn.com' },
            { name: 'ResearchGate', desc: 'پەیوەندیدانی زانیاری بەرز بۆ زانایان', url: 'https://www.researchgate.net' },
            { name: 'Academia.edu', desc: 'پەیوەندیدانی زانیاری بەرز بۆ زانایان', url: 'https://www.academia.edu' },
            { name: 'Google Books', desc: 'گەڕانی زانیاری بەرز بۆ کتێب و نووسراوەکان', url: 'https://books.google.com' },
            { name: 'Internet Archive Books', desc: 'ئارشیڤی کتێبەکان بۆ گەڕانی زانیاری', url: 'https://archive.org/details/texts' },
            { name: 'Open Library', desc: 'کتێبخانەی فەرمی بۆ گەڕانی زانیاری', url: 'https://openlibrary.org' },
            { name: 'Project Gutenberg', desc: 'کتێبە فریەکان بۆ گەڕانی زانیاری', url: 'https://www.gutenberg.org' },
            { name: 'LibriVox', desc: 'کتێبە فریەکان بۆ گوێرانی زانیاری', url: 'https://librivox.org' },
            { name: 'Google Patents', desc: 'گەڕانی زانیاری بەرز بۆ پەیام و پەیامەکان', url: 'https://patents.google.com' },
            { name: 'USPTO', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://www.uspto.gov' },
            { name: 'EPO', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://www.epo.org' },
            { name: 'Free Patents Online', desc: 'گەڕانی زانیاری بەرز بۆ پەیامەکان', url: 'https://www.freepatentsonline.com' },
            { name: 'PatentScope', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://patentscope.wipo.int' },
            { name: 'Google Trends', desc: 'بەرزبوونی پەیوەندیدانی زانیاری', url: 'https://trends.google.com' },
            { name: 'BuzzSumo', desc: 'زانیاری بەرز بۆ تۆمارکردن و نوسین', url: 'https://buzzsumo.com' },
            { name: 'Feedly', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://feedly.com' },
            { name: 'Flipboard', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://flipboard.com' },
            { name: 'Pocket', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://getpocket.com' },
            { name: 'Instapaper', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.instapaper.com' },
            { name: 'Evernote', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://evernote.com' },
            { name: 'Notion', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.notion.so' },
            { name: 'OneNote', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.onenote.com' },
            { name: 'Google Keep', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://keep.google.com' },
            { name: 'Microsoft To Do', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://todo.microsoft.com' },
            { name: 'Trello', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://trello.com' },
            { name: 'Asana', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://asana.com' },
            { name: 'Slack', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://slack.com' },
            { name: 'Discord', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://discord.com' },
            { name: 'Telegram', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://telegram.org' },
            { name: 'WhatsApp', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.whatsapp.com' },
            { name: 'Signal', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://signal.org' },
            { name: 'Viber', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.viber.com' },
            { name: 'Line', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://line.me' },
            { name: 'WeChat', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wechat.com' },
            { name: 'QQ', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qq.com' },
            { name: 'Baidu', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.baidu.com' },
            { name: 'Yandex', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yandex.com' },
            { name: 'DuckDuckGo', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://duckduckgo.com' },
            { name: 'StartPage', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com' },
            { name: 'Qwant', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com' },
            { name: 'Swisscows', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com' },
            { name: 'Searx', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org' },
            { name: 'MetaGer', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org' },
            { name: 'Gigablast', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com' },
            { name: 'Mojeek', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com' },
            { name: 'Yippy', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com' },
            { name: 'Search Encrypt', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com' },
            { name: 'Qwant Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://qwant.com/maps' },
            { name: 'OpenStreetMap', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.openstreetmap.org' },
            { name: 'Google Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/maps' },
            { name: 'Bing Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/maps' },
            { name: 'Here WeGo', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://wego.here.com' },
            { name: 'MapQuest', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mapquest.com' },
            { name: 'OpenTopoMap', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://opentopomap.org' },
            { name: 'USGS Earth Explorer', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://earthexplorer.usgs.gov' },
            { name: 'NASA Worldview', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://worldview.earthdata.nasa.gov' },
            { name: 'Google Earth', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/earth' },
            { name: 'Bing Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/weather' },
            { name: 'Weather.com', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://weather.com' },
            { name: 'AccuWeather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.accuweather.com' },
            { name: 'BBC Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/weather' },
            { name: 'CNN Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com/weather' },
            { name: 'Al Jazeera Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com/weather' },
            { name: 'Fox News Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com/weather' },
            { name: 'MSNBC Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/weather' },
            { name: 'NPR Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org/weather' },
            { name: 'NWS', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.weather.gov' },
            { name: 'Met Office', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.metoffice.gov.uk' },
            { name: 'Weather Underground', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wunderground.com' },
            { name: 'Pollen.com', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.pollen.com' },
            { name: 'AirNow', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.airnow.gov' },
            { name: 'EPA', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.epa.gov' },
            { name: 'CDC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cdc.gov' },
            { name: 'WHO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.who.int' },
            { name: 'UN', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.un.org' },
            { name: 'EU', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://europa.eu' },
            { name: 'NATO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.nato.int' },
            { name: 'IMF', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.imf.org' },
            { name: 'World Bank', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.worldbank.org' },
            { name: 'OECD', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.oecd.org' },
            { name: 'WTO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wto.org' },
            { name: 'UNESCO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://en.unesco.org' },
            { name: 'Red Cross', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.redcross.org' },
            { name: 'Amnesty International', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.amnesty.org' },
            { name: 'Greenpeace', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.greenpeace.org' },
            { name: 'Doctors Without Borders', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.doctorswithoutborders.org' },
            { name: 'Human Rights Watch', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.hrw.org' },
            { name: 'International Crisis Group', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.crisisgroup.org' },
            { name: 'Council on Foreign Relations', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cfr.org' },
            { name: 'Brookings Institution', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.brookings.edu' },
            { name: 'Carnegie Endowment for International Peace', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.carnegieendowment.org' },
            { name: 'Rand Corporation', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.rand.org' },
            { name: 'Pew Research Center', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.pewresearch.org' },
            { name: 'Gallup', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.gallup.com' },
            { name: 'Nielsen', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.nielsen.com' },
            { name: 'Statista', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.statista.com' },
            { name: 'Trading Economics', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://tradingeconomics.com' },
            { name: 'Investopedia', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.investopedia.com' },
            { name: 'Yahoo Finance', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://finance.yahoo.com' },
            { name: 'Google Finance', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/finance' },
            { name: 'Bloomberg', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com' },
            { name: 'Reuters', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com' },
            { name: 'CNBC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnbc.com' },
            { name: 'Fox Business', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxbusiness.com' },
            { name: 'MSNBC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com' },
            { name: 'Al Jazeera', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com' },
            { name: 'BBC News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/news' },
            { name: 'CNN', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com' },
            { name: 'Fox News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com' },
            { name: 'MSNBC News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/news' },
            { name: 'NPR', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org' },
            { name: 'Reuters News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/news' },
            { name: 'Bloomberg News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/news' },
            { name: 'Yahoo News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.yahoo.com' },
            { name: 'Google News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.google.com' },
            { name: 'DuckDuckGo News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.duckduckgo.com' },
            { name: 'Bing News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/news' },
            { name: 'StartPage News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com/news' },
            { name: 'Qwant News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com/news' },
            { name: 'Swisscows News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com/news' },
            { name: 'Searx News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org/news' },
            { name: 'MetaGer News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org/news' },
            { name: 'Gigablast News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com/news' },
            { name: 'Mojeek News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com/news' },
            { name: 'Yippy News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com/news' },
            { name: 'Search Encrypt News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com/news' },
            { name: 'Google Finance News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/finance/news' },
            { name: 'Yahoo Finance News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://finance.yahoo.com/news' },
            { name: 'Bloomberg Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/markets' },
            { name: 'Reuters Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/markets' },
            { name: 'CNBC Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnbc.com/markets' },
            { name: 'Fox Business Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxbusiness.com/markets' },
            { name: 'MSNBC Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/markets' },
            { name: 'Al Jazeera Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com/markets' },
            { name: 'BBC News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/news/markets' },
            { name: 'CNN Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com/markets' },
            { name: 'Fox News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com/markets' },
            { name: 'MSNBC News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/news/markets' },
            { name: 'NPR Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org/markets' },
            { name: 'Reuters News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/news/markets' },
            { name: 'Bloomberg News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/news/markets' },
            { name: 'Yahoo News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.yahoo.com/markets' },
            { name: 'Google News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.google.com/markets' },
            { name: 'DuckDuckGo News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.duckduckgo.com/markets' },
            { name: 'Bing News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/news/markets' },
            { name: 'StartPage News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com/news/markets' },
            { name: 'Qwant News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com/news/markets' },
            { name: 'Swisscows News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com/news/markets' },
            { name: 'Searx News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org/news/markets' },
            { name: 'MetaGer News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org/news/markets' },
            { name: 'Gigablast News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com/news/markets' },
            { name: 'Mojeek News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com/news/markets' },
            { name: 'Yippy News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com/news/markets' },
            { name: 'Search Encrypt News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com/news/markets' }
        ]
    },
    {
        title: '🎨 ئامێرە هونەرییەکان',
        tools: [
            { name: 'Canva', desc: 'دیزاینی گرافیکی و دروستکردنی پۆست و پڕۆژە', url: 'https://www.canva.com' },
            { name: 'Figma', desc: 'دیزاینی وێب و ئاپلیکەیشن بە هاوکاری', url: 'https://www.figma.com' },
            { name: 'Photopea', desc: 'فۆتۆشۆپ لە وێبدا بێ بەرامبەر', url: 'https://www.photopea.com' }
        ]
    },
    {
        title: '📚 فێرکاری و خوێندن',
        tools: [
            { name: 'Khan Academy', desc: 'فێرکاری بۆ هەموو ئاستێک', url: 'https://www.khanacademy.org' },
            { name: 'Coursera', desc: 'کۆرسە فێرکارییەکان بۆ زانست و پیشە', url: 'https://www.coursera.org' },
            { name: 'Duolingo', desc: 'فێرکاری زمان بە شێوەی یاری', url: 'https://www.duolingo.com' }
        ]
    },
    {
        title: '💼 ئامێرە کار و پیشە',
        tools: [
            { name: 'LinkedIn', desc: 'تۆڕی پیشەسازی و کار', url: 'https://www.linkedin.com' },
            { name: 'Indeed', desc: 'گەڕان بۆ کار و پۆستەکان', url: 'https://www.indeed.com' },
            { name: 'Glassdoor', desc: 'زانیاری بۆ کۆمپانیا و پێداویستی کار', url: 'https://www.glassdoor.com' }
        ]
    },
    {
        title: '💻 گەشەپێدانی وێب و کۆدکردن',
        tools: [
            { name: 'GitHub', desc: 'هاوپۆلی کۆد و گەشەپێدانی وێب', url: 'https://github.com' },
            { name: 'Stack Overflow', desc: 'پرس و وەڵام بۆ کۆد و گەشەپێدان', url: 'https://stackoverflow.com' },
            { name: 'CodePen', desc: 'تاقیکردنەوەی کۆد و دیزاین', url: 'https://codepen.io' }
        ]
    },
    {
        title: '🤖 چاتبووتێن زیرەک',
        tools: [
            { name: 'ChatGPT', desc: 'چاتبووتی زانای OpenAI بۆ پرسیار و وەڵام', url: 'https://chat.openai.com' },
            { name: 'Google Bard', desc: 'چاتبووتی گووگڵ بۆ زانست و وەڵامدان', url: 'https://bard.google.com' },
            { name: 'Microsoft Copilot', desc: 'یارمەتی‌دەر و چاتبووتی مایکروسۆفت', url: 'https://www.microsoft.com/copilot' },
            { name: 'Claude', desc: 'چاتبووتی زانای Anthropic بۆ وتار و وەڵام', url: 'https://claude.ai' },
            { name: 'Gemini', desc: 'چاتبووتی گووگڵ بۆ زانست و چاوپێکەوتن', url: 'https://gemini.google.com' },
            { name: 'DeepSeek', desc: 'چاتبووتی DeepSeek بۆ زانست و گەڕان', url: 'https://chat.deepseek.com' },
            { name: 'Manus', desc: 'چاتبووتی تایبەتی Manus بۆ یارمەتی', url: 'https://manus.ai' },
            { name: 'ChatSonic', desc: 'چاتبووتی نوێ بۆ نوسین و وەڵامدان', url: 'https://writesonic.com/chat' },
            { name: 'Jasper', desc: 'چاتبووتی مارکێتینگ و نوسین بۆ کۆمپانیاکان', url: 'https://www.jasper.ai' },
            { name: 'Copy.ai', desc: 'چاتبووتی تایبەتی بۆ دروستکردنی کۆپی', url: 'https://www.copy.ai' },
            { name: 'Rytr', desc: 'چاتبووتی نوسین بۆ هەموو جۆرێک', url: 'https://rytr.me' },
            { name: 'Wordtune', desc: 'یارمەتی بۆ گۆڕینی و پەرەپێدانی وتار', url: 'https://www.wordtune.com' },
            { name: 'Quillbot', desc: 'چاتبووتی پارافڕێزکردن و گۆڕینی جوملە', url: 'https://quillbot.com' },
            { name: 'INK Editor', desc: 'ئامێری نوسین و سەرجەمکردنی وتار', url: 'https://inkforall.com' },
            { name: 'Text Blaze', desc: 'دروستکردنی شابلۆن و نوسینی خێرا', url: 'https://blaze.today' },
            { name: 'Anyword', desc: 'نوسینی تایبەتی بۆ مارکێتینگ و پەیام', url: 'https://anyword.com' },
            { name: 'Writesonic', desc: 'دروستکردنی نوسین و چاتبووتی تایبەتی', url: 'https://writesonic.com' },
            { name: 'Snazzy AI', desc: 'چاتبووتی نوسین بۆ پەیام و مارکێتینگ', url: 'https://snazzy.ai' },
            { name: 'AI Dungeon', desc: 'یاری چاتبووتی بۆ دروستکردنی چیرۆک', url: 'https://play.aidungeon.io' },
            { name: 'Poe', desc: 'پلاتفۆرمی چاتبووتی جۆراوجۆر', url: 'https://poe.com' },
            { name: 'Character AI', desc: 'چاتبووتی دروستکردنی کاراکتەر و گفتوگۆ', url: 'https://character.ai' },
            { name: 'Replika', desc: 'چاتبووتی هاوڕێ و یارمەتی روانی', url: 'https://replika.ai' },
            { name: 'AI Picasso', desc: 'دروستکردنی وێنە بە هوشە مصنوعی', url: 'https://aipicasso.com' },
            { name: 'DeepAI', desc: 'پلاتفۆرمی وێنەسازی و زانست', url: 'https://deepai.org' },
            { name: 'NightCafe', desc: 'دروستکردنی وێنە و هونەر بە AI', url: 'https://nightcafe.studio' },
            { name: 'Artbreeder', desc: 'گۆڕینی و دروستکردنی وێنە بە AI', url: 'https://www.artbreeder.com' },
            { name: 'Runway ML', desc: 'پلاتفۆرمی وێنە و ڤیدیۆی AI', url: 'https://runwayml.com' },
            { name: 'Craiyon', desc: 'دروستکردنی وێنە بە دەستکاری AI', url: 'https://www.craiyon.com' },
            { name: 'StarryAI', desc: 'دروستکردنی وێنە و هونەر بە زانایەتی', url: 'https://starryai.com' },
            { name: 'Deep Dream Generator', desc: 'دروستکردنی وێنەی خەیاڵی بە AI', url: 'https://deepdreamgenerator.com' },
            { name: 'Photosonic', desc: 'دروستکردنی وێنە و گۆڕینی وێنە', url: 'https://photosonic.ai' },
            { name: 'PaintsChainer', desc: 'وێنەسازی بە شێوازی کاریکاتور', url: 'https://paintschainer.preferred.tech' },
            { name: 'AI Gahaku', desc: 'دروستکردنی پۆرترێت بە شێوازی هونەری', url: 'https://ai-art.tokyo/en/' },
            { name: 'AI Painter', desc: 'وێنەسازی و هونەر بە هوشە مصنوعی', url: 'https://www.aipainter.ai' },
            { name: 'AI Art Generator', desc: 'دروستکردنی هونەر و وێنەی نوێ', url: 'https://www.artificial-intelligence.art' },
            { name: 'Botpress', desc: 'پلاتفۆرمی دروستکردنی چاتبووتی تایبەتی', url: 'https://botpress.com' },
            { name: 'ManyChat', desc: 'چاتبووتی مارکێتینگ بۆ فەیسبووک و واتساپ', url: 'https://manychat.com' },
            { name: 'Tidio', desc: 'چاتبووتی پشتگیری و بازرگانی', url: 'https://www.tidio.com' },
            { name: 'MobileMonkey', desc: 'چاتبووتی مارکێتینگ بۆ فەیسبووک', url: 'https://mobilemonkey.com' },
            { name: 'Chatfuel', desc: 'دروستکردنی چاتبووت بێ کۆد', url: 'https://chatfuel.com' },
            { name: 'Pandorabots', desc: 'پلاتفۆرمی چاتبووتی زانایەتی', url: 'https://www.pandorabots.com' },
            { name: 'Flow XO', desc: 'دروستکردنی چاتبووت بۆ وێبسایت و مەسجەر', url: 'https://flowxo.com' },
            { name: 'Landbot', desc: 'چاتبووتی وێبسایت بە ڕووکارێ کشان و دابەزاندن', url: 'https://landbot.io' }
        ]
    },
    {
        title: '🌐 وێبسایتە زانیارییەکان',
        tools: [
            { name: 'Wikipedia', desc: 'پەیجی زانیارییەکان بۆ هەموو شتێک', url: 'https://www.wikipedia.org' },
            { name: 'Wiktionary', desc: 'ویکی پەیجی فەرمی و وەشانی نووسین', url: 'https://www.wiktionary.org' },
            { name: 'Wikidata', desc: 'داتابەیسی زانیارییەکان بۆ ویکیپیدیا', url: 'https://www.wikidata.org' },
            { name: 'Internet Archive', desc: 'ئارشیڤی ئینتەرنێت بۆ گەڕانی زانیاری', url: 'https://archive.org' },
            { name: 'Wayback Machine', desc: 'گەرەکی پەیوەندیدانی ماوەی پێشوو', url: 'https://web.archive.org' },
            { name: 'Google Scholar', desc: 'گەڕانی زانیاری بەرز و توانا', url: 'https://scholar.google.com' },
            { name: 'Microsoft Academic', desc: 'زانیاری و ماوەی پەیوەندیدانی توانا', url: 'https://academic.microsoft.com' },
            { name: 'Semantic Scholar', desc: 'گەڕانی زانیاری بەرز بۆ زانست', url: 'https://www.semanticscholar.org' },
            { name: 'PubMed', desc: 'زانیاری بەرز بۆ پزیشکی و زانست', url: 'https://pubmed.ncbi.nlm.nih.gov' },
            { name: 'arXiv', desc: 'پەیجی زانیاری بەرز بۆ فیزیا و زانستەکان', url: 'https://arxiv.org' },
            { name: 'bioRxiv', desc: 'زانیاری بەرز بۆ زانستە ژینگەییەکان', url: 'https://www.biorxiv.org' },
            { name: 'SSRN', desc: 'زانیاری بەرز بۆ کۆمەڵایەتی و زانستەکان', url: 'https://www.ssrn.com' },
            { name: 'ResearchGate', desc: 'پەیوەندیدانی زانیاری بەرز بۆ زانایان', url: 'https://www.researchgate.net' },
            { name: 'Academia.edu', desc: 'پەیوەندیدانی زانیاری بەرز بۆ زانایان', url: 'https://www.academia.edu' },
            { name: 'Google Books', desc: 'گەڕانی زانیاری بەرز بۆ کتێب و نووسراوەکان', url: 'https://books.google.com' },
            { name: 'Internet Archive Books', desc: 'ئارشیڤی کتێبەکان بۆ گەڕانی زانیاری', url: 'https://archive.org/details/texts' },
            { name: 'Open Library', desc: 'کتێبخانەی فەرمی بۆ گەڕانی زانیاری', url: 'https://openlibrary.org' },
            { name: 'Project Gutenberg', desc: 'کتێبە فریەکان بۆ گەڕانی زانیاری', url: 'https://www.gutenberg.org' },
            { name: 'LibriVox', desc: 'کتێبە فریەکان بۆ گوێرانی زانیاری', url: 'https://librivox.org' },
            { name: 'Google Patents', desc: 'گەڕانی زانیاری بەرز بۆ پەیام و پەیامەکان', url: 'https://patents.google.com' },
            { name: 'USPTO', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://www.uspto.gov' },
            { name: 'EPO', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://www.epo.org' },
            { name: 'Free Patents Online', desc: 'گەڕانی زانیاری بەرز بۆ پەیامەکان', url: 'https://www.freepatentsonline.com' },
            { name: 'PatentScope', desc: 'زانیاری بەرز بۆ پەیامە فەرمیەکان', url: 'https://patentscope.wipo.int' },
            { name: 'Google Trends', desc: 'بەرزبوونی پەیوەندیدانی زانیاری', url: 'https://trends.google.com' },
            { name: 'BuzzSumo', desc: 'زانیاری بەرز بۆ تۆمارکردن و نوسین', url: 'https://buzzsumo.com' },
            { name: 'Feedly', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://feedly.com' },
            { name: 'Flipboard', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://flipboard.com' },
            { name: 'Pocket', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://getpocket.com' },
            { name: 'Instapaper', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.instapaper.com' },
            { name: 'Evernote', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://evernote.com' },
            { name: 'Notion', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.notion.so' },
            { name: 'OneNote', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.onenote.com' },
            { name: 'Google Keep', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://keep.google.com' },
            { name: 'Microsoft To Do', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://todo.microsoft.com' },
            { name: 'Trello', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://trello.com' },
            { name: 'Asana', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://asana.com' },
            { name: 'Slack', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://slack.com' },
            { name: 'Discord', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://discord.com' },
            { name: 'Telegram', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://telegram.org' },
            { name: 'WhatsApp', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.whatsapp.com' },
            { name: 'Signal', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://signal.org' },
            { name: 'Viber', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.viber.com' },
            { name: 'Line', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://line.me' },
            { name: 'WeChat', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wechat.com' },
            { name: 'QQ', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qq.com' },
            { name: 'Baidu', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.baidu.com' },
            { name: 'Yandex', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yandex.com' },
            { name: 'DuckDuckGo', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://duckduckgo.com' },
            { name: 'StartPage', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com' },
            { name: 'Qwant', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com' },
            { name: 'Swisscows', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com' },
            { name: 'Searx', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org' },
            { name: 'MetaGer', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org' },
            { name: 'Gigablast', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com' },
            { name: 'Mojeek', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com' },
            { name: 'Yippy', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com' },
            { name: 'Search Encrypt', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com' },
            { name: 'Qwant Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://qwant.com/maps' },
            { name: 'OpenStreetMap', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.openstreetmap.org' },
            { name: 'Google Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/maps' },
            { name: 'Bing Maps', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/maps' },
            { name: 'Here WeGo', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://wego.here.com' },
            { name: 'MapQuest', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mapquest.com' },
            { name: 'OpenTopoMap', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://opentopomap.org' },
            { name: 'USGS Earth Explorer', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://earthexplorer.usgs.gov' },
            { name: 'NASA Worldview', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://worldview.earthdata.nasa.gov' },
            { name: 'Google Earth', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/earth' },
            { name: 'Bing Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/weather' },
            { name: 'Weather.com', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://weather.com' },
            { name: 'AccuWeather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.accuweather.com' },
            { name: 'BBC Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/weather' },
            { name: 'CNN Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com/weather' },
            { name: 'Al Jazeera Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com/weather' },
            { name: 'Fox News Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com/weather' },
            { name: 'MSNBC Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/weather' },
            { name: 'NPR Weather', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org/weather' },
            { name: 'NWS', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.weather.gov' },
            { name: 'Met Office', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.metoffice.gov.uk' },
            { name: 'Weather Underground', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wunderground.com' },
            { name: 'Pollen.com', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.pollen.com' },
            { name: 'AirNow', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.airnow.gov' },
            { name: 'EPA', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.epa.gov' },
            { name: 'CDC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cdc.gov' },
            { name: 'WHO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.who.int' },
            { name: 'UN', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.un.org' },
            { name: 'EU', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://europa.eu' },
            { name: 'NATO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.nato.int' },
            { name: 'IMF', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.imf.org' },
            { name: 'World Bank', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.worldbank.org' },
            { name: 'OECD', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.oecd.org' },
            { name: 'WTO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.wto.org' },
            { name: 'UNESCO', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://en.unesco.org' },
            { name: 'Red Cross', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.redcross.org' },
            { name: 'Amnesty International', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.amnesty.org' },
            { name: 'Greenpeace', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.greenpeace.org' },
            { name: 'Doctors Without Borders', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.doctorswithoutborders.org' },
            { name: 'Human Rights Watch', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.hrw.org' },
            { name: 'International Crisis Group', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.crisisgroup.org' },
            { name: 'Council on Foreign Relations', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cfr.org' },
            { name: 'Brookings Institution', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.brookings.edu' },
            { name: 'Carnegie Endowment for International Peace', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.carnegieendowment.org' },
            { name: 'Rand Corporation', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.rand.org' },
            { name: 'Pew Research Center', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.pewresearch.org' },
            { name: 'Gallup', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.gallup.com' },
            { name: 'Nielsen', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.nielsen.com' },
            { name: 'Statista', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.statista.com' },
            { name: 'Trading Economics', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://tradingeconomics.com' },
            { name: 'Investopedia', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.investopedia.com' },
            { name: 'Yahoo Finance', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://finance.yahoo.com' },
            { name: 'Google Finance', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/finance' },
            { name: 'Bloomberg', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com' },
            { name: 'Reuters', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com' },
            { name: 'CNBC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnbc.com' },
            { name: 'Fox Business', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxbusiness.com' },
            { name: 'MSNBC', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com' },
            { name: 'Al Jazeera', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com' },
            { name: 'BBC News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/news' },
            { name: 'CNN', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com' },
            { name: 'Fox News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com' },
            { name: 'MSNBC News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/news' },
            { name: 'NPR', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org' },
            { name: 'Reuters News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/news' },
            { name: 'Bloomberg News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/news' },
            { name: 'Yahoo News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.yahoo.com' },
            { name: 'Google News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.google.com' },
            { name: 'DuckDuckGo News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.duckduckgo.com' },
            { name: 'Bing News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/news' },
            { name: 'StartPage News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com/news' },
            { name: 'Qwant News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com/news' },
            { name: 'Swisscows News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com/news' },
            { name: 'Searx News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org/news' },
            { name: 'MetaGer News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org/news' },
            { name: 'Gigablast News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com/news' },
            { name: 'Mojeek News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com/news' },
            { name: 'Yippy News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com/news' },
            { name: 'Search Encrypt News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com/news' },
            { name: 'Google Finance News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.google.com/finance/news' },
            { name: 'Yahoo Finance News', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://finance.yahoo.com/news' },
            { name: 'Bloomberg Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/markets' },
            { name: 'Reuters Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/markets' },
            { name: 'CNBC Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnbc.com/markets' },
            { name: 'Fox Business Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxbusiness.com/markets' },
            { name: 'MSNBC Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/markets' },
            { name: 'Al Jazeera Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.aljazeera.com/markets' },
            { name: 'BBC News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bbc.com/news/markets' },
            { name: 'CNN Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.cnn.com/markets' },
            { name: 'Fox News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.foxnews.com/markets' },
            { name: 'MSNBC News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.msnbc.com/news/markets' },
            { name: 'NPR Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.npr.org/markets' },
            { name: 'Reuters News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.reuters.com/news/markets' },
            { name: 'Bloomberg News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bloomberg.com/news/markets' },
            { name: 'Yahoo News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.yahoo.com/markets' },
            { name: 'Google News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.google.com/markets' },
            { name: 'DuckDuckGo News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://news.duckduckgo.com/markets' },
            { name: 'Bing News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.bing.com/news/markets' },
            { name: 'StartPage News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.startpage.com/news/markets' },
            { name: 'Qwant News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.qwant.com/news/markets' },
            { name: 'Swisscows News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://swisscows.com/news/markets' },
            { name: 'Searx News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://searx.org/news/markets' },
            { name: 'MetaGer News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://metager.org/news/markets' },
            { name: 'Gigablast News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://gigablast.com/news' },
            { name: 'Mojeek News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.mojeek.com/news' },
            { name: 'Yippy News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://yippy.com/news' },
            { name: 'Search Encrypt News Markets', desc: 'بەرزبوونی زانیاری بەرز بۆ نوسین', url: 'https://www.searchencrypt.com/news/markets' }
        ]
    },
    {
        title: '🎨 ئامێرە هونەرییەکان',
        tools: [
            { name: 'Canva', desc: 'دیزاینی گرافیکی و دروستکردنی پۆست و پڕۆژە', url: 'https://www.canva.com' },
            { name: 'Figma', desc: 'دیزاینی وێب و ئاپلیکەیشن بە هاوکاری', url: 'https://www.figma.com' },
            { name: 'Photopea', desc: 'فۆتۆشۆپ لە وێبدا بێ بەرامبەر', url: 'https://www.photopea.com' }
        ]
    },
    {
        title: '📚 فێرکاری و خوێندن',
        tools: [
            { name: 'Khan Academy', desc: 'فێرکاری بۆ هەموو ئاستێک', url: 'https://www.khanacademy.org' },
            { name: 'Coursera', desc: 'کۆرسە فێرکارییەکان بۆ زانست و پیشە', url: 'https://www.coursera.org' },
            { name: 'Duolingo', desc: 'فێرکاری زمان بە شێوەی یاری', url: 'https://www.duolingo.com' }
        ]
    },
    {
        title: '💼 ئامێرە کار و پیشە',
        tools: [
            { name: 'LinkedIn', desc: 'تۆڕی پیشەسازی و کار', url: 'https://www.linkedin.com' },
            { name: 'Indeed', desc: 'گەڕان بۆ کار و پۆستەکان', url: 'https://www.indeed.com' },
            { name: 'Glassdoor', desc: 'زانیاری بۆ کۆمپانیا و پێداویستی کار', url: 'https://www.glassdoor.com' }
        ]
    },
    {
        title: '💻 گەشەپێدانی وێب و کۆدکردن',
        tools: [
            { name: 'GitHub', desc: 'هاوپۆلی کۆد و گەشەپێدانی وێب', url: 'https://github.com' },
            { name: 'Stack Overflow', desc: 'پرس و وەڵام بۆ کۆد و گەشەپێدان', url: 'https://stackoverflow.com' },
            { name: 'CodePen', desc: 'تاقیکردنەوەی کۆد و دیزاین', url: 'https://codepen.io' }
        ]
    }
];

// DOM Elements
const categoriesList = document.getElementById('categoriesList');
const entranceOverlay = document.getElementById('entranceOverlay');
const entranceBtn = document.getElementById('entranceBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const categoryOverlay = document.getElementById('categoryOverlay');
const closeCategoryOverlay = document.getElementById('closeCategoryOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const toolsList = document.getElementById('toolsList');

// Entrance overlay logic
entranceBtn.onclick = function(e) {
    e.preventDefault();
    entranceOverlay.style.display = 'none';
};

// Render categories
function renderCategories() {
    categoriesList.innerHTML = '';
    categories.forEach((cat, idx) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.setProperty('--i', idx);
        const emoji = cat.title.split(' ')[0];
        const titleText = cat.title.replace(/^[^\s]+\s/, '');
        card.innerHTML = `<span class="cat-emoji">${emoji}</span><span class="cat-title">${titleText}</span>`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', cat.title);
        card.onclick = () => openCategoryOverlay(cat);
        card.onkeypress = (e) => { if (e.key === 'Enter') openCategoryOverlay(cat); };
        categoriesList.appendChild(card);
    });
}

// Open category overlay and show tools
function openCategoryOverlay(category) {
    overlayTitle.textContent = category.title;
    toolsList.innerHTML = '';
    category.tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <strong>${tool.name}</strong>
            <div>${tool.desc}</div>
            <a class="visit-btn" href="${tool.url}" target="_blank" rel="noopener">Visit Link</a>
        `;
        toolsList.appendChild(toolCard);
    });
    categoryOverlay.style.display = 'flex';
    categoryOverlay.classList.add('active');
    history.pushState({ overlay: true }, '', '#category');
}

function closeCategoryOverlayAndShowCategories() {
    categoryOverlay.style.display = 'none';
    categoryOverlay.classList.remove('active');
    categoriesList.scrollIntoView({ behavior: 'smooth' });
}

closeCategoryOverlay.onclick = function() {
    closeCategoryOverlayAndShowCategories();
};
closeCategoryOverlay.onkeypress = function(e) {
    if (e.key === 'Enter') {
        closeCategoryOverlayAndShowCategories();
    }
};
categoryOverlay.onclick = function(e) {
    if (e.target === categoryOverlay) {
        closeCategoryOverlayAndShowCategories();
    }
};
window.addEventListener('popstate', function() {
    if (categoryOverlay.classList.contains('active')) {
        closeCategoryOverlayAndShowCategories();
    }
});
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};
scrollTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.addEventListener('DOMContentLoaded', () => {
    if (entranceOverlay) entranceOverlay.style.display = 'none';
    renderCategories();
});
themeToggle.onclick = function() {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
};
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scrollTopBtn').setAttribute('title', 'بچە سەرڤە');
    document.getElementById('scrollTopBtn').innerHTML = '<i class="fas fa-arrow-up"></i>';
});
let ticking = false;
function handleMobileScrollAnim() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.innerWidth <= 700) {
                if (window.scrollY > 30) {
                    document.body.classList.add('scrolled-down');
                } else {
                    document.body.classList.remove('scrolled-down');
                }
            } else {
                document.body.classList.remove('scrolled-down');
            }
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', handleMobileScrollAnim, { passive: true });
window.addEventListener('resize', handleMobileScrollAnim);

let lastMobileScrollY = window.scrollY;
function mobileScrollAnim() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.innerWidth <= 700) {
                const cards = document.querySelectorAll('.category-card');
                let direction = window.scrollY > lastMobileScrollY ? 'down' : 'up';
                cards.forEach(card => {
                    card.classList.remove('mobile-scroll-down', 'mobile-scroll-up');
                    const rect = card.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        if (direction === 'down') {
                            card.classList.add('mobile-scroll-down');
                        } else {
                            card.classList.add('mobile-scroll-up');
                        }
                        setTimeout(() => {
                            card.classList.remove('mobile-scroll-down', 'mobile-scroll-up');
                        }, 500);
                    }
                });
                lastMobileScrollY = window.scrollY;
            }
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', mobileScrollAnim, { passive: true });
window.addEventListener('resize', () => { lastMobileScrollY = window.scrollY; });
