import { useState } from "react";
import styled from "styled-components"
import type { Skin } from "../../types/types";

const SkinCardDiv = styled.div<{ $chroma: boolean, $preview: boolean }>`
  width: 30%;
  height: 800px;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => {
        if (props.$chroma) return '#490f1bff';
        if (props.$preview) return '#490f1bff';
        return '#682A36';
    }};
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1.75rem;
  h2 {
    font-size: 28px;
  }
  img {
    width: 90%;
  }

  @media only screen and (max-width: 480px) {
    height: 250px;
    width: 70%;
    h2 {
      font-size: 24px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 40%;
    height: 400px;
  }

  @media (min-width: 769px) and (max-width: 1279px) {
    width: 40%;
    height: 450px;
  }
`

const ButtonDiv = styled.div`
  display:flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`

const Button = styled.button`
  background-color: #E2263C;
  border: none;
  padding: .5rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #FF5062;
    transition: 0.2s;
  }
  @media (min-width: 1280px) {
    width: 12rem;
    height: 3rem;
  }
`

const ChromaDiv = styled.div<{ $chroma: boolean }>`
  background-color: ${(props) => (props.$chroma ? '#490f1bff' : '#682A36')};
  display: ${(props) => (props.$chroma ? 'flex' : 'none')};
  flex-direction: column;
  position: relative;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
`

const ChromaCard = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0 1.5rem 0;
`

const PreviewDiv = styled.div<{ $preview: boolean }>`
  display: ${(props) => (props.$preview ? 'flex' : 'none')};
  background-color: ${(props) => (props.$preview ? '#490f1bff' : '#682A36')};
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
  position: relative;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem
`

type SkinCardProps = {
    skin: Skin;
}

const SkinCard = ({ skin }: SkinCardProps) => {

    const [activeSkinChromaId, setActiveSkinChromaId] = useState<string | null>("");
    const [activeSkinPreviewId, setActiveSkinPreviewId] = useState<string | null>("");

    const showChromas = (uuid: string) => {
        if (activeSkinChromaId === uuid) {
            setActiveSkinChromaId(null);
        }
        else {
            if (activeSkinPreviewId !== null) {
                setActiveSkinPreviewId(null);
            }
            setActiveSkinChromaId(uuid);
        }
    }

    const showPreview = (uuid: string) => {
        if (activeSkinPreviewId === uuid) {
            setActiveSkinPreviewId(null);
        } else {
            if (activeSkinChromaId !== null) {
                setActiveSkinChromaId(null);
            }
            setActiveSkinPreviewId(uuid);
        }
    }

    return (
        <SkinCardDiv key={skin.uuid} $chroma={activeSkinChromaId === skin.uuid} $preview={activeSkinPreviewId == skin.uuid}>
            <h2>{skin.displayName}</h2>
            <img src={skin.chromas[0].fullRender} alt={skin.displayName} loading="lazy" />
            <ButtonDiv>
                {skin.chromas.length == 1 ? <></> : <Button onClick={() => showChromas(skin.uuid)}>Chromas</Button>}
                {skin.levels.length == 1 ? <></> : <Button onClick={() => showPreview(skin.uuid)}>Preview</Button>}
            </ButtonDiv>
            <ChromaDiv $chroma={activeSkinChromaId === skin.uuid}>
                {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
                    <ChromaCard key={chroma.uuid}>
                        {activeSkinChromaId === skin.uuid && (
                            <>
                                <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                                <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                                <video width="90%" height="90%" controls >
                                    <track kind="captions" />
                                    <source src={chroma.streamedVideo} type="video/mp4" />
                                </video>
                            </>
                        )}
                    </ChromaCard>
                ) : (
                    <ChromaCard key={chroma.uuid}>
                        <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                        <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                    </ChromaCard>
                )
                )}
            </ChromaDiv>
            <PreviewDiv $preview={activeSkinPreviewId === skin.uuid}>
                {skin.levels.slice(length - 1).map(preview => preview.streamedVideo !== null ? (
                    <>
                        {activeSkinPreviewId === skin.uuid && (
                            <>
                                <h3>Preview</h3>
                                <video width="90%" height="90%" controls>
                                    <track kind="captions" />
                                    <source src={preview.streamedVideo} type="video/mp4" />
                                </video>
                            </>
                        )}
                    </>
                ) :
                    <></>
                )
                }
            </PreviewDiv>
        </SkinCardDiv>
    )
}

export default SkinCard