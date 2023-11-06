# Killtime Tetris

This is a version of Tetris that doesn't increase the level and always stays at the same speed on "Relax" mode. Play relaxing, not crazy.

## 關於本遊戲

經常想玩俄羅斯方塊來殺時間，但為什麼這遊戲一定要設計成速度越來越快越難玩？於是興起自己寫個不會增加速度，只有分數和行數在跳，可以悠閒去玩的俄羅斯方塊。

本程式修改自 farteryhr 開放於 GitHub 的原始碼。這位高手把所有我想要的都做好了，因此我只是把程式整理成我想要的樣式而已。感謝他實現了我的夢想。（ http://github.com/farteryhr/tetr.js/ ）

音樂素材出自 TAM Music Factory。TAM 是位很棒的音樂創作者，我設計的小遊戲都使用他的音樂，效果很棒，每次都讓我感到十分滿意！TAM 創作無數的遊戲音樂，請瀏覽他的網站聆聽那些動聽的旋律吧！（ http://www.tam-music.com ）

最後感謝 Simon Laroche，這 tetr.js 最早是由他設計出來的。（ http://github.com/simonlc/tetr.js/ ）

我只是打造個可悠閒打發時間的俄羅斯方塊單機遊戲，因此簡單精巧為主，除了把背景、樣式、音樂整理好以外，鮮少加強功能，甚至移除線上專用的功能。若你喜歡這遊戲，那一定要玩進一步加強 farteryhr 版本的 Tetr.js Enhanced！這版本不但可讓玩家自行調整玩法的細節，聲光特效也一應俱全，特別是遊戲框會搖動，超酷的！（ http://doktorocelot.com/tetr.js/ ）

## 下載與執行

請按 Code，再按 Download ZIP，即可下載本遊戲。

解壓縮下載的檔案，使用基於 Chromium 的瀏覽器開啟 play.html，即可執行遊戲。不建議使用基於 Firefox 的瀏覽器，它對本機端網頁的執行，加諸過多規範外的限制，導致 HTML5 規範好的功能無法正常運作，不適合做為單機網頁應用程式平台。

## 中英切換

在 Settings 的 Language 項目可切換 Chinese 和 English。

## 遊戲模式

* 悠閒模式（Relax）

  不會增加速度，也沒有時間限制，想殺時間時可以悠閒的玩下去。

* 打坐模式（Zen）

  定 200 行目標消除方塊，就像給自己定下打坐兩小時的目標一樣。

* 長跑模式（Marathon）

  符合現代俄羅斯方塊規則的標準玩法，會隨等級提升速度。

* 衝刺模式（Sprint）

  以最快時間消除 40 行方塊。

* 鑽地模式（Driller）

  遊戲一開始就堆積方塊，玩家必須全部清除。

* 挖掘模式（Dig）

  會不斷從底部堆積方塊。

* 其他

  其他高難度的遊戲模式。

## 設定

* 久按時間（DAS；Delayed Auto Shift）

  按住不放時，多久後自動重複按鍵功能。越低操作起來越靈敏，按一下就很滑。

  高手玩 Marathon 模式時，為應付高 LEVEL 的掉落速度，會調整這項數據才趕得及左右移動。但本俄羅斯方塊主打 Relax 模式，因此將預設值從 9 修改為 12。

* 久按加速（ARR；Auto Repeat Rate）

  按住不放而重複按鍵功能的間隔時間。越低越快，一加速就飛走。

  加速度太高的話容易誤判而失誤，像是按 Space 後卻掉落在另一格位置，因此我將預設值從 1 修改為 4，操作起來會顯得笨重。

* 自然落速（Gravity）

  方塊自然往下掉落的速度。

* 手動落速（Soft Drop）

  按 ↓ 時掉落的速度。

* 著地時效（Lock Delay）

  方塊剛著地時，多久才會鎖住不動。

* 遊戲廠牌（Rotation System）

  像是 Tengen、Nintendo、DX、N-Blox … 不同發行商的版本，會影響方塊起點、旋轉位移、方塊顏色。

## 無法播放音樂

由於大家都很討厭網站自動播放音樂，因此各家瀏覽器紛紛禁止自動播放音樂。這也導致你在單機執行這網頁遊戲的話，非常有可能無法播放音樂。

每家網頁瀏覽器設定的方案不一樣，以 Chromium 系列來講，在 chrome.exe 後面加入參數：

--autoplay-policy=no-user-gesture-required

即可自動播放音樂。

## 程式不正常執行

tetr.js 會把遊戲設定寫入 cookie，且容易因為 cookie 資料有誤，導致遊戲執行起來不正常顯示，像是功能失效或樣式消失之類。

這時必須把 cookie 資料刪除，重新執行遊戲。

每家網頁瀏覽器刪除 cookie 的做法不一樣，以 Chromium 系列來講，可以在網址列前頭的圖示點一下，就會看到這網頁遊戲使用 cookie 的訊息，點進去就能刪除這筆 cookie。

## 平板電腦或手機

farteryhr 為這遊戲設計了能在平板或手機操作的介面。

在畫面右上角，有個若隱若現的手指圖示，按一下可以顯示操作介面。