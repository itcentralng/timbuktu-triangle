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
    newsLoaded: false
  };

  var el = {}; // populated in init()
  var idleTimer = null;
  var aboutAudio = null;
  var welcomeAudio = null;

  // Minimal fallback so the News section is never empty while the
  // background fetch job (data/news-articles.json) hasn't landed yet.
  var NEWS_FALLBACK = [
    { id: 'tvc-1', operation: 'V', outlet: 'TVC News', outletAccentColor: '#0f4c8c', url: 'https://www.tvcnews.tv/troops-bust-terrorist-camps-thwart-attacks-in-northeast-operation/', headline: 'Troops Bust Terrorist Camps, Thwart Attacks In Northeast Operation', body: [], fetchFailed: true },
    { id: 'zagazola-1', operation: 'V', outlet: 'Zagazola Makama', outletAccentColor: '#1a1a1a', url: 'https://zagazola.org/index.php/breaking-news/troops-dismantle-three-boko-haram-detention-facilities-in-timbuktu-triangle', headline: 'Troops Dismantle Three Boko Haram Detention Facilities In Timbuktu Triangle', body: [], fetchFailed: true },
    { id: 'vanguard-1', operation: 'V', outlet: 'Vanguard', outletAccentColor: '#c8102e', url: 'https://www.vanguardngr.com/2026/01/troops-clear-terrorists-camps-in-timbuktu-triangle-thwarts-boko-haram-attacks/', headline: 'Troops Clear Terrorists Camps In Timbuktu Triangle, Thwarts Boko Haram Attacks', body: [], fetchFailed: true },
    { id: 'vanguard-2', operation: 'V', outlet: 'Vanguard', outletAccentColor: '#c8102e', url: 'https://www.vanguardngr.com/2026/01/troops-gain-into-timbuktu-traingle-stronghold-of-boko-haram-iswap-terrorists/', headline: 'Troops Gain Into Timbuktu Triangle Stronghold Of Boko Haram/ISWAP Terrorists', body: [], fetchFailed: true },
    { id: 'zagazola-2', operation: 'V', outlet: 'Zagazola Makama', outletAccentColor: '#1a1a1a', url: 'https://zagazola.org/index.php/breaking-news/iswap-suffers-heavy-losses-in-timbuktu-triangle-lost-22-fighters-in-encounter-with-troops', headline: 'ISWAP Suffers Heavy Losses In Timbuktu Triangle, Lost 22 Fighters In Encounter With Troops', body: [], fetchFailed: true },
    { id: 'prnigeria-1', operation: 'V', outlet: 'PRNigeria', outletAccentColor: '#0b6e4f', url: 'https://prnigeria.com/2026/04/29/troops-pound-terrorists/', headline: 'Troops Pound Terrorists', body: [], fetchFailed: true },
    { id: 'trt-1', operation: 'V', outlet: 'TRT World', outletAccentColor: '#c8102e', url: 'https://www.trtworld.com/article/d08074fe29dc', headline: 'Nigerian Troops Advance In Timbuktu Triangle Operation', body: [], fetchFailed: true },
    { id: 'guardian-1', operation: 'V', outlet: 'The Guardian Nigeria', outletAccentColor: '#003876', url: 'https://guardian.ng/news/army-troops-overrun-boko-haram-iswap-stronghold-in-timbuktu-triangle/', headline: 'Army Troops Overrun Boko Haram/ISWAP Stronghold In Timbuktu Triangle', body: [], fetchFailed: true },
    { id: 'thisday-1', operation: 'V', outlet: 'ThisDay', outletAccentColor: '#7a1f2b', url: 'https://www.thisdaylive.com/2026/01/21/troops-eliminate-20-terrorists-as-soldiers-pay-supreme-price-during-fierce-encounter/', headline: 'Troops Eliminate 20 Terrorists As Soldiers Pay Supreme Price During Fierce Encounter', body: [], fetchFailed: true },
    { id: 'punch-1', operation: 'V', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'https://punchng.com/military-discovers-bharam-underground-storage-fuel-dump/', headline: 'Military Discovers Boko Haram Underground Storage, Fuel Dump', body: [], fetchFailed: true },

    { id: 'arise-1', operation: 'IV', outlet: 'Arise News', outletAccentColor: '#e2001a', url: 'https://www.arise.tv/boko-haram-swap-attack-kills-army-commander-soldiers-in-borno-state/', headline: 'Boko Haram/ISWAP Attack Kills Army Commander, Soldiers In Borno State', body: [], fetchFailed: true },
    { id: 'hindu-1', operation: 'IV', outlet: 'The Hindu', outletAccentColor: '#004b8d', url: 'https://www.thehindu.com/news/international/at-least-27-nigerian-soldiers-killed-in-jihadist-suicide-attack-army/article69144242.ece', headline: 'At Least 27 Nigerian Soldiers Killed In Jihadist Suicide Attack: Army', body: [], fetchFailed: true },
    { id: 'ndarason-1', operation: 'IV', outlet: 'Ndarason Media', outletAccentColor: '#1a1a1a', url: 'https://ndarason.com/en/at-least-70-insurgents-killed-in-timbuktu-triangle-in-borno-state/', headline: 'At Least 70 Insurgents Killed In Timbuktu Triangle In Borno State', body: [], fetchFailed: true },
    { id: 'punch-2', operation: 'IV', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'https://punchng.com/22-soldiers-over-70-insurgents-killed-in-borno-clash-dhq/', headline: '22 Soldiers, Over 70 Insurgents Killed In Borno Clash — DHQ', body: [], fetchFailed: true },
    { id: 'thecable-1', operation: 'IV', outlet: 'The Cable', outletAccentColor: '#0a2540', url: 'https://www.thecable.ng/nigerian-army-loses-20-soldiers-kills-70-terrorists-during-military-operation-in-borno/', headline: 'Nigerian Army Loses 20 Soldiers, Kills 70 Terrorists During Military Operation In Borno', body: [], fetchFailed: true },
    { id: 'channelstv-1', operation: 'IV', outlet: 'Channels TV', outletAccentColor: '#00693e', url: 'https://www.channelstv.com/2025/01/26/military-confirms-death-on-22-soldiers-in-north-east-operation/', headline: 'Military Confirms Death Of 22 Soldiers In North-East Operation', body: [], fetchFailed: true },
    { id: 'thecable-2', operation: 'IV', outlet: 'The Cable', outletAccentColor: '#0a2540', url: 'https://www.thecable.ng/newspaper-headlines-terrorists-ambush-soldiers-recovering-corpses-of-farmers-in-borno/', headline: 'Newspaper Headlines: Terrorists Ambush Soldiers Recovering Corpses Of Farmers In Borno', body: [], fetchFailed: true },
    { id: 'punch-3', operation: 'IV', outlet: 'Punch', outletAccentColor: '#c8102e', url: 'http://punchng.com/troops-kill-over-50-terrorists-in-borno-yobe-military/', headline: 'Troops Kill Over 50 Terrorists In Borno, Yobe — Military', body: [], fetchFailed: true },
    { id: 'premiumtimes-1', operation: 'IV', outlet: 'Premium Times', outletAccentColor: '#0b3d91', url: 'https://www.premiumtimesng.com/news/headlines/799991-nigerian-troops-kill-iswap-commander-many-other-terrorists-in-borno-yobe-official.html', headline: 'Nigerian Troops Kill ISWAP Commander, Many Other Terrorists In Borno, Yobe — Official', body: [], fetchFailed: true },
    { id: 'humangle-1', operation: 'IV', outlet: 'HumAngle', outletAccentColor: '#1f7a4d', url: 'https://humanglemedia.com/nigerian-military-confirms-22-soldiers-killed-in-ongoing-operations-against-terrorists/', headline: 'Nigerian Military Confirms 22 Soldiers Killed In Ongoing Operations Against Terrorists', body: [], fetchFailed: true },
    { id: 'justicewatch-1', operation: 'IV', outlet: 'Justice Watch News', outletAccentColor: '#4a4a4a', url: 'https://justicewatchnews.com/nigeria-army-provides-update-on-terrorist-attack-on-troops-in-timbuktu-triangle/', headline: 'Nigeria Army Provides Update On Terrorist Attack On Troops In Timbuktu Triangle', body: [], fetchFailed: true },
    { id: 'kwara-1', operation: 'IV', outlet: 'Kwara Reporters', outletAccentColor: '#1a1a1a', url: 'https://www.kwarareporters.com.ng/2025/01/three-officers-several-nigerian.html', headline: 'Three Officers, Several Nigerian Soldiers Killed In Borno Attack', body: [], fetchFailed: true }
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
    el.attractTapLabel.textContent = t('tapToBegin');

    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === state.lang);
    });

    el.aboutParagraph.setAttribute('dir', dir);
  }

  /* ---------------- navigation ---------------- */
  var NO_TOPBAR = { attract: true, language: true, article: true };

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

  /* ---------------- ATTRACT / LANGUAGE ---------------- */
  function initAttractAndLanguage() {
    el.screens.attract.addEventListener('click', function () {
      showScreen('language');
    });
    document.querySelectorAll('.lang-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var lang = card.getAttribute('data-lang');
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
    welcomeAudio.addEventListener('ended', function () { welcomeAudio = null; });
    welcomeAudio.play().catch(function () { welcomeAudio = null; });
  }

  function stopWelcomeAudio() {
    if (welcomeAudio) {
      welcomeAudio.pause();
      welcomeAudio = null;
    }
  }

  function setLang(lang) {
    state.lang = lang;
    applyStaticI18n();
    if (state.screen === 'about') renderAboutParagraph();
    if (state.screen === 'documentary') renderDocList();
    if (state.screen === 'news') renderNewsList();
    if (state.screen === 'tribute') renderTribute();
  }

  /* ---------------- ABOUT ---------------- */
  function renderAboutParagraph() {
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

    stopAboutAudio();
    el.aboutParagraphWrap.scrollTop = 0;
  }

  function stopAboutAudio() {
    if (aboutAudio) {
      aboutAudio.pause();
      aboutAudio = null;
    }
    el.aboutListen.classList.remove('playing');
    el.aboutListen.querySelector('.icon-play').classList.remove('hidden');
    el.aboutListen.querySelector('.icon-pause').classList.add('hidden');
    el.aboutListen.querySelector('.listen-label').textContent = t('listen');
  }

  function toggleAboutAudio() {
    if (aboutAudio && !aboutAudio.paused) {
      stopAboutAudio();
      return;
    }
    var src = (TT_CONTENT.audio[state.lang] || [])[state.aboutIndex];
    if (!src) { flashUnavailable(); return; }

    aboutAudio = new Audio(src);
    aboutAudio.addEventListener('ended', stopAboutAudio);
    aboutAudio.addEventListener('error', function () {
      stopAboutAudio();
      flashUnavailable();
    });
    aboutAudio.play().then(function () {
      el.aboutListen.classList.add('playing');
      el.aboutListen.querySelector('.icon-play').classList.add('hidden');
      el.aboutListen.querySelector('.icon-pause').classList.remove('hidden');
      el.aboutListen.querySelector('.listen-label').textContent = t('pause');
    }).catch(function () {
      stopAboutAudio();
      flashUnavailable();
    });
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
    el.videoPlayer.play().catch(function () {});
    setVideoPlayIcon(true);
  }
  function closeVideo() {
    el.videoPlayer.pause();
    el.videoPlayer.removeAttribute('src');
    el.videoPlayer.load();
    el.videoOverlay.classList.add('hidden');
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

  function renderNewsList() {
    el.newsOpIvHeading.textContent = t('operationIV') + ' — ' + t('operationIVDate');
    el.newsOpVHeading.textContent = t('operationV') + ' — ' + t('operationVDate');

    var articles = state.newsArticles || NEWS_FALLBACK;
    renderNewsCards(el.newsCardsIv, articles.filter(function (a) { return a.operation === 'IV'; }));
    renderNewsCards(el.newsCardsV, articles.filter(function (a) { return a.operation === 'V'; }));
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
        '<div class="news-card-masthead" style="--outlet-color:' + color + '">' +
          '<span class="news-card-logo-wrap" style="--outlet-color:' + color + '">' +
            (logoPath ? '<img class="news-card-logo" src="' + logoPath + '" alt="" onerror="this.remove()" />' : '') +
            '<span class="news-card-logo-fallback">' + escapeHtml(initial) + '</span>' +
          '</span>' +
          '<span class="news-card-outlet" style="--outlet-color:' + color + '">' + escapeHtml(a.outlet) + '</span>' +
        '</div>' +
        (a.localImage ? '<img class="news-card-photo" src="' + a.localImage + '" alt="" onerror="this.remove()" />' : '') +
        '<div class="news-card-crease"></div>' +
        '<div class="news-card-body">' +
          '<span class="news-card-headline">' + escapeHtml(a.headline) + '</span>' +
          (a.date ? '<span class="news-card-date">' + escapeHtml(a.date) + '</span>' : '') +
        '</div>';
      card.addEventListener('click', function () { openArticle(a); });
      container.appendChild(card);
    });
  }

  function openArticle(a) {
    var color = a.outletAccentColor || '#b5651d';
    var logoPath = (state.outletLogos && state.outletLogos[a.outlet]) || null;
    el.articleMasthead.style.background = color;
    el.articleOutlet.textContent = a.outlet;
    el.articleLogo.innerHTML = logoPath ? '<img src="' + logoPath + '" alt="" onerror="this.parentElement.innerHTML=\'\'" />' : '';
    el.articleLogo.style.display = logoPath ? 'block' : 'none';

    el.articleHero.innerHTML = a.localImage ? '<img src="' + a.localImage + '" alt="" onerror="this.parentElement.style.display=\'none\'" />' : '';
    el.articleHero.style.display = a.localImage ? 'block' : 'none';

    el.articleHeadline.textContent = a.headline;
    el.articleDek.textContent = a.dek || '';
    el.articleDek.style.display = a.dek ? 'block' : 'none';

    var metaBits = [];
    if (a.byline) metaBits.push(a.byline);
    if (a.date) metaBits.push(a.date);
    el.articleMeta.textContent = metaBits.join(' • ');
    el.articleMeta.style.display = metaBits.length ? 'block' : 'none';

    el.articleBody.innerHTML = '';
    if (a.body && a.body.length) {
      a.body.forEach(function (para) {
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

  /* ---------------- TRIBUTE ---------------- */
  function renderTribute() {
    renderTributeTable(el.tributeTableIv, TT_KIA.IV);
    renderTributeTable(el.tributeTableV, TT_KIA.V);
  }

  function renderTributeTable(container, opData) {
    container.innerHTML = '';
    opData.groups.forEach(function (group) {
      if (group.unit) {
        var label = document.createElement('div');
        label.className = 'tribute-unit-label';
        label.textContent = group.unit;
        container.appendChild(label);
      }
      group.rows.forEach(function (row) {
        var r = document.createElement('div');
        r.className = 'tribute-row';
        r.innerHTML =
          '<span class="tribute-serial">' + row.serial + '</span>' +
          '<span class="tribute-rank">' + escapeHtml(row.rank) + '</span>' +
          '<span class="tribute-name">' + escapeHtml(row.name) + '</span>' +
          (row.remarks ? '<span class="tribute-remarks">' + escapeHtml(row.remarks) + '</span>' : '');
        container.appendChild(r);
      });
    });
  }

  /* ---------------- IDLE / ATTRACT RESET ---------------- */
  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    if (state.screen === 'attract') return;
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
    el.attractTapLabel = document.getElementById('attract-tap-label');
    el.btnHome = document.getElementById('btn-home');
    el.btnClose = document.getElementById('btn-close');

    el.screens = {
      attract: document.getElementById('screen-attract'),
      language: document.getElementById('screen-language'),
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

    el.newsOpIvHeading = document.getElementById('news-op-iv-heading');
    el.newsOpVHeading = document.getElementById('news-op-v-heading');
    el.newsCardsIv = document.getElementById('news-cards-iv');
    el.newsCardsV = document.getElementById('news-cards-v');

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

    el.tributeTableIv = document.getElementById('tribute-table-iv');
    el.tributeTableV = document.getElementById('tribute-table-v');

    el.idleOverlay = document.getElementById('idle-overlay');
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
    el.videoPlayer.addEventListener('play', function () { setVideoPlayIcon(true); });
    el.videoPlayer.addEventListener('pause', function () { setVideoPlayIcon(false); });
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

    ['click', 'touchstart'].forEach(function (evt) {
      document.addEventListener(evt, resetIdleTimer, { passive: true });
    });
  }

  function init() {
    cacheEls();
    bindEvents();
    initAttractAndLanguage();
    scaleStage();
    applyStaticI18n();
    showScreen('attract');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
