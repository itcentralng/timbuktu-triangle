/* ============================================================
   THE TIMBUKTU TRIANGLE — kiosk app logic
   ============================================================ */

(function () {
  'use strict';

  var STAGE_W = 1920, STAGE_H = 1080;
  var IDLE_TIMEOUT_MS = 100000; // 100s of no interaction -> return to attract

  var state = {
    lang: 'en',
    screen: 'attract',
    aboutIndex: 0,
    newsArticles: null,
    newsLoaded: false,
    newsFilter: 'all',
    currentArticle: null,
    tributeFilter: 'IV'
  };

  var el = {}; // populated in init()
  var idleTimer = null;
  var aboutAudio = null;
  var aboutAutoPlay = false;
  var aboutDucked = false;
  var welcomeAudio = null;

  // Looping ambient bed under the whole app, ducked whenever narration or
  // video audio plays. Drop the loop file at AMBIENT_SRC to activate it —
  // until then startAmbientAudio() just fails silently.
  var AMBIENT_SRC = 'assets/audio/ambient.mp3';
  var AMBIENT_VOLUME = 0.35;
  var AMBIENT_DUCK_VOLUME = 0.08;
  var AMBIENT_FADE_MS = 600;
  var ambientAudio = null;
  var ambientDuckCount = 0;
  var ambientFadeRaf = null;
  var videoDucked = false;

  // Minimal fallback so the News section is never empty while the
  // background fetch job (data/news-articles.json) hasn't landed yet.
  var NEWS_FALLBACK = [
    { id: 'tvc-1', operation: 'V', outlet: 'TVC News', outletAccentColor: '#0f4c8c', url: 'https://www.tvcnews.tv/troops-bust-terrorist-camps-thwart-attacks-in-northeast-operation/', headline: 'Troops Bust Terrorist Camps, Thwart Attacks In Northeast Operation', i18n: { fr: { headline: 'Les troupes démantèlent des camps terroristes et déjouent des attaques dans le cadre de l\'opération du Nord-Est' }, ar: { headline: 'القوات تدمر معسكرات إرهابية وتحبط هجمات في عملية شمال شرق نيجيريا' } }, body: [], fetchFailed: true },
    { id: 'zagazola-1', operation: 'V', outlet: 'Zagazola Makama', outletAccentColor: '#1a1a1a', url: 'https://zagazola.org/index.php/breaking-news/troops-dismantle-three-boko-haram-detention-facilities-in-timbuktu-triangle', headline: 'Troops Dismantle Three Boko Haram Detention Facilities In Timbuktu Triangle', i18n: { fr: { headline: 'Les troupes démantèlent trois centres de détention de Boko Haram dans le Triangle de Timbuktu' }, ar: { headline: 'القوات تفكك ثلاثة مرافق احتجاز تابعة لبوكو حرام في مثلث تمبكتو' } }, body: [], fetchFailed: true },
    { id: 'vanguard-1', operation: 'V', outlet: 'Vanguard', outletAccentColor: '#c8102e', url: 'https://www.vanguardngr.com/2026/01/troops-clear-terrorists-camps-in-timbuktu-triangle-thwarts-boko-haram-attacks/', headline: 'Troops Clear Terrorists Camps In Timbuktu Triangle, Thwarts Boko Haram Attacks', i18n: { fr: { headline: 'Les troupes nettoient des camps terroristes dans le Triangle de Timbuktu et déjouent des attaques de Boko Haram' }, ar: { headline: 'القوات تطهر معسكرات إرهابية في مثلث تمبكتو وتحبط هجمات بوكو حرام' } }, body: [], fetchFailed: true },
    { id: 'vanguard-2', operation: 'V', outlet: 'Vanguard', outletAccentColor: '#c8102e', url: 'https://www.vanguardngr.com/2026/01/troops-gain-into-timbuktu-traingle-stronghold-of-boko-haram-iswap-terrorists/', headline: 'Troops Gain Into Timbuktu Triangle Stronghold Of Boko Haram/ISWAP Terrorists', i18n: { fr: { headline: 'Les troupes progressent dans le bastion de Boko Haram/ISWAP au Triangle de Timbuktu' }, ar: { headline: 'القوات تحرز تقدمًا داخل معقل بوكو حرام/داعش غرب أفريقيا في مثلث تمبكتو' } }, body: [], fetchFailed: true },
    { id: 'zagazola-2', operation: 'V', outlet: 'Zagazola Makama', outletAccentColor: '#1a1a1a', url: 'https://zagazola.org/index.php/breaking-news/iswap-suffers-heavy-losses-in-timbuktu-triangle-lost-22-fighters-in-encounter-with-troops', headline: 'ISWAP Suffers Heavy Losses In Timbuktu Triangle, Lost 22 Fighters In Encounter With Troops', i18n: { fr: { headline: 'L\'ISWAP subit de lourdes pertes dans le Triangle de Timbuktu, 22 combattants tués lors d\'un affrontement avec les troupes' }, ar: { headline: 'داعش غرب أفريقيا يتكبد خسائر فادحة في مثلث تمبكتو ويفقد 22 مقاتلاً في اشتباك مع القوات' } }, body: [], fetchFailed: true },
    { id: 'prnigeria-1', operation: 'V', outlet: 'PRNigeria', outletAccentColor: '#0b6e4f', url: 'https://prnigeria.com/2026/04/29/troops-pound-terrorists/', headline: 'Troops Pound Terrorists', i18n: { fr: { headline: 'Les troupes pilonnent les terroristes' }, ar: { headline: 'القوات تقصف الإرهابيين' } }, body: [], fetchFailed: true },
    { id: 'trt-1', operation: 'V', outlet: 'TRT World', outletAccentColor: '#c8102e', url: 'https://www.trtworld.com/article/d08074fe29dc', headline: 'Nigerian Troops Advance In Timbuktu Triangle Operation', i18n: { fr: { headline: 'Les troupes nigérianes avancent dans l\'opération du Triangle de Timbuktu' }, ar: { headline: 'القوات النيجيرية تتقدم في عملية مثلث تمبكتو' } }, body: [], fetchFailed: true },
    { id: 'guardian-1', operation: 'V', outlet: 'The Guardian Nigeria', outletAccentColor: '#003876', url: 'https://guardian.ng/news/army-troops-overrun-boko-haram-iswap-stronghold-in-timbuktu-triangle/', headline: 'Army Troops Overrun Boko Haram/ISWAP Stronghold In Timbuktu Triangle', i18n: { fr: { headline: 'Les troupes de l\'armée envahissent un bastion de Boko Haram/ISWAP dans le Triangle de Timbuktu' }, ar: { headline: 'قوات الجيش تجتاح معقلاً لبوكو حرام/داعش غرب أفريقيا في مثلث تمبكتو' } }, body: [], fetchFailed: true },
    { id: 'thisday-1', operation: 'V', outlet: 'ThisDay', outletAccentColor: '#7a1f2b', url: 'https://www.thisdaylive.com/2026/01/21/troops-eliminate-20-terrorists-as-soldiers-pay-supreme-price-during-fierce-encounter/', headline: 'Troops Eliminate 20 Terrorists As Soldiers Pay Supreme Price During Fierce Encounter', i18n: { fr: { headline: 'Les troupes éliminent 20 terroristes alors que des soldats paient le prix ultime lors d\'un affrontement féroce' }, ar: { headline: 'القوات تقضي على 20 إرهابيًا فيما دفع الجنود الثمن الأغلى خلال اشتباك عنيف' } }, body: [], fetchFailed: true },
    { id: 'punch-1', operation: 'V', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'https://punchng.com/military-discovers-bharam-underground-storage-fuel-dump/', headline: 'Military Discovers Boko Haram Underground Storage, Fuel Dump', i18n: { fr: { headline: 'L\'armée découvre un dépôt souterrain de stockage et de carburant de Boko Haram' }, ar: { headline: 'الجيش يكتشف مستودعًا تحت الأرض ومخزن وقود تابعًا لبوكو حرام' } }, body: [], fetchFailed: true },

    { id: 'arise-1', operation: 'IV', outlet: 'Arise News', outletAccentColor: '#e2001a', url: 'https://www.arise.tv/boko-haram-swap-attack-kills-army-commander-soldiers-in-borno-state/', headline: 'Boko Haram/ISWAP Attack Kills Army Commander, Soldiers In Borno State', i18n: { fr: { headline: 'Une attaque de Boko Haram/ISWAP tue un commandant de l\'armée et des soldats dans l\'État de Borno' }, ar: { headline: 'هجوم لبوكو حرام/داعش غرب أفريقيا يقتل قائدًا عسكريًا وجنودًا في ولاية بورنو' } }, body: [], fetchFailed: true },
    { id: 'hindu-1', operation: 'IV', outlet: 'The Hindu', outletAccentColor: '#004b8d', url: 'https://www.thehindu.com/news/international/at-least-27-nigerian-soldiers-killed-in-jihadist-suicide-attack-army/article69144242.ece', headline: 'At Least 27 Nigerian Soldiers Killed In Jihadist Suicide Attack: Army', i18n: { fr: { headline: 'Au moins 27 soldats nigérians tués dans un attentat-suicide djihadiste, selon l\'armée' }, ar: { headline: 'مقتل 27 جنديًا نيجيريًا على الأقل في هجوم انتحاري جهادي: الجيش' } }, body: [], fetchFailed: true },
    { id: 'ndarason-1', operation: 'IV', outlet: 'Ndarason Media', outletAccentColor: '#1a1a1a', url: 'https://ndarason.com/en/at-least-70-insurgents-killed-in-timbuktu-triangle-in-borno-state/', headline: 'At Least 70 Insurgents Killed In Timbuktu Triangle In Borno State', i18n: { fr: { headline: 'Au moins 70 insurgés tués dans le Triangle de Timbuktu dans l\'État de Borno' }, ar: { headline: 'مقتل 70 متمردًا على الأقل في مثلث تمبكتو بولاية بورنو' } }, body: [], fetchFailed: true },
    { id: 'punch-2', operation: 'IV', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'https://punchng.com/22-soldiers-over-70-insurgents-killed-in-borno-clash-dhq/', headline: '22 Soldiers, Over 70 Insurgents Killed In Borno Clash — DHQ', i18n: { fr: { headline: '22 soldats et plus de 70 insurgés tués lors d\'affrontements à Borno — QG de la Défense' }, ar: { headline: 'مقتل 22 جنديًا وأكثر من 70 متمردًا في اشتباكات بورنو — مقر الدفاع' } }, body: [], fetchFailed: true },
    { id: 'thecable-1', operation: 'IV', outlet: 'The Cable', outletAccentColor: '#0a2540', url: 'https://www.thecable.ng/nigerian-army-loses-20-soldiers-kills-70-terrorists-during-military-operation-in-borno/', headline: 'Nigerian Army Loses 20 Soldiers, Kills 70 Terrorists During Military Operation In Borno', i18n: { fr: { headline: 'L\'armée nigériane perd 20 soldats et tue 70 terroristes lors d\'une opération militaire à Borno' }, ar: { headline: 'الجيش النيجيري يفقد 20 جنديًا ويقتل 70 إرهابيًا خلال عملية عسكرية في بورنو' } }, body: [], fetchFailed: true },
    { id: 'channelstv-1', operation: 'IV', outlet: 'Channels TV', outletAccentColor: '#00693e', url: 'https://www.channelstv.com/2025/01/26/military-confirms-death-on-22-soldiers-in-north-east-operation/', headline: 'Military Confirms Death Of 22 Soldiers In North-East Operation', i18n: { fr: { headline: 'L\'armée confirme la mort de 22 soldats lors d\'une opération dans le Nord-Est' }, ar: { headline: 'الجيش يؤكد مقتل 22 جنديًا في عملية بشمال شرق البلاد' } }, body: [], fetchFailed: true },
    { id: 'thecable-2', operation: 'IV', outlet: 'The Cable', outletAccentColor: '#0a2540', url: 'https://www.thecable.ng/newspaper-headlines-terrorists-ambush-soldiers-recovering-corpses-of-farmers-in-borno/', headline: 'Newspaper Headlines: Terrorists Ambush Soldiers Recovering Corpses Of Farmers In Borno', i18n: { fr: { headline: 'Revue de presse : des terroristes tendent une embuscade à des soldats récupérant les corps d\'agriculteurs à Borno' }, ar: { headline: 'عناوين الصحف: إرهابيون ينصبون كمينًا لجنود أثناء استعادة جثث مزارعين في بورنو' } }, body: [], fetchFailed: true },
    { id: 'punch-3', operation: 'IV', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'http://punchng.com/troops-kill-over-50-terrorists-in-borno-yobe-military/', headline: 'Troops Kill Over 50 Terrorists In Borno, Yobe — Military', i18n: { fr: { headline: 'Les troupes tuent plus de 50 terroristes à Borno et Yobe — armée' }, ar: { headline: 'القوات تقتل أكثر من 50 إرهابيًا في بورنو ويوبي — الجيش' } }, body: [], fetchFailed: true },
    { id: 'premiumtimes-1', operation: 'IV', outlet: 'Premium Times', outletAccentColor: '#0b3d91', url: 'https://www.premiumtimesng.com/news/headlines/799991-nigerian-troops-kill-iswap-commander-many-other-terrorists-in-borno-yobe-official.html', headline: 'Nigerian Troops Kill ISWAP Commander, Many Other Terrorists In Borno, Yobe — Official', i18n: { fr: { headline: 'Les troupes nigérianes tuent un commandant de l\'ISWAP et de nombreux autres terroristes à Borno et Yobe — officiel' }, ar: { headline: 'القوات النيجيرية تقتل قائدًا في داعش غرب أفريقيا والعديد من الإرهابيين الآخرين في بورنو ويوبي — مسؤول' } }, body: [], fetchFailed: true },
    { id: 'humangle-1', operation: 'IV', outlet: 'HumAngle', outletAccentColor: '#1f7a4d', url: 'https://humanglemedia.com/nigerian-military-confirms-22-soldiers-killed-in-ongoing-operations-against-terrorists/', headline: 'Nigerian Military Confirms 22 Soldiers Killed In Ongoing Operations Against Terrorists', i18n: { fr: { headline: 'L\'armée nigériane confirme la mort de 22 soldats lors d\'opérations en cours contre les terroristes' }, ar: { headline: 'الجيش النيجيري يؤكد مقتل 22 جنديًا في عمليات جارية ضد الإرهابيين' } }, body: [], fetchFailed: true },
    { id: 'justicewatch-1', operation: 'IV', outlet: 'Justice Watch News', outletAccentColor: '#4a4a4a', url: 'https://justicewatchnews.com/nigeria-army-provides-update-on-terrorist-attack-on-troops-in-timbuktu-triangle/', headline: 'Nigeria Army Provides Update On Terrorist Attack On Troops In Timbuktu Triangle', i18n: { fr: { headline: 'L\'armée nigériane fait le point sur l\'attaque terroriste contre les troupes dans le Triangle de Timbuktu' }, ar: { headline: 'الجيش النيجيري يقدم تحديثًا حول الهجوم الإرهابي على القوات في مثلث تمبكتو' } }, body: [], fetchFailed: true },
    { id: 'kwara-1', operation: 'IV', outlet: 'Kwara Reporters', outletAccentColor: '#1a1a1a', url: 'https://www.kwarareporters.com.ng/2025/01/three-officers-several-nigerian.html', headline: 'Three Officers, Several Nigerian Soldiers Killed In Borno Attack', i18n: { fr: { headline: 'Trois officiers et plusieurs soldats nigérians tués dans une attaque à Borno' }, ar: { headline: 'مقتل ثلاثة ضباط وعدة جنود نيجيريين في هجوم على بورنو' } }, body: [], fetchFailed: true }
  ];

  /* ---------------- stage scaling ---------------- */
  function scaleStage() {
    var vw = window.innerWidth, vh = window.innerHeight;
    // Fit inside the viewport (never crop) — on a true 16:9 screen this
    // fills edge-to-edge with no bars at all. On any other aspect ratio
    // it letterboxes, but the bars are colour-matched to the background
    // so they read as part of the app rather than a visible seam.
    var scale = Math.min(vw / STAGE_W, vh / STAGE_H);
    el.stage.style.transform = 'scale(' + scale + ')';
  }

  /* ---------------- i18n ---------------- */
  function t(key) {
    var dict = TT_CONTENT.ui[state.lang] || TT_CONTENT.ui.en;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function applyStaticI18n() {
    var dir = TT_CONTENT.meta[state.lang].dir;
    document.documentElement.setAttribute('lang', state.lang);
    document.documentElement.setAttribute('dir', dir);
    el.stage.setAttribute('dir', dir);

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      node.textContent = t(node.getAttribute('data-i18n'));
    });

    el.topbarTitle.textContent = t('appTitle');

    document.querySelectorAll('.lang-switch button, .attract-lang-pill').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === state.lang);
    });

    el.aboutParagraph.setAttribute('dir', dir);
  }

  /* ---------------- navigation ---------------- */
  var NO_TOPBAR = { attract: true, article: true };

  function showScreen(id) {
    stopAboutAudio();
    stopWelcomeAudio();
    Object.keys(el.screens).forEach(function (key) {
      el.screens[key].classList.toggle('active', key === id);
    });
    el.topbar.classList.toggle('hidden', !!NO_TOPBAR[id]);
    state.screen = id;
    resetIdleTimer();

    if (id === 'about') renderAboutParagraph();
    if (id === 'documentary') renderDocList();
    if (id === 'news') ensureNewsLoaded(renderNewsList);
    if (id === 'tribute') renderTribute();
  }

  function goHome() { showScreen('home'); }

  /* ---------------- AMBIENT AUDIO ---------------- */
  function startAmbientAudio() {
    if (ambientAudio) return;
    var audio = new Audio(AMBIENT_SRC);
    audio.loop = true;
    audio.volume = 0;
    audio.play().then(function () {
      ambientAudio = audio;
      fadeAudioTo(ambientAudio, ambientDuckCount > 0 ? AMBIENT_DUCK_VOLUME : AMBIENT_VOLUME, AMBIENT_FADE_MS);
    }).catch(function () {});
  }

  function duckAmbientAudio() {
    ambientDuckCount++;
    if (ambientAudio) fadeAudioTo(ambientAudio, AMBIENT_DUCK_VOLUME, AMBIENT_FADE_MS);
  }

  function unduckAmbientAudio() {
    ambientDuckCount = Math.max(0, ambientDuckCount - 1);
    if (ambientDuckCount === 0 && ambientAudio) fadeAudioTo(ambientAudio, AMBIENT_VOLUME, AMBIENT_FADE_MS);
  }

  function fadeAudioTo(audio, target, duration, onDone) {
    if (ambientFadeRaf) cancelAnimationFrame(ambientFadeRaf);
    var start = audio.volume, startTime = performance.now();
    function step(now) {
      var p = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * p;
      if (p < 1) {
        ambientFadeRaf = requestAnimationFrame(step);
      } else {
        ambientFadeRaf = null;
        if (onDone) onDone();
      }
    }
    ambientFadeRaf = requestAnimationFrame(step);
  }

  /* ---------------- ATTRACT / HOME ---------------- */
  function initAttractAndHome() {
    document.querySelectorAll('.attract-lang-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var lang = pill.getAttribute('data-lang');
        setLang(lang);
        showScreen('home');
        playWelcomeAudio(lang);
      });
    });
  }

  function playWelcomeAudio(lang) {
    stopWelcomeAudio();
    var src = TT_CONTENT.welcomeAudio && TT_CONTENT.welcomeAudio[lang];
    if (!src) return;
    welcomeAudio = new Audio(src);
    duckAmbientAudio();
    welcomeAudio.addEventListener('ended', function () { welcomeAudio = null; unduckAmbientAudio(); });
    welcomeAudio.play().catch(function () { welcomeAudio = null; unduckAmbientAudio(); });
  }

  function stopWelcomeAudio() {
    if (welcomeAudio) {
      welcomeAudio.pause();
      welcomeAudio = null;
      unduckAmbientAudio();
    }
  }

  function setLang(lang) {
    state.lang = lang;
    applyStaticI18n();
    if (state.screen === 'about') renderAboutParagraph();
    if (state.screen === 'documentary') renderDocList();
    if (state.screen === 'news') renderNewsList();
    if (state.screen === 'tribute') renderTribute();
    if (state.screen === 'article' && state.currentArticle) openArticle(state.currentArticle);
  }

  /* ---------------- ABOUT ---------------- */
  function renderAboutParagraph(keepAudio) {
    var data = TT_CONTENT.about[state.lang];
    var paragraphs = data.paragraphs;
    if (state.aboutIndex >= paragraphs.length) state.aboutIndex = paragraphs.length - 1;
    if (state.aboutIndex < 0) state.aboutIndex = 0;

    el.aboutTitle.textContent = data.title;
    el.aboutParagraph.textContent = paragraphs[state.aboutIndex];

    el.aboutProgress.innerHTML = '';
    paragraphs.forEach(function (_, i) {
      var dot = document.createElement('span');
      if (i === state.aboutIndex) dot.classList.add('active');
      el.aboutProgress.appendChild(dot);
    });

    el.aboutPrev.style.visibility = state.aboutIndex === 0 ? 'hidden' : 'visible';
    el.aboutNext.style.visibility = state.aboutIndex === paragraphs.length - 1 ? 'hidden' : 'visible';

    if (!keepAudio) stopAboutAudio();
    el.aboutParagraphWrap.scrollTop = 0;
  }

  function stopAboutAudio() {
    aboutAutoPlay = false;
    if (aboutAudio) {
      aboutAudio.pause();
      aboutAudio = null;
    }
    if (aboutDucked) {
      aboutDucked = false;
      unduckAmbientAudio();
    }
    el.aboutListen.classList.remove('playing');
    el.aboutListen.querySelector('.icon-play').classList.remove('hidden');
    el.aboutListen.querySelector('.icon-pause').classList.add('hidden');
    el.aboutListen.querySelector('.listen-label').textContent = t('listen');
    resetIdleTimer();
  }

  // Pressing "Listen" starts a chain that keeps auto-advancing to the next
  // paragraph's audio until the last page. Any manual prev/next, pause, or
  // screen/language change interrupts it via stopAboutAudio().
  function toggleAboutAudio() {
    if (aboutAudio && !aboutAudio.paused) {
      stopAboutAudio();
      return;
    }
    aboutAutoPlay = true;
    if (!aboutDucked) { aboutDucked = true; duckAmbientAudio(); }
    playAboutAudio();
  }

  function playAboutAudio() {
    var src = (TT_CONTENT.audio[state.lang] || [])[state.aboutIndex];
    if (!src) { stopAboutAudio(); flashUnavailable(); return; }

    aboutAudio = new Audio(src);
    aboutAudio.addEventListener('ended', handleAboutAudioEnded);
    aboutAudio.addEventListener('error', function () {
      stopAboutAudio();
      flashUnavailable();
    });
    aboutAudio.play().then(function () {
      el.aboutListen.classList.add('playing');
      el.aboutListen.querySelector('.icon-play').classList.add('hidden');
      el.aboutListen.querySelector('.icon-pause').classList.remove('hidden');
      el.aboutListen.querySelector('.listen-label').textContent = t('pause');
      pauseIdleTimer();
    }).catch(function () {
      stopAboutAudio();
      flashUnavailable();
    });
  }

  function handleAboutAudioEnded() {
    var paragraphs = TT_CONTENT.about[state.lang].paragraphs;
    if (aboutAutoPlay && state.aboutIndex < paragraphs.length - 1) {
      state.aboutIndex++;
      renderAboutParagraph(true);
      playAboutAudio();
    } else {
      stopAboutAudio();
    }
  }

  function flashUnavailable() {
    var label = el.aboutListen.querySelector('.listen-label');
    var original = t('listen');
    label.textContent = t('audioUnavailable');
    setTimeout(function () { label.textContent = original; }, 1800);
  }

  /* ---------------- DOCUMENTARY ---------------- */
  function renderDocList() {
    el.docList.innerHTML = '';
    var tags = TT_CONTENT.videoTags[state.lang] || {};
    TT_CONTENT.videos.forEach(function (v) {
      var item = document.createElement('button');
      item.className = 'doc-item';
      item.innerHTML =
        '<span class="doc-item-time"><span class="num">' + v.minutes + '</span><span class="unit">' + t('minuteAbbr') + '</span></span>' +
        '<span class="doc-item-text"><span class="doc-item-label">' + t('watchNow') + '</span>' +
        '<span class="doc-item-tag">' + (tags[v.minutes] || '') + '</span></span>';
      item.addEventListener('click', function () { openVideo(v.file); });
      el.docList.appendChild(item);
    });
  }

  /* ---------------- VIDEO PLAYER ---------------- */
  function openVideo(src) {
    el.videoPlayer.src = encodeURI(src);
    el.videoOverlay.classList.remove('hidden');
    if (!videoDucked) { duckAmbientAudio(); videoDucked = true; }
    el.videoPlayer.play().catch(function () {});
    setVideoPlayIcon(true);
  }
  function closeVideo() {
    el.videoPlayer.pause();
    el.videoPlayer.removeAttribute('src');
    el.videoPlayer.load();
    el.videoOverlay.classList.add('hidden');
    if (videoDucked) { unduckAmbientAudio(); videoDucked = false; }
  }
  function setVideoPlayIcon(playing) {
    el.videoPlayPause.querySelector('.icon-play').classList.toggle('hidden', playing);
    el.videoPlayPause.querySelector('.icon-pause').classList.toggle('hidden', !playing);
  }
  function fmtTime(sec) {
    if (!isFinite(sec)) return '0:00';
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ---------------- NEWS ---------------- */
  function ensureNewsLoaded(cb) {
    if (state.newsLoaded) { cb(); return; }
    var articlesPromise = fetch('data/news-articles.json')
      .then(function (r) { if (!r.ok) throw new Error('no data file'); return r.json(); })
      .then(function (json) {
        state.newsArticles = (json && json.articles && json.articles.length) ? json.articles : NEWS_FALLBACK;
      })
      .catch(function () {
        state.newsArticles = NEWS_FALLBACK;
      });
    var logosPromise = fetch('data/outlet-logos.json')
      .then(function (r) { if (!r.ok) throw new Error('no logo manifest'); return r.json(); })
      .then(function (json) { state.outletLogos = json || {}; })
      .catch(function () { state.outletLogos = {}; });
    Promise.all([articlesPromise, logosPromise]).then(function () {
      state.newsLoaded = true;
      cb();
    });
  }

  // Reads a translated field off an article's i18n block, falling back to
  // the base (English) field when no translation exists for state.lang.
  function articleField(a, field) {
    var loc = a.i18n && a.i18n[state.lang];
    if (loc && loc[field] !== undefined) return loc[field];
    return a[field];
  }

  function renderNewsList() {
    el.newsFilterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === state.newsFilter);
    });

    var articles = state.newsArticles || NEWS_FALLBACK;
    if (state.newsFilter !== 'all') {
      articles = articles.filter(function (a) { return a.operation === state.newsFilter; });
    }
    renderNewsCards(el.newsGrid, articles);
  }

  function renderNewsCards(container, articles) {
    container.innerHTML = '';
    articles.forEach(function (a) {
      var color = a.outletAccentColor || '#b5651d';
      var logoPath = (state.outletLogos && state.outletLogos[a.outlet]) || null;
      var initial = (a.outlet || '?').trim().charAt(0).toUpperCase();

      var card = document.createElement('button');
      card.className = 'news-card' + (a.fetchFailed && (!a.body || !a.body.length) ? ' unavailable' : '');
      card.innerHTML =
        (a.localImage
          ? '<img class="news-card-photo" src="' + a.localImage + '" alt="" onerror="this.remove()" />'
          : '<div class="news-card-photo-fallback" style="--outlet-color:' + color + '">' + escapeHtml(initial) + '</div>') +
        '<div class="news-card-body">' +
          '<div class="news-card-masthead">' +
            '<span class="news-card-logo-wrap" style="--outlet-color:' + color + '">' +
              (logoPath ? '<img class="news-card-logo" src="' + logoPath + '" alt="" onerror="this.remove()" />' : '') +
              '<span class="news-card-logo-fallback">' + escapeHtml(initial) + '</span>' +
            '</span>' +
            '<span class="news-card-outlet">' + escapeHtml(a.outlet) + '</span>' +
          '</div>' +
          '<span class="news-card-headline">' + escapeHtml(articleField(a, 'headline')) + '</span>' +
          (a.date ? '<span class="news-card-date">' + escapeHtml(a.date) + '</span>' : '') +
        '</div>';
      card.addEventListener('click', function () { openArticle(a); });
      container.appendChild(card);
    });
  }

  function openArticle(a) {
    state.currentArticle = a;
    var color = a.outletAccentColor || '#b5651d';
    var logoPath = (state.outletLogos && state.outletLogos[a.outlet]) || null;
    el.articleMasthead.style.background = color;
    el.articleOutlet.textContent = a.outlet;
    el.articleLogo.innerHTML = logoPath ? '<img src="' + logoPath + '" alt="" onerror="this.parentElement.innerHTML=\'\'" />' : '';
    el.articleLogo.style.display = logoPath ? 'block' : 'none';

    el.articleHero.innerHTML = a.localImage ? '<img src="' + a.localImage + '" alt="" onerror="this.parentElement.style.display=\'none\'" />' : '';
    el.articleHero.style.display = a.localImage ? 'block' : 'none';

    var dek = articleField(a, 'dek');
    el.articleHeadline.textContent = articleField(a, 'headline');
    el.articleDek.textContent = dek || '';
    el.articleDek.style.display = dek ? 'block' : 'none';

    var metaBits = [];
    if (a.byline) metaBits.push(a.byline);
    if (a.date) metaBits.push(a.date);
    el.articleMeta.textContent = metaBits.join(' • ');
    el.articleMeta.style.display = metaBits.length ? 'block' : 'none';

    var body = articleField(a, 'body');
    el.articleBody.innerHTML = '';
    if (body && body.length) {
      body.forEach(function (para) {
        var p = document.createElement('p');
        p.textContent = para;
        el.articleBody.appendChild(p);
      });
    } else {
      var p = document.createElement('p');
      p.textContent = t('fetchFailedNote');
      p.style.fontStyle = 'italic';
      el.articleBody.appendChild(p);
    }

    el.articleFooter.textContent = t('sourceLabel') + ' ' + a.outlet + (a.url ? ' — ' + a.url : '');
    el.articleScroll.scrollTop = 0;
    showScreen('article');
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------------- TRIBUTE / FALLEN HEROES ---------------- */
  // Highest rank first, so the roster reads top-down like an organogram.
  var RANK_ORDER = ['Lt Col', 'Lt', 'Sgt', 'Cpl', 'LCpl', 'Pte', 'CJTF'];

  function rankIndex(rank) {
    var i = RANK_ORDER.indexOf(rank);
    return i === -1 ? RANK_ORDER.length : i;
  }

  // Used to look up a per-rank silhouette at assets/images/ranks/<slug>.png —
  // drop images in with these names to replace the built-in placeholder.
  function rankSlug(rank) {
    return String(rank).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function renderTribute() {
    el.tributeFilterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === state.tributeFilter);
    });
    renderTributeOrganogram(TT_KIA[state.tributeFilter]);
  }

  function renderTributeOrganogram(opData) {
    el.tributeOrganogram.innerHTML = '';

    // Flatten every person across the source unit groups, then bucket by
    // rank so seniority — not formation — drives the layout.
    var people = [];
    opData.groups.forEach(function (group) {
      group.rows.forEach(function (row) {
        people.push({ rank: row.rank, name: row.name, unit: group.unit || row.remarks || '' });
      });
    });
    people.sort(function (a, b) { return rankIndex(a.rank) - rankIndex(b.rank); });

    var tiers = [];
    people.forEach(function (p) {
      var tier = tiers[tiers.length - 1];
      if (!tier || tier.rank !== p.rank) {
        tier = { rank: p.rank, people: [] };
        tiers.push(tier);
      }
      tier.people.push(p);
    });

    tiers.forEach(function (tier) {
      var label = document.createElement('div');
      label.className = 'tribute-tier-label';
      label.textContent = tier.rank + (tier.people.length > 1 ? ' (' + tier.people.length + ')' : '');
      el.tributeOrganogram.appendChild(label);

      var row = document.createElement('div');
      row.className = 'tribute-tier-row';
      tier.people.forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'tribute-person';
        card.innerHTML =
          '<div class="tribute-person-photo">' +
            '<svg class="tribute-person-fallback" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>' +
            '<img src="assets/images/ranks/' + rankSlug(p.rank) + '.png" alt="" onerror="this.remove()" />' +
          '</div>' +
          '<span class="tribute-person-name">' + escapeHtml(p.name) + '</span>' +
          (p.unit ? '<span class="tribute-person-unit">' + escapeHtml(p.unit) + '</span>' : '');
        row.appendChild(card);
      });
      el.tributeOrganogram.appendChild(row);
    });
  }

  /* ---------------- IDLE / ATTRACT RESET ---------------- */
  // Actively listening to About narration or watching the documentary counts
  // as activity even without touching the screen, so the idle timer should
  // not run while either is actually playing.
  function isNarrationOrVideoPlaying() {
    if (aboutAudio && !aboutAudio.paused) return true;
    if (!el.videoOverlay.classList.contains('hidden') && !el.videoPlayer.paused) return true;
    return false;
  }

  function pauseIdleTimer() {
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
  }

  function resetIdleTimer() {
    pauseIdleTimer();
    if (state.screen === 'attract') return;
    if (isNarrationOrVideoPlaying()) return;
    idleTimer = setTimeout(triggerIdleReset, IDLE_TIMEOUT_MS);
  }

  function triggerIdleReset() {
    el.idleOverlay.classList.remove('hidden');
    closeVideo();
    stopAboutAudio();
    setTimeout(function () {
      el.idleOverlay.classList.add('hidden');
      state.aboutIndex = 0;
      showScreen('attract');
    }, 1600);
  }

  /* ---------------- INIT ---------------- */
  function cacheEls() {
    el.stage = document.getElementById('stage');
    el.topbar = document.getElementById('topbar');
    el.topbarTitle = document.getElementById('topbar-title');
    el.btnHome = document.getElementById('btn-home');
    el.btnClose = document.getElementById('btn-close');

    el.screens = {
      attract: document.getElementById('screen-attract'),
      home: document.getElementById('screen-home'),
      about: document.getElementById('screen-about'),
      documentary: document.getElementById('screen-documentary'),
      news: document.getElementById('screen-news'),
      article: document.getElementById('screen-article'),
      tribute: document.getElementById('screen-tribute')
    };

    el.aboutTitle = document.getElementById('about-title');
    el.aboutProgress = document.getElementById('about-progress');
    el.aboutParagraph = document.getElementById('about-paragraph');
    el.aboutParagraphWrap = document.querySelector('.about-paragraph-wrap');
    el.aboutPrev = document.getElementById('about-prev');
    el.aboutNext = document.getElementById('about-next');
    el.aboutListen = document.getElementById('about-listen');

    el.docList = document.getElementById('doc-list');

    el.videoOverlay = document.getElementById('video-overlay');
    el.videoPlayer = document.getElementById('video-player');
    el.videoClose = document.getElementById('video-close');
    el.videoPlayPause = document.getElementById('video-playpause');
    el.videoScrub = document.getElementById('video-scrub');
    el.videoTimeCurrent = document.getElementById('video-time-current');
    el.videoTimeDuration = document.getElementById('video-time-duration');

    el.newsFilterBtns = document.querySelectorAll('.news-filter-btn');
    el.newsGrid = document.getElementById('news-grid');

    el.articleBack = document.getElementById('article-back');
    el.articleScroll = document.getElementById('article-scroll');
    el.articleMasthead = document.getElementById('article-masthead');
    el.articleLogo = document.getElementById('article-logo');
    el.articleOutlet = document.getElementById('article-outlet');
    el.articleHero = document.getElementById('article-hero');
    el.articleHeadline = document.getElementById('article-headline');
    el.articleDek = document.getElementById('article-dek');
    el.articleMeta = document.getElementById('article-meta');
    el.articleBody = document.getElementById('article-body');
    el.articleFooter = document.getElementById('article-footer');

    el.tributeFilterBtns = document.querySelectorAll('.tribute-filter-btn');
    el.tributeOrganogram = document.getElementById('tribute-organogram');

    el.idleOverlay = document.getElementById('idle-overlay');
    el.bgVideo = document.querySelector('.app-bg-video');
  }

  function bindEvents() {
    window.addEventListener('resize', scaleStage);

    el.btnHome.addEventListener('click', goHome);
    el.btnClose.addEventListener('click', function () { window.close(); });
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
    });

    document.querySelectorAll('.menu-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var target = tile.getAttribute('data-nav');
        if (target === 'about') state.aboutIndex = 0;
        showScreen(target);
      });
    });

    el.aboutPrev.addEventListener('click', function () { state.aboutIndex--; renderAboutParagraph(); });
    el.aboutNext.addEventListener('click', function () { state.aboutIndex++; renderAboutParagraph(); });
    el.aboutListen.addEventListener('click', toggleAboutAudio);

    el.videoClose.addEventListener('click', closeVideo);
    el.videoPlayPause.addEventListener('click', function () {
      if (el.videoPlayer.paused) { el.videoPlayer.play(); } else { el.videoPlayer.pause(); }
    });
    el.videoPlayer.addEventListener('play', function () { setVideoPlayIcon(true); pauseIdleTimer(); });
    el.videoPlayer.addEventListener('pause', function () { setVideoPlayIcon(false); resetIdleTimer(); });
    el.videoPlayer.addEventListener('timeupdate', function () {
      if (el.videoPlayer.duration) {
        el.videoScrub.value = (el.videoPlayer.currentTime / el.videoPlayer.duration) * 100;
      }
      el.videoTimeCurrent.textContent = fmtTime(el.videoPlayer.currentTime);
      el.videoTimeDuration.textContent = fmtTime(el.videoPlayer.duration);
    });
    el.videoScrub.addEventListener('input', function () {
      if (el.videoPlayer.duration) {
        el.videoPlayer.currentTime = (el.videoScrub.value / 100) * el.videoPlayer.duration;
      }
    });

    el.articleBack.addEventListener('click', function () { showScreen('news'); });

    el.newsFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.newsFilter = btn.getAttribute('data-filter');
        renderNewsList();
      });
    });

    el.tributeFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.tributeFilter = btn.getAttribute('data-filter');
        renderTribute();
      });
    });

    ['click', 'touchstart'].forEach(function (evt) {
      document.addEventListener(evt, resetIdleTimer, { passive: true });
      // Fallback in case the browser blocked the autoplay attempt in init() —
      // startAmbientAudio() is a no-op once it's already playing.
      document.addEventListener(evt, startAmbientAudio, { passive: true });
    });

    // Chromium can pause a muted <video> when the kiosk window briefly loses
    // focus/visibility (e.g. an OS overlay) — resume it once it's back.
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && el.bgVideo && el.bgVideo.paused) el.bgVideo.play().catch(function () {});
    });
  }

  function init() {
    cacheEls();
    bindEvents();
    initAttractAndHome();
    scaleStage();
    applyStaticI18n();
    showScreen('attract');
    startAmbientAudio();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
