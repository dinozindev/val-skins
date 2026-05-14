import styled from "styled-components"
import type { Skin } from "../../types/types";
import { Link } from "react-router-dom";

const SkinCardDiv = styled.div`
  width: 30%;
  height: 800px;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #682A36;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1.75rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

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

// const ButtonDiv = styled.div`
//   display:flex;
//   gap: 1rem;
//   justify-content: center;
//   width: 100%;
// `

// const Button = styled.button`
//   background-color: #E2263C;
//   border: none;
//   padding: .5rem 1.5rem;
//   border-radius: 0.25rem;
//   cursor: pointer;
//   &:hover {
//     background-color: #FF5062;
//     transition: 0.2s;
//   }
//   @media (min-width: 1280px) {
//     width: 12rem;
//     height: 3rem;
//   }
// `

// const ChromaCard = styled.div`
//   display:flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 3rem;
//   margin: 1.5rem 0 1.5rem 0;
// `

// const InfoDiv = styled.div`
//     position: fixed;
//     inset: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 50;
// `

// const BlurryDiv = styled.div`
//     position: absolute;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.4);
//     backdrop-filter: blur(4px);
// `

// const XMarkI = styled.i`
//     font-size: 2rem;
//     transition: all;
//     cursor: pointer;
//     &:hover {
//         color: #000;
//     }
// `

// const PopUpDiv = styled.div`
//      position: relative;
//     z-index: 10;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 3rem;
//     border-radius: 1rem;
//     gap: 4rem;
//     background: #682A36;
//     width: 80%;
//     max-height: 90vh; 
//     overflow-y: auto;

//     img {
//         width: 50%;
//     }
// `

// const PopUpHeader = styled.header`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 100%;
//     padding-bottom: 4rem;
// `

// const PopUpMainDiv = styled.div`
//     display:flex;
// `

// const PopUpSkinDiv = styled.div<{ $hasChroma: boolean }>`
//     width: ${(props) => (props.$hasChroma ? '50%' : '100%')};
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 3rem;
//     margin-top: 1.5rem;
//     img {
//         width: 70%;
//     }
// `

// const PopUpPreviewDiv = styled.div<{ $preview: boolean }>`
//     display: ${(props) => (props.$preview ? 'flex' : 'none')};
//     justify-content: center;
//     width: 90%;
// `

// const PopUpChromaDiv = styled.div<{ $chroma: boolean }>`
//     display: ${(props) => (props.$chroma ? 'flex' : 'none')};
//     width: 50%;
//     flex-direction: column;
//     img {
//         width: 70%;
//     }
// `

type SkinCardProps = {
    skin: Skin;
}

const SkinCard = ({ skin }: SkinCardProps) => {

    // const [activeSkinChromaId, setActiveSkinChromaId] = useState<string | null>("");
    // const [activeSkinPreviewId, setActiveSkinPreviewId] = useState<string | null>("");
    // const [showInfo, setShowInfo] = useState<boolean>(false);

    // const handlePreview = (uuid: string, toggle: boolean) => {
    //     if (toggle) {
    //         setShowInfo(true);

    //         // ativa preview
    //         setActiveSkinPreviewId(uuid);

    //         // ativa chroma também
    //         setActiveSkinChromaId(uuid);

    //     } else {
    //         setShowInfo(false);
    //         setActiveSkinPreviewId(null);
    //         setActiveSkinChromaId(null);
    //     }
    // }


    return (
        <SkinCardDiv key={skin.uuid}>
            {/* {showInfo && (
                <InfoDiv>
                    <BlurryDiv
                        onClick={() => handlePreview(skin.uuid, false)} />
                    <PopUpDiv>
                        <PopUpHeader>
                            <h2>{skin.displayName}</h2>
                            <XMarkI className="fa-solid fa-xmark" onClick={() => handlePreview(skin.uuid, false)}></XMarkI>
                        </PopUpHeader>
                        <PopUpMainDiv>
                            <PopUpSkinDiv $hasChroma={activeSkinChromaId === skin.uuid}>
                                <h3>Default</h3>
                                <img src={skin.chromas[0].fullRender} alt={skin.displayName} loading="lazy" />
                                <PopUpPreviewDiv $preview={activeSkinPreviewId === skin.uuid}>
                                    {skin.levels.slice(length - 1).map(preview => preview.streamedVideo !== null ? (
                                        <>
                                            {activeSkinPreviewId === skin.uuid && (
                                                <>
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
                                </PopUpPreviewDiv>
                            </PopUpSkinDiv>
                            <PopUpChromaDiv $chroma={activeSkinChromaId === skin.uuid}>
                                {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
                                    <ChromaCard key={chroma.uuid}>
                                        {activeSkinChromaId === skin.uuid && (
                                            <>
                                                <h3>{chroma.displayName.replace("Level 2", "").replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                                                <img src={chroma.fullRender} loading="lazy" alt={chroma.displayName} />
                                                <video width="75%" height="75%" controls >
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
                            </PopUpChromaDiv>
                        </PopUpMainDiv>
                    </PopUpDiv>
                </InfoDiv>
            )} */}
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