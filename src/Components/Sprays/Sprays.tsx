import { useEffect, useState } from "react"
import client from "../../api/api";
import Loading from "../Loading/Loading";
import type { Spray } from "../../types/types";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

const SprayTitle = styled.h2`
    margin: 3rem 0;
    font-size: 48px;
    text-align: center;
`

const DivSprays = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
`

const SprayCard = styled.div`
    width: 16%;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: #682A36;
    padding: 1rem;
    
    @media only screen and (max-width: 768px) {
      width: 40%;
    }
`

const SearchBarDiv = styled.div`
  display:flex;
  justify-content: center;
  margin-bottom: 2.5rem;
`

interface SpraysResponse {
    status: number;
    data: Spray[];
}

const Sprays = () => {
    const [sprays, setSprays] = useState<Spray[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [spraySearch, setSpraySearch] = useState<string>("");

    const filteredSprays = sprays.filter(spray => {
      const name = spray.displayName.trim().toLowerCase();

      const matchesSearch = name.includes(spraySearch.trim().toLowerCase());

      return matchesSearch;
    })

    const fetchSprays = async () => {
        try {
          const { data } = await client.get<SpraysResponse>("/sprays");
          setSprays(data.data);
          console.log(data);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
      fetchSprays();
    }, [])

    if (loading) return <Loading />
 
  return (
    <>
    <SprayTitle>Sprays</SprayTitle>
    <SearchBarDiv>
      <SearchBar type="text" onChange={(e) => setSpraySearch(e.target.value)} placeholder="Search Spray by name..."/>
    </SearchBarDiv>
    <DivSprays>
      {filteredSprays.map(spray => (
        <SprayCard>
        <h3>{spray.displayName}</h3>
        <img src={spray.displayIcon} alt={spray.displayName}/>
        </SprayCard>
      ))}
    </DivSprays>
    </>
  )
}

export default Sprays;