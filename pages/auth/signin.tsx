import { getSession, GetSessionParams, signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Google } from "@mui/icons-material";

const HomeContainer = styled.div`
  padding: 0 1rem;
`;

const HomeMain = styled.main`
  min-height: 100vh;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div``;

const CTAContainer = styled.div`
  margin-top: 2rem;
`;

function SignIn() {
  const { status } = useSession();
  const [loadingTransition, setLoadingTransition] = useState<boolean>(true);

  const handleClick = useCallback(() => {
    setLoadingTransition(true);
    signIn("google", { callbackUrl: "/" });
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      setLoadingTransition(false);
    }
  }, [status]);

  return (
    <HomeContainer>
      <Head>
        <title>Pata - Ingresa!</title>
      </Head>
      <HomeMain>
        <LogoContainer>
          <Image
            alt="pata logo"
            src={"/images/pata-logo-white.svg"}
            width={200}
            height={200}
          />
        </LogoContainer>
        <CTAContainer>
          {loadingTransition ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<Google />}
              variant="contained"
            >
              Ingresá con Google
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={handleClick}
              startIcon={<Google />}
            >
              Ingresá con Google
            </Button>
          )}
        </CTAContainer>
      </HomeMain>
    </HomeContainer>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default SignIn;
