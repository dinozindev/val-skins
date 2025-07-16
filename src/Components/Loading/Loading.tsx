import { ThreeDot } from "react-loading-indicators";
import styled from "styled-components";

const LoadingDiv = styled.div`
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

`

const Loading = () => {
    return (
        <>
        <LoadingDiv>
            <ThreeDot color="#FF5062" size="large" text="Fetching..." textColor="" />
        </LoadingDiv>
        </>
    )
}

export default Loading;
