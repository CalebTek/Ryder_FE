import React from "react";
import { RiderNavbar } from "../../components";
import styled from "styled-components";


const BodyContainer = styled.body`
  font-family: "Manrope";
  background-color: #f5f5f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Bidding = () => {
    return (
        <>
            <RiderNavbar />
            <BodyContainer>
                <div className="align-content-center mt-5 mb-5"
                    style={{ width: "1169px", height: "1061px", padding: "40px", gap: "32px", backgroundColor: "white", borderRadius: "5px" }}>
                <h3>Bidding Orders</h3>
                <div style={{ backgroundColor: "#FB85001A" }}><p>You can accept or decline a bid.</p></div>
                
            </div>
            </BodyContainer>
        </>
    )
}

export default Bidding;