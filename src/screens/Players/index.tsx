import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { Container, Form, HeaderList, NumberOfPlayer } from "./styles";
import { Button } from "@components/Button";

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState(['Pedro1', 'Pedro2', 'Pedro3', 'Pedro4', 'Pedro5', 'Pedro6', 'Pedro7', 'Pedro8', 'Pedro9', 'Pedro10', 'Pedro11']);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title='Nome da turma'
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder='Nome das pessoas'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add'
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumberOfPlayer>
          {players.length}
        </NumberOfPlayer>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message='Não há pessoas nesse time.'
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[ { paddingBottom: 50 }, players.length === 0 && { flex: 1} ]}
      />

      <Button
        title='Remover Turma'
        type='SECONDARY'
      />
    </Container>
  );
}