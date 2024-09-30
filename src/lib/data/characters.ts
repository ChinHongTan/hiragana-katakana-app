export interface Character {
	hiragana: string;
	katakana: string;
	romaji: string;
	group: string;
	strength: number;
}

export interface QuizCharacter extends Character {
	currentScript: 'hiragana' | 'katakana';
}

export const characters: Character[] = [
	// Vowels
	{ hiragana: 'あ', katakana: 'ア', romaji: 'a', group: 'vowels', strength: 1 },
	{ hiragana: 'い', katakana: 'イ', romaji: 'i', group: 'vowels', strength: 1 },
	{ hiragana: 'う', katakana: 'ウ', romaji: 'u', group: 'vowels', strength: 1 },
	{ hiragana: 'え', katakana: 'エ', romaji: 'e', group: 'vowels', strength: 1 },
	{ hiragana: 'お', katakana: 'オ', romaji: 'o', group: 'vowels', strength: 1 },

	// K Group
	{ hiragana: 'か', katakana: 'カ', romaji: 'ka', group: 'k', strength: 1 },
	{ hiragana: 'き', katakana: 'キ', romaji: 'ki', group: 'k', strength: 1 },
	{ hiragana: 'く', katakana: 'ク', romaji: 'ku', group: 'k', strength: 1 },
	{ hiragana: 'け', katakana: 'ケ', romaji: 'ke', group: 'k', strength: 1 },
	{ hiragana: 'こ', katakana: 'コ', romaji: 'ko', group: 'k', strength: 1 },

	// G Group
	{ hiragana: 'が', katakana: 'ガ', romaji: 'ga', group: 'g', strength: 1 },
	{ hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', group: 'g', strength: 1 },
	{ hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', group: 'g', strength: 1 },
	{ hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', group: 'g', strength: 1 },
	{ hiragana: 'ご', katakana: 'ゴ', romaji: 'go', group: 'g', strength: 1 },

	// S Group
	{ hiragana: 'さ', katakana: 'サ', romaji: 'sa', group: 's', strength: 1 },
	{ hiragana: 'し', katakana: 'シ', romaji: 'shi', group: 's', strength: 1 },
	{ hiragana: 'す', katakana: 'ス', romaji: 'su', group: 's', strength: 1 },
	{ hiragana: 'せ', katakana: 'セ', romaji: 'se', group: 's', strength: 1 },
	{ hiragana: 'そ', katakana: 'ソ', romaji: 'so', group: 's', strength: 1 },

	// Z Group
	{ hiragana: 'ざ', katakana: 'ザ', romaji: 'za', group: 'z', strength: 1 },
	{ hiragana: 'じ', katakana: 'ジ', romaji: 'ji', group: 'z', strength: 1 },
	{ hiragana: 'ず', katakana: 'ズ', romaji: 'zu', group: 'z', strength: 1 },
	{ hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', group: 'z', strength: 1 },
	{ hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', group: 'z', strength: 1 },

	// T Group
	{ hiragana: 'た', katakana: 'タ', romaji: 'ta', group: 't', strength: 1 },
	{ hiragana: 'ち', katakana: 'チ', romaji: 'chi', group: 't', strength: 1 },
	{ hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', group: 't', strength: 1 },
	{ hiragana: 'て', katakana: 'テ', romaji: 'te', group: 't', strength: 1 },
	{ hiragana: 'と', katakana: 'ト', romaji: 'to', group: 't', strength: 1 },

	// D Group
	{ hiragana: 'だ', katakana: 'ダ', romaji: 'da', group: 'd', strength: 1 },
	{ hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', group: 'd', strength: 1 },
	{ hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', group: 'd', strength: 1 },
	{ hiragana: 'で', katakana: 'デ', romaji: 'de', group: 'd', strength: 1 },
	{ hiragana: 'ど', katakana: 'ド', romaji: 'do', group: 'd', strength: 1 },

	// N Group
	{ hiragana: 'な', katakana: 'ナ', romaji: 'na', group: 'n', strength: 1 },
	{ hiragana: 'に', katakana: 'ニ', romaji: 'ni', group: 'n', strength: 1 },
	{ hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', group: 'n', strength: 1 },
	{ hiragana: 'ね', katakana: 'ネ', romaji: 'ne', group: 'n', strength: 1 },
	{ hiragana: 'の', katakana: 'ノ', romaji: 'no', group: 'n', strength: 1 },

	// H Group
	{ hiragana: 'は', katakana: 'ハ', romaji: 'ha', group: 'h', strength: 1 },
	{ hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', group: 'h', strength: 1 },
	{ hiragana: 'ふ', katakana: 'フ', romaji: 'fu', group: 'h', strength: 1 },
	{ hiragana: 'へ', katakana: 'ヘ', romaji: 'he', group: 'h', strength: 1 },
	{ hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', group: 'h', strength: 1 },

	// B Group
	{ hiragana: 'ば', katakana: 'バ', romaji: 'ba', group: 'b', strength: 1 },
	{ hiragana: 'び', katakana: 'ビ', romaji: 'bi', group: 'b', strength: 1 },
	{ hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', group: 'b', strength: 1 },
	{ hiragana: 'べ', katakana: 'ベ', romaji: 'be', group: 'b', strength: 1 },
	{ hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', group: 'b', strength: 1 },

	// P Group
	{ hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', group: 'p', strength: 1 },
	{ hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', group: 'p', strength: 1 },
	{ hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', group: 'p', strength: 1 },
	{ hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', group: 'p', strength: 1 },
	{ hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', group: 'p', strength: 1 },

	// M Group
	{ hiragana: 'ま', katakana: 'マ', romaji: 'ma', group: 'm', strength: 1 },
	{ hiragana: 'み', katakana: 'ミ', romaji: 'mi', group: 'm', strength: 1 },
	{ hiragana: 'む', katakana: 'ム', romaji: 'mu', group: 'm', strength: 1 },
	{ hiragana: 'め', katakana: 'メ', romaji: 'me', group: 'm', strength: 1 },
	{ hiragana: 'も', katakana: 'モ', romaji: 'mo', group: 'm', strength: 1 },

	// Y Group
	{ hiragana: 'や', katakana: 'ヤ', romaji: 'ya', group: 'y', strength: 1 },
	{ hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', group: 'y', strength: 1 },
	{ hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', group: 'y', strength: 1 },

	// R Group
	{ hiragana: 'ら', katakana: 'ラ', romaji: 'ra', group: 'r', strength: 1 },
	{ hiragana: 'り', katakana: 'リ', romaji: 'ri', group: 'r', strength: 1 },
	{ hiragana: 'る', katakana: 'ル', romaji: 'ru', group: 'r', strength: 1 },
	{ hiragana: 'れ', katakana: 'レ', romaji: 're', group: 'r', strength: 1 },
	{ hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', group: 'r', strength: 1 },

	// W Group
	{ hiragana: 'わ', katakana: 'ワ', romaji: 'wa', group: 'w', strength: 1 },
	{ hiragana: 'を', katakana: 'ヲ', romaji: 'wo', group: 'w', strength: 1 },

	// N
	{ hiragana: 'ん', katakana: 'ン', romaji: 'n', group: 'n', strength: 1 },

	// Compound sounds
	// K Group compounds
	{ hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', group: 'k-compounds', strength: 1 },
	{ hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', group: 'k-compounds', strength: 1 },
	{ hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', group: 'k-compounds', strength: 1 },

	// G Group compounds
	{ hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', group: 'g-compounds', strength: 1 },
	{ hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', group: 'g-compounds', strength: 1 },
	{ hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', group: 'g-compounds', strength: 1 },

	// S Group compounds
	{ hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', group: 's-compounds', strength: 1 },
	{ hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', group: 's-compounds', strength: 1 },
	{ hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', group: 's-compounds', strength: 1 },

	// J Group compounds
	{ hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', group: 'j-compounds', strength: 1 },
	{ hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', group: 'j-compounds', strength: 1 },
	{ hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', group: 'j-compounds', strength: 1 },

	// T Group compounds
	{ hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', group: 't-compounds', strength: 1 },
	{ hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', group: 't-compounds', strength: 1 },
	{ hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', group: 't-compounds', strength: 1 },

	// N Group compounds
	{ hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', group: 'n-compounds', strength: 1 },
	{ hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', group: 'n-compounds', strength: 1 },
	{ hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', group: 'n-compounds', strength: 1 },

	// H Group compounds
	{ hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', group: 'h-compounds', strength: 1 },
	{ hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', group: 'h-compounds', strength: 1 },
	{ hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', group: 'h-compounds', strength: 1 },

	// B Group compounds
	{ hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', group: 'b-compounds', strength: 1 },
	{ hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', group: 'b-compounds', strength: 1 },
	{ hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', group: 'b-compounds', strength: 1 },

	// P Group compounds
	{ hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', group: 'p-compounds', strength: 1 },
	{ hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', group: 'p-compounds', strength: 1 },
	{ hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', group: 'p-compounds', strength: 1 },

	// M Group compounds
	{ hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', group: 'm-compounds', strength: 1 },
	{ hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', group: 'm-compounds', strength: 1 },
	{ hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', group: 'm-compounds', strength: 1 },

	// R Group compounds
	{ hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', group: 'r-compounds', strength: 1 },
	{ hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', group: 'r-compounds', strength: 1 },
	{ hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', group: 'r-compounds', strength: 1 }
];
