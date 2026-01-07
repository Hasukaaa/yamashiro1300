# 🚀 クイックスタートガイド

山代温泉開湯1300年 Instagramギャラリーをすぐに始めるためのシンプルなガイドです。

---

## ⚡ 5分でスタート

### ステップ 1: プロジェクトを取得

```bash
# GitHubからクローン（リポジトリが公開されている場合）
git clone https://github.com/username/yamashiro-1300-gallery.git
cd yamashiro-1300-gallery

# または、ZIPファイルをダウンロードして解凍
```

### ステップ 2: ローカルサーバーを起動

**オプション A: VS Code Live Server（推奨）**
```bash
# VS Codeでプロジェクトを開く
code .

# index.htmlを右クリック → "Open with Live Server"
```

**オプション B: Python**
```bash
# Python 3
python -m http.server 8000

# ブラウザで http://localhost:8000 を開く
```

**オプション C: Node.js**
```bash
# http-serverをインストール
npm install -g http-server

# サーバー起動
http-server -p 8000
```

### ステップ 3: ブラウザで確認

```
http://localhost:8000
または
http://127.0.0.1:8000
```

✅ **完成！** ギャラリーサイトが表示されます！

---

## 📁 プロジェクト構成（シンプル版）

```
📦 yamashiro-1300-gallery
├── 📄 index.html        ← メインページ
├── 📁 data/
│   └── 📄 posts.json    ← 投稿データ（47件）
└── 📁 js/
    └── 📄 main.js       ← JavaScript
```

---

## 🎨 基本的な使い方

### 1. ギャラリーの閲覧
- **デスクトップ**: マウスホイールで横スクロール
- **モバイル**: 指でスワイプ

### 2. フィルター
- 上部のカテゴリーボタンをクリック
- 8つのカテゴリー: 旅館、飲食店、温泉施設など

### 3. 詳細表示
- 画像をクリックでモーダル表示
- Instagram投稿へのリンク
- シェア機能

---

## ✏️ データの編集

### 投稿を追加・編集

`data/posts.json` を開いて編集：

```json
{
  "id": 48,
  "title": "新しい施設名",
  "description": "魅力的な説明",
  "category": "旅館",
  "tags": ["タグ1", "タグ2"],
  "imageUrl": "画像URL",
  "instagramUrl": "https://www.instagram.com/p/POST_ID/",
  "postId": "POST_ID"
}
```

**保存して再読み込み** → 新しい投稿が表示されます！

---

## 🎨 色を変更

`index.html` の `<style>` セクション内：

```css
:root {
    --primary: #2B5C7F;      /* メインカラー */
    --accent: #D4AF37;       /* アクセント */
    --background: #F8F7F4;   /* 背景 */
    --text: #2C2C2C;         /* テキスト */
    --highlight: #E6755E;    /* ハイライト */
}
```

**色コードを変更** → サイトの雰囲気が変わります！

---

## 🌐 すぐにデプロイ

### GitHub Pages（無料）

```bash
# GitHubリポジトリを作成
git init
git add .
git commit -m "Initial commit"
git push origin main

# Settings → Pages → Source: main → Save
```

### Netlify（超簡単）

1. https://www.netlify.com/ にアクセス
2. プロジェクトフォルダをドラッグ&ドロップ
3. 完了！

---

## ❓ よくある質問

### Q: 投稿が表示されない
**A:** ローカルサーバーを使用していますか？  
`python -m http.server 8000` で起動してください。

### Q: 横スクロールが動かない
**A:** デスクトップ（1024px以上）で確認してください。  
モバイルではスワイプで操作できます。

### Q: 画像が壊れている
**A:** `posts.json` の `imageUrl` を確認してください。  
Unsplashなどの有効なURLを使用してください。

### Q: カテゴリーを追加したい
**A:** 
1. `index.html` のフィルターボタンを追加
2. `js/main.js` の `getCategoryIcon()` にアイコン追加
3. `posts.json` で新カテゴリーを使用

---

## 🎓 次のステップ

1. ✅ **データをカスタマイズ** - `posts.json` を編集
2. ✅ **色を変更** - カラーパレットを調整
3. ✅ **デプロイ** - GitHub Pages や Netlify で公開
4. ✅ **拡張機能を追加** - README.md の「今後の拡張案」を参照

---

## 📚 詳細ドキュメント

より詳しい情報は **README.md** をご覧ください：

- 完全な機能リスト
- 技術スタック詳細
- カスタマイズ方法
- トラブルシューティング
- 拡張案

---

## 💬 サポート

困ったことがあれば：

1. **README.md** のトラブルシューティングセクションを確認
2. **ブラウザのコンソール**（F12）でエラーを確認
3. **GitHub Issues** で質問を投稿

---

<div align="center">

## 🌸 山代温泉開湯1300年 🌸

**簡単・美しい・高速なギャラリーサイト**

[公式サイト](https://yamashiro-spa.or.jp/) | [Instagram](https://www.instagram.com/yamashiro_1300/)

---

**楽しいギャラリー体験を！** ⭐

</div>
