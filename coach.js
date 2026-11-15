(function () {
  'use strict';

  /* ================= data ================= */
  var LV = [
    { c: 'A1', ar: 'مبتدئ', course: 'Beginner' },
    { c: 'A2', ar: 'أساسي', course: 'Beginner' },
    { c: 'B1', ar: 'متوسط', course: 'Intermediate' },
    { c: 'B2', ar: 'فوق المتوسط', course: 'Intermediate' },
    { c: 'C1', ar: 'متقدّم', course: 'Conversation' },
    { c: 'C2', ar: 'متمكّن', course: 'Conversation' }
  ];
  var GOALS = [
    { k: 'job', ar: 'مقابلة شغل', sit: 'مواقف المقابلات' },
    { k: 'call', ar: 'كول سنتر / خدمة عملاء', sit: 'مواقف خدمة العملاء' },
    { k: 'chat', ar: 'محادثة يومية وسفر', sit: 'مواقف الحياة اليومية' },
    { k: 'study', ar: 'دراسة وامتحانات', sit: 'إنجليزي الدراسة' },
    { k: 'any', ar: 'مش متأكد، عايز أتكلم وخلاص', sit: 'مواقف عامة' }
  ];
  var CATS = { grammar: 'القواعد', vocab: 'المفردات', reading: 'الفهم والقراءة', sit: 'المواقف العملية' };
  var N = 10;

  var SURVEY = [
    { q: 'لما حد بيكلمك إنجليزي، بتفهمه إزاي؟', o: ['مش بفهم تقريبًا حاجة', 'بفهم كلمات بسيطة لو بيتكلم ببطء', 'بفهم أغلب الكلام لو واضح وبطيء', 'بفهم عادي حتى لو بيتكلم بسرعة', 'بفهم كل حاجة حتى اللهجات والأفلام'] },
    { q: 'تقدر تعرّف بنفسك وتتكلم عن يومك بالإنجليزي؟', o: ['لأ، مش قادر', 'جمل قصيرة جدًا', 'أقدر بس بغلط كتير', 'أقدر بشكل كويس', 'بتكلم بسهولة وبشرح أفكاري بتفصيل'] },
    { q: 'آخر مرة كتبت فيها رسالة أو إيميل بالإنجليزي؟', o: ['عمري ما كتبت', 'جمل بسيطة بمساعدة', 'رسالة قصيرة لوحدي', 'إيميلات شغل أو دراسة', 'بكتب مواضيع وتقارير بانتظام'] },
    { q: 'بتتفرج على أفلام أو مسلسلات إزاي؟', o: ['لازم ترجمة عربي', 'ترجمة عربي وبلقط كلمات', 'ترجمة إنجليزي', 'من غير ترجمة وبفهم الفكرة', 'من غير ترجمة وبفهم التفاصيل والنكت'] },
    { q: 'مفرداتك الإنجليزي عاملة إزاي؟', o: ['كلمات قليلة جدًا', 'كلمات الحياة الأساسية', 'كفاية للمواضيع اليومية', 'واسعة وبعبّر عن رأيي', 'واسعة جدًا وبفرّق بين المعاني الدقيقة'] }
  ];

  /* question helper: first option after the stem is the correct one (shuffled when shown) */
  var BANK = [], uid = 0;
  function B(lv, cat, goal, q, a, w1, w2, w3) { BANK.push({ id: ++uid, lv: lv, cat: cat, goal: goal, q: q, o: [a, w1, w2, w3] }); }

  /* ---- generic ---- */
  // A1
  B(0, 'grammar', 'any', 'She ___ a teacher.', 'is', 'are', 'am', 'be');
  B(0, 'grammar', 'any', 'I ___ from Egypt.', 'am', 'is', 'are', 'be');
  B(0, 'grammar', 'any', 'We ___ two brothers.', 'have', 'has', 'having', 'is');
  B(0, 'vocab', 'any', 'Which one is a fruit?', 'Apple', 'Chair', 'Window', 'Pencil');
  B(0, 'vocab', 'any', 'The opposite of "big" is ___.', 'small', 'hot', 'new', 'fast');
  B(0, 'reading', 'any', 'Sara is 10. She has a cat. — How old is Sara?', '10', '5', '12', '20');
  B(0, 'reading', 'any', 'Tom likes tea. He doesn’t like coffee. — What does Tom drink?', 'Tea', 'Coffee', 'Milk', 'Juice');
  // A2
  B(1, 'grammar', 'any', 'Yesterday I ___ to the cinema.', 'went', 'go', 'goes', 'going');
  B(1, 'grammar', 'any', 'My brother is ___ than me.', 'taller', 'tallest', 'more tall', 'tall');
  B(1, 'grammar', 'any', 'There ___ any milk in the fridge.', 'isn’t', 'aren’t', 'don’t', 'not');
  B(1, 'vocab', 'any', 'A person who cooks in a restaurant is a ___.', 'chef', 'pilot', 'driver', 'nurse');
  B(1, 'vocab', 'any', 'I haven’t eaten all day. I’m very ___.', 'hungry', 'thirsty', 'sleepy', 'angry');
  B(1, 'reading', 'any', '"The shop opens at 9 and closes at 6 on weekdays. It is closed on Sundays." — When can you buy things on Sunday?', 'You can’t', 'At 9', 'At 6', 'All day');
  B(1, 'reading', 'any', 'Ali: "I usually wake up at 7, have breakfast and go to work by metro." — How does Ali go to work?', 'By metro', 'By car', 'By bus', 'On foot');
  // B1
  B(2, 'grammar', 'any', 'If it rains tomorrow, we ___ at home.', 'will stay', 'would stay', 'stayed', 'had stayed');
  B(2, 'grammar', 'any', 'I have lived in Cairo ___ 2015.', 'since', 'for', 'from', 'during');
  B(2, 'grammar', 'any', 'She asked me where ___.', 'I lived', 'did I live', 'do I live', 'I do live');
  B(2, 'vocab', 'any', 'The meeting was ___ because the manager was ill.', 'postponed', 'invented', 'repaired', 'borrowed');
  B(2, 'vocab', 'any', 'Can you ___ me a favour?', 'do', 'make', 'take', 'have');
  B(2, 'reading', 'any', '"Many people now work from home. This saves travel time, but some say they feel lonely because they rarely meet colleagues." — What is one problem of working from home?', 'Workers can feel lonely', 'It takes more travel time', 'It costs more', 'Workers can’t use computers');
  B(2, 'reading', 'any', '"The new café on Nile Street is cheap and always full at lunch time, so it’s better to arrive before 12." — Why should you arrive before 12?', 'Because it gets crowded', 'Because it opens at 12', 'It’s expensive after 12', 'It closes at 12');
  // B2
  B(3, 'grammar', 'any', 'If I ___ more time, I would learn another language.', 'had', 'have', 'will have', 'would have');
  B(3, 'grammar', 'any', 'By the time we arrived, the film ___.', 'had already started', 'has already started', 'was already starting', 'already starts');
  B(3, 'grammar', 'any', 'He suggested ___ the meeting to next week.', 'moving', 'to move', 'move', 'moved');
  B(3, 'vocab', 'any', 'She’s very ___; she always finds a way to solve problems.', 'resourceful', 'reluctant', 'tedious', 'fragile');
  B(3, 'vocab', 'any', 'Despite the heavy traffic, he managed to ___ on time.', 'arrive', 'reach', 'attend', 'enter');
  B(3, 'reading', 'any', '"Although the new policy was introduced to reduce costs, many employees argued it would harm morale, since it removed the annual bonus." — Why did employees dislike the policy?', 'They thought it would lower morale', 'It increased costs', 'It added more bonuses', 'It was introduced too late');
  B(3, 'reading', 'any', '"Researchers found that people who sleep less than six hours make more errors at work, though the effect disappears after a good night’s rest." — What does the study suggest?', 'Lack of sleep causes mistakes, but rest fixes it', 'Sleep has no effect on work', 'Mistakes continue forever', 'People need ten hours of sleep');
  // C1
  B(4, 'grammar', 'any', 'Not only ___ the deadline, but he also exceeded expectations.', 'did he meet', 'he met', 'he did meet', 'met he');
  B(4, 'grammar', 'any', 'Had I known about the delay, I ___ earlier.', 'would have left', 'would leave', 'had left', 'will have left');
  B(4, 'grammar', 'any', 'The proposal, ___ was submitted last week, has been approved.', 'which', 'what', 'who', 'whom');
  B(4, 'vocab', 'any', 'His ___ remarks offended several colleagues.', 'tactless', 'tactful', 'thoughtful', 'considerate');
  B(4, 'vocab', 'any', 'The improvement was ___; no one had expected such a dramatic change.', 'striking', 'negligible', 'predictable', 'routine');
  B(4, 'reading', 'any', '"While proponents argue that remote work boosts productivity, critics point out that the evidence is inconclusive, since most studies rely on self-reported data." — What is the critics’ main point?', 'The evidence isn’t reliable enough', 'Remote work is always worse', 'Productivity is easy to measure', 'Self-reports are always accurate');
  B(4, 'reading', 'any', '"The author stops short of calling the reform a failure, preferring instead to describe its outcomes as mixed." — What is the author’s attitude?', 'Cautious and balanced', 'Strongly negative', 'Enthusiastic', 'Indifferent');
  // C2
  B(5, 'grammar', 'any', 'Scarcely had she sat down ___ the phone rang.', 'when', 'than', 'then', 'that');
  B(5, 'grammar', 'any', 'I’d rather you ___ anything about it until we know more.', 'didn’t say', 'don’t say', 'won’t say', 'haven’t said');
  B(5, 'grammar', 'any', 'Were it not for her support, the project ___ collapsed.', 'would have', 'will have', 'had', 'would');
  B(5, 'vocab', 'any', 'The speech was full of ___; it sounded impressive but said little.', 'platitudes', 'verdicts', 'statutes', 'blueprints');
  B(5, 'vocab', 'any', 'Her argument was so ___ that nobody could find a flaw in it.', 'watertight', 'flimsy', 'sketchy', 'trivial');
  B(5, 'reading', 'any', '"The novel’s ostensible subject is a family feud, but its real concern lies with the erosion of memory." — What does "ostensible" suggest?', 'apparent, but not the real one', 'the most important', 'completely hidden', 'boring');
  B(5, 'reading', 'any', '"Far from resolving the dispute, the compromise merely deferred it, leaving both sides dissatisfied." — What happened to the dispute?', 'It was postponed, not solved', 'It was fully resolved', 'It disappeared', 'It got shorter');

  /* ---- job interview ---- */
  B(0, 'sit', 'job', 'Interviewer: "What’s your name?" — Best reply:', 'My name is Omar.', 'I’m 25.', 'Yes, please.', 'Nice weather.');
  B(0, 'sit', 'job', 'Interviewer: "Where are you from?" — Best reply:', 'I’m from Cairo.', 'I’m a teacher.', 'It’s Monday.', 'Fine, thanks.');
  B(0, 'sit', 'job', 'Which word is a job?', 'Doctor', 'Window', 'Green', 'Sunday');
  B(1, 'sit', 'job', 'Interviewer: "What do you do?" — Best reply:', 'I’m an accountant.', 'I do it yesterday.', 'I’m fine.', 'I’m 30 years old.');
  B(1, 'sit', 'job', 'Interviewer: "Can you start on Sunday?" — Best reply:', 'Yes, I can.', 'Yes, I do.', 'I am start.', 'It is Sunday me.');
  B(1, 'sit', 'job', 'Which is the best way to end an interview?', 'Thank you for your time.', 'Bye bye, quickly.', 'Give me the job.', 'See you never.');
  B(2, 'sit', 'job', 'Interviewer: "Why do you want to work here?" — Best reply:', 'I admire your company, and I think my skills fit this role.', 'Because I need money fast.', 'I don’t know.', 'My friend works here, that’s all.');
  B(2, 'sit', 'job', 'Interviewer: "Tell me about a strength of yours." — Best reply:', 'I’m organised, so I always meet deadlines.', 'I have no strengths.', 'I’m good at sleeping.', 'I like holidays.');
  B(2, 'sit', 'job', 'I have three years of ___ in marketing.', 'experience', 'experiment', 'expertly', 'expense');
  B(3, 'sit', 'job', 'Interviewer: "Describe a challenge you faced." — Best reply:', 'Our team was short-staffed, so I reorganised tasks and we delivered on time.', 'I never have challenges.', 'Challenges are bad.', 'I handled it by ignoring it.');
  B(3, 'sit', 'job', 'I’m writing to ___ for the position of sales executive.', 'apply', 'demand', 'attend', 'complete');
  B(3, 'sit', 'job', 'What are your salary ___?', 'expectations', 'expected', 'expecting', 'expect');
  B(4, 'sit', 'job', 'Interviewer: "Where do you see yourself in five years?" — Strongest answer:', 'I’d like to have grown into a leadership role while contributing to the company’s goals.', 'Probably somewhere else.', 'I haven’t thought about it.', 'Retired, hopefully.');
  B(4, 'sit', 'job', 'I’m confident that my track record ___ me a strong candidate.', 'makes', 'gives', 'turns', 'holds');
  B(4, 'sit', 'job', 'Interviewer: "How would your previous manager describe you?" — Best reply:', 'As reliable and proactive; she often trusted me with high-stakes projects.', 'He hated me.', 'As lazy but fun.', 'I never asked him.');
  B(5, 'sit', 'job', 'Most diplomatic way to explain why you left a job:', 'I felt I’d taken the role as far as I could and was seeking new challenges.', 'My boss was awful.', 'They didn’t pay me enough, honestly.', 'I just got bored and quit.');
  B(5, 'sit', 'job', 'I’d welcome the opportunity to ___ on how my experience aligns with your needs.', 'elaborate', 'elevate', 'emigrate', 'evaporate');
  B(5, 'sit', 'job', 'She is a ___ negotiator, able to reach agreements without damaging relationships.', 'shrewd', 'naive', 'blunt', 'reckless');

  /* ---- call center ---- */
  B(0, 'sit', 'call', 'You answer the phone. What do you say first?', 'Hello, how can I help you?', 'Goodbye, sir.', 'See you tomorrow.', 'I don’t know.');
  B(0, 'sit', 'call', 'The caller spells A-H-M-E-D. Which letter comes after H?', 'M', 'E', 'D', 'A');
  B(0, 'sit', 'call', '"Please wait a moment" means:', 'Stay on the line for a short time', 'Come here', 'Speak loudly', 'Call a taxi');
  B(1, 'sit', 'call', 'Customer: "What is your phone number?" — Which is a normal answer?', 'It’s 0101 132 1758.', 'I’m fine.', 'It’s Monday.', 'Yes, please.');
  B(1, 'sit', 'call', '"Can you repeat that, please?" means:', 'Say it again', 'Stop talking', 'Speak English', 'Write it');
  B(1, 'sit', 'call', 'Thank you for ___ our company.', 'calling', 'call', 'called', 'to call');
  B(2, 'sit', 'call', 'Customer: "My internet isn’t working." — Best reply:', 'I’m sorry to hear that. Let me check your account.', 'That’s not my problem.', 'Try again tomorrow.', 'Why are you calling?');
  B(2, 'sit', 'call', 'I’ll ___ you through the steps.', 'walk', 'run', 'jump', 'fly');
  B(2, 'sit', 'call', 'Could you hold ___ a moment, please?', 'on', 'in', 'at', 'with');
  B(3, 'sit', 'call', 'Customer: "This is the third time I’ve called!" — Best reply:', 'I sincerely apologise for the inconvenience. Let me resolve this right now.', 'Calm down.', 'It’s not our fault.', 'You should have waited.');
  B(3, 'sit', 'call', 'I understand your ___, and I’ll do my best to help.', 'frustration', 'frustrating', 'frustrate', 'frustrated');
  B(3, 'sit', 'call', 'Your refund will be ___ within five working days.', 'processed', 'processing', 'process', 'processes');
  B(4, 'sit', 'call', 'Customer: "I’d like to escalate this." — What will the agent do?', 'Pass it to a more senior person', 'End the call', 'Offer only a discount', 'Ask the caller to call back');
  B(4, 'sit', 'call', 'We apologise for any ___ caused.', 'inconvenience', 'convenient', 'conveniently', 'convene');
  B(4, 'sit', 'call', 'Best way to refuse politely:', 'Unfortunately, I’m unable to do that, but here’s what I can offer.', 'No, I can’t.', 'That’s impossible.', 'Not allowed.');
  B(5, 'sit', 'call', 'I’ll ___ this with the technical team and revert to you by tomorrow.', 'take up', 'take off', 'take in', 'take after');
  B(5, 'sit', 'call', 'To ___ the call, I’ll summarise what we’ve agreed.', 'wrap up', 'wrap round', 'wrap out', 'wrap off');
  B(5, 'sit', 'call', 'Most effective tone to de-escalate an angry customer:', 'Calm, empathetic and solution-focused', 'Defensive and formal', 'Joking and casual', 'Silent');

  /* ---- daily life & travel ---- */
  B(0, 'sit', 'chat', '"How are you?" — Best reply:', 'I’m fine, thanks.', 'I’m Cairo.', 'It’s blue.', 'Yes, I am.');
  B(0, 'sit', 'chat', '"How much is this?" — Best reply:', 'It’s ten pounds.', 'It’s Monday.', 'I’m ten.', 'Yes, please.');
  B(0, 'sit', 'chat', 'Choose the polite request.', 'Can I have some water, please?', 'Give water.', 'Water me.', 'I water.');
  B(1, 'sit', 'chat', '"Excuse me, how do I get to the station?" — Best reply:', 'Go straight and turn left.', 'I like trains.', 'Yes, I do.', 'It’s two o’clock.');
  B(1, 'sit', 'chat', 'I’d like a ___ of coffee.', 'cup', 'piece', 'pair', 'box');
  B(1, 'sit', 'chat', 'What time does the train ___?', 'leave', 'leaves', 'leaving', 'left');
  B(2, 'sit', 'chat', '"Would you like to join us for dinner?" — Best reply:', 'I’d love to, thanks!', 'I’m liking.', 'No, I don’t dinner.', 'Yes, I join.');
  B(2, 'sit', 'chat', 'I’m looking ___ to seeing you.', 'forward', 'front', 'ahead', 'up');
  B(2, 'sit', 'chat', 'Sorry, I didn’t catch that. ___?', 'Could you say it again', 'Do you said again', 'You say again please', 'Say you again');
  B(3, 'sit', 'chat', '"It’s up to you." means:', 'You decide', 'You are late', 'You must go up', 'You are tall');
  B(3, 'sit', 'chat', 'I’m not into football; I’d ___ play tennis.', 'rather', 'better', 'prefer', 'like');
  B(3, 'sit', 'chat', 'Long time no ___!', 'see', 'saw', 'seen', 'seeing');
  B(4, 'sit', 'chat', '"I’m afraid I can’t make it" means:', 'I can’t attend', 'I can’t build it', 'I’m scared of it', 'I can’t cook it');
  B(4, 'sit', 'chat', '"Let’s call it a day" means:', 'Let’s stop for now', 'Let’s phone today', 'Let’s name the day', 'Let’s start again');
  B(4, 'sit', 'chat', '"He’s under the weather" means:', 'He feels ill', 'He is outside', 'He likes rain', 'He is a pilot');
  B(5, 'sit', 'chat', '"She took it with a pinch of salt" means:', 'She didn’t fully believe it', 'She cooked it', 'She added flavour', 'She was angry');
  B(5, 'sit', 'chat', '"That’s a moot point" means:', 'It’s debatable', 'It’s urgent', 'It’s silent', 'It’s final');
  B(5, 'sit', 'chat', '"We hit it off immediately" means:', 'We got along well', 'We hit each other', 'We left quickly', 'We argued');

  /* ---- study ---- */
  B(0, 'sit', 'study', 'The teacher says: "Open your book." What do you do?', 'Open it', 'Throw it', 'Eat it', 'Close it');
  B(0, 'sit', 'study', 'Which is a school subject?', 'Maths', 'Banana', 'Purple', 'Taxi');
  B(0, 'sit', 'study', 'How do you say 7?', 'seven', 'seventeen', 'seventy', 'six');
  B(1, 'sit', 'study', 'The teacher ___ us homework every day.', 'gives', 'give', 'giving', 'gived');
  B(1, 'sit', 'study', 'I’m studying for my ___ next week.', 'exam', 'example', 'exact', 'exit');
  B(1, 'sit', 'study', 'Please ___ your name at the top of the page.', 'write', 'wrote', 'writing', 'writes');
  B(2, 'sit', 'study', 'I’m interested ___ history.', 'in', 'on', 'at', 'for');
  B(2, 'sit', 'study', 'The lecture was ___ boring that I fell asleep.', 'so', 'such', 'too', 'very');
  B(2, 'sit', 'study', 'Which sentence is correct?', 'She has studied here since 2020.', 'She studied here since 2020.', 'She is studying here since 2020.', 'She study here since 2020.');
  B(3, 'sit', 'study', 'The essay must be submitted ___ Friday at the latest.', 'by', 'until', 'during', 'within');
  B(3, 'sit', 'study', 'A well-written essay needs a clear ___ and a conclusion.', 'introduction', 'introduce', 'introducing', 'introductory');
  B(3, 'sit', 'study', 'The study ___ that exercise improves memory.', 'suggests', 'suggest', 'suggesting', 'suggestion');
  B(4, 'sit', 'study', 'The results were positive; ___, the sample was small.', 'however', 'therefore', 'moreover', 'similarly');
  B(4, 'sit', 'study', 'The paper ___ a convincing argument for reform.', 'puts forward', 'puts away', 'puts off', 'puts out');
  B(4, 'sit', 'study', 'Her thesis builds ___ earlier research.', 'on', 'at', 'in', 'with');
  B(5, 'sit', 'study', 'The findings are, at best, ___; they cannot be generalised.', 'tentative', 'tenacious', 'tedious', 'tangible');
  B(5, 'sit', 'study', 'The author ___ a distinction between correlation and causation.', 'draws', 'drags', 'drops', 'dips');
  B(5, 'sit', 'study', 'Which sentence is the most formal?', 'The results would appear to indicate a correlation.', 'The results show a link, sort of.', 'Looks like there’s a link.', 'The results kinda show a link.');

  /* ---- advice ---- */
  var TIPS = {
    grammar: [
      'القواعد: ابدأ بـ Present Simple وPast Simple، وكرّر جمل قصيرة بصوت عالي كل يوم بدل ما تحفظ القاعدة نظري.',
      'القواعد: اشتغل على الأزمنة المركبة وجمل If. خد كل قاعدة وألّف 3 جمل عن حياتك أنت.',
      'القواعد: ركّز على التراكيب المعقدة (inversion وmixed conditionals) بإنك تحلل جمل من مقالات حقيقية.'
    ],
    vocab: [
      'المفردات: اتعلم 5 كلمات كل يوم جوه جمل كاملة مش كلمات لوحدها، وسمّي الحاجات اللي حواليك بالإنجليزي.',
      'المفردات: اتعلم الكلمات في مجموعات (make a decision / take a break) وراجعها بتطبيق بطاقات.',
      'المفردات: وسّع مفرداتك من بودكاست ومقالات، وسجّل كل تعبير جديد مع مثال بتاعك.'
    ],
    reading: [
      'الفهم: اقرأ نصوص قصيرة جدًا وحاول تفهم الفكرة قبل ما تترجم كل كلمة.',
      'الفهم: اقرأ مقال قصير يوميًا وحدد الفكرة الرئيسية الأول، وما توقفش عند كل كلمة صعبة.',
      'الفهم: اقرأ مقالات رأي وركّز على موقف الكاتب وكلمات الربط (however, although).'
    ]
  };
  var GOAL_TIPS = {
    job: [
      'للمقابلة: حضّر 3 جمل جاهزة (اسمك، شغلك، ليه الوظيفة دي) واتدرب عليها لحد ما تتقال براحة.',
      'للمقابلة: اتدرب على إجابة "Tell me about yourself" في دقيقة وسجّل صوتك وسمعه.',
      'للمقابلة: استخدم طريقة STAR (Situation, Task, Action, Result) في كل إجابة عن موقف حصل معاك.'
    ],
    call: [
      'للكول سنتر: احفظ جمل الاستقبال والإنهاء (How can I help you? / Thank you for calling).',
      'للكول سنتر: اتدرب على جمل التعاطف (I understand / I’m sorry to hear that) ونطق الأرقام والحروف بوضوح.',
      'للكول سنتر: اتدرب على تهدئة العميل الغاضب: اعتذر، لخّص المشكلة، قدّم حل، وأكّد الخطوة الجاية.'
    ],
    chat: [
      'للمحادثة والسفر: احفظ جمل الطلب والسؤال عن الطريق وقولها بصوت عالي.',
      'للمحادثة والسفر: اتكلم 5 دقايق كل يوم عن يومك، حتى لو مع نفسك.',
      'للمحادثة والسفر: اتعلم التعبيرات الاصطلاحية (idioms) من المسلسلات والبودكاست.'
    ],
    study: [
      'للدراسة: ابدأ بمفردات الفصل والتعليمات (open, write, listen) واستخدمها كل يوم.',
      'للدراسة: اتدرب على كتابة فقرة منظمة: فكرة، مثال، خاتمة.',
      'للدراسة: اتدرب على الأسلوب الأكاديمي الرسمي وكلمات الربط في الكتابة.'
    ],
    any: [
      'اتكلم بالإنجليزي 5 دقايق كل يوم، حتى لو مع نفسك قدام المراية.',
      'سجّل صوتك وأنت بتحكي عن يومك، وسمعه وحدد 3 حاجات تحسّنها.',
      'شوف فيديوهات بالإنجليزي من غير ترجمة، وكرّر الجمل اللي بتعجبك بنفس النغمة.'
    ]
  };
  var TRICKS = [
    'تريك النطق: اسمع جملة ← كرّرها بنفس النغمة ← سجّل صوتك وقارن.',
    'تريك الثقة: الغلط مش عيب. المهم تكمّل الجملة وما تقفش عند كلمة ناقصة، قول معناها بكلمات أبسط.',
    'تريك الاستمرار: 10 دقايق كل يوم أحسن من ساعتين مرة في الأسبوع.'
  ];

  /* ================= helpers ================= */
  function $(id) { return document.getElementById(id); }
  function mk(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function band(i) { return i <= 1 ? 0 : i <= 3 ? 1 : 2; }
  function goalOf(k) { for (var i = 0; i < GOALS.length; i++) if (GOALS[i].k === k) return GOALS[i]; return GOALS[4]; }

  var SEEN_KEY = 'ak-seen-q';
  function loadSeen() { try { var v = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function saveSeen(a) { try { localStorage.setItem(SEEN_KEY, JSON.stringify(a.slice(-300))); } catch (e) {} }

  /* ================= state ================= */
  var S;
  function fresh() { return { step: 'goal', goal: null, sv: [], est: 0, lo: 0, hi: 2, cur: 0, hist: [], used: {}, cq: null, busy: false }; }
  S = fresh();
  var API = window.AKCoach = { result: null };

  var root = $('coachRoot'); if (!root) return;
  var head = mk('div', 'ch-head');
  var av = mk('div', 'ch-av'); av.appendChild(mk('span', 'bulb')); av.firstChild.style.cssText = 'width:24px;height:27px;color:var(--deep)';
  var who = mk('div'); who.appendChild(mk('div', 'ch-name', 'مساعد أول الكلام')); var sub = mk('div', 'ch-sub', 'متصل · بيحدد مستواك'); who.appendChild(sub);
  head.appendChild(av); head.appendChild(who);
  var prog = mk('div', 'ch-prog'); prog.setAttribute('aria-hidden', 'true'); var bar = mk('div', 'ch-bar'); prog.appendChild(bar);
  var msg = mk('div', 'ch-msg'); msg.setAttribute('aria-live', 'polite');
  var body = mk('div', 'ch-body');
  root.appendChild(head); root.appendChild(prog); root.appendChild(msg); root.appendChild(body);

  function setProgress(done, total) { bar.style.width = Math.round(100 * done / total) + '%'; }

  function say(nodes, then) {
    msg.textContent = ''; body.textContent = ''; msg.style.minHeight = '';
    var bub = mk('div', 'cbub');
    if (reduced()) { nodes.forEach(function (n) { bub.appendChild(n); }); msg.appendChild(bub); then && then(); return; }
    var dots = mk('div', 'cbub typing'); for (var i = 0; i < 3; i++) dots.appendChild(mk('i'));
    msg.appendChild(dots); S.busy = true;
    setTimeout(function () {
      msg.textContent = ''; nodes.forEach(function (n) { bub.appendChild(n); }); msg.appendChild(bub);
      restart(bub); S.busy = false; then && then();
    }, 520);
  }
  function restart(el) { el.classList.remove('swap-a'); void el.offsetWidth; el.classList.add('swap-a'); }
  function P(t, cls) { return mk('p', cls || 'cp', t); }

  function choices(list, onPick, ltr) {
    body.textContent = '';
    var grid = mk('div', 'cgrid');
    list.forEach(function (t, i) {
      var b = mk('button', 'opt'); b.type = 'button';
      b.appendChild(mk('span', 'ol', 'ABCDE'.charAt(i)));
      var s = mk('span', null, t); if (ltr) s.setAttribute('dir', 'ltr'); b.appendChild(s);
      b.addEventListener('click', function () { if (S.busy) return; S.busy = true; setTimeout(function () { S.busy = false; }, 300); onPick(i); });
      grid.appendChild(b);
    });
    body.appendChild(grid); restart(grid);
  }

  /* ================= flow ================= */
  function stepGoal() {
    S = fresh(); API.result = null; window.dispatchEvent(new CustomEvent('ak:reset'));
    setProgress(0, 1 + SURVEY.length + N);
    sub.textContent = 'متصل · بيحدد مستواك';
    say([P('أهلًا بيك! أنا مساعد أول الكلام. هسألك كام سؤال سريع، وبعدها هعملك اختبار مخصوص ليك، وفي الآخر هديك نصايح تناسب مستواك.'), P('الأول: عايز الإنجليزي لإيه؟', 'cp cq')], function () {
      choices(GOALS.map(function (g) { return g.ar; }), function (i) { S.goal = GOALS[i].k; S.step = 'survey'; stepSurvey(0); });
    });
  }

  function stepSurvey(i) {
    setProgress(1 + i, 1 + SURVEY.length + N);
    if (i >= SURVEY.length) return startTest();
    var sv = SURVEY[i];
    say([P('تمام. سؤال ' + (i + 1) + ' من ' + SURVEY.length + ' عن مستواك:', 'cp cmeta'), P(sv.q, 'cp cq')], function () {
      choices(sv.o, function (k) { S.sv.push(k); stepSurvey(i + 1); });
    });
  }

  function startTest() {
    var total = S.sv.reduce(function (a, b) { return a + b; }, 0);
    S.est = total <= 3 ? 0 : total <= 7 ? 1 : total <= 11 ? 2 : total <= 15 ? 3 : total <= 18 ? 4 : 5;
    S.lo = Math.max(0, S.est - 1); S.hi = Math.min(5, S.est + 2); S.cur = S.est;
    S.step = 'test';
    var g = goalOf(S.goal);
    say([P('شكرًا. من إجاباتك تقديري المبدئي إنك في مستوى ' + LV[S.est].c + ' (' + LV[S.est].ar + ').'),
         P('هعملك ' + N + ' أسئلة مخصوصة لهدفك (' + g.ar + ')، بتبدأ من مستواك وبتزيد أو تقل حسب إجاباتك، ومش هتطلع أبعد من مرحلتين فوق مستواك.'),
         P('ملحوظة: كل مرة بتعمل فيها الاختبار الأسئلة بتتغير.', 'cp cmeta')], function () {
      choices(['يلا نبدأ'], function () { nextQuestion(); });
    });
  }

  function pickQuestion(level) {
    var seen = loadSeen();
    function pool(lv, onlyUnseen) {
      return BANK.filter(function (q) {
        return q.lv === lv && !S.used[q.id] && (q.goal === 'any' || q.goal === S.goal) && (!onlyUnseen || seen.indexOf(q.id) < 0);
      });
    }
    var tries = [level, level + 1, level - 1, level + 2, level - 2];
    var wantSit = S.goal !== 'any' && Math.random() < 0.6;
    for (var pass = 0; pass < 2; pass++) {
      for (var t = 0; t < tries.length; t++) {
        var lv = tries[t]; if (lv < S.lo || lv > S.hi) continue;
        var p = pool(lv, pass === 0);
        if (!p.length) continue;
        var sit = p.filter(function (q) { return q.cat === 'sit'; }), gen = p.filter(function (q) { return q.cat !== 'sit'; });
        var from = wantSit ? (sit.length ? sit : gen) : (gen.length ? gen : sit);
        return pickOne(from);
      }
    }
    return pickOne(BANK.filter(function (q) { return !S.used[q.id] && (q.goal === 'any' || q.goal === S.goal); }));
  }

  function nextQuestion() {
    var n = S.hist.length;
    if (n >= N) return finish();
    setProgress(1 + SURVEY.length + n, 1 + SURVEY.length + N);
    var q = pickQuestion(S.cur); S.cq = q; S.used[q.id] = true;
    var seen = loadSeen(); seen.push(q.id); saveSeen(seen);
    var opts = shuffle([0, 1, 2, 3]);
    var label = q.cat === 'sit' ? goalOf(S.goal).sit : CATS[q.cat];
    var qEl = mk('p', 'cp cq en', q.q); qEl.setAttribute('dir', 'ltr');
    say([P('سؤال ' + (n + 1) + ' من ' + N + ' · ' + label, 'cp cmeta'), qEl], function () {
      choices(opts.map(function (k) { return q.o[k]; }), function (i) {
        var ok = opts[i] === 0;
        S.hist.push({ id: q.id, lv: q.lv, cat: q.cat, ok: ok });
        S.cur = Math.max(S.lo, Math.min(S.hi, S.cur + (ok ? 1 : -1)));
        nextQuestion();
      }, true);
    });
  }

  function finish() {
    setProgress(1, 1);
    var H = S.hist, score = H.filter(function (h) { return h.ok; }).length;
    var L = H.reduce(function (a, h) { return a + h.lv + (h.ok ? 0.5 : -0.5); }, 0) / H.length;
    var lvl = Math.max(0, Math.min(S.hi, Math.floor(L + 0.1)));
    var cats = {}; H.forEach(function (h) { var c = cats[h.cat] || (cats[h.cat] = { ok: 0, n: 0 }); c.n++; if (h.ok) c.ok++; });
    var weak = [], strong = [];
    Object.keys(cats).forEach(function (k) {
      var r = cats[k].ok / cats[k].n;
      if (r < 0.6) weak.push(k); else if (r >= 0.8) strong.push(k);
    });
    weak.sort(function (a, b) { return cats[a].ok / cats[a].n - cats[b].ok / cats[b].n; });
    var g = goalOf(S.goal), bnd = band(lvl);
    function nm(k) { return k === 'sit' ? g.sit : CATS[k]; }
    var tips = [];
    weak.slice(0, 2).forEach(function (k) { if (k === 'sit') tips.push(GOAL_TIPS[S.goal][bnd]); else tips.push(TIPS[k][bnd]); });
    if (tips.indexOf(GOAL_TIPS[S.goal][bnd]) < 0) tips.push(GOAL_TIPS[S.goal][bnd]);
    tips.push(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
    var focus = weak.map(nm);
    var res = {
      goal: g.ar, goalKey: g.k, est: LV[S.est].c, level: LV[lvl].c, levelAr: LV[lvl].ar, course: LV[lvl].course,
      score: score, total: H.length, strong: strong.map(nm), weak: focus, tips: tips
    };
    API.result = res;
    sub.textContent = 'خلّصنا · نتيجتك جاهزة';
    renderResult(res, lvl, cats);
    window.dispatchEvent(new CustomEvent('ak:done', { detail: res }));
  }

  function renderResult(res, lvl, cats) {
    msg.textContent = ''; body.textContent = ''; msg.style.minHeight = '0';
    var wrap = mk('div', 'cres swap-a');
    wrap.appendChild(mk('div', 'cond cr-k', 'Your level'));
    var big = mk('div', 'disp cr-big'); big.textContent = res.level + ' · ' + res.levelAr; wrap.appendChild(big);
    var sc = mk('div', 'cond cr-s', 'Score ' + res.score + ' / ' + res.total); wrap.appendChild(sc);
    var cl = mk('div', 'cp', 'المستوى المناسب ليك في الكورس: '); var cs = mk('strong', null, res.course); cs.setAttribute('dir', 'ltr'); cs.style.color = 'var(--orange)'; cl.appendChild(cs); cl.style.marginTop = '8px'; wrap.appendChild(cl);
    var rows = mk('div', 'cr-rows');
    Object.keys(cats).forEach(function (k) {
      var c = cats[k], r = mk('div', 'cr-row');
      r.appendChild(mk('span', 'cr-n', k === 'sit' ? goalOf(S.goal).sit : CATS[k]));
      var tr = mk('span', 'cr-tr'), f = mk('span', 'cr-f'); f.style.width = Math.round(100 * c.ok / c.n) + '%'; tr.appendChild(f); r.appendChild(tr);
      r.appendChild(mk('span', 'cr-v', c.ok + '/' + c.n));
      rows.appendChild(r);
    });
    wrap.appendChild(rows);
    wrap.appendChild(mk('div', 'cr-h', 'نصايح وتريكات ليك'));
    var ul = mk('ul', 'cr-ul'); res.tips.forEach(function (t) { ul.appendChild(mk('li', null, t)); }); wrap.appendChild(ul);
    wrap.appendChild(mk('p', 'cp', 'كمّل للحجز وهتوصلني نتيجتك على واتساب، فنبدأ معاك من المستوى الصح.'));
    var act = mk('div', 'cr-act');
    var a = mk('a', 'btn btn-or'); a.href = '#join'; a.appendChild(mk('span', null, 'كمّل الحجز'));
    var rt = mk('button', 'btn cr-retake', 'اعمل اختبار تاني'); rt.type = 'button'; rt.addEventListener('click', stepGoal);
    act.appendChild(a); act.appendChild(rt); wrap.appendChild(act);
    body.appendChild(wrap);
  }

  API.restart = stepGoal;
  stepGoal();
})();
