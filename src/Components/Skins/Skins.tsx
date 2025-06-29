import { useEffect, useState } from "react";
import client from "../../api/api"
import type { Skin } from "../../types/types";

interface SkinsResponse {
    status: number,
    data: Skin[]
}

const Skins = () => {
    const [skins, setSkins] = useState<Skin[]>([]);

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
    {skins.map(skin => (
    <div key={skin.uuid}>
    <h2>{skin.displayName}</h2>
      <img src={skin.chromas[0].fullRender} alt={skin.displayName} />
    </div>
  ))}
    </>
  )
}

export default Skins