import styled from "styled-components"
import type { Skin } from "../../types/types";
import { Link } from "react-router-dom";

const SkinCardDiv = styled.div`
  flex: 1 1 250px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(145deg, #682A36, #7d3442);
  border-radius: 1rem;
  padding: 1.25rem;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  img {
    width: 100%;
    max-height: 180px;
    object-fit: contain; /* evita distorcer */
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  /* mobile */
  @media (max-width: 480px) {
    flex: 1 1 100%;
    max-width: 100%;
    
    h2 {
      font-size: 1.2rem;
    }

    img {
      max-height: 120px;
    }
  }
`;

const LinkButton = styled(Link)`
    text-decoration: none;
    background-color: #E2263C;
    border: none;
    text-align: center;
    padding: 1rem;
    font-weight: 700;
    border-radius: 0.5rem;
    cursor: pointer;
     &:hover {
        background-color: #FF5062;
        transition: 0.2s;
    }
    @media (min-width: 1280px) {
        width: 10rem;
    }
`

type SkinCardProps = {
    skin: Skin;
}

const SkinCard = ({ skin }: SkinCardProps) => {

    return (
        <SkinCardDiv key={skin.uuid}>
            <h2>{skin.displayName}</h2>
            <img src={skin.chromas[0].fullRender} alt={skin.displayName} loading="lazy" />
                <LinkButton
                    to={`/skins/${skin.uuid}`}
                    key={skin.uuid}
                    state={skin}>
                    Preview
                </LinkButton>
        </SkinCardDiv>
    )
}

export default SkinCard