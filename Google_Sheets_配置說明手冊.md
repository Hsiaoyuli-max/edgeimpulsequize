# Edge Impulse 問卷 - Google Sheets 配置說明手冊

## 概述

本手冊將協助您配置 Google Sheets，以接收來自 Edge Impulse Mini Game 問卷的填答資料。

---

## Google Sheets 欄位配置

### 必要欄位清單（共 17 欄）

請在 Google Sheets 的第一列（標題列）依序建立以下欄位：

| 欄位編號 | 欄位名稱 | 說明 | 資料類型 |
|---------|---------|------|---------|
| A | **timestamp** | 填答時間戳記 | 日期時間 |
| B | **name** | 填答者姓名 | 文字 |
| C | **phone** | 填答者電話 | 文字 |
| D | **country** | 填答者國家 | 文字 |
| E | **email** | 填答者工作信箱 | 文字 |
| F | **company** | 填答者公司 | 文字 |
| G | **title** | 填答者職稱 | 文字 |
| H | **question_1** | 問題 1：是否使用過 Edge AI 模型 | 文字 |
| I | **question_2** | 問題 2：建構 Edge AI 最大挑戰 | 文字 |
| J | **question_3** | 問題 3：想建立的應用 | 文字 |
| K | **question_3_other** | 問題 3 的其他選項輸入 | 文字 |
| L | **question_4** | 問題 4：使用的硬體平台 | 文字 |
| M | **question_4_other** | 問題 4 的其他選項輸入 | 文字 |
| N | **question_5** | 問題 5：PoC 到部署的期望時間 | 文字 |
| O | **question_6** | 問題 6：想在 Demo 中學習的內容 | 文字 |
| P | **question_7** | 問題 7：感興趣的活動類型 | 文字 |
| Q | **question_8** | 問題 8：是否願意接收更新和資源 | 文字 |
| R | **raw_score** | 原始分數（計算用） | 數字 |
| S | **final_score** | 最終分數（90-100分） | 數字 |
| T | **result_band** | 結果等級（Explorer/Builder/Integrator/Pro） | 文字 |

---

## 詳細配置步驟

### 步驟 1：建立 Google Sheets

1. 登入您的 Google 帳號
2. 前往 [Google Sheets](https://sheets.google.com)
3. 點選「空白」建立新試算表
4. 將試算表命名為：**Edge Impulse Quiz Responses** （或您偏好的名稱）

### 步驟 2：設定標題列

在第 1 列（Row 1）依序輸入以下欄位名稱：

```
A1: timestamp
B1: name
C1: phone
D1: country
E1: email
F1: company
G1: title
H1: question_1
I1: question_2
J1: question_3
K1: question_3_other
L1: question_4
M1: question_4_other
N1: question_5
O1: question_6
P1: question_7
Q1: question_8
R1: raw_score
S1: final_score
T1: result_band
```

### 步驟 3：格式化標題列（建議）

1. 選取第 1 列
2. **粗體**：點選工具列的 **B** 按鈕
3. **背景色**：選擇淺灰色或淺藍色
4. **凍結列**：選單 → 檢視 → 凍結 → 1 列

### 步驟 4：設定欄位格式（建議）

- **A 欄 (timestamp)**：格式 → 數字 → 日期時間
- **R 欄 (raw_score)**：格式 → 數字 → 數字
- **S 欄 (final_score)**：格式 → 數字 → 數字
- **其他欄位**：保持純文字格式

---

## 問題選項對照表

為了方便您理解資料內容，以下是各問題的選項：

### Question 1: Have you ever used Edge AI models in your projects?
- No, but I'm interested
- Tried some demos
- Currently integrating into a product

### Question 2: What is your biggest challenge when building Edge AI models?
- Collecting and labeling data
- Lack of coding skills
- Deploying models to hardware
- Unsure which platform/framework to choose

### Question 3: If you had a no-code, drag-and-drop training tool, which application would you build first?
- Visual defect detection
- Audio anomaly detection
- Healthcare / vital signs monitoring
- Smart retail / people counting
- Other (please specify) → 會填入 `question_3_other` 欄位

### Question 4: Which hardware platform do you mostly use for development?
- Qualcomm
- NVIDIA Jetson
- STM32 / Arduino
- Other (please specify) → 會填入 `question_4_other` 欄位

### Question 5: How fast would you like to go from PoC to deployment?
- Within 1 week
- 1–2 months
- 3+ months

### Question 6: If there's a 30-minute live demo of Edge Impulse, what would you like to learn?
- How to quickly train a model
- How to deploy to hardware
- How to collect / clean datasets
- Real project demo showcase

### Question 7: What kind of activity would you be most interested in joining?
- Lightweight live tutorial
- On-demand video
- Hackathon / challenge

### Question 8: Would you like to leave your Email / LinkedIn to receive updates and free resources?
- Yes
- No

---

## 設定 Google Apps Script（準備接收資料）

### 步驟 1：開啟 Apps Script 編輯器

1. 在您的 Google Sheets 中，點選上方選單：**擴充功能** → **Apps Script**
2. 會開啟新分頁，顯示 Apps Script 編輯器

### 步驟 2：建立接收資料的函數

刪除預設程式碼，貼上以下程式碼：

```javascript
function doPost(e) {
  try {
    // 取得當前試算表的第一個工作表
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析傳入的 JSON 資料
    const data = JSON.parse(e.postData.contents);
    
    // 建立新列資料陣列
    const row = [
      new Date(),                    // timestamp
      data.name || '',               // name
      data.phone || '',              // phone
      data.country || '',            // country
      data.email || '',              // email
      data.company || '',            // company
      data.title || '',              // title
      data.question_1 || '',         // question_1
      data.question_2 || '',         // question_2
      data.question_3 || '',         // question_3
      data.question_3_other || '',   // question_3_other
      data.question_4 || '',         // question_4
      data.question_4_other || '',   // question_4_other
      data.question_5 || '',         // question_5
      data.question_6 || '',         // question_6
      data.question_7 || '',         // question_7
      data.question_8 || '',         // question_8
      data.raw_score || 0,           // raw_score
      data.final_score || 0,         // final_score
      data.result_band || ''         // result_band
    ];
    
    // 新增資料到試算表
    sheet.appendRow(row);
    
    // 回傳成功訊息
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 回傳錯誤訊息
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試用函數
function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script is working!');
}
```

### 步驟 3：部署為網路應用程式

1. 點選上方 **部署** → **新增部署作業**
2. 點選「選取類型」旁的齒輪圖示 ⚙️
3. 選擇 **網路應用程式**
4. 設定如下：
   - **描述**：Edge Impulse Quiz API
   - **執行身分**：選擇「我」
   - **具有應用程式存取權的使用者**：選擇「所有人」
5. 點選 **部署**
6. 授權存取（如果首次使用需要授權）
7. **複製網路應用程式網址** （這個很重要！）

網址格式類似：
```
https://script.google.com/macros/s/AKfycbz.../exec
```

---

## 整合到網站程式

### 將 Web App URL 加入程式碼

請將上一步驟取得的網路應用程式網址，提供給開發人員，以便整合到 `script.js` 中。

在 `script.js` 的 `leadForm.addEventListener("submit", ...)` 事件中，需要加入以下功能：

1. 收集所有問題的答案
2. 收集聯絡資訊
3. 計算分數和結果等級
4. 透過 HTTP POST 傳送到 Google Sheets

範例程式碼架構：
```javascript
const formData = {
  name: form.name.value,
  phone: form.phone.value,
  country: form.country.value,
  email: form.email.value,
  company: form.company.value,
  title: form.title.value,
  question_1: QUIZ.questions[0].options[state.answers[0]].label,
  question_2: QUIZ.questions[1].options[state.answers[1]].label,
  // ... 其他問題
  raw_score: rawScore,
  final_score: finalScore,
  result_band: band.text
};

// 傳送到 Google Sheets
fetch('您的 Google Apps Script 網址', {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## 測試步驟

### 1. 測試 Apps Script

在 Apps Script 編輯器中：
1. 選擇 `doGet` 函數
2. 點選 **執行**
3. 檢查執行記錄是否顯示 "Google Apps Script is working!"

### 2. 測試資料寫入

1. 完成網站整合後，實際填寫一次問卷
2. 檢查 Google Sheets 是否新增了一列資料
3. 確認所有欄位都正確填入

### 3. 檢查清單

- Google Sheets 標題列正確設定（20 個欄位）
- Apps Script 程式碼已貼上並儲存
- 已部署為網路應用程式
- 已複製網路應用程式網址
- 網址已提供給開發人員整合
- 測試填答後資料正確寫入

---

## 隱私權與安全性建議

1. **限制存取權限**：在 Google Sheets 設定中，限制只有特定人員可以檢視/編輯
2. **定期備份**：建議定期匯出資料進行備份
3. **資料加密**：如需處理敏感資料，考慮額外加密措施
4. **GDPR 合規**：如涉及歐盟用戶，需注意 GDPR 規範

---

## 後續支援

如果您在配置過程中遇到問題，請檢查：

1. Google Sheets 欄位名稱是否與手冊完全一致（區分大小寫）
2. Apps Script 是否已正確部署
3. 網路應用程式權限是否設定為「所有人」
4. 程式碼中的 API 網址是否正確

---

## 附錄：資料範例

以下是一筆完整資料的範例：

| timestamp | name | phone | country | email | company | title | question_1 | question_2 | question_3 | question_3_other | question_4 | question_4_other | question_5 | question_6 | question_7 | question_8 | raw_score | final_score | result_band |
|-----------|------|-------|---------|-------|---------|-------|------------|------------|------------|------------------|------------|------------------|------------|------------|------------|------------|-----------|-------------|-------------|
| 2025/1/24 14:30 | John Doe | +886 912345678 | Taiwan | john@example.com | ABC Tech | Engineer | Tried some demos | Deploying models to hardware | Healthcare / vital signs monitoring | | NVIDIA Jetson | | 1–2 months | How to deploy to hardware | Hackathon / challenge | Yes | 23 | 97 | Integrator — You're close to production. Let's review hardware targets and scaling. |

---

**配置完成後，您就可以開始收集問卷資料了！**
