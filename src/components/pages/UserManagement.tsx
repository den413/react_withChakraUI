/* eslint-disable*/

import { Center, Spinner, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { FC, memo, useCallback, useEffect } from 'react';
import { useAllUsers } from '../../hooks/useAllUsers';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useSelectUser } from '../../hooks/useSelectUser';
import { UserCard } from '../organisms/user/UserCard';
import { UserDetailModal } from '../organisms/user/UserDetailModal';

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, seletedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users]
  );

  useEffect(() => getUsers(), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              ></UserCard>
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={seletedUser}
        isOpen={isOpen}
        isAdmin={loginUser.isAdmin}
        onClose={onClose}
      ></UserDetailModal>
    </>
  );
});
