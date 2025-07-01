import { useEffect, useState } from "react"
import client from "../../api/api";
import Loading from "../Loading/Loading";
import type { Buddy } from "../../types/types";
import styled from "styled-components";


const TitleBuddy = styled.h2`
    text-align: center;
    font-size: 48px;
    margin: 3rem 0;
`

const DivBuddies = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`

const BuddyCard = styled.div`
    background-color: #682A36;
    width: 20%;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;
    img {
        width: 30%;
    }
    h3 {
        font-size: 20px;
    }
    
`

interface BuddiesResponse {
    status: number;
    data: Buddy[];
}

const Buddies = () => {
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBuddies = async () => {
        try {
            const { data } = await client.get<BuddiesResponse>("/buddies");
            setBuddies(data.data);
            console.log(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBuddies();
    }, [])

    if (loading) return <Loading />

  return (
    <>
    <TitleBuddy>Buddies</TitleBuddy>
    <DivBuddies>
    {buddies.map(buddy => (
        <BuddyCard key={buddy.uuid}>
            <h3>{buddy.displayName}</h3>
            <img src={buddy.displayIcon} alt={buddy.displayName}/>
        </BuddyCard>
    ))}
    </DivBuddies>
    </>
  )
}

export default Buddies