import React from "react";
import "./Card.css";
import FooterInCard from "./FooterInCard/FooterInCard";
import Benefits from "./Benefits/Benefits";
import MainInCard from "./MainInCard/MainInCard";
function Card(props) {
    return (
        <div key={props.id} className="card">
            <MainInCard 
                id={props.id}
                name={props.name}
                companyName={props.companyName}
                city={props.city}
                logosSRC={props.logosSRC}
            />
            <Benefits/>
            <FooterInCard
                time={props.time}
            />
            <p className={"hidden"}>Ёлки-палки, этот файл просто огромный и не помещается в наш сервер</p>
        </div>
    );
}
export default Card;