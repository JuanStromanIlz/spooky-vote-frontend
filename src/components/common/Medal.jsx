import styled from 'styled-components';

const MedalContainer = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 25%;
`;

export default function Medal({position, ...props}) {
  return (
    <MedalContainer>
      {position === 0 ?
        <img src='/gold.svg' width='100%' alt='gold' />
      : position === 1 ?
        <img src='/silver.svg' width='100%' alt='silver' />
      :
        <img src='/bronze.svg' width='100%' alt='bronze' />
      }
    </MedalContainer>
  )
}