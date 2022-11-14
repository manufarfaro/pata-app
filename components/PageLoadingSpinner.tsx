import { CircularProgress } from "@mui/material";
import { Box, styled } from "@mui/system";

const SpinnerContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100vh;
    width: 100vw;
`;

export default function PageLoadingSpinner () {
    return (<SpinnerContainer><CircularProgress size="10vw" /></SpinnerContainer>);
}