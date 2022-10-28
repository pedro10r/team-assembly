import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageConfig";

import { groupGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storagedGroups = await groupGetAll();

    const groupAlreadyExists = storagedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }
    
    const storage = JSON.stringify([...storagedGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}