import { useCallback, useState } from 'react';
import { User } from '../types/api/user';

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
};

export const useSelectUser = () => {
  const [seletedUser, setSeletedUser] = useState<User | null>(null);
  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);
    setSeletedUser(targetUser ?? null);
    onOpen();
  }, []);
  return { onSelectUser, seletedUser };
};
