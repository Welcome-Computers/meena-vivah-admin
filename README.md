
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


---------------
Common Rules : 
* backend use only type
* frontend use only interface

All type of backend 
  every modules has just like :
  src\lib\modules\admin\admin.types.ts

All constant/type of backend 
  src\lib\modules\common

All interface of frontend
  every redux has a file for interface, just like : (for redux)
  src\redux\features\importedProfile\type.ts

All interface of used in component  
  write at the top of every component but 
  we can use interface of redux in component
  keep in mind should we not directly take these. 
  we just use like below example.

  interface UserCardProps {
    user: User;
    showActions?: boolean;
  }

----------------
8-july-2026
i was working on dob not proper fill in editable form if dob is "22/08/1998" like that. 

10-july-2026
i was working on prev/next functionality 

13-July-2026
I was working on save/move draft data into active table. from drawar.

15-July-2026
now need to create login/logout using nextAuth with refresh and access token

16-July-2026 
  working on login section here currently we are login successfully. 
  and get useSession() to data. i am working on it. 
  
17-July-2026 
  I was working on the logout implementation. 
  Currently, I am implementing the signOut function using NextAuth.

20-July-2026
  import data from "marriageapp to meena_vivah"

22-july-2026
  working on refining interface name and function name with code optimize. 

24-july-2026
  Working on the copyright section design,
  implementing mobile number login with 6-digit OTP verification, and 
  separating the dashboard for Admin, Executive, and Profiler roles.

26-July-2026
  working on update profile afther login a 
  "profile" user
  http://localhost:3006/profiles/update_profile?id=61&action=update
  currently i am working on above URL and here mobile should not able to update....