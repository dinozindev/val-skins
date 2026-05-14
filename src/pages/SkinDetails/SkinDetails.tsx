import { useLocation } from "react-router-dom";
import styled from "styled-components";
import type { Skin } from "../../types/types";

const DetailSection = styled.section`
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  img {
    width: 100%;
    max-width: 500px;
    object-fit: contain;
  }

  video {
    width: 100%;
    max-width: 500px;
    border-radius: 0.5rem;
  }
`;

const Header = styled.header<{ expanded: boolean }>`
  width: 100%;
  max-width: 700px;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #682a36;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);

  gap: ${({ expanded }) => (expanded ? "2rem" : "4rem")};
  margin-bottom: ${({ expanded }) => (expanded ? "2rem" : "4rem")};

  img {
    width: ${({ expanded }) => (expanded ? "70%" : "80%")};
    max-width: 700px;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  h2 {
    font-size: ${({ expanded }) => (expanded ? "2rem" : "2.5rem")};
    text-align: center;
  }
`;

const ChromaCard = styled.div`
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  padding: 1.5rem;
  border-radius: 1rem;

  background: #682a36;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  }

  h3 {
    text-align: center;
  }
`;

const SkinDetails = () => {
    // traz a skin do Card
    const location = useLocation();
    const skin = location.state as Skin | undefined;

    if (!skin) return <p>Skin não encontrada</p>;

    const hasVideo = skin.levels.some(l => l.streamedVideo);
    const hasChromas = skin.chromas.length > 1;

    const hasExtraContent = hasVideo || hasChromas;

    return (
        <DetailSection>
            <Header expanded={hasExtraContent}>
                <h2>{skin.displayName}</h2>
                <img
                    src={skin.chromas[0].fullRender}
                    alt={skin.displayName}
                />
            </Header>
            {skin.levels.slice(length - 1).map(preview => preview.streamedVideo !== null ? (
                <video width="50%" height="50%" style={{ marginBottom: "4rem" }} controls>
                    <track kind="captions" />
                    <source src={preview.streamedVideo} type="video/mp4" />
                </video>
            ) :
                <>This skin doesn't have a preview video.</>
            )
            }
            {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
                <ChromaCard key={chroma.uuid}>
                    <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                    <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                    <video width="50%" height="50%" controls >
                        <track kind="captions" />
                        <source src={chroma.streamedVideo} type="video/mp4" />
                    </video>
                </ChromaCard>
            ) : (
                <ChromaCard key={chroma.uuid}>
                    <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                    <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                </ChromaCard>
            )
            )}
        </DetailSection>
    )
}

export default SkinDetails