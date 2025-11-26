import KInputSearch from '@root/src/components/form/kinputsearch';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { useState } from 'react';

const users = [
  { label: 'Alice Johnson', value: 'alice_johnson' },
  { label: 'Bob Smith', value: 'bob_smith' },
  { label: 'Charlie Brown', value: 'charlie_brown' },
  { label: 'David Wilson', value: 'david_wilson' },
  { label: 'Eva Green', value: 'eva_green' },
  { label: 'Frank White', value: 'frank_white' },
  { label: 'Grace Lee', value: 'grace_lee' },
  { label: 'Hannah Scott', value: 'hannah_scott' },
  { label: 'Ian Clark', value: 'ian_clark' },
];

export function AdvancedExample() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [filteredUsers, setFilteredUsers] = useState<typeof users>([]);
  const valid = !selectedUser;

  const search = (event: AutoCompleteCompleteEvent) => {
    setFilteredUsers(
      users.filter((u) =>
        u.label.toLowerCase().includes(event.query.toLowerCase())
      )
    );
  };

  return (
    <ExampleWrapper className="flex justify-center">
      <KInputSearch
        field="label"
        value={selectedUser}
        suggestions={filteredUsers}
        completeMethod={search}
        onChange={(event) => setSelectedUser(event.value)}
        floatLabel="Username"
        helperText="Helper text"
        invalid={valid}
        className="w-72"
      />
    </ExampleWrapper>
  );
}
