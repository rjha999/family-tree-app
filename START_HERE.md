# 🚀 FIRST TIME SETUP - RUN THESE COMMANDS

## Step 1: Install Angular Dependencies (REQUIRED - First Time Only)

Open PowerShell in VS Code and run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeApp
npm install
```

⏱️ This will take 2-5 minutes. Wait until it completes!

---

## Step 2: Start the Backend API

Open a NEW PowerShell terminal (Terminal → New Terminal) and run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeAPI
dotnet run
```

✅ You should see:
```
Now listening on: https://localhost:7071
```

⚠️ **KEEP THIS TERMINAL OPEN!**

---

## Step 3: Start the Frontend

Open ANOTHER NEW PowerShell terminal and run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeApp
npm start
```

✅ You should see:
```
** Angular Live Development Server is listening on localhost:4200 **
```

Your browser will open automatically to http://localhost:4200

⚠️ **KEEP THIS TERMINAL OPEN TOO!**

---

## ✨ That's it! You're ready to use the app!

You should now see:
- 🌐 Browser opened to http://localhost:4200
- 🌳 Family Tree Dashboard with 3 sample members
- 🎯 "Manage Family Members" button to add/edit/delete

---

## 📝 Quick Tips

- **You need both terminals running** (backend + frontend)
- Close terminals when done (Ctrl+C in each)
- Next time, skip Step 1 (npm install) - just run Steps 2 & 3

---

## 🐛 If Something Goes Wrong

### "npm is not recognized"
- Install Node.js from https://nodejs.org/ (LTS version)

### "dotnet is not recognized"  
- Install .NET 8 SDK from https://dotnet.microsoft.com/download

### "Scripts disabled" error
Run once as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port already in use
Someone is using port 4200 or 7071. Either:
- Close other apps using those ports
- Or change ports in angular.json / launchSettings.json

---

## 🎉 Alternative: Use the Batch File

After running `npm install` once, you can use:

```cmd
start-app.bat
```

This will start both servers automatically!
