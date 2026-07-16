<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
✅ Create roles table
✅ Create permissions table
✅ Create role_permissions table
✅ Update admins table (roleId)
✅ Seed default roles & permissions
✅ Create permission service
✅ Create requirePermission() middleware
✅ Update getMe() to include role & permissions
✅ Protect CRUD APIs
✅ Hide/show frontend UI based on permissions
✅ Build Super Admin management pages



Module	Purpose	CRUD?
Admin Management	Admin create, edit, suspend, delete, reset password, role assign	✅ Yes
Role Management	Create/Edit/Delete roles	✅ Yes
Permission Management	Permissions ki master list (kabhi-kabhi fixed hoti hai)	Usually No / Limited
Role Permission Mapping	Kis role ko kaunsi permissions milengi	✅ Update
Session Management	Active sessions dekhna, force logout	View + Delete



🔜 (Optional) Expired sessions automatically clean up karna

⬜ Session Expiry

⬜ Session Cleanup

⬜ Role

⬜ Permission

⬜ Auth Wrapper (remove duplicate VerifySession)

⬜ Protected Frontend

⬜ Session Management

⬜ Rate Limiting

⬜ CSRF Protection (यदि cookie-based session का उपयोग हो रहा है और state-changing requests हैं)

mobile and passowrd andmin same code ,table ,password,role ,session


Phase 2 (Ab)
Admin Roles
Super Admin
Authorization
Permission Middleware
Role Guard
API Protection

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
