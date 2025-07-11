import { useEffect, useState } from "react";
import client from "../../api/api"
import type { Skin } from "../../types/types";
import Loading from "../Loading/Loading";
import styled from "styled-components";

const TitleWeapon = styled.h2`
    text-align: center;
    font-size: 48px;
    margin: 3rem 0;
`

const FilterDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
    gap: 1.5rem;
`

const ListWeapons = styled.ul`
    list-style: none;
    overflow: auto;
    gap: 0.25rem;
    display:flex;
    flex-wrap: wrap;
    width: 90%;
    justify-content: center;
    margin: 2rem 0;
`

const ButtonWeapon = styled.button`
  background-color: #FF5062;
  width: 5rem;
  height: 2rem;
  cursor: pointer;
  border: none;
  &:hover {
    transition: 0.2s;
    background-color: #E2263C;
  }
`

const SkinSearchBar = styled.input`
  color: #000;
  width: 25%;
  height: 2rem;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 1rem;
  padding: 0.5rem;
`

const DivSkins = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`

const SkinCard = styled.div<{ $chroma: boolean, $preview: boolean }>`
  width: 30%;
  height: 600px;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => {
    if (props.$chroma) return '#490f1bff';
    if (props.$preview) return '#490f1bff';
    return '#682A36';
  }};
  padding: 1rem;
  gap: 1.75rem;
  h2 {
    font-size: 28px;
  }
  img {
    width: 90%;
  }
`

const ButtonDiv = styled.div`
  display:flex;
  gap: 1rem;
  justify-content: center;
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
`

const ChromaDiv = styled.div<{ $chroma: boolean }>`
  background-color: ${(props) => (props.$chroma ? '#490f1bff' : '#682A36')};
  display: ${(props) => (props.$chroma ? 'flex' : 'none')};
  flex-direction: column;
  position: relative;
  gap: 2rem;
  width: 100%;
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
  padding: 2rem 0;
  position: relative;
  width: 100%;
`

interface SkinsResponse {
  status: number,
  data: Skin[]
}

// weapon names for the buttons
const weaponNames = ["Odin", "Ares", "Vandal", "Bulldog", "Phantom", "Judge", "Bucky", "Frenzy", "Classic", "Ghost", "Sheriff", "Shorty", "Operator", "Guardian", "Outlaw", "Marshal", "Spectre", "Stinger", "Melee"]

const Skins = () => {

  const [skins, setSkins] = useState<Skin[]>([]);
  const [weapon, setWeapon] = useState<string>("Vandal");
  const [loading, setLoading] = useState<boolean>(true);
  const [skinSearch, setSkinSearch] = useState<string>("");
  const [activeSkinChromaId, setActiveSkinChromaId] = useState<string | null>("");
  const [activeSkinPreviewId, setActiveSkinPreviewId] = useState<string | null>("");

  // removes "Random Favorite Skin" from showing.
  const filteredSkins = skins.filter(skin => !skin.displayName.includes("Random Favorite Skin"));

  // handler for each weapon button.
  const handleWeaponSelection = (weaponName: string) => {
    setWeapon(weaponName);
  };

  // filter skins by user filter (Melee is for skins that don't match any of the weapons in the weaponNames Array) and also filters by search bar.
  const filteredUserSkins = filteredSkins.filter(skin => {
    const name = skin.displayName.trim().toLowerCase();

    const matchesWeapon = weapon === "Melee"
      ? !weaponNames.some(weaponName =>
        name.endsWith(weaponName.toLowerCase())
      )
      : name.endsWith(weapon.toLowerCase());

    const matchesSearch = name.includes(skinSearch.trim().toLowerCase());

    return matchesWeapon && matchesSearch;
  });

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

  // fetches all the skins from the Valorant API
  const fetchSkins = async () => {
    try {
      const { data } = await client.get<SkinsResponse>('/weapons/skins');
      setSkins(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSkins();
  }, [])

  if (loading) return <Loading />;

  return (
    <>
      <TitleWeapon>Skins</TitleWeapon>
      <FilterDiv>
        <ListWeapons>
          {weaponNames.map(weaponName => weapon === weaponName ? (
            <li>
              <ButtonWeapon key={weaponName} onClick={() => handleWeaponSelection(weaponName)} style={{ backgroundColor: "#682A36" }}>
                {weaponName}
              </ButtonWeapon>
            </li>
          ) : (
            <li>
              <ButtonWeapon key={weaponName} onClick={() => handleWeaponSelection(weaponName)}>
                {weaponName}
              </ButtonWeapon>
            </li>
          ))
          }
        </ListWeapons>
        <SkinSearchBar type="text" onChange={(e) => setSkinSearch(e.target.value)} placeholder="Search a skin by name..." />
      </FilterDiv>
      <DivSkins>
        {filteredUserSkins.map(skin => (
          <SkinCard key={skin.uuid} $chroma={activeSkinChromaId === skin.uuid} $preview={activeSkinPreviewId == skin.uuid}>
            <h2>{skin.displayName}</h2>
            <img src={skin.chromas[0].fullRender} alt={skin.displayName} />
            <ButtonDiv>
              {skin.chromas.length == 1 ? <></> : <Button onClick={() => showChromas(skin.uuid)}>Chromas</Button>}
              {skin.levels.length == 1 ? <></> : <Button onClick={() => showPreview(skin.uuid)}>Preview</Button>}
            </ButtonDiv>
            <ChromaDiv $chroma={activeSkinChromaId === skin.uuid}>
              {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
                <ChromaCard>
                  {activeSkinChromaId === skin.uuid && (
                    <>
                      <h3>{chroma.displayName.replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                      <img src={chroma.fullRender} />
                      <video width="60%" height="90%" controls >
                        <source src={chroma.streamedVideo} type="video/mp4" />
                      </video>
                    </>
                  )}
                </ChromaCard>
              ) : (
                <ChromaCard>
                  <h3>{chroma.displayName.replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</h3>
                  <img src={chroma.fullRender} />
                </ChromaCard>
              )
              )}
            </ChromaDiv>
            <PreviewDiv $preview={activeSkinPreviewId === skin.uuid}>
              {skin.levels.slice(length - 1).map(preview => preview.streamedVideo !== null ? (
                <>
                  <h3>Preview</h3>
                  <video width="60%" height="90%" controls>
                    <source src={preview.streamedVideo} type="video/mp4" />
                  </video>
                </>
              ) :
                <></>
              )
              }
            </PreviewDiv>

          </SkinCard>

        ))}

      </DivSkins>
    </>
  )
}

export default Skins