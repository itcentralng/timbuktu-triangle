/*
  Trilingual content for the Timbuktu Triangle kiosk app.
  English text is transcribed verbatim from assets/others/about-timbuktu-operation-english.jpg.
  French and Arabic are working translations produced from that verified English master text
  (the source images had compression/texture artifacts that made pixel-accurate OCR unreliable,
  especially for Arabic). RECOMMEND: have a native French and Arabic speaker proof these against
  assets/others/about-timbuktu-operation-french.jpg and -arabic.jpg before final deployment.
*/

const TT_CONTENT = {

  languages: ['en', 'fr', 'ar'],

  meta: {
    en: { label: 'English', dir: 'ltr' },
    fr: { label: 'Français', dir: 'ltr' },
    ar: { label: 'العربية', dir: 'rtl' }
  },

  ui: {
    en: {
      appTitle: 'The Timbuktu Triangle',
      appSubtitle: 'Nigerian Army — Operations Desert Sanity IV & V',
      menuAbout: 'The Triangle',
      menuAboutSub: 'Understand the ground and the operations',
      menuDocumentary: 'Watch the Documentary',
      menuDocumentarySub: 'Choose a length that fits your visit',
      menuNews: 'In the News',
      menuNewsSub: 'How the operations were reported',
      menuTribute: 'Fallen Heroes',
      menuTributeSub: 'In memory of those who fell',
      back: 'Back',
      home: 'Home',
      listen: 'Listen',
      pause: 'Pause',
      readAloud: 'Read to Me',
      audioUnavailable: 'Audio not yet available',
      howMuchTime: 'How much time do you have?',
      howMuchTimeSub: 'Choose a length and we’ll play the matching film',
      minutes: 'minutes',
      minuteAbbr: 'min',
      watchNow: 'Watch',
      operationIV: 'Operation Desert Sanity IV',
      operationIVDate: 'January 2025',
      operationV: 'Operation Desert Sanity V',
      operationVDate: 'January 2026',
      newsFilterAll: 'All',
      newsIntro: 'Nigerian and international outlets covered both operations. Tap a clipping to read it in full.',
      sourceLabel: 'Originally published by',
      readOriginal: 'Original source',
      fetchFailedNote: 'Full text unavailable offline for this article.',
      tributeIntro: 'The Nigerian Army honours the officers, soldiers and Civilian Joint Task Force members who gave their lives clearing the Timbuktu Triangle.',
      tributeIV: 'Fallen — 24 January 2025',
      tributeV: 'Fallen — 20 January 2026',
      rank: 'Rank',
      name: 'Name',
      unit: 'Unit',
      remarks: 'Remarks',
      idleReturnNote: 'Returning to start…',
      exit: 'Exit'
    },
    fr: {
      appTitle: 'Le Triangle de Timbuktu',
      appSubtitle: 'Armée nigériane — Opérations Desert Sanity IV et V',
      menuAbout: 'Le Triangle',
      menuAboutSub: 'Comprendre le terrain et les opérations',
      menuDocumentary: 'Regarder le documentaire',
      menuDocumentarySub: 'Choisissez une durée adaptée à votre visite',
      menuNews: 'Dans la presse',
      menuNewsSub: 'Comment les opérations ont été rapportées',
      menuTribute: 'Héros tombés',
      menuTributeSub: 'À la mémoire de ceux qui sont tombés',
      back: 'Retour',
      home: 'Accueil',
      listen: 'Écouter',
      pause: 'Pause',
      readAloud: 'Lire à voix haute',
      audioUnavailable: 'Audio non disponible pour le moment',
      howMuchTime: 'De combien de temps disposez-vous ?',
      howMuchTimeSub: 'Choisissez une durée et nous lancerons le film correspondant',
      minutes: 'minutes',
      minuteAbbr: 'min',
      watchNow: 'Regarder',
      operationIV: 'Opération Desert Sanity IV',
      operationIVDate: 'Janvier 2025',
      operationV: 'Opération Desert Sanity V',
      operationVDate: 'Janvier 2026',
      newsFilterAll: 'Tout',
      newsIntro: 'La presse nigériane et internationale a couvert les deux opérations. Touchez un article pour le lire en entier.',
      sourceLabel: 'Publié à l’origine par',
      readOriginal: 'Source originale',
      fetchFailedNote: 'Texte intégral indisponible hors ligne pour cet article.',
      tributeIntro: "L'Armée nigériane honore les officiers, soldats et membres de la Force civile mixte qui ont donné leur vie pour libérer le Triangle de Timbuktu.",
      tributeIV: 'Tombés — 24 janvier 2025',
      tributeV: 'Tombés — 20 janvier 2026',
      rank: 'Grade',
      name: 'Nom',
      unit: 'Unité',
      remarks: 'Remarques',
      idleReturnNote: 'Retour à l’accueil…',
      exit: 'Quitter'
    },
    ar: {
      appTitle: 'مثلث تمبكتو',
      appSubtitle: 'الجيش النيجيري — عمليتا ديزرت سانيتي الرابعة والخامسة',
      menuAbout: 'المثلث',
      menuAboutSub: 'تعرّف على طبيعة الأرض والعمليات',
      menuDocumentary: 'شاهد الفيلم الوثائقي',
      menuDocumentarySub: 'اختر مدة تناسب زيارتك',
      menuNews: 'في الأخبار',
      menuNewsSub: 'كيف تم تغطية العمليات إعلاميًا',
      menuTribute: 'الأبطال الشهداء',
      menuTributeSub: 'تخليدًا لذكرى من سقطوا',
      back: 'رجوع',
      home: 'الرئيسية',
      listen: 'استماع',
      pause: 'إيقاف',
      readAloud: 'اقرأ لي',
      audioUnavailable: 'الصوت غير متاح حاليًا',
      howMuchTime: 'كم من الوقت لديك؟',
      howMuchTimeSub: 'اختر مدة وسنعرض الفيلم المناسب لها',
      minutes: 'دقائق',
      minuteAbbr: 'د',
      watchNow: 'مشاهدة',
      operationIV: 'عملية ديزرت سانيتي الرابعة',
      operationIVDate: 'يناير 2025',
      operationV: 'عملية ديزرت سانيتي الخامسة',
      operationVDate: 'يناير 2026',
      newsFilterAll: 'الكل',
      newsIntro: 'غطت وسائل الإعلام النيجيرية والدولية العمليتين. المس أي مقال لقراءته كاملاً.',
      sourceLabel: 'نُشر في الأصل بواسطة',
      readOriginal: 'المصدر الأصلي',
      fetchFailedNote: 'النص الكامل غير متاح دون اتصال لهذا المقال.',
      tributeIntro: 'يكرّم الجيش النيجيري الضباط والجنود وأفراد قوة العمل المشتركة المدنية الذين ضحوا بأرواحهم لتطهير مثلث تمبكتو.',
      tributeIV: 'الشهداء — 24 يناير 2025',
      tributeV: 'الشهداء — 20 يناير 2026',
      rank: 'الرتبة',
      name: 'الاسم',
      unit: 'الوحدة',
      remarks: 'ملاحظات',
      idleReturnNote: 'العودة إلى البداية…',
      exit: 'خروج'
    }
  },

  about: {
    en: {
      title: 'Operations in the Timbuktu Triangle',
      paragraphs: [
        "The TIMBUKTU Triangle is a remote and sparsely populated area spanning parts of Borno State and Yobe State, with the triangle covering the DAMATURU–MAIDUGURI, MAIDUGURI–BIU and BIU–DAMATURU road corridors. It is characterized by dense scrub vegetation, limited road networks and minimal state presence. The area holds significant strategic importance in ongoing counter-insurgency operations against Boko Haram Terrorists (BHT) and Islamic State West Africa Province (ISWAP) due to its terrain and location. The terrain provides concealment and restricts mobility, thereby favouring terrorist groups exploiting the area against troops. Operationally, the area provides critical strategic depth and functions as a mobility corridor, allowing terrorists to retreat, regroup and project attacks while maintaining linkages with key locations such as the SAMBISA Forest and the LAKE CHAD Basin. This connectivity enhances their freedom of movement and supports coordinated operations across multiple fronts. Consequently, the triangle serves as a staging area from which terrorists conduct attacks and ambushes on troops, raids on communities and highways, and disruption of supply routes and lines of communication, followed by rapid withdrawal back into the enclaves.",
        "Control of the TIMBUKTU Triangle carries both operational and psychological significance, as it reflects dominance within the North-East Theatre and denies insurgents a critical support and propaganda base, thus enhancing confidence among local populations and security forces. Accordingly, effective neutralization of the area requires sustained, integrated ground and air operations, establishment and maintenance of forward operating bases, continuous patrols and ISR coverage, and strengthened civil-military cooperation to disrupt insurgent support networks. In 2025, troops of Operation DESERT SANITY IV conducted a deliberate offensive into the triangle. Combined troops of CT 6/8 and 199 SF Bn OPHK advanced along DAMBOA–KAFA into the triangle, cleared several terrorist enclaves and thereafter occupied a temporary harbour position from where operations were projected deep into the triangle. However, on 24 January 2025, troops were attacked at the harbour site with a Vehicle Borne Improvised Explosive Device (VBIED); the explosion resulted in shrapnel that struck and killed the CO of 19 Bn (Main), 2 other officers, 22 soldiers and 6 CJTF, while 2 officers and 25 soldiers suffered various degrees of injury. This setback caused the Theatre Commander OPHK to call off continuation of the operation, owing to the distance of the harbour position from the main base in DAMBOA and terrain conditions that made evacuation of the dead and wounded for medical attention difficult.",
        "Similarly, in 2026, troops of AHQ Intervention Force — otherwise known as Battle Group Mike (BG MIKE) — under Operation DESERT SANITY V commenced an offensive to clear the Timbuktu Triangle in January 2026. The troops cleared major terrorist strongholds, neutralizing several terrorists and recovering assorted arms and ammunition. Following an extended line of communication, troops occupied a harbour position at GARDIRI and were resupplied via airlift. While at harbour, BG MIKE was attacked by Boko Haram using 2 VBIEDs on 20 January 2026. Troops fought gallantly, neutralizing several of the attackers and destroying one of the VBIEDs, while the other device was detonated in the midst of the troops. Consequent upon the explosion, 9 soldiers and 3 Civilian Joint Task Force members were killed, while 2 officers and 32 soldiers were injured. However, unlike the situation in 2025, the Nigerian Army Aviation (NA AVN), which was operationalized in 2023, deployed its helicopters (HAWKEYE ONE and TWO) to evacuate the dead and the injured to 7 Division Medical Services and Hospital.",
        "The contribution of NA AVN and other NAF platforms in Operation DESERT SANITY V was invaluable in resupply, casualty evacuation, provision of ISR, and insertion of troops into the Triangle. The introduction of these force multipliers was the game changer that ensured Operation DESERT SANITY V achieved its objectives in the TIMBUKTU TRIANGLE, where all enclaves were cleared and all terrorist life-support structures were taken out."
      ]
    },
    fr: {
      title: 'Opérations dans le Triangle de Timbuktu',
      paragraphs: [
        "Le Triangle de TIMBUKTU est une zone reculée et faiblement peuplée qui s'étend sur des parties de l'État de Borno et de l'État de Yobe, le triangle couvrant les corridors routiers DAMATURU–MAIDUGURI, MAIDUGURI–BIU et BIU–DAMATURU. Il se caractérise par une végétation arbustive dense, un réseau routier limité et une présence étatique minimale. La zone revêt une importance stratégique majeure dans les opérations de lutte contre l'insurrection menées contre les Terroristes de Boko Haram (BHT) et la Province de l'État islamique en Afrique de l'Ouest (ISWAP), en raison de son terrain et de sa position. Le terrain offre un couvert et restreint la mobilité, ce qui favorise les groupes terroristes exploitant la zone contre les troupes. Sur le plan opérationnel, la zone offre une profondeur stratégique critique et fait office de corridor de mobilité, permettant aux terroristes de se replier, de se regrouper et de projeter des attaques tout en maintenant des liaisons avec des lieux clés tels que la forêt de SAMBISA et le bassin du lac TCHAD. Cette connectivité renforce leur liberté de mouvement et soutient des opérations coordonnées sur plusieurs fronts. Par conséquent, le triangle sert de zone de départ à partir de laquelle les terroristes mènent des attaques et des embuscades contre les troupes, des raids contre les communautés et les axes routiers, ainsi que la perturbation des voies de ravitaillement et des lignes de communication, suivis d'un retrait rapide vers les enclaves.",
        "Le contrôle du Triangle de TIMBUKTU revêt une importance à la fois opérationnelle et psychologique, car il reflète la domination au sein du théâtre du Nord-Est et prive les insurgés d'une base de soutien et de propagande essentielle, renforçant ainsi la confiance des populations locales et des forces de sécurité. En conséquence, la neutralisation efficace de la zone exige des opérations terrestres et aériennes soutenues et intégrées, la mise en place et le maintien de bases opérationnelles avancées, des patrouilles continues et une couverture de renseignement, de surveillance et de reconnaissance (ISR), ainsi qu'une coopération civilo-militaire renforcée pour désorganiser les réseaux de soutien des insurgés. En 2025, les troupes de l'opération DESERT SANITY IV ont mené une offensive délibérée dans le triangle. Les troupes combinées du CT 6/8 et du 199e Bataillon des Forces Spéciales de l'OPHK ont progressé le long de l'axe DAMBOA–KAFA dans le triangle, ont dégagé plusieurs enclaves terroristes, puis ont occupé une position de repli temporaire à partir de laquelle les opérations étaient projetées en profondeur dans le triangle. Cependant, le 24 janvier 2025, les troupes ont été attaquées sur le site de repli à l'aide d'un engin explosif improvisé embarqué sur véhicule (VBIED) ; l'explosion a projeté des éclats qui ont frappé et tué le commandant du 19e Bataillon (élément principal), 2 autres officiers, 22 soldats et 6 membres du CJTF, tandis que 2 officiers et 25 soldats ont subi des blessures de gravité variable. Ce revers a conduit le commandant du théâtre OPHK à interrompre la poursuite de l'opération, en raison de la distance entre la position de repli et la base principale de DAMBOA et des conditions du terrain, qui rendaient difficile l'évacuation des morts et des blessés vers les soins médicaux.",
        "De même, en 2026, les troupes de la Force d'intervention du Quartier général de l'Armée (AHQ), également connue sous le nom de Battle Group Mike (BG MIKE), ont lancé, dans le cadre de l'opération DESERT SANITY V, une offensive pour dégager le Triangle de Timbuktu en janvier 2026. Les troupes ont dégagé les principaux bastions terroristes, neutralisant plusieurs terroristes et récupérant des armes et munitions diverses. À la suite de l'allongement des lignes de communication, les troupes ont occupé une position de repli à GARDIRI et étaient ravitaillées par voie aérienne. Pendant qu'elles se trouvaient en position de repli, BG MIKE a été attaqué par Boko Haram au moyen de 2 VBIED, le 20 janvier 2026. Les troupes ont combattu vaillamment, neutralisant plusieurs assaillants et détruisant l'un des VBIED, tandis que le second engin a été déclenché au milieu des troupes. À la suite de cette explosion, 9 soldats et 3 membres de la Force civile mixte (CJTF) ont été tués, tandis que 2 officiers et 32 soldats ont été blessés. Toutefois, contrairement à la situation de 2025, l'Aviation de l'Armée nigériane (NA AVN), opérationnalisée en 2023, a déployé ses hélicoptères (HAWKEYE ONE et TWO) pour évacuer les morts et les blessés vers les Services médicaux et l'Hôpital de la 7e Division.",
        "La contribution de la NA AVN et des autres plateformes de la Force aérienne nigériane (NAF) dans le cadre de l'opération DESERT SANITY V a été inestimable pour le ravitaillement, l'évacuation des blessés, la fourniture de renseignement, de surveillance et de reconnaissance (ISR), ainsi que l'insertion des troupes dans le Triangle. L'introduction de ces multiplicateurs de force a constitué l'élément déterminant qui a permis à l'opération DESERT SANITY V d'atteindre ses objectifs dans le TRIANGLE DE TIMBUKTU, où toutes les enclaves ont été dégagées et toutes les structures de soutien à la vie des terroristes ont été détruites."
      ]
    },
    ar: {
      title: 'العمليات في مثلث تمبكتو',
      paragraphs: [
        "مثلث تمبكتو هو منطقة نائية وقليلة السكان تمتد عبر أجزاء من ولاية بورنو وولاية يوبي، ويغطي المثلث ممرات الطرق داماتورو–مايدوغوري، ومايدوغوري–بيو، وبيو–داماتورو. وتتميز المنطقة بكثافة الغطاء النباتي الشجيري، وشبكة طرق محدودة، وضعف حضور الدولة فيها. وتحظى المنطقة بأهمية استراتيجية كبيرة في عمليات مكافحة التمرد الجارية ضد إرهابيي بوكو حرام (BHT) وتنظيم داعش - ولاية غرب أفريقيا (ISWAP)، نظرًا لطبيعة تضاريسها وموقعها. فالتضاريس توفر الغطاء وتقيّد الحركة، مما يمنح الجماعات الإرهابية التي تستغل المنطقة ميزة ضد القوات. ومن الناحية العملياتية، توفر المنطقة عمقًا استراتيجيًا بالغ الأهمية وتعمل كممر للتنقل، يتيح للإرهابيين الانسحاب وإعادة التجمع وشن الهجمات مع الحفاظ على روابطهم بمواقع رئيسية مثل غابة سامبيسا وحوض بحيرة تشاد. وتعزز هذه الروابط حرية حركتهم وتدعم تنفيذ عمليات منسقة على جبهات متعددة. ونتيجة لذلك، يُستخدم المثلث كمنطقة انطلاق ينفذ منها الإرهابيون هجمات وكمائن ضد القوات، وغارات على المجتمعات المحلية والطرق الرئيسية، إضافة إلى تعطيل طرق الإمداد وخطوط الاتصال، يعقبها انسحاب سريع إلى الجيوب المحصّنة.",
        "تحمل السيطرة على مثلث تمبكتو أهمية عملياتية ونفسية في آنٍ واحد، إذ تعكس الهيمنة في مسرح عمليات شمال شرق نيجيريا، وتحرم المتمردين من قاعدة دعم ودعاية حيوية، وبذلك تعزز الثقة لدى السكان المحليين وقوات الأمن. وبناءً على ذلك، فإن التحييد الفعّال للمنطقة يتطلب عمليات برية وجوية متواصلة ومتكاملة، وإنشاء قواعد عمليات أمامية والحفاظ عليها، ودوريات مستمرة وتغطية استخباراتية ومراقبة واستطلاع، وتعزيزًا للتعاون المدني العسكري لتفكيك شبكات دعم المتمردين. وفي عام 2025، نفذت قوات عملية ديزرت سانيتي الرابعة هجومًا مقصودًا داخل المثلث. إذ تقدمت القوات المشتركة من الكتيبة CT 6/8 والكتيبة 199 للقوات الخاصة التابعة لقيادة العمليات على محور دامبوا–كافا داخل المثلث، وطهّرت عدة جيوب إرهابية، ثم شغلت لاحقًا موقع مرابطة مؤقتًا انطلقت منه العمليات إلى عمق المثلث. غير أنه في 24 يناير 2025، تعرضت القوات لهجوم في موقع المرابطة بواسطة عبوة ناسفة مفخخة محمولة على مركبة (VBIED)، وأسفر الانفجار عن شظايا متعددة أصابت وقتلت قائد الكتيبة 19 (الرئيسية)، وضابطَين آخرَين، و22 جنديًا، و6 من أفراد قوة العمل المشتركة المدنية (CJTF)، بينما أُصيب ضابطان و25 جنديًا بإصابات متفاوتة الشدة. وقد دفعت هذه النكسة قائد مسرح العمليات إلى وقف استمرار العملية نظرًا للمسافة بين موقع المرابطة والقاعدة الرئيسية في دامبوا، وصعوبة التضاريس التي جعلت إجلاء القتلى والجرحى لتلقي الرعاية الطبية أمرًا صعبًا.",
        "وبالمثل، في عام 2026، بدأت قوات فرقة التدخل التابعة لقيادة القوات (AHQ)، المعروفة باسم مجموعة القتال مايك (BG MIKE)، ضمن عملية ديزرت سانيتي الخامسة، هجومًا لتطهير مثلث تمبكتو في يناير 2026. وتمكنت القوات من تطهير معاقل إرهابية رئيسية، وتحييد عدد من الإرهابيين، واستعادة كميات متنوعة من الأسلحة والذخائر. وبسبب امتداد خطوط الاتصال، شغلت القوات موقع مرابطة في غارديري وكانت تُزوَّد بالإمدادات عن طريق الإنزال الجوي. وأثناء تواجدها في موقع المرابطة، تعرضت مجموعة BG MIKE لهجوم من بوكو حرام باستخدام عبوتين ناسفتين مفخختين محمولتين على مركبة (VBIED) في 20 يناير 2026. وقاتلت القوات ببسالة، وتمكنت من تحييد عدد من المهاجمين وتدمير إحدى العبوتين الناسفتين، بينما انفجرت العبوة الأخرى وسط صفوف القوات. ونتيجة لذلك الانفجار، استُشهد 9 جنود و3 من أفراد قوة العمل المشتركة المدنية (CJTF)، بينما أُصيب ضابطان و32 جنديًا. غير أنه، وخلافًا لما حدث في عام 2025، فقد نشر طيران الجيش النيجيري (NA AVN)، الذي دخل الخدمة الفعلية في عام 2023، طائراته المروحية (هوكآي 1 وهوكآي 2) لإجلاء القتلى والجرحى إلى الخدمات الطبية ومستشفى الفرقة السابعة.",
        "وكان إسهام طيران الجيش النيجيري والمنصات الأخرى التابعة للقوات الجوية النيجيرية (NAF) في عملية ديزرت سانيتي الخامسة لا يُقدَّر بثمن، سواء في الإمداد، أو إجلاء الجرحى، أو توفير الاستخبارات والمراقبة والاستطلاع، أو إنزال القوات داخل المثلث. وقد شكّل إدخال هذه العناصر المضاعِفة للقوة العامل الحاسم الذي ضمن تحقيق عملية ديزرت سانيتي الخامسة لأهدافها في مثلث تمبكتو، حيث تم تطهير جميع الجيوب وتدمير جميع منشآت الدعم الحيوي للإرهابيين."
      ]
    }
  },

  // Per-language, per-paragraph narration audio. Files don't exist yet —
  // drop mp3s in assets/audio/<lang>/about-p1.mp3 .. about-p4.mp3 and the
  // player will pick them up automatically. Missing files fail gracefully.
  audio: {
    en: ['assets/audio/en/about-p1.mp3', 'assets/audio/en/about-p2.mp3', 'assets/audio/en/about-p3.mp3', 'assets/audio/en/about-p4.mp3'],
    fr: ['assets/audio/fr/about-p1.mp3', 'assets/audio/fr/about-p2.mp3', 'assets/audio/fr/about-p3.mp3', 'assets/audio/fr/about-p4.mp3'],
    ar: ['assets/audio/ar/about-p1.mp3', 'assets/audio/ar/about-p2.mp3', 'assets/audio/ar/about-p3.mp3', 'assets/audio/ar/about-p4.mp3']
  },

  // Spoken greeting, played once right after a visitor taps a language card.
  welcome: {
    en: "Welcome to the Timbuktu Triangle exhibit. Here you'll learn how the Nigerian Army fought to clear this ground of Boko Haram and ISWAP — and honour the soldiers who gave their lives doing it. Explore at your own pace: touch any section to begin.",
    fr: "Bienvenue à l'exposition du Triangle de Timbuktu. Vous découvrirez ici comment l'Armée nigériane a combattu pour libérer ce territoire de Boko Haram et de l'ISWAP, et rendrez hommage aux soldats qui y ont donné leur vie. Explorez à votre rythme : touchez n'importe quelle section pour commencer.",
    ar: "مرحبًا بك في معرض مثلث تمبكتو. ستتعرف هنا على كيفية قتال الجيش النيجيري لتطهير هذه المنطقة من بوكو حرام وتنظيم داعش في غرب أفريقيا، وتكريم الجنود الذين ضحوا بأرواحهم في سبيل ذلك. استكشف بالوتيرة التي تناسبك: المس أي قسم للبدء."
  },
  welcomeAudio: {
    en: 'assets/audio/en/welcome.mp3',
    fr: 'assets/audio/fr/welcome.mp3',
    ar: 'assets/audio/ar/welcome.mp3'
  },

  videos: [
    { minutes: 5, file: 'assets/videos/EDITED 5 MINUTES DOCU.mp4' },
    { minutes: 10, file: 'assets/videos/EDITED 10 MINUTES DOCU.mp4' },
    { minutes: 13, file: 'assets/videos/EDITED 13 MINUTES DOCU.mp4' },
    { minutes: 15, file: 'assets/videos/EDITED 15 MINUTES DOCU.mp4' },
    { minutes: 19, file: 'assets/videos/EDITED 19 MINUTES DOCU.mp4' }
  ],

  videoTags: {
    en: { 5: 'Quick Overview', 10: 'Short Cut', 13: 'Extended Cut', 15: 'In-Depth', 19: 'Full Documentary' },
    fr: { 5: 'Aperçu rapide', 10: 'Version courte', 13: 'Version longue', 15: 'Version approfondie', 19: 'Documentaire complet' },
    ar: { 5: 'نظرة سريعة', 10: 'نسخة قصيرة', 13: 'نسخة موسعة', 15: 'نسخة متعمقة', 19: 'الفيلم الوثائقي الكامل' }
  }
};
