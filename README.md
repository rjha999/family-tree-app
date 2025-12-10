# Family Tree Application

A full-stack Family Tree application built with Angular (frontend) and .NET Core 8.0 Web API (backend).

## Features

### 1. Dashboard/Landing Screen
- Visualizes the family tree in a hierarchical format
- Displays family members with their relationships
- Shows member details including name, gender, date of birth, age
- Lists all family members in a table format
- Color-coded member cards for better visualization

### 2. Manage Members Screen
- Add new family members
- Edit existing member information
- Delete family members (with relationship validation)
- Set family relationships (father, mother, spouse)
- Store additional information (email, phone, occupation, address, notes)

## Technology Stack

### Backend
- **.NET Core 8.0** Web API
- **Entity Framework Core** with In-Memory Database
- RESTful API architecture
- CORS enabled for Angular frontend

### Frontend
- **Angular 19** (standalone components)
- **TypeScript**
- **Reactive Forms**
- **RxJS** for async operations
- Responsive CSS design

## Project Structure

```
Tree/
├── FamilyTreeAPI/              # Backend .NET Core Web API
│   ├── Controllers/
│   │   └── FamilyMembersController.cs
│   ├── Data/
│   │   └── FamilyTreeContext.cs
│   ├── Models/
│   │   └── FamilyMember.cs
│   └── Program.cs
│
└── FamilyTreeApp/              # Frontend Angular Application
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── dashboard/
    │   │   │   └── manage-members/
    │   │   ├── models/
    │   │   │   └── family-member.model.ts
    │   │   ├── services/
    │   │   │   └── family-member.service.ts
    │   │   ├── app.component.*
    │   │   └── app.routes.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Prerequisites
- **.NET SDK 8.0** or higher
- **Node.js 18+** and npm
- Any modern web browser

### Backend Setup

1. Navigate to the API directory:
   ```powershell
   cd FamilyTreeAPI
   ```

2. Restore dependencies (already done during project creation):
   ```powershell
   dotnet restore
   ```

3. Run the API:
   ```powershell
   dotnet run
   ```

   The API will start at `https://localhost:7071` (or the port shown in the console)

### Frontend Setup

1. Navigate to the Angular app directory:
   ```powershell
   cd FamilyTreeApp
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Update the API URL if needed:
   - Open `src/app/services/family-member.service.ts`
   - Update the `apiUrl` variable to match your backend URL

4. Run the Angular application:
   ```powershell
   npm start
   ```

   The app will start at `http://localhost:4200`

## API Endpoints

### Family Members
- `GET /api/FamilyMembers` - Get all family members
- `GET /api/FamilyMembers/{id}` - Get a specific member
- `GET /api/FamilyMembers/tree` - Get family tree with computed data
- `POST /api/FamilyMembers` - Create a new member
- `PUT /api/FamilyMembers/{id}` - Update a member
- `DELETE /api/FamilyMembers/{id}` - Delete a member

## Usage Guide

### Adding a Family Member
1. Click "Manage Family Members" from the dashboard
2. Click "Add New Member"
3. Fill in the member details
4. Optionally set relationships (father, mother, spouse)
5. Click "Add Member"

### Editing a Family Member
1. Go to "Manage Family Members"
2. Find the member card
3. Click "Edit"
4. Update the information
5. Click "Update Member"

### Deleting a Family Member
1. Go to "Manage Family Members"
2. Find the member card
3. Click "Delete"
4. Confirm the deletion
   - Note: Members with relationships cannot be deleted until relationships are removed

### Viewing the Family Tree
- The dashboard automatically displays the family tree
- Root members (those without parents) are shown first
- Children are displayed below their parents
- A table view shows all members with their relationships

## Initial Data

The application comes with sample data:
- John Doe (Male, born 1950)
- Jane Doe (Female, born 1952, spouse of John)
- Michael Doe (Male, born 1975, son of John and Jane)

## Features to Extend

Potential enhancements:
- File upload for member photos
- Export family tree as PDF or image
- Search and filter functionality
- Multiple family tree support
- Authentication and user accounts
- SQL Server database instead of in-memory
- More complex tree visualization (D3.js, vis.js)
- Import/Export data (JSON, CSV)

## Troubleshooting

### API Connection Issues
- Ensure the backend is running before starting the frontend
- Check that CORS is properly configured
- Verify the API URL in the Angular service matches the backend URL

### Port Conflicts
- Backend default port: 7071 (HTTPS)
- Frontend default port: 4200
- Change ports in `launchSettings.json` (backend) or `angular.json` (frontend) if needed

### Build Errors
- Ensure all dependencies are installed (`npm install` for frontend)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall if needed

## License

This project is created for educational purposes.
