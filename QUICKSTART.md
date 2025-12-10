# Quick Start Guide for Family Tree Application

## Step 1: Install Frontend Dependencies

Open PowerShell and run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeApp
npm install
```

This will install all Angular dependencies (may take a few minutes).

## Step 2: Start the Backend API

Open a new PowerShell window and run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeAPI
dotnet run
```

The API will start at `https://localhost:7071` (check the console output for the exact URL).
**Keep this window open** - the API needs to stay running.

## Step 3: Start the Frontend Application

In another PowerShell window, run:

```powershell
cd d:\Dev_RJ\Development\React\Tree\FamilyTreeApp
npm start
```

The Angular app will compile and start at `http://localhost:4200`.
Your browser should open automatically. If not, navigate to `http://localhost:4200`.

## Step 4: Use the Application

1. **Dashboard**: View the family tree visualization and all members
2. **Manage Members**: Click the "Manage Family Members" button to:
   - Add new family members
   - Edit existing members
   - Delete members
   - Set up family relationships (father, mother, spouse)

## Troubleshooting

### If npm install fails:
- Make sure you have Node.js 18+ installed
- Try: `npm cache clean --force` then `npm install` again

### If the API doesn't start:
- Verify you have .NET SDK 8.0 installed: `dotnet --version`
- Try: `dotnet restore` then `dotnet run`

### If you see CORS errors:
- Make sure the backend API is running
- Check that the API URL in `src/app/services/family-member.service.ts` matches your backend URL
- The default is `https://localhost:7071/api/FamilyMembers`

### If PowerShell script execution is blocked:
Run this command once (as Administrator):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Default Data

The application comes with 3 sample family members:
- John Doe (grandfather)
- Jane Doe (grandmother, spouse of John)
- Michael Doe (son of John and Jane)

You can edit or delete these and add your own family members!

## Next Steps

After everything is running:
1. Try adding your own family members
2. Set up relationships between members
3. View how the family tree visualization updates
4. Explore the different features of the application

Enjoy building your family tree! 🌳
