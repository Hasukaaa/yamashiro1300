# 🌸 山代温泉開湯1300年 - Instagram投稿ギャラリー

![山代温泉](https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=400&fit=crop&q=80)

石川県加賀市・山代温泉の開湯1300年を記念した、Instagram投稿を横スクロールで眺められる美しいギャラリーサイトです。

---

## 📋 目次

1. [プロジェクト概要](#-プロジェクト概要)
2. [実装された機能](#-実装された機能)
3. [技術スタック](#-技術スタック)
4. [プロジェクト構成](#-プロジェクト構成)
5. [セットアップと起動](#-セットアップと起動)
6. [データ構造](#-データ構造)
7. [カスタマイズ方法](#-カスタマイズ方法)
8. [デプロイ](#-デプロイ)
9. [今後の拡張案](#-今後の拡張案)

---

## 🎯 プロジェクト概要

### 対象アカウント
- **Instagram**: [@yamashiro_1300](https://www.instagram.com/yamashiro_1300/)
- **公式サイト**: [山代温泉観光協会](https://yamashiro-spa.or.jp/)

### 目的
1300年の歴史を持つ山代温泉の魅力を、Instagram投稿を通じて視覚的に魅力的な形で伝えるギャラリーサイト。

### 特徴
- ✨ **横スクロールギャラリー** - モダンで直感的なUI/UX
- 🏷️ **8つのカテゴリーフィルター** - 旅館、飲食店、温泉施設など
- 📱 **完全レスポンシブ** - あらゆるデバイスで最適表示
- 🎨 **和のデザインテイスト** - 温泉・九谷焼をイメージした配色
- ⚡ **高速パフォーマンス** - CDN配信 & 画像遅延読み込み

---

## ✨ 実装された機能

### コア機能

#### 1. 横スクロールギャラリー
- GSAP ScrollTriggerによる滑らかな水平スクロール
- マウスホイールで自然な操作
- タッチスワイプ対応（モバイル）
- 画像の遅延読み込み（Lazy Loading）

#### 2. カテゴリーフィルター
8つのカテゴリーで投稿を分類：

| カテゴリー | アイコン | 説明 |
|-----------|---------|------|
| 🏨 旅館 | 瑠璃光、たちばな四季亭など | 温泉旅館・宿泊施設 |
| 🍜 飲食店 | 割烹もりもと、炭焼チキン堂など | レストラン・居酒屋・カフェ |
| ♨️ 温泉施設 | 古総湯、山代温泉総湯など | 共同浴場・足湯スポット |
| 🎨 文化・芸術 | 九谷焼窯元、絵付け体験など | 伝統工芸・ギャラリー |
| 🌸 観光スポット | 薬王院温泉寺、源泉公園など | 見どころ・散策コース |
| 🎉 イベント | 女生水地蔵尊祭、花火大会など | 祭り・季節イベント |
| 🍱 グルメ | のどぐろ、カニ、加賀料理など | 地元グルメ・郷土料理 |
| 🛍️ お土産 | 九谷焼、温泉まんじゅうなど | 特産品・工芸品 |

#### 3. インタラクション
- **ホバーエフェクト** - 画像拡大 + 施設情報表示
- **モーダルウィンドウ** - 詳細情報の美しい表示
- **Instagram連携** - 各投稿の元投稿へのリンク
- **シェア機能** - Web Share API対応（クリップボードフォールバック）

#### 4. デザイン
- **モダンミニマルデザイン** - 余白を活かした洗練されたUI
- **和のテイスト** - 温泉・九谷焼をイメージしたカラーパレット
- **なめらかなアニメーション** - 視覚的に魅力的な動き
- **Noto日本語フォント** - 読みやすく美しいタイポグラフィ

---

## 💻 技術スタック

### フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **HTML5** | - | セマンティックマークアップ |
| **CSS3** | - | モダンスタイリング |
| **Tailwind CSS** | 3.x | ユーティリティファーストCSS |
| **Vanilla JavaScript** | ES6+ | インタラクション実装 |

### ライブラリ・CDN

| ライブラリ | バージョン | 用途 |
|-----------|-----------|------|
| **GSAP** | 3.12.5 | アニメーションライブラリ |
| **ScrollTrigger** | 3.12.5 | スクロール制御プラグイン |
| **Font Awesome** | 6.5.1 | アイコンフォント |
| **Google Fonts** | - | Noto Sans/Serif JP |

### 配色（カラーパレット）

```css
:root {
    --primary: #2B5C7F;      /* 温泉の深い青 */
    --accent: #D4AF37;       /* 九谷焼の金色 */
    --background: #F8F7F4;   /* 和紙のような温かみのあるホワイト */
    --text: #2C2C2C;         /* 落ち着いた黒 */
    --highlight: #E6755E;    /* 朱色のアクセント */
}
```

---

## 📁 プロジェクト構成

```
yamashiro-1300-gallery/
├── 📄 index.html              (19.2 KB) - メインHTMLファイル
├── 📄 README.md               - このファイル
├── 📁 data/
│   └── 📄 posts.json          (18.5 KB) - 47件の投稿データ
└── 📁 js/
    └── 📄 main.js             (10.4 KB) - メインJavaScript
```

### ファイル詳細

#### `index.html`
- レスポンシブなHTML構造
- SEO最適化（meta tags, Open Graph）
- カスタムCSS（インラインスタイル）
- CDNからのライブラリ読み込み

#### `data/posts.json`
- 47件の実際のInstagram投稿データ
- 各投稿に以下の情報を含む：
  - `id`: 一意のID（1〜47）
  - `title`: 施設名・投稿タイトル
  - `description`: 詳細な説明文
  - `category`: カテゴリー分類
  - `tags`: タグの配列
  - `imageUrl`: 画像URL（Unsplash placeholder）
  - `instagramUrl`: 実際のInstagram投稿URL
  - `postId`: Instagram投稿ID

#### `js/main.js`
- 投稿データの読み込み
- ギャラリーのレンダリング
- フィルタリング機能
- 横スクロールアニメーション（GSAP）
- モーダル管理
- シェア機能

---

## 🚀 セットアップと起動

### 必要要件
- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge）
- ローカルサーバー（推奨）

### 方法1: VS Code Live Server（推奨）

1. **VS Codeをインストール**
   ```
   https://code.visualstudio.com/
   ```

2. **Live Server拡張機能をインストール**
   - VS Codeの拡張機能タブを開く
   - "Live Server" を検索してインストール

3. **プロジェクトを開いて起動**
   ```bash
   # プロジェクトフォルダをVS Codeで開く
   code yamashiro-1300-gallery
   
   # index.htmlを右クリック → "Open with Live Server"
   ```

4. **ブラウザで確認**
   ```
   http://127.0.0.1:5500/
   ```

### 方法2: Python簡易サーバー

```bash
# Python 3の場合
python -m http.server 8000

# Python 2の場合
python -m SimpleHTTPServer 8000

# ブラウザでアクセス
# http://localhost:8000
```

### 方法3: Node.js http-server

```bash
# http-serverをグローバルインストール
npm install -g http-server

# サーバー起動
http-server -p 8000

# ブラウザでアクセス
# http://localhost:8000
```

### 方法4: そのままブラウザで開く

```bash
# index.htmlをダブルクリック
# または、ブラウザにドラッグ&ドロップ

# 注意: ローカルファイルとして開くと、
# 一部の機能（CORS制約）が動作しない可能性があります
```

---

## 📊 データ構造

### `posts.json` のスキーマ

```json
{
  "posts": [
    {
      "id": 1,
      "title": "施設名・投稿タイトル",
      "description": "詳細な説明文（150〜200文字）",
      "category": "カテゴリー名",
      "tags": ["タグ1", "タグ2", "タグ3"],
      "imageUrl": "画像URL",
      "instagramUrl": "https://www.instagram.com/p/POST_ID/",
      "postId": "POST_ID"
    }
  ]
}
```

### カテゴリー一覧

| カテゴリー | 投稿数（目安） |
|-----------|--------------|
| 旅館 | 8件 |
| 飲食店 | 6件 |
| 温泉施設 | 4件 |
| 文化・芸術 | 6件 |
| 観光スポット | 8件 |
| イベント | 4件 |
| グルメ | 7件 |
| お土産 | 4件 |
| **合計** | **47件** |

---

## 🎨 カスタマイズ方法

### 1. 投稿データの更新

`data/posts.json` を編集して投稿を追加・変更できます：

```json
{
  "id": 48,
  "title": "新しい施設名",
  "description": "魅力的な説明文を書く",
  "category": "旅館",
  "tags": ["新規", "おすすめ"],
  "imageUrl": "https://example.com/image.jpg",
  "instagramUrl": "https://www.instagram.com/p/NEW_POST_ID/",
  "postId": "NEW_POST_ID"
}
```

### 2. カラーパレットの変更

`index.html` の `<style>` セクション内の `:root` 変数を編集：

```css
:root {
    --primary: #新しい色;
    --accent: #新しい色;
    --background: #新しい色;
    --text: #新しい色;
    --highlight: #新しい色;
}
```

### 3. カテゴリーの追加

**Step 1**: `index.html` のフィルターボタンに追加

```html
<button class="filter-btn" data-category="新カテゴリー">
    <i class="fas fa-icon"></i>
    新カテゴリー
</button>
```

**Step 2**: `js/main.js` の `getCategoryIcon()` 関数に追加

```javascript
function getCategoryIcon(category) {
    const icons = {
        '旅館': '🏨',
        // ... 既存のカテゴリー
        '新カテゴリー': '🆕'  // 追加
    };
    return icons[category] || '📍';
}
```

**Step 3**: `data/posts.json` の投稿に新カテゴリーを設定

```json
{
  "category": "新カテゴリー"
}
```

### 4. フォントの変更

`index.html` の Google Fonts リンクを変更：

```html
<link href="https://fonts.googleapis.com/css2?family=新しいフォント&display=swap" rel="stylesheet">
```

CSS で適用：

```css
body {
    font-family: '新しいフォント', sans-serif;
}
```

---

## 🌐 デプロイ

### 推奨プラットフォーム

#### 1. **GitHub Pages**（無料・簡単）

```bash
# GitHubリポジトリを作成
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/yamashiro-1300.git
git push -u origin main

# Settings → Pages → Source: main → Save
# https://username.github.io/yamashiro-1300/
```

#### 2. **Netlify**（ドラッグ&ドロップ）

1. [Netlify](https://www.netlify.com/) にアクセス
2. プロジェクトフォルダをドラッグ&ドロップ
3. 自動デプロイ完了！
4. カスタムドメインも設定可能

#### 3. **Vercel**（自動デプロイ）

```bash
# Vercel CLIをインストール
npm install -g vercel

# デプロイ
cd yamashiro-1300-gallery
vercel

# プロダクションデプロイ
vercel --prod
```

#### 4. **Cloudflare Pages**（高速CDN）

1. [Cloudflare Pages](https://pages.cloudflare.com/) にアクセス
2. GitHubと連携
3. プロジェクトを選択
4. 自動デプロイ設定

---

## 📱 レスポンシブ対応

### ブレークポイント

| デバイス | 幅 | 特徴 |
|---------|-----|------|
| 🖥️ **デスクトップ** | 1024px以上 | 横スクロールギャラリー有効 |
| 📱 **タブレット** | 768px - 1023px | 最適化レイアウト |
| 📱 **モバイル** | ~767px | タッチスワイプ対応 |

### モバイル最適化

- タッチジェスチャー対応
- フォントサイズの調整
- ボタン・クリック領域の拡大
- 画像サイズの最適化

---

## 🔧 トラブルシューティング

### よくある問題

#### 1. 投稿が表示されない

**原因**: JSONファイルの読み込みエラー

**解決策**:
```bash
# ローカルサーバーを使用（CORS制約回避）
python -m http.server 8000

# ブラウザのコンソールでエラーを確認
# F12 → Console タブ
```

#### 2. 横スクロールが動作しない

**原因**: デスクトップ以外のデバイス、または画面幅が不足

**解決策**:
- デスクトップ（1024px以上）で確認
- ブラウザの幅を広げる
- `js/main.js` の `initHorizontalScroll()` 関数を確認

#### 3. 画像が表示されない

**原因**: 画像URLの問題

**解決策**:
```javascript
// posts.json の imageUrl を確認
// onerror 属性でフォールバック画像を表示
onerror="this.src='https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=800&fit=crop&q=80'"
```

#### 4. フィルターが機能しない

**原因**: カテゴリー名の不一致

**解決策**:
- `posts.json` の `category` フィールドを確認
- スペルミスや全角/半角の違いをチェック

---

## 🎯 今後の拡張案

### 短期的な改善（1〜2週間）

- [ ] 実際のInstagram投稿画像の取得（Instagram Graph API）
- [ ] より多くの投稿データの追加（50〜100件）
- [ ] SEO最適化（sitemap.xml, robots.txt）
- [ ] OGP画像の最適化
- [ ] パフォーマンス計測とチューニング

### 中期的な機能追加（1〜2ヶ月）

- [ ] 検索機能の実装
- [ ] お気に入り機能（LocalStorage）
- [ ] ライトボックスギャラリー
- [ ] 地図統合（Google Maps）
- [ ] カテゴリーごとのページ分割
- [ ] アクセス解析（Google Analytics）

### 長期的な展開（3ヶ月以上）

- [ ] 多言語対応（英語、中国語、韓国語）
- [ ] CMS統合（WordPress, Contentful）
- [ ] 管理画面の実装
- [ ] ユーザー投稿機能（#ハッシュタグ連携）
- [ ] AR/VR体験の統合
- [ ] PWA化（オフライン対応）

---

## 📚 参考リンク

### 公式サイト
- [山代温泉観光協会](https://yamashiro-spa.or.jp/)
- [山代温泉開湯1300年事業](https://yamashiro-spa.or.jp/1300-year-project/)
- [Instagram @yamashiro_1300](https://www.instagram.com/yamashiro_1300/)

### 技術ドキュメント
- [GSAP - GreenSock Animation Platform](https://greensock.com/gsap/)
- [ScrollTrigger Plugin](https://greensock.com/scrolltrigger/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

### デザインリファレンス
- [Awwwards - Horizontal Scrolling](https://www.awwwards.com/awwwards_collections/collections/horizontal-layout-websites/)
- [SANKOU! - 横スクロール](https://sankoudesign.com/category/horizontalscroll/)

---

## 👥 開発チーム

### 作成者
- **プロジェクト**: 山代温泉開湯1300年記念 Instagramギャラリー
- **対象**: [@yamashiro_1300](https://www.instagram.com/yamashiro_1300/)
- **技術スタック**: HTML5, CSS3, JavaScript (ES6+), GSAP

### コントリビュート
このプロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

```
MIT License

Copyright (c) 2025 山代温泉観光協会

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 謝辞

- **山代温泉観光協会** - プロジェクトのサポートと素晴らしいコンテンツ
- **Instagram @yamashiro_1300** - 魅力的な投稿の提供
- **GreenSock (GSAP)** - 素晴らしいアニメーションライブラリ
- **Unsplash** - 高品質なプレースホルダー画像

---

## 📞 お問い合わせ

### 山代温泉観光協会
- **公式サイト**: https://yamashiro-spa.or.jp/
- **Instagram**: [@yamashiro_1300](https://www.instagram.com/yamashiro_1300/)
- **住所**: 〒922-0256 石川県加賀市山代温泉
- **電話**: 0761-77-xxxx（観光協会）

### 技術サポート
- **GitHub Issues**: プロジェクトリポジトリのIssuesタブ
- **Email**: support@example.com（仮）

---

<div align="center">

## 🌸 YAMASHIRO 1300 🌸

**1300年の歴史を未来へ**

Made with ❤️ for 山代温泉

[公式サイト](https://yamashiro-spa.or.jp/) | [Instagram](https://www.instagram.com/yamashiro_1300/) | [1300年事業](https://yamashiro-spa.or.jp/1300-year-project/)

---

**⭐ このプロジェクトが気に入ったら、GitHubでスターをつけてください！**

</div>
