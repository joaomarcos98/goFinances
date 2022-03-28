import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import * as S from "./styles"

export const Dashboard = () => {
    return (
        <S.Container >
            <S.Header>
                <S.UserContainer>
                    <S.UserInfo>
                        <S.Photo source={{ uri: "https://avatars.githubusercontent.com/u/72817686?v=4" }} />
                        <S.User>
                            <S.UserGreeting>Olá, </S.UserGreeting>
                            <S.UserName>João Marcos</S.UserName>
                        </S.User>
                    </S.UserInfo>
                    <S.Icon name="power" />
                </S.UserContainer>
            </S.Header>

            <S.HighlightCards>
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </S.HighlightCards>




        </S.Container>
    )
}