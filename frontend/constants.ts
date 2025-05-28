import React from 'react';
import { RoutePath, NavLink, Book, PhilosophyTheme, Child, Review, PhilosophyQuestionItem, BookSortOption, SelectOption, BookTypeFilterOption, ThemeCategory, DiscussionSummary, DiscussionPost } from './types';
import { 
    BookIcon, HomeIcon, HeartIcon, CogIcon, UserCircleIcon, QuestionMarkCircleIcon, UsersIcon as DashboardUsersIcon, 
    SparklesIcon, AcademicCapIcon, LogoutIcon, InformationCircleIcon, ShieldCheckIcon, QuestionIcon as HelpIcon, 
    EnvelopeIcon, LightBulbIcon, UserGroupIcon, GlobeAltIcon, ChatBubbleLeftRightIcon 
} from './assets/icons';

export const MAIN_NAVIGATION_LINKS: NavLink[] = [
  { label: 'ダッシュボード', path: RoutePath.Dashboard, icon: React.createElement(HomeIcon, { className: "w-5 h-5" }), isProtected: true },
  { label: '書籍一覧', path: RoutePath.Books, icon: React.createElement(BookIcon, { className: "w-5 h-5" }), isProtected: false },
  { label: '哲学テーマ', path: RoutePath.Themes, icon: React.createElement(SparklesIcon, { className: "w-5 h-5" }), isProtected: false },
  { label: 'お気に入り', path: RoutePath.Favorites, icon: React.createElement(HeartIcon, { className: "w-5 h-5" }), isProtected: true },
];

export const USER_PROFILE_LINKS: NavLink[] = [
  { label: 'プロフィール設定', path: RoutePath.Profile, icon: React.createElement(UserCircleIcon, { className: "w-5 h-5" }) },
  { label: 'アカウント設定', path: RoutePath.Settings, icon: React.createElement(CogIcon, { className: "w-5 h-5" }) },
];

export const FOOTER_LINKS_MAIN: NavLink[] = [
  { label: '利用規約', path: RoutePath.Terms, icon: React.createElement(InformationCircleIcon, { className: "w-4 h-4 mr-1"}) },
  { label: 'プライバシーポリシー', path: RoutePath.Privacy, icon: React.createElement(ShieldCheckIcon, { className: "w-4 h-4 mr-1"}) },
  { label: 'ヘルプ・FAQ', path: RoutePath.Help, icon: React.createElement(HelpIcon, { className: "w-4 h-4 mr-1"}) },
  { label: 'お問い合わせ', path: RoutePath.Contact, icon: React.createElement(EnvelopeIcon, { className: "w-4 h-4 mr-1"}) },
];

export const FOOTER_LINKS_SIMPLE: NavLink[] = [
  { label: '利用規約', path: RoutePath.Terms },
  { label: 'プライバシーポリシー', path: RoutePath.Privacy },
];

export const MOCK_CHILDREN: Child[] = [
  { id: 'child1', name: 'はなちゃん', age: 5, avatarUrl: 'https://picsum.photos/seed/child1/100/100', progress: 75, recentActivity: '「なぜ空は青いの？」を読了' },
  { id: 'child2', name: 'たろうくん', age: 7, avatarUrl: 'https://picsum.photos/seed/child2/100/100', progress: 40, recentActivity: '「勇気とは何か？」の質問に回答' },
];

export const MOCK_THEMES: PhilosophyTheme[] = [
  { 
    id: 'theme1', 
    name: '友情ってなに？', 
    iconElement: React.createElement(DashboardUsersIcon, { className: "w-8 h-8 text-green-500"}), 
    ageRange: '4-6歳', 
    bookCount: 5, 
    description: '友達の大切さや、どうすれば良い友達になれるかを考えます。', 
    color: 'bg-green-100',
    category: 'others',
    question: 'どんな時、友達がいてよかったと思う？',
    coverImageUrl: 'https://picsum.photos/seed/theme_friendship/600/400'
  },
  { 
    id: 'theme2', 
    name: '「勇気」ってどんなもの？', 
    iconElement: React.createElement(SparklesIcon, { className: "w-8 h-8 text-yellow-500"}), 
    ageRange: '6-8歳', 
    bookCount: 8, 
    description: '新しいことに挑戦する勇気や、困難を乗り越える力を育みます。', 
    color: 'bg-yellow-100',
    category: 'self',
    question: '勇気を出すって、どんな感じがする？',
    coverImageUrl: 'https://picsum.photos/seed/theme_courage/600/400'
  },
  { 
    id: 'theme3', 
    name: '「なぜ？」の世界を探検！', 
    iconElement: React.createElement(QuestionMarkCircleIcon, { className: "w-8 h-8 text-blue-500"}), 
    ageRange: '全年齢', 
    bookCount: 12, 
    description: '日常の不思議や疑問について、深く考えるきっかけを与えます。', 
    color: 'bg-blue-100',
    category: 'world',
    question: '世界で一番ふしぎなことは何だと思う？',
    coverImageUrl: 'https://picsum.photos/seed/theme_why/600/400'
  },
  { 
    id: 'theme4', 
    name: '「じぶん」らしさって？', 
    ageRange: '5-7歳', 
    bookCount: 6, 
    description: '自分自身の特徴や、好きなこと・得意なことを見つめます。', 
    category: 'self',
    question: '他の人と違うところ、どんなところが好き？',
    coverImageUrl: 'https://picsum.photos/seed/theme_self/600/400'
  },
  { 
    id: 'theme5', 
    name: '「言葉」の力ってすごい！', 
    ageRange: '7-9歳', 
    bookCount: 4, 
    description: '言葉が持つ意味や、コミュニケーションの大切さを学びます。', 
    category: 'thinking',
    question: '嬉しい言葉、悲しい言葉、どんな言葉があるかな？',
    coverImageUrl: 'https://picsum.photos/seed/theme_words/600/400'
  },
];

export const MOCK_BOOK_QUESTIONS: PhilosophyQuestionItem[] = [
  {id: 'q1', text: 'このお話の主人公が一番知りたかったことは何かな？', type: 'OpenEnded', difficulty: 'Easy'},
  {id: 'q2', text: 'もし君が主人公だったら、どうしたと思う？', type: 'OpenEnded', difficulty: 'Easy'},
  {id: 'q3', text: 'この本を読んで、何か新しい発見はあったかな？', type: 'OpenEnded', difficulty: 'Easy'},
  {id: 'q_courage1', text: 'チッチが勇気を出せたのは、何が一番大きな理由だったと思う？', type: 'OpenEnded', difficulty: 'Easy'},
  {id: 'q_courage2', text: '勇気を出す前と後で、チッチの気持ちはどう変わったかな？', type: 'OpenEnded', difficulty: 'Easy'},
];

export const MOCK_BOOKS: Book[] = [
  { 
    id: 'book1', 
    title: 'なぜ空は青いの？', 
    authorName: 'そら博士', 
    coverUrl: 'https://picsum.photos/seed/book1/300/400', 
    description: '空の色の秘密を巡る冒険物語。',
    longDescription: '主人公のりく君が、仲良しの雲の妖精と一緒に、なぜ空が青いのか、夕焼けはなぜ赤いのか、虹はどうしてできるのか、といった空の不思議を探求する心温まる物語です。読み終わった後には、きっと空を見上げるのがもっと楽しくなるでしょう。',
    readingTime: '10分', 
    ageRange: '3-5歳', 
    isPremium: false,
    isFree: false,
    tags: ['科学', '自然', '好奇心', 'なぜなぜ問答', '「なぜ？」の世界を探検！'],
    learningObjectives: ['色彩の原理を簡単に理解する', '自然現象への興味を育む'],
    relatedBookIds: ['book2', 'book3'],
    publisher: 'キラキラ出版',
    publishDate: '2023-05-10',
    popularityScore: 85,
    releaseDate: '2023-05-10T00:00:00Z',
    totalPages: 24,
    tableOfContents: [
        { title: 'はじめに - 空のふしぎ', pageNumber: 1 },
        { title: '雲のようせいとの出会い', pageNumber: 3 },
        { title: '青空のひみつ', pageNumber: 8 },
        { title: '夕焼け空のひみつ', pageNumber: 15 },
        { title: '虹のふしぎ', pageNumber: 20 },
        { title: 'おわりに - これからも空を見上げて', pageNumber: 24 },
    ],
    pages: Array.from({ length: 24 }, (_, i) => ({
        pageNumber: i + 1,
        imageUrl: `https://picsum.photos/seed/book1_p${i+1}/800/600?text=Page+${i+1}`,
        questionId: (i + 1) === 10 ? 'q1' : (i + 1) === 18 ? 'q2' : undefined,
        audioUrl: `https://example.com/audio/book1_p${i+1}.mp3` // Placeholder
    })),
  },
  { 
    id: 'book2', 
    title: '勇気の小さなタネ', 
    authorName: 'こころ先生', 
    coverUrl: 'https://picsum.photos/seed/book2/300/400', 
    description: '内気なリスくんが勇気を出す物語。',
    longDescription: '森一番の臆病者だったリスのチッチ。ある日、大切な友達が困っているのを見て、チッチの中に小さな勇気のタネが芽生えます。失敗を恐れずに一歩踏み出すことの大切さを教えてくれる、心温まる一冊。',
    readingTime: '15分', 
    ageRange: '4-6歳', 
    isPremium: true,
    isFree: false,
    tags: ['勇気', '成長', '友情', '「勇気」ってどんなもの？', '友情ってなに？'],
    learningObjectives: ['困難に立ち向かう勇気を知る', '自己肯定感を高める'],
    relatedBookIds: ['book1', 'book3'],
    publisher: 'げんき出版',
    publishDate: '2022-11-20',
    popularityScore: 92,
    releaseDate: '2022-11-20T00:00:00Z',
    totalPages: 20,
    tableOfContents: [
        { title: 'おくびょうなチッチ', pageNumber: 1 },
        { title: 'ともだちのピンチ', pageNumber: 5 },
        { title: 'ちいさな勇気のタネ', pageNumber: 10 },
        { title: '大きな一歩', pageNumber: 15 },
        { title: 'あたらしいチッチ', pageNumber: 20 },
    ],
    pages: Array.from({ length: 20 }, (_, i) => ({
        pageNumber: i + 1,
        imageUrl: `https://picsum.photos/seed/book2_p${i+1}/800/600?text=Page+${i+1}`,
        questionId: (i + 1) === 7 ? 'q_courage1' : (i + 1) === 16 ? 'q_courage2' : undefined,
        audioUrl: `https://example.com/audio/book2_p${i+1}.mp3`
    })),
  },
  { 
    id: 'book3', 
    title: 'ふしぎの箱のひみつ', 
    authorName: 'はてな探偵', 
    coverUrl: 'https://picsum.photos/seed/book3/300/400', 
    description: '開けてはいけない箱を見つけた兄弟の物語。',
    longDescription: '古い屋根裏部屋で見つけた、鍵のかかった不思議な箱。開けてみたいけど、なんだか怖い...。好奇心と葛藤、そして約束の大切さを描いた、少しスリリングな物語。',
    readingTime: '12分', 
    ageRange: '5-7歳', 
    isPremium: false,
    isFree: true,
    tags: ['探求心', '約束', '想像力', 'なぜなぜ問答', '「なぜ？」の世界を探検！'],
    learningObjectives: ['約束を守ることの重要性を学ぶ', '想像力を豊かにする'],
    relatedBookIds: ['book1', 'book2'],
    publisher: 'わくわく書房',
    publishDate: '2024-01-15',
    popularityScore: 78,
    releaseDate: '2024-01-15T00:00:00Z',
    // No pages data for this book initially, to test ReadingPage robustness
  },
  { 
    id: 'book4', 
    title: '月のうさぎと魔法の絵筆', 
    authorName: 'つきよみ姫', 
    coverUrl: 'https://picsum.photos/seed/book4/300/400', 
    description: '絵筆で願いをかなえるうさぎのファンタジー。',
    longDescription: '静かな月夜、一匹のうさぎが不思議な絵筆を見つけます。その絵筆で描いたものは現実になるのですが…。創造することの喜びと責任を教えてくれます。',
    readingTime: '18分', 
    ageRange: '6-8歳', 
    isPremium: true,
    isFree: false,
    tags: ['ファンタジー', '創造性', '責任感', '言葉の力', '「言葉」の力ってすごい！'],
    learningObjectives: ['創造力を刺激する', '行動の結果を考える'],
    relatedBookIds: ['book1'],
    publisher: '夢見る社',
    publishDate: '2023-08-01',
    popularityScore: 88,
    releaseDate: '2023-08-01T00:00:00Z',
  },
  { 
    id: 'book5', 
    title: '一番星みつけた', 
    authorName: 'ほしぞら守', 
    coverUrl: 'https://picsum.photos/seed/book5/300/400', 
    description: '少年が夜空で一番星を探す小さな冒険。',
    longDescription: '眠れない夜、少年は窓から一番星を探しに出かけます。道中、夜の生き物たちと出会いながら、星の美しさや宇宙の広大さを感じます。',
    readingTime: '8分', 
    ageRange: '2-4歳', 
    isPremium: false,
    isFree: false,
    tags: ['夜空', '自然', '発見', 'じぶんらしさ', '「じぶん」らしさって？'],
    learningObjectives: ['夜空への関心を高める', '観察力を養う'],
    relatedBookIds: [],
    publisher: 'キラキラ出版',
    publishDate: '2024-03-10',
    popularityScore: 70,
    releaseDate: '2024-03-10T00:00:00Z',
  },
];


export const MOCK_BOOK_REVIEWS: Review[] = [
  {id: 'r1', userId: 'user1', userName: '山田さん', userAvatarUrl: 'https://picsum.photos/seed/user1/50/50', rating: 5, text: '子供が夢中になって読んでいました！絵も可愛くて素晴らしいです。', date: '2024-07-15'},
  {id: 'r2', userId: 'user2', userName: '佐藤さん', userAvatarUrl: 'https://picsum.photos/seed/user2/50/50', rating: 4, text: '考えさせられる内容で、親子で話し合う良いきっかけになりました。', date: '2024-07-10'},
];

export const MOCK_CURRENT_USER_ID = 'user123'; 

export const BOOK_SORT_OPTIONS: SelectOption[] = [
  { value: BookSortOption.Recommended, label: 'おすすめ順' },
  { value: BookSortOption.Popularity, label: '人気順' },
  { value: BookSortOption.Newest, label: '新着順' },
  { value: BookSortOption.TitleAsc, label: 'タイトル昇順' },
  { value: BookSortOption.TitleDesc, label: 'タイトル降順' },
];

export const BOOK_TYPE_FILTER_OPTIONS: SelectOption[] = [
    { value: BookTypeFilterOption.All, label: 'すべて' },
    { value: BookTypeFilterOption.Subscription, label: '読み放題' },
    { value: BookTypeFilterOption.Premium, label: 'プレミアム' },
    { value: BookTypeFilterOption.Free, label: '無料' },
];

export const ITEMS_PER_PAGE = 12; 

export const THEME_CATEGORIES: {id: ThemeCategory, label: string, icon?: React.ReactElement<{ className?: string }>}[] = [
    { id: 'all', label: 'すべてのテーマ' },
    { id: 'self', label: 'じぶんのこと', icon: React.createElement(LightBulbIcon, {className: 'w-5 h-5 text-amber-500'}) },
    { id: 'others', label: 'ともだち・かぞくのこと', icon: React.createElement(UserGroupIcon, {className: 'w-5 h-5 text-amber-500'}) },
    { id: 'world', label: 'せかいのこと', icon: React.createElement(GlobeAltIcon, {className: 'w-5 h-5 text-amber-500'}) },
    { id: 'thinking', label: 'かんがえること', icon: React.createElement(ChatBubbleLeftRightIcon, {className: 'w-5 h-5 text-amber-500'}) },
];

export const MOCK_DISCUSSION_SUMMARIES: DiscussionSummary[] = [
  {
    id: 'disc1',
    bookId: 'book1',
    title: '空の色について、もっと深く考えてみよう！',
    participantCount: 5,
    latestCommentPreview: 'りくママ: 虹の仕組み、子供にも分かりやすかったです！',
    firstFewLines: 'この絵本を読んで、空の不思議について親子で話すきっかけになりました。特に夕焼けの色の変化は大人も改めて感動しますね。皆さんはどんな感想を持ちましたか？',
    lastActivity: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    createdByUserId: 'user123',
    createdByUserName: '哲学者キッズ',
  },
  {
    id: 'disc2',
    bookId: 'book1',
    title: '雨上がりの虹、見つけたことある？',
    participantCount: 3,
    latestCommentPreview: 'そら博士ファン: 雨の後の虹は本当にきれいですよね。',
    firstFewLines: '絵本に出てきた虹のシーン、とても印象的でした。実際に雨上がりに虹を見つけた時の感動を共有しませんか？',
    lastActivity: new Date(Date.now() - 3600000 * 24 * 1).toISOString(), // 1 day ago
    createdByUserId: 'user456',
    createdByUserName: '虹ハンター',
  },
  {
    id: 'disc3',
    bookId: 'book2',
    title: 'チッチが勇気を出すシーン、どう思った？',
    participantCount: 8,
    latestCommentPreview: '応援団長: 私もチッチを応援したくなりました！',
    firstFewLines: '「勇気の小さなタネ」で、主人公のチッチが困難に立ち向かうシーンが心に残りました。皆さんはどの部分に一番勇気をもらいましたか？',
    lastActivity: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    createdByUserId: 'user789',
    createdByUserName: '勇気サポーター',
  },
   {
    id: 'disc4',
    bookId: 'book1',
    title: '天気の不思議、子供の素朴な疑問',
    participantCount: 2,
    latestCommentPreview: '教育ママ: 子供のなぜなぜ期にぴったりですね！',
    firstFewLines: 'うちの子も最近「なんで空は青いの？」と聞いてきました。この絵本はそんな疑問に答えるのにとても役立ちました。',
    lastActivity: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    createdByUserId: 'userABC',
    createdByUserName: '教育ママ',
  }
];

export const MOCK_DISCUSSION_POSTS: DiscussionPost[] = [
  // Posts for disc1
  { 
    id: 'post1-1', discussionId: 'disc1', userId: 'user123', userName: '哲学者キッズ', userAvatarUrl: MOCK_CHILDREN[0].avatarUrl, 
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), 
    text: 'この絵本を読んで、空の不思議について親子で話すきっかけになりました。特に夕焼けの色の変化は大人も改めて感動しますね。皆さんはどんな感想を持ちましたか？'
  },
  { 
    id: 'post1-2', discussionId: 'disc1', userId: 'user456', userName: '虹ハンター', userAvatarUrl: MOCK_CHILDREN[1].avatarUrl, 
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(), 
    text: '夕焼けのグラデーション、本当に美しいですよね。光の散乱について、子供にも少し説明してみました。'
  },
  { 
    id: 'post1-3', discussionId: 'disc1', userId: 'userABC', userName: '教育ママ', 
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), 
    text: 'りくママ: 虹の仕組み、子供にも分かりやすかったです！うちの子は「虹の滑り台があったらな〜」と言っていました。'
  },
  // Posts for disc3
  { 
    id: 'post3-1', discussionId: 'disc3', userId: 'user789', userName: '勇気サポーター', userAvatarUrl: MOCK_CHILDREN[1].avatarUrl, 
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), 
    text: '「勇気の小さなタネ」で、主人公のチッチが困難に立ち向かうシーンが心に残りました。皆さんはどの部分に一番勇気をもらいましたか？'
  },
  { 
    id: 'post3-2', discussionId: 'disc3', userId: 'user123', userName: '哲学者キッズ', userAvatarUrl: MOCK_CHILDREN[0].avatarUrl, 
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), 
    text: '私はチッチが友達のために一歩踏み出す決心をしたところです。自分のためだけじゃなく、誰かのために出す勇気は特別だと感じました。'
  },
  { 
    id: 'post3-3', discussionId: 'disc3', userId: 'userXYZ', userName: '応援団長', 
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), 
    text: '私もチッチを応援したくなりました！小さな体で大きな勇気、感動です。'
  },
];
