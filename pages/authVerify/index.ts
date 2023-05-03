import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

//@ts-ignore
export const verifySession: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permananet: false,
        },
      };
    }
  
    return {
      props: { session },
    };
};