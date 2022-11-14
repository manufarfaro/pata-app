import type { NextPage } from "next";
import { useCallback } from "react";
import styles from "../styles/Home.module.css";
import { getSession, GetSessionParams } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import AppLayout from "../components/AppLayout";
import NewUserWizard from "../components/NewUserWizard";
import useUserData, { userDataCacheKey } from "../hooks/useUserData";
import useUpdateUserData from "../hooks/useUpdateUserData";
import { NewUserInputData } from "../models/NewUserInputData";
import ProfesionalHome from "../components/ProfesionalHome";
import MascoterosHome from "../components/MascoterosHome";
import { Profesional } from "../models/Profesional";
import { Mascotero } from "../models/Mascotero";
import { User } from "@prisma/client";
import PageLoadingSpinner from "../components/PageLoadingSpinner";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const { data } = useUserData();
  const { mutate, isLoading } = useUpdateUserData(() => {
    queryClient.invalidateQueries([userDataCacheKey]);
  });

  const handleUpdateUserData = useCallback((userData: NewUserInputData) => {
    mutate(userData);
  }, [mutate]);

  return (
    <AppLayout title="Inicio">
      <div className={styles.container}>
        <main className={styles.main}>
          <>
            {!data ?
              <PageLoadingSpinner /> :
              (data as User)?.type || !(data as Profesional | Mascotero)?.user?.wizardDone ?
                <NewUserWizard onUpdateData={handleUpdateUserData} isUpdateLoading={isLoading} /> :
                (data as Profesional)?.user?.type === "Profesional" ?
                  <ProfesionalHome /> :
                  <MascoterosHome />
            }
          </>
        </main>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default Home;
