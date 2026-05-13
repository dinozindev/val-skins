import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DetailSection = styled.section`
    padding: 6rem;
    display:flex;
    justify-content: center;
    font-size: 24px;
`

const SkinDetails = () => {
    // traz a skin do Card
    const location = useLocation();
    const skin = location.state;

  return (
    <DetailSection>
        <h2>{skin.displayName}</h2>
        <img src={skin.chromas[0].fullRender} alt={skin.displayName} loading="lazy" />
    </DetailSection>
  )
}

export default SkinDetails