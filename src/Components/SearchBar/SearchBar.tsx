import styled from "styled-components";

interface PropsSearchBar {
    type: string;
    placeholder: string;
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
}

const SkinSearchBar = styled.input`
  color: #000;
  width: 50%;
  height: 2rem;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 1rem;
  padding: 0.5rem;

  @media only screen and (max-width: 480px) {
    width: 75%;
  }

  @media only screen and (max-width: 1279px) {
    width: 60%;
  }
`

const SearchBar = (props : PropsSearchBar) => {
  return (
    <SkinSearchBar type={props.type} onChange={props.onChange} placeholder={props.placeholder}/>
  )
}

export default SearchBar