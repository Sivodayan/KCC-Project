import React from 'react';

export default function HistoryTimeline({ lang = 'en' }) {
  if (lang === 'ta') {
    return (
      <article className="space-y-14 font-tamil fade-content">
        {/* Header Banner */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-forest tracking-tight leading-snug">
            CMS ஆங்கிலப் பாடசாலையும் இன்றைய கிறிஸ்தவ கல்லூரியும்
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            ஆசிரியர்கள்:{' '}
            <span className="text-slate-900 font-bold">வண. J. S. இரத்தினாதிக்கா</span> &amp;{' '}
            <span className="text-slate-900 font-bold">வண. A. M. நத்தானியல்</span>
          </p>
        </header>

        {/* Timeline Section (Tamil: 12 Distinct Milestones) */}
        <div className="relative border-l-2 border-brand-pale ml-4 sm:ml-32 space-y-12">
          {/* Section 1 (Ta) -> his1.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              1849–1850
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                1849–1850
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                பெண்களுக்கான ஆங்கிலப் பாடசாலை தோற்றம்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    இப்பாடசாலை முதன் முதலில் 1850ல் திருமதி பிறென் அவர்களால் பெண்களுக்கென ஆரம்பிக்கப்பட்டது என அறியக்
                    கிடக்கிறது. இலங்கை மத்திய குழுச் செயலாளரின் 1850ம் ஆண்டு வருகைக் குறிப்பில் பின்வருமாறு
                    குறிக்கப்பட்டுள்ளது:
                  </p>
                  <blockquote className="border-l-4 border-brand-forest bg-brand-light/70 rounded-r-2xl p-4 italic text-slate-900 text-xs sm:text-sm">
                    “இப்பொழுது இந்த நிலையத்திலுள்ள மிஷனறி Rev. Robert Bren அவர்களின் துணைவியார் திருமதி பிறென்
                    அவர்களுடன் 1849ம் ஆண்டு, நவம்பர் மாதம் இங்கு வருகை தந்தனர். தற்பொழுது ஒரு தேவாலயமும், குருமனை
                    ஒன்றும் கட்டப்பட்டுக் கொண்டிருக்கிறது. இங்கு திருமதி பிறென் அவர்களால் ஆரம்பிக்கப்பட்டு நடைபெற்றுக்
                    கொண்டிருக்கும் பெண்களுக்கான ஆங்கிலப் பாடசாலை ஒன்று தொடர்பாகக் குறிப்பிட விரும்புகிறேன். இங்கு 36
                    பெண்கள் படித்துக் கொண்டிருக்கிறார்கள். நான் இப்பிரதேசத்திலுள்ள தமிழ், ஆங்கிலப் பாடசாலைகளை 27ம் திகதி
                    வெள்ளிக்கிழமை பரிசோதித்தேன். தமிழ்ப் பாடசாலைகளைவிட, ஆங்கிலப் பாடசாலைகள் மேலோங்கினவாக உள்ளன.”
                  </blockquote>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his1.jpg"
                    alt="வரலாற்றுப் பின்னணி"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 (Ta) -> his2.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              1852–1928
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                1852–1928
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                CMS பொறுப்பேற்பும் பரி. யோவான் முகாமைத்துவமும்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his2.jpg"
                    alt="CMS கட்டமைப்பு"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    இதுவரை தேவாலய வளாகத்தில் இயங்கிய இப்பாடசாலை 1852ல் CMS மிஷனறிமாரால் பொறுப்பேற்கப்பட்டுப் புதிய
                    கட்டிடத்தில் இயங்கத் தொடங்கியது. ஆண்களைப் பெரும்பான்மையினராகக் கொண்ட இப்பாடசாலை, கோப்பாய்ப்
                    பிரதேசத்தில் ஆங்கிலமொழி மூலம் கல்வி வழங்கும் நிறுவனமாகப் பரிணமித்தது. 1899ம் ஆண்டுவரை தேவாலயக்
                    குருவானவரின் மேற்பார்வையின் கீழே தனித்துவமாக இயங்கிய இப்பாடசாலை பரி. யோவான் கல்லூரி முகாமைத்துவ
                    சபையின் பரிபாலனத்தின் கீழே கொண்டுவரப்பட்டு, அச்சபையினாலே நிர்வகிக்கப்பட்டு வந்தது. E.S.L.C வரை
                    வகுப்புகள் நடத்தப்பட்டு வந்தன. 1928க்குப் பின்னர், தரம் IIIக்கு மேலே 4-5 வரை பெண்கள்
                    அனுமதிக்கப்பட்டனர்.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 (Ta) -> his3.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              1939–1945
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                1939–1945
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                கோப்பாய் கிறிஸ்தவ கல்லூரி என்று பெயர் மாற்றம்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    1939ல் அமரர் G. S. செல்லையா அவர்கள் தலைமை ஆசிரியராகப் பொறுப்பேற்ற பின்னர் வகுப்புகள் படிப்படியாக
                    அதிகரிக்கப்பட்டு 1940ல் இருந்து S.S.C பரீட்சைக்குத் தோற்ற மாணவர் அனுமதிக்கப்பட்டனர். 1945ல் ஒரே
                    வளாகத்தில் இயங்கிய பெண்கள் விடுதிப் பாடசாலையுடன் ஒன்றிணைக்கப்பட்டு கோப்பாய் கிறிஸ்தவ கல்லூரி என்று
                    பெயர் மாற்றம் பெற்று இயங்கத் தொடங்கியது. திரு. G. S. செல்லையா அதிபராகவும் செல்வி M. V. ஹட்சின்ஸ் உப
                    அதிபராகவும் பணியாற்றலாயினர். ஆண்களுக்கான விடுதிகள் ஆரம்ப காலத்தில் பாடசாலைக்கு வெளியே
                    அமைக்கப்பட்டபோதும் காலப்போக்கில் வேட்ஸ்வேத் மண்டபத்தில் அவை அமைக்கப்பட்டன.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his3.jpg"
                    alt="150ஆவது ஆண்டு விழாச்சபை மற்றும் பழைய மாணவர் சங்கம்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 (Ta) -> his4.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              நிதி &amp; பாரம்பரியம்
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                பாரம்பரியம்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                ஆண்டுச் சந்தையும் (Sale) ஆரம்ப விளையாட்டுக்களும்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his4.jpg"
                    alt="கைத்தொழில் மற்றும் சந்தை"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    இப்பாடசாலை அரசு மானிய உதவி, மாணவர்களிடம் பெறப்பட்ட கட்டணம் மற்றும் நிகழ்ச்சிகளில் சேகரிக்கப்பட்ட
                    நிதி என்பவற்றைக் கொண்டு செயற்பட்டு வந்தது. ஆண்டு தோறும் நடத்தப்பட்ட “சந்தை”யில் (Sale) மாணவர்கள்
                    கொண்டுவரும் உற்பத்திகள், கைத்தொழிற் பாடசாலையில் உற்பத்தி செய்யப்பட்ட பொருட்கள் என்பன விற்பனை
                    செய்யப்பட்டு, இவற்றின் மூலம் பெறப்படும் நிதியும் பாடசாலைச் செயற்பாடுகளுக்கே பயன்படுத்தப்பட்டது. இவர்
                    காலத்தில் விளையாட்டுத் துறையைப் பொறுத்தவரை காற்பந்தாட்டமும் வலைப்பந்தாட்டமுமே காணப்பட்டன. மாணவர்கள்
                    இல்லங்களாகப் பிரிக்கப்பட்டபோதும், மைதான வசதியின்மையால் பெரிய அளவிலான விளையாட்டுப் போட்டிகள்
                    நடைபெற்றதாக அறியப்படவில்லை. சிறுவருக்கான விளையாட்டுக்கள் மாத்திரமே இடம் பெற்று வந்துள்ளன.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 (Ta) -> his5.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              இராஜசேகரம்
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                அதிபர் இராஜசேகரம்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                “மைல்றேஸ்”, சீருடை &amp; மனையியற்கூடம்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    அமரர் A. W. இராஜசேகரம் அதிபர் காலத்தில், தற்பொழுது கோப்பாய் அரசினர் வைத்தியசாலை அமைந்துள்ள
                    இடத்துக்கு அண்மையில் ஒரு காணி குத்தகைக்குப் பெறப்பட்டு, அதிலே விளையாட்டுப் போட்டிகள் நடாத்தப்பட்டன.
                    இப்போட்டிகளின் பிரதான அம்சமாக “மைல்றேஸ்” இடம்பெற்று வந்ததெனவும், வருடாந்தம் அதில் வெற்றி பெறுபவர்
                    “மைலர்” என்று அழைக்கப்பட்டு வந்தார் எனவும் கூறப்படுகிறது. மாணவர் சீருடை அணியும் வழக்கம்
                    ஏற்படுத்தப்பட்டிருந்தது. இதற்கமையச் சிறுவர்கள் காற்சட்டை ஷேர்ட்டும், வயது வந்த ஆண்கள் வேட்டி
                    ஷேர்ட்டும், பெண்பிள்ளைகள் சிறுமிகள் சட்டையும், வயது வந்த பெண்கள் சேலை, சட்டையும் அணிந்தனர். இந்த
                    அதிபரின் காலத்திலேயே தற்போதுள்ள மனையியற்கூடம் அமைக்கப்பட்டது.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his5.jpg"
                    alt="சீருடை மற்றும் போட்டிகள்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 (Ta) -> his6.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              நவரத்தினராஜா
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                அதிபர் நவரத்தினராஜா
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                அனைத்துத் துறை விஸ்தரிப்பும் தேசிய மட்டமும்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his6.jpg"
                    alt="பாக்கியம் வில்லியம்ஸ் கட்டிடம் மற்றும் விளையாட்டு"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    அமரர், E. C. A. நவரத்தினராஜா அதிபர் பாடசாலையைப் பொறுப்பேற்று நடாத்தி வந்த காலத்தில் அனைத்துத்
                    துறைகளிலும் பாடசாலை அபிவிருத்தியடைந்தது. ஆசிரியர் தங்கும் அறையாகிய “பாக்கியம் வில்லியம்ஸ் கட்டிடம்,
                    ஹட்சின்ஸ் மண்டபம்” ஆகியவை அமைக்கப்பட்டன. பாடசாலையின் விளையாட்டு மைதானம் விஸ்தரிக்கப்பட்டு அதில்
                    விளையாட்டுப் போட்டிகள் நடாத்தப்படலாயின. ஹொக்கி, கூடைப்பந்து, உதைபந்து முதலிய விளையாட்டுக்கள் இங்கு
                    அறிமுகப்படுத்தப்பட்டன. ஹொக்கி, கூடைப்பந்து, காற்பந்து, வலைப்பந்து ஆகிய விளையாட்டுக் குழுக்கள், தேசிய
                    மட்ட நிகழ்வுகளில் பங்கு கொள்ளக் கூடிய அளவுக்கு முன்னேற்றம் பெற்று விளங்கின.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 (Ta) -> his7.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              சண்முகநாதன்
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                அதிபர் சண்முகநாதன்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                சண்முகநாதன் மண்டபம் &amp; கூட்டுறவுச் சங்கங்கள்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    அமரர் E. K. சண்முகநாதன் அதிபரின் காலப்பகுதியில் வடக்குப்பக்கமாக அமைந்திருந்த பாதை மூடப்பட்டது.
                    தற்போது சண்முகநாதன் மண்டபம் எனப்பெயரிடப்பட்டுள்ள தெற்குப்புற மண்டபம் அமைக்கப்பட்டது. ஆசிரியர்
                    அறைக்கு இணைந்த மலசலகூடம் அமைக்கப்பட்டது. மாணவர் கூட்டுறவுச் சங்கம், ஆசிரியர் சிக்கனக் கூட்டுறவுச்
                    சங்கம் “நவரத்தினராஜா ஞாபகார்த்த நிதியம்” என்பவை ஆரம்பிக்கப்பட்டன.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his7.jpg"
                    alt="சண்முகநாதன் மண்டபம் மற்றும் சங்கங்கள்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 (Ta) -> his8.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              கந்தசாமி &amp; சிவநேசன்
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                விஞ்ஞானகூடங்கள் &amp; மண்டபங்கள்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                செல்லையா மண்டபம் &amp; 125ஆவது ஆண்டு நினைவு மண்டபம்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his8.jpg"
                    alt="125ஆவது நினைவு மண்டபம் மற்றும் ஆய்வுகூடங்கள்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    திரு. S. கந்தசாமி அதிபர் காலத்தில் செல்லையா மண்டபம் அமைக்கப்பட்டதுடன் நவரத்தினராஜா மண்டபத்தின்
                    கீழ்த்தள வேலைகளும் மேற்கொள்ளப்பட்டன. இது விஞ்ஞானகூட வசதிகளை அதிகரித்தது. திரு. சி. சிவநேசன் அதிபர்
                    காலப்பகுதியில் நவரத்தினராஜா மண்டப மேற்தள வேலைகள், அத்துடன் இணைந்த மலசலகூட வேலைகள், 125ஆவது நினைவு
                    மண்டப அமைப்பு, தேவாலய எல்லை மதில் அமைப்பு ஆகிய வேலைகளும், சண்முகநாதன் மண்டபத்தில் மேலதிகமாக இரண்டு
                    வகுப்பறைகளும் அமைக்கும் பணிகள் இடம்பெற்றன.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9 (Ta) -> his9.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              மறுசீரமைப்பு
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                கல்விக் கொள்கை மாற்றம்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                ஆரம்பப்பிரிவு நீக்கமும் முறைசாராக் கல்வியும்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    ஆரம்பகாலம் தொடக்கம் இப்பாடசாலையில் அமைந்திருந்த ஆரம்பப்பிரிவு வகுப்புகள் அக்கால அரசாங்கக் கொள்கைக்கு
                    அமைய வருடாந்தம் ஒவ்வொரு வகுப்பாகப் படிப்படியாக நீக்கப்பட்டன. திரு. கந்தசாமி அதிபர் காலத்தில்
                    ஆரம்பமான இச்செயற்பாடு திரு. சிவநேசன் காலத்தில் முடிவுற்றது. திரு. சிவநேசன் அவர்கள் மீண்டும் அந்த
                    வகுப்புகளை ஏற்படுத்த முயன்றபோதும் திணைக்களம் அனுமதிக்கவில்லை. எனவே இங்கு கற்பவருக்கான
                    அத்திவாரக்கல்வி இங்கேயே அமைவதில்லை.
                  </p>
                  <p>
                    அமரர் திரு. S. செல்வரத்தினம் அதிபர் காலத்தில் முன்னைய அதிபரால் ஆரம்பிக்கப்பட்ட சில கட்டிட வேலைகள்
                    பூரணப்படுத்தப்பட்டதுடன், முறைசாராக் கல்விக்கான கட்டிடப் பகுதி அமைக்கும் வேலைகளும் ஆரம்பிக்கப்பட்டன.
                    திருமதி P. அருள்ராஜா அவர்கள் காலத்தில் அவை பூரணப்படுத்தப்பட்டன.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his9.jpg"
                    alt="பாடசாலை மறுசீரமைப்பு"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 10 (Ta) -> his10.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              சவால்கள் &amp; மீட்சி
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                இடப்பெயர்வும் புனரமைப்பும்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                உ/த வர்த்தகம், ADB செயற்திட்டம் &amp; வைப்புக்கள்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his10.jpg"
                    alt="புனரமைப்பு மற்றும் கட்டிடங்கள்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    திரு. P. K. இராஜரத்தினம் அதிபர் காலத்தில் க.பொ.த. (உ/த) வர்த்தகப் பிரிவு வகுப்புகள்
                    ஆரம்பிக்கப்பட்டன. இந்திய இராணுவ நடவடிக்கை காரணமாகப் பாடசாலைச் சொத்துக்கள் களவு போயின. மூன்றாம் காலப்
                    பகுதியில் பாடசாலை மூடப்பட்டுத் தற்காலிகமாக யா/ கோப்பாய் நாவலர் வித்தியாலயத்தில் இயங்கியது. ஆசிய
                    அபிவிருத்தி வங்கியின் உதவியுடன் 10 வகுப்பறைகளுக்கான கட்டிடத்தொகுதி ஒன்றும், நீர்த்தாங்கி ஒன்றும்
                    அமைக்கும் பணிகள் ஆரம்பிக்கப்பட்டன.
                  </p>
                  <p>
                    திரு. T. முத்துக்குமாரசுவாமி அதிபர் காலத்தில் அலுவலகம் பாக்கியம் வில்லியம்ஸ் கட்டிடத்துக்கு
                    மாற்றப்பட்டது. குழாய்க்கிணறு ஒன்று அமைக்கப்பட்டது. பாடசாலை எல்லைகள் பாதுகாப்பான முறையில் பேணப்பட்டன.
                    பழைய கட்டிடங்கள் இடித்து அழிக்கப்பட்டன. அவற்றின் உதவியுடன் தற்காலிக வகுப்பறைகள், சைக்கிள் கொட்டகை
                    ஆகியவை அமைக்கப்பட்டன. பாடசாலை உட்புற வீதி செப்பனிடப்பட்டது. பாடசாலைச் செயற்பாடுகளுக்கு உதவும்
                    வகையில் வங்கிகளில் நிரந்தர வைப்புக் கணக்குகள் பல ஆரம்பிக்கப்பட்டன. பழைய மாணவர் சங்கம், பாடசாலை
                    அபிவிருத்திச் சங்கம், தமிழ்ச் சங்கம் ஆகியவற்றுக்கு ஊடாகவே இக்கணக்கு வைப்புகள் பேணப்படலாயின.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 11 (Ta) -> his11.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              சிவகடாட்சம்
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                நவீன கட்டமைப்பு
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                புதிய மண்டபங்கள், மைதானங்கள் &amp; கல்வி அபிவிருத்தி
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    இன்றைய அதிபர் திரு. ந. சிவகடாட்சம் அவர்களின் காலத்தில் கார்த்திகேசன் மண்டபம், இராஜசேகரம் மண்டபம்,
                    சிவசுப்பிரமணியம் மண்டபம் ஆகியவையும், இந்து, கிறிஸ்தவ பிரார்த்தனை மண்டபங்கள், கூடைப்பந்து,
                    வலைப்பந்து, காற்பந்தாட்ட மைதானங்கள் என்பவையும் புதிதாக அமைக்கப்பட்டன. புதிதாக மலசலகூடங்கள்
                    அமைக்கப்பட்டன. 125ம் ஆண்டு நினைவு மண்டபம், நவரத்தினராஜா மண்டபம், தண்ணீர்த் தாங்கி என்பவை
                    திருத்தப்பட்டு பல அபிவிருத்திப் பணிகள் மேற்கொள்ளப்பட்டுள்ளன.
                  </p>
                  <p>
                    கல்வி அபிவிருத்திப் பணிகளும் குறிப்பிடத்தக்கவையாக உள்ளன. அமரர் E. C. A. நவரத்தினராஜா அதிபர்
                    காலத்தில் தொடங்கிய பல்கலைக் கழகப் பிரவேசம் தொடர்ந்து வளர்ந்து வருகின்றது. இன்று பேராதனை, மொறட்டுவ
                    பல்கலைக்கழகங்களுக்குப் பொறியியல் பிரிவு மாணவர்கள் அனுமதிக்கப்பட்டுள்ளனர். யாழ்ப்பாணப்
                    பல்கலைக்கழகத்தில் மருத்துவம், முகாமைத்துவம், வணிகம், விஞ்ஞானம், கலை ஆகிய பிரிவுகளுக்கும், நுண்கலைக்
                    கல்லூரியில் சங்கீதம், நடனம் ஆகிய பிரிவுகளுக்கும் எமது மாணவர் அனுமதி பெற்றுப் படித்து வருவது
                    கல்லூரிக்குப் பெருமை சேர்ப்பதாக உள்ளது.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his11.jpg"
                    alt="பல்கலைக்கழக சாதனையாளர்கள் மற்றும் மண்டபங்கள்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 12 (Ta) -> his12.jpg */}
          <div className="relative pl-6 sm:pl-10 group">
            <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
            <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
              150ஆவது ஆண்டு
            </span>

            <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
              <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
                150ஆவது ஆண்டு மைல்கல்
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
                விளையாட்டுத் துறையும் 150ஆவது ஆண்டு நிறைவும்
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                  <img
                    src="assets/his12.jpg"
                    alt="150ஆவது ஆண்டு விழாச்சபை மற்றும் பழைய மாணவர் சங்கம்"
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-slate-800 text-sm sm:text-base leading-loose">
                  <p>
                    விளையாட்டுத்துறையும் நன்கு அபிவிருத்தி பெற்று வருகின்றது. எமது மாணவர்கள் தேசிய மட்டப் போட்டிகளில்
                    பங்கேற்கும் தகைமை பெற்றமை சிறப்பாகக் குறிப்பிடத்தக்கதாகும். தற்காலிக வகுப்பறைக் கட்டிடங்களும்,
                    பற்றாக்குறையான தளபாடங்களும் மாணவரின் கற்றல், செயற்பாடுகளுக்குச் சாதகமாயில்லாத சூழ்நிலையிலும் கூட,
                    அதிபர் ஆசிரியர்களின் ஊக்குவிப்புகளும் மாணவர் ஆர்வமும் கல்லூரியை முன்னேற்றி வருகின்றன.
                  </p>
                  <p>
                    அரச, அரச சார்பற்ற நிறுவனங்கள், பழைய மாணவர் சங்கமும் அதன் கொழும்பு மற்றும் வெளிநாட்டுக் கிளைகள்
                    ஆகியவையும், பாடசாலை அபிவிருத்திச் சங்கம் என்பனவும் மற்றும் நலன்விரும்பிகளும் பெரிதும் உதவியதால்
                    இன்று கட்டிடப் பற்றாக்குறையும், தளபாடப் பற்றாக்குறையும் ஓரளவு நிவர்த்தி பெற்று வருதல்
                    மகிழ்ச்சிக்குரியது. கல்லூரியின் வளர்ச்சிப் பாதையில் 150ஆவது ஆண்டு முக்கியமானதொரு மைல் கல் எனக்
                    குறிப்பிடலாம்.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="space-y-14 fade-content">
      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-forest tracking-tight leading-tight">
          CMS English School &amp; Today’s Christian College
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Compiled by: <span className="text-slate-800 font-bold">Rev. J. S. Ratnathikkam</span> &amp;{' '}
          <span className="text-slate-800 font-bold">Rev. A. M. Nathaniel</span>
        </p>
      </header>

      {/* Timeline Section */}
      <div className="relative border-l-2 border-brand-pale ml-4 sm:ml-32 space-y-12">
        {/* Section 1 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            1849–1850
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              1849–1850
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">Founding of the Girls' School</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  It is documented that this institution was initially founded in 1850 for girls by Mrs. Bren. In the
                  1850 official visit report by the Secretary of the Ceylon Central Committee, it was observed:
                </p>
                <blockquote className="border-l-4 border-brand-forest bg-brand-light/70 rounded-r-2xl p-4 italic text-slate-800 text-xs sm:text-sm">
                  “The missionary currently at this station, Rev. Robert Bren, arrived here with his wife, Mrs. Bren,
                  in November 1849. At present, a church and a parsonage are under construction. I wish to mention an
                  English school for girls that has been established and is being conducted here by Mrs. Bren.
                  Thirty-six girls are studying here. On Friday the 27th, I inspected both the Tamil and English
                  schools in this region. The English schools stand out far superior compared to the Tamil schools.”
                </blockquote>
              </div>
              <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his1.jpg"
                  alt="Historical archival photograph 1"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            1852–1928
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              1852–1928
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
              CMS Takeover &amp; St. John's Management Board
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his2.jpg"
                  alt="Historical archival photograph 2"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  This school, which had been functioning within the church premises until then, was taken over by CMS
                  missionaries in 1852 and commenced operations in a newly constructed building. With male students
                  constituting the majority, it evolved into an institution providing secondary education in the
                  English medium across the Kopay region. Operating independently under the supervision of the local
                  church priest until 1899, it was subsequently brought under the governance and administration of the
                  St. John’s College Management Board. Classes were conducted up to the E.S.L.C. level. After 1928,
                  female students were admitted beyond Grade III into Grades 4 and 5.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            1939–1945
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              1939–1945
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">Kopay Christian College Renaming</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  In 1939, following the assumption of headmastership by the late Mr. G. S. Chelliah, classes were
                  expanded systematically, and beginning in 1940, candidates were prepared and presented for the
                  S.S.C. examinations. In 1945, by amalgamating with the girls’ boarding school functioning within the
                  shared campus, the school was renamed Kopay Christian College. Mr. G. S. Chelliah served as
                  Principal, while Miss M. V. Hutchins served as Vice Principal. While student boarding facilities
                  were initially situated outside the premises, they were later housed within Wordsworth Hall.
                </p>
              </div>
              <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his3.jpg"
                  alt="Historical archival photograph 3"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Traditions
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Institutional Traditions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">The Annual "Sale" &amp; Early Athletics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his4.jpg"
                  alt="Historical archival photograph 4"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  The college functioned through government grant-in-aid, student term fees, and community fundraising
                  initiatives. The annual "Sale" (fair) served as a key institutional tradition where agricultural
                  produce brought by students and artisanal goods crafted in the industrial vocational school were
                  sold to finance development activities. During this period, sports were primarily confined to
                  football and netball. Although students were organized into houses, inter-school athletics meets
                  were hindered by limited ground acreage, with activities largely focused on junior games.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Rajasekaram
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Mr. A. W. Rajasekaram
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">The "Mile Race" &amp; Formal Uniforms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  During the administration of Principal Mr. A. W. Rajasekaram, land adjacent to the present Kopay
                  Government Hospital was leased to organize annual sports meets. The "Mile Race" emerged as the
                  premier track event, with the victor traditionally celebrated as the “Miler.” School uniforms were
                  formalized: junior boys wore shorts and shirts; senior male students wore verti and shirts; junior
                  girls wore frocks; and senior female students wore sarees with blouses. The Home Economics
                  laboratory was established during this era.
                </p>
              </div>
              <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his5.jpg"
                  alt="Historical archival photograph 5"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Navaratnarajah
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Mr. E. C. A. Navaratnarajah
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
              Multi-Disciplinary Growth &amp; Campus Grounds
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his6.jpg"
                  alt="Historical archival photograph 6"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Under the leadership of Principal Mr. E. C. A. Navaratnarajah, the institution witnessed rapid
                  multi-disciplinary expansion. Staff residential quarters, designated the “Pakkiyam Williams
                  Building,” and “Hutchins Hall” were erected. The sports grounds were expanded, enabling full-scale
                  athletic meets on campus. Sports such as hockey, basketball, and football were introduced, with
                  teams qualifying for national-level tournaments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Expansion
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Structural Growth
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">Halls, Laboratories &amp; Jubilees</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  During Principal Mr. E. K. Shanmuganathan’s tenure, the road traversing the northern boundary was
                  closed. The southern pavilion, later named Shanmuganathan Hall, and adjoining staff sanitary
                  facilities were erected. The Student Cooperative Society, Teachers' Thrift &amp; Credit Society,
                  and the Navaratnarajah Memorial Fund were established.
                </p>
                <p>
                  Under Principal Mr. S. Kandasamy, Chelliah Hall was built alongside the ground floor of
                  Navaratnarajah Hall, significantly upgrading science laboratories. Principal Mr. C. Sivanesan
                  completed the upper floor of Navaratnarajah Hall with modern sanitation facilities, erected the
                  125th Jubilee Memorial Hall, constructed the church boundary wall, and added two classrooms to
                  Shanmuganathan Hall.
                </p>
              </div>
              <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his7.jpg"
                  alt="Historical archival photograph 7"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 8 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Policy Shift
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Institutional Focus
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
              Phase-Out of Primary Grades &amp; Non-Formal Education
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his8.jpg"
                  alt="Historical archival photograph 8"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  In accordance with educational policy changes by the central government, primary grades were
                  phased out systematically. Commencing during Mr. Kandasamy’s administration, the phase-out was
                  completed under Mr. Sivanesan. Despite appeals by the administration, the Department of Education
                  declined permission to reinstate the elementary grades, establishing the college as a dedicated
                  secondary and collegiate institution.
                </p>
                <p>
                  During the tenure of Mr. S. Selvaratnam, infrastructure projects initiated by prior administrations
                  were completed, and construction began on the Non-Formal Education complex, which was brought to
                  completion under Mrs. P. Arulraja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Rebuilding
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Challenges &amp; Rebuilding
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
              Commerce Streams, ADB Support &amp; Alumni Foundations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Under Principal Mr. P. K. Rajarathinam, G.C.E. Advanced Level Commerce streams were introduced.
                  Following regional conflict and IPKF military operations, institutional assets suffered disruptions,
                  necessitating temporary relocation to J/Kopay Navalar Vidyalayam during the third term. With funding
                  from the Asian Development Bank (ADB), construction commenced on a 10-classroom academic block and a
                  dedicated overhead water reservoir.
                </p>
                <p>
                  During Principal Mr. T. Muthukkumaraswamy’s administration, the office was relocated to the
                  Pakkiyam Williams Building. A tube well was sunk, boundary walls were fortified, and dilapidated older
                  structures were repurposed into auxiliary classrooms and bicycle bays. Internal roads were paved,
                  and endowment funds were founded with support from the Old Boys' Association (Colombo and overseas
                  branches), the School Development Society, and the Tamil Literary Association.
                </p>
              </div>
              <div className="lg:col-span-5 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his9.jpg"
                  alt="Historical archival photograph 9"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 10 */}
        <div className="relative pl-6 sm:pl-10 group">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-forest border-4 border-brand-white group-hover:scale-125 transition-transform duration-200" />
          <span className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-extrabold text-brand-forest text-sm">
            Present Day
          </span>

          <div className="bg-brand-white rounded-3xl border border-brand-pale p-6 sm:p-8 shadow-sm space-y-6">
            <span className="sm:hidden inline-block px-3 py-1 bg-brand-light text-brand-forest rounded-full text-xs font-extrabold mb-2">
              Modern Era
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-forest">
              Campus Renaissance &amp; University Entrants
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 border border-brand-pale/70 rounded-2xl p-2.5 shadow-sm">
                <img
                  src="assets/his10.jpg"
                  alt="Historical archival photograph 10"
                  className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Under Principal Mr. N. Sivakadadcham, the Karthigesan Hall, Rajasekaram Hall, Sivasubramaniam Hall,
                  multi-faith Hindu and Christian prayer sanctuaries, and regulation courts for basketball, netball,
                  and football were established. Major refurbishments were completed on the 125th Jubilee Memorial
                  Hall, Navaratnarajah Hall, and the central water storage facilities.
                </p>
                <p>
                  Academic advancement has seen students secure admissions into engineering faculties at the
                  University of Peradeniya and University of Moratuwa. The college routinely places candidates into
                  faculties of Medicine, Management, Science, Arts, and Fine Arts at the University of Jaffna and the
                  Ramanathan Academy of Fine Arts, fulfilling its historic mission as a flagship educational
                  institution of the Jaffna peninsula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
