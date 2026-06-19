# 🎭 朝までそれ異端

一番異端な回答を投票で決めるパーティーゲーム！

## 🚀 Vercel へのデプロイ方法（推奨・最速）

### ステップ 1: GitHub にコードをアップロード

1. **GitHub でリポジトリを作成**
   - https://github.com/new にアクセス
   - Repository name: `asayoru-itan`
   - Create repository をクリック

2. **ローカルで Git を初期化**
   ```bash
   cd asayoru-itan
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/asayoru-itan.git
   git push -u origin main
   ```
   （YOUR_USERNAME はあなたの GitHub ユーザー名に置き換え）

### ステップ 2: Vercel にデプロイ

1. https://vercel.com にアクセス
2. GitHub でサインアップ/ログイン
3. 「Import Project」をクリック
4. `asayoru-itan` リポジトリを選択
5. 「Deploy」をクリック
6. デプロイ完了！ URL が自動生成されます

**例:** `https://asayoru-itan.vercel.app`

---

## 🌐 Netlify へのデプロイ方法（別オプション）

1. https://netlify.com にアクセス
2. GitHub でサインアップ/ログイン
3. 「New site from Git」をクリック
4. `asayoru-itan` リポジトリを選択
5. Build command: `npm run build`
6. Publish directory: `build`
7. 「Deploy」をクリック

---

## 🏠 ローカル開発環境での実行

### セットアップ

```bash
# Node.js がインストールされていることを確認
node --version

# npm dependencies をインストール
npm install

# 開発サーバーを起動
npm start
```

ブラウザで http://localhost:3000 が自動で開きます

### ビルド

本番用にビルド：
```bash
npm run build
```

`build/` フォルダに最適化されたファイルが生成されます

---

## 📁 ファイル構成

```
asayoru-itan/
├── public/
│   └── index.html          # HTMLテンプレート
├── src/
│   ├── App.jsx             # メインコンポーネント
│   ├── App.css             # スタイル
│   ├── index.js            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── package.json            # 依存パッケージ
├── .gitignore              # Git無視ファイル
└── README.md               # このファイル
```

---

## 🎮 ゲームの遊び方

1. **ゲーム作成**：「新しいゲーム作成」をクリック
2. **セッションID を共有**：友達に ID をコピーして送信
3. **プレイヤー追加**：各プレイヤーが名前を入力
4. **質問を追加**：複数の質問をセットアップ
5. **ゲーム開始**：全員の準備ができたらスタート
6. **回答**：各プレイヤーが独自な答えを入力
7. **投票**：全員が「一番異端」だと思う回答に投票
8. **勝者決定**：最も投票を集めた人が勝利！

---

## 🔧 カスタマイズ

### タイトルを変更
`src/App.jsx` の 48 行目：
```javascript
<h1 className="title">🎭 朝までそれ異端</h1>
```

### 色を変更
`src/App.css` で以下を編集：
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## ⚡ トラブルシューティング

**デプロイ後に真っ白な画面が表示される**
- ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
- 開発者ツール（F12）でコンソールエラーを確認

**ローカルで `npm install` がエラーになる**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 ライセンス

MITライセンス

---

## 🎉 楽しいゲームを！

友達と朝までゲームを楽しんでください！

何か問題があれば、エラーメッセージをコピーして検索するか、
開発者ツール（F12）で詳細を確認してください。
