import { useEffect, useState } from "react";
import client from "../../api/api"
import type { Skin } from "../../types/types";

interface SkinsResponse {
    status: number,
    data: Skin[]
}

// weapon names for the buttons
const weaponNames = ["Odin", "Ares", "Vandal", "Bulldog", "Phantom", "Judge", "Bucky", "Frenzy", "Classic", "Ghost", "Sheriff", "Shorty", "Operator", "Guardian", "Outlaw", "Marshal", "Spectre", "Stinger", "Melee"]

const Skins = () => {
    const [skins, setSkins] = useState<Skin[]>([]);
    const [weapon, setWeapon] = useState<string>("Vandal");

    // removes "Random Favorite Skin" from showing.
    const filteredSkins = skins.filter(skin => !skin.displayName.includes("Random Favorite Skin"));

    // handler for each weapon button.
    const handleWeaponSelection = (weaponName: string) => {
        setWeapon(weaponName);
    };

    // filter skins by user filter (Melee is for skins that don't match any of the weapons in the weaponNames Array).
    const filteredUserSkins = filteredSkins.filter(skin => {
        const name = skin.displayName.trim().toLowerCase();

        if (weapon === "Melee") {
            return !weaponNames.some(weaponName =>
            name.endsWith(weaponName.toLowerCase())
            );
        } else {
            return name.endsWith(weapon.toLowerCase());
        }
    });
                
    const fetchSkins = async () => {
        try {
            const { data } = await client.get<SkinsResponse>('/weapons/skins');
            setSkins(data.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSkins();
    }, [])

  return (
    <>
    <div>
        {weaponNames.map(weaponName => (
          <button key={weaponName} onClick={() => handleWeaponSelection(weaponName)}>
            <p>{weaponName}</p>
          </button>  
        ))
        }
    </div>
    {filteredUserSkins.map(skin => (
    <div key={skin.uuid}>
    <h2>{skin.displayName}</h2>
      <img src={skin.chromas[0].fullRender} alt={skin.displayName} />
      {/* {skin.chromas.map(chroma => (
        <img src={chroma.fullRender} />
      ))} */}
    </div>
  ))}
    </>
  )
}

export default Skins