import { useEffect, useState } from "react"
import client from "../../api/api";
import Loading from "../Loading/Loading";
import type { Buddy } from "../../types/types";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";


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
    text-align: center;
    padding: 1rem 0;
    gap: 1rem;
    img {
        width: 30%;
    }
    h3 {
        font-size: 16px;
    }

    @media only screen and (max-width: 768px) {
        width: 40%;
        justify-content: space-evenly;
        height: 120px;
    }
    
`

const SearchBarDiv = styled.div`
    display:flex;
    justify-content: center;
    margin-bottom: 2.5rem;
`

interface BuddiesResponse {
    status: number;
    data: Buddy[];
}

const Buddies = () => {
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [buddySearch, setBuddySearch] = useState<string>("");

    const filteredBuddies = buddies.filter(buddy => {
        const name = buddy.displayName.trim().toLowerCase();

        const matchesSearch = name.includes(buddySearch.trim().toLowerCase());

        return matchesSearch;
    })

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
            <SearchBarDiv>
                <SearchBar type="text" onChange={(e) => setBuddySearch(e.target.value)} placeholder="Search buddy by name..." />
            </SearchBarDiv>
            <DivBuddies>
                {filteredBuddies.map(buddy => (
                    <BuddyCard key={buddy.uuid}>
                        <h3>{buddy.displayName}</h3>
                        <img src={buddy.displayIcon} alt={buddy.displayName} />
                    </BuddyCard>
                ))}
            </DivBuddies>
        </>
    )
}

export default Buddies