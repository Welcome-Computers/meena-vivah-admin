// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useGetMeQuery } from "@/redux/features/login";

// type Props = {
//   children: React.ReactNode;
// };

// export default function AuthGuard({ children }: Props) {
//   const router = useRouter();

//   const { data, isLoading, error } = useGetMeQuery();

//   useEffect(() => {
//     if (!isLoading && (!data?.user || error)) {
//       router.replace("/");
//     }
//   }, [isLoading, data, error, router]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!data?.user) {
//     return null;
//   }

//   return <>{children}</>;
// }

