import { KPaginator } from '@root/src/components/misc/kpaginator';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const metaData = {
  title: 'Components/Misc/KPaginator',
  component: KPaginator,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=3911%3A28173&mode=dev',
    },
  },
  render: () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first);
      setRows(event.rows);
    };

    return (
      <KPaginator
        first={first}
        rows={rows}
        totalRecords={120}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    );
  },
} satisfies Meta<typeof KPaginator>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {},
};
