# Application Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                               │
│                      http://localhost:4200                           │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP Requests
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ANGULAR FRONTEND (Port 4200)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  App Component (Root)                                        │   │
│  │  - Navigation Bar                                            │   │
│  │  - Router Outlet                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                          │                                           │
│                          │ Routes                                    │
│                          ▼                                           │
│  ┌─────────────────────────┐      ┌──────────────────────────────┐ │
│  │  Dashboard Component     │      │  Manage Members Component    │ │
│  │  ────────────────────    │      │  ─────────────────────────   │ │
│  │  - Family Tree View      │      │  - Member Cards Grid         │ │
│  │  - Table View            │      │  - Add/Edit Modal            │ │
│  │  - Member Details        │      │  - Delete Functionality      │ │
│  └─────────────────────────┘      └──────────────────────────────┘ │
│                          │                    │                      │
│                          └────────┬───────────┘                      │
│                                   │                                  │
│                                   ▼                                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Family Member Service                                        │  │
│  │  ────────────────────                                         │  │
│  │  - getAllMembers()                                            │  │
│  │  - getFamilyTree()                                            │  │
│  │  - createMember()                                             │  │
│  │  - updateMember()                                             │  │
│  │  - deleteMember()                                             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                   │                                  │
└───────────────────────────────────┼──────────────────────────────────┘
                                    │
                                    │ HTTP Requests (CORS Enabled)
                                    │ https://localhost:7071/api
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│               .NET CORE WEB API (Port 7071)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  FamilyMembersController                                      │  │
│  │  ────────────────────────                                     │  │
│  │  GET    /api/FamilyMembers          → Get all members        │  │
│  │  GET    /api/FamilyMembers/{id}     → Get one member         │  │
│  │  GET    /api/FamilyMembers/tree     → Get tree with age      │  │
│  │  POST   /api/FamilyMembers          → Create member          │  │
│  │  PUT    /api/FamilyMembers/{id}     → Update member          │  │
│  │  DELETE /api/FamilyMembers/{id}     → Delete member          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                   │                                  │
│                                   │ Entity Framework                 │
│                                   ▼                                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  FamilyTreeContext (DbContext)                                │  │
│  │  ──────────────────────────────                               │  │
│  │  DbSet<FamilyMember> FamilyMembers                            │  │
│  │  - Configuration                                              │  │
│  │  - Seed Data                                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                   │                                  │
└───────────────────────────────────┼──────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    IN-MEMORY DATABASE                                │
│  ────────────────────────────────────────                            │
│  Table: FamilyMembers                                                │
│  ┌────┬───────────┬──────────┬────────┬──────────┬─────────────┐   │
│  │ Id │ FirstName │ LastName │ Gender │ BirthDate│ Relationships│   │
│  ├────┼───────────┼──────────┼────────┼──────────┼─────────────┤   │
│  │ 1  │ John      │ Doe      │ Male   │ 1950-01  │ Spouse: 2   │   │
│  │ 2  │ Jane      │ Doe      │ Female │ 1952-03  │ Spouse: 1   │   │
│  │ 3  │ Michael   │ Doe      │ Male   │ 1975-05  │ Father: 1   │   │
│  │    │           │          │        │          │ Mother: 2   │   │
│  └────┴───────────┴──────────┴────────┴──────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLE - Adding a New Member:
═════════════════════════════════════════

1. User fills form in "Manage Members" → clicks "Add Member"
2. ManageMembersComponent calls familyMemberService.createMember()
3. Service sends HTTP POST to https://localhost:7071/api/FamilyMembers
4. FamilyMembersController receives request
5. Controller adds member to DbContext
6. DbContext saves to In-Memory Database
7. Response sent back to Angular
8. UI updates to show new member
9. User returns to Dashboard to see family tree updated


TECHNOLOGY STACK:
═════════════════

Frontend:
  - Angular 19 (TypeScript)
  - Standalone Components
  - Reactive Forms
  - RxJS for async
  - Custom CSS

Backend:
  - .NET Core 8.0
  - ASP.NET Web API
  - Entity Framework Core
  - In-Memory Database
  - CORS Middleware

Communication:
  - RESTful HTTP API
  - JSON data format
  - CORS enabled
  - HttpClient (Angular)


SECURITY & CONFIGURATION:
═════════════════════════

✓ CORS configured for localhost:4200
✓ HTTPS on backend (development cert)
✓ HTTP on frontend (development)
✓ Relationship validation (prevent orphan data)
✓ Input validation on both frontend and backend


FILE STRUCTURE:
═══════════════

FamilyTreeApp/
├── src/app/
│   ├── components/
│   │   ├── dashboard/          (Tree visualization)
│   │   └── manage-members/     (CRUD operations)
│   ├── services/
│   │   └── family-member.service.ts  (HTTP calls)
│   └── models/
│       └── family-member.model.ts    (TypeScript interface)

FamilyTreeAPI/
├── Controllers/
│   └── FamilyMembersController.cs    (API endpoints)
├── Data/
│   └── FamilyTreeContext.cs          (EF DbContext)
└── Models/
    └── FamilyMember.cs               (C# entity model)
```
