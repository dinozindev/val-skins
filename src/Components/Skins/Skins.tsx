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

const SkinCard = styled.div`
  width: 30%;
  height: 250px;
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: #682A36;
  padding: 1rem;
  gap: 1.75rem;
  img {
    width: 75%;
  }
`

const ChromaButton = styled.button`
  background-color: #E2263C;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #FF5062;
    transition: 0.2s;
  }
`

const ChromaDiv = styled.div<{ $chroma: boolean }>`
  background-color: #682A36;
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

interface SkinsResponse {
  status: number,
  data: Skin[]
}

// weapon names for the buttons
const weaponNames = ["Odin", "Ares", "Vandal", "Bulldog", "Phantom", "Judge", "Bucky", "Frenzy", "Classic", "Ghost", "Sheriff", "Shorty", "Operator", "Guardian", "Outlaw", "Marshal", "Spectre", "Stinger", "Melee"]

const Skins = () => {

  const [skins, setSkins] = useState<Skin[]>([]);
  const [weapon, setWeapon] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [skinSearch, setSkinSearch] = useState<string>("");
  const [activeSkinChromaId, setActiveSkinChromaId] = useState<string | null>("");

  // removes "Random Favorite Skin" from showing.
  const filteredSkins = skins.filter(skin => !skin.displayName.includes("Random Favorite Skin Standard"));

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
      setActiveSkinChromaId(uuid);
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
          <SkinCard key={skin.uuid}>
            <h2>{skin.displayName}</h2>
            <img src={skin.chromas[0].fullRender} alt={skin.displayName} />
            {skin.chromas.length == 1 ? <></> : <ChromaButton onClick={() => showChromas(skin.uuid)}>Chromas</ChromaButton>}
            <ChromaDiv $chroma={activeSkinChromaId === skin.uuid}>
            {skin.chromas.slice(1).map(chroma => chroma.streamedVideo !== null ? (
              <ChromaCard>
                {activeSkinChromaId === skin.uuid && (
                  <>
                    <p>{chroma.displayName.replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</p>
                    <img src={chroma.fullRender} />
                    <video width="60%" height="90%" controls >
                      <source src={chroma.streamedVideo} type="video/mp4" />
                    </video>
                  </>
                )}
              </ChromaCard>
            ) : (
              <ChromaCard>
                <p>{chroma.displayName.replace("Level 3", "").replace("Level 4", "").replace("Level 5", "")}</p>
                <img src={chroma.fullRender} />
              </ChromaCard>
            )
            )}
            </ChromaDiv>

          </SkinCard>

        ))}

      </DivSkins>
    </>
  )
}

export default Skins