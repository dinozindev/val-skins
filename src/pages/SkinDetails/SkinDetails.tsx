import { useLocation } from "react-router-dom";
import styled from "styled-components";
import type { Skin } from "../../types/types";

const DetailSection = styled.section`
    padding: 6rem;
    display:flex;
    align-items: center;
    font-size: 24px;
    flex-direction: column;
    height: 100%;
    img {
        width: 40%;
    }
`

const Header = styled.header`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rem;
    margin-bottom: 4rem;
`

const ChromaCard = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    margin: 4rem 0 4rem 0;
`

const SkinDetails = () => {
    // traz a skin do Card
    const location = useLocation();
    const skin = location.state as Skin;

    return (
        <DetailSection>
            <Header>
                <h2>{skin.displayName}</h2>
                <img src={skin.chromas[0].fullRender} alt={skin.displayName} loading="lazy" />
            </Header>
            {skin.levels.slice(length - 1).map(preview => preview.streamedVideo !== null ? (
                <>
                    <>
                        <video width="40%" height="40%" style={{marginBottom: "4rem"}} controls>
                            <track kind="captions" />
                            <source src={preview.streamedVideo} type="video/mp4" />
                        </video>
                    </>
                </>
            ) :
                <></>
            )
            }
            {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
                <ChromaCard key={chroma.uuid}>
                    <>
                        <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                        <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                        <video width="40%" height="40%" controls >
                            <track kind="captions" />
                            <source src={chroma.streamedVideo} type="video/mp4" />
                        </video>
                    </>
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