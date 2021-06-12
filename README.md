# Todo List via MySQL

### Demo用帳號密碼

root@example.com
12345678

### 安裝

1. 將專案複製到你的電腦上:
   ```sh
   git clone https://github.com/wlcharlie/todo-sequelize
   ```
2. 進入到資料夾:
    ```sh
    cd todo-sequelize
    ```
3. 用npm安裝套件 
   ```sh
   npm install
   ```
4. 安裝(導入)資料 *資料只要導入一次即可*
   ```sh
   npx sequelize db:seed:all
   ```
5. 執行
   ```sh
   npm run dev
   ```
6. 確認出現這行提示代表成功：
    ```sh
    IS WORKING! Head to http://localhost:3000
    ```
    於瀏覽器輸入網址：http://localhost:3000
7. 結束
    * 在終端機上按下Crtl + C

### About Me
Charlie