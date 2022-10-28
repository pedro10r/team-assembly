import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroups";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemovebyGroup } from "@storage/player/playerRemoveByGroup";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fecthPlayerByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar.');
      }
    }
  }

  async function fecthPlayerByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemovebyGroup(playerName, group);
      fecthPlayerByTeam();
      
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  useEffect(() => {
    fecthPlayerByTeam();
  }, [team]);
  
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder='Nome das pessoas'
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
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

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
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