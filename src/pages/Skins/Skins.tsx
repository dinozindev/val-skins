import { useEffect, useState } from "react";
import client from "../../api/api"
import type { Skin } from "../../types/types";
import Loading from "../../Components/Loading/Loading";
import styled from "styled-components";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SkinCard from "../../Components/SkinCard/SkinCard";

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
    width:90%;
    justify-content: center;
    margin: 2rem 0;
    padding: 0;
    @media only screen and (max-width: 480px) {
      overflow: scroll;
      flex-wrap: nowrap;
      justify-content: flex-start;

    }
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

const DivSkins = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`

interface SkinsResponse {
  status: number,
  data: Skin[]
}

// weapon names for the buttons
const weaponNames = ["All", "Odin", "Ares", "Vandal", "Bulldog", "Phantom", "Judge", "Bucky", "Frenzy", "Classic", "Ghost", "Sheriff", "Shorty", "Operator", "Guardian", "Outlaw", "Marshal", "Spectre", "Stinger", "Melee"]

const Skins = () => {

  const [skins, setSkins] = useState<Skin[]>([]);
  const [weapon, setWeapon] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [skinSearch, setSkinSearch] = useState<string>("");

  // removes "Random Favorite Skin" from showing.
  const filteredSkins = skins.filter(skin => !skin.displayName.includes("Random Favorite Skin"));

  // handler for each weapon button.
  const handleWeaponSelection = (weaponName: string) => {
    setWeapon(weaponName);
  };

  // filter skins by user filter (Melee is for skins that don't match any of the weapons in the weaponNames Array and All is for all of the skins) and also filters by search bar.
  const filteredUserSkins = filteredSkins.filter(skin => {
    const name = skin.displayName.trim().toLowerCase();

    const isMelee = weapon === "Melee" ? !weaponNames.some(weaponName => name.endsWith(weaponName.toLowerCase())) : name.endsWith(weapon.toLowerCase());

    const matchesWeapon = weapon === "All" ? true : isMelee;

    const matchesSearch = name.includes(skinSearch.trim().toLowerCase());

    return matchesWeapon && matchesSearch;
  });

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
            <li key={weaponName}>
              <ButtonWeapon onClick={() => handleWeaponSelection(weaponName)} style={{ backgroundColor: "#682A36" }}>
                {weaponName}
              </ButtonWeapon>
            </li>
          ) : (
            <li key={weaponName}>
              <ButtonWeapon onClick={() => handleWeaponSelection(weaponName)}>
                {weaponName}
              </ButtonWeapon>
            </li>
          ))
          }
        </ListWeapons>
        <SearchBar type="text" onChange={(e) => setSkinSearch(e.target.value)} placeholder="Search a skin by name..." />
      </FilterDiv>
      <DivSkins>
        {filteredUserSkins.map(skin => (
          <SkinCard skin={skin} />
        ))}
      </DivSkins>
    </>
  )
}

export default Skins