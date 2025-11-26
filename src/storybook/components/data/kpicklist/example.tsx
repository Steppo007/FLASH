import { KPickList, KPickListProps } from '@complib/data/kpicklist';
import { ChangeEvent, useState } from 'react';
import {
  PickListChangeEvent,
  PickListFilterTemplateOptions,
} from 'primereact/picklist';
import { KAvatar } from '@root/src/components/misc/kavatar';
import KText from '@root/src/components/misc/ktext';
import KInputText from '@root/src/components/form/kinputtext';
import writersJson from './writer.json';

interface Writer {
  name: string;
  country: string;
  id: string;
}

const writers = writersJson as Writer[];

export default function Example({
  dataKey = 'id',
  filterBy = undefined,
  sourceHeader = 'Available Writers',
  targetHeader = 'Selected Writers',
  showSourceControls = true,
  showTargetControls = true,
}: KPickListProps) {
  const [source, setSource] = useState<Writer[]>(writers.slice(0, 12));
  const [target, setTarget] = useState<Writer[]>(writers.slice(12));

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const [sourceFilterValue, setSourceFilterValue] = useState('');
  const [targetFilterValue, setTargetFilterValue] = useState('');

  const getInputFilterTemplate = (
    value: string,
    setValue: (x: string) => void,
    filterBy: string | undefined
  ) => {
    const filterTemplate = (options: PickListFilterTemplateOptions) => {
      const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        options.inputProps.onChange(e);
      };

      const getFilterPlaceholder = (filterBy: string | undefined) => {
        let placeholder = '';

        switch (filterBy) {
          case 'name':
            placeholder = 'Filter by name...';
            break;
          case 'country':
            placeholder = 'Filter by country...';
            break;
          case 'name,country':
            placeholder = 'Filter by name or country...';
            break;
        }
        return placeholder;
      };

      return (
        <KInputText
          value={value}
          onChange={onChange}
          placeholder={getFilterPlaceholder(filterBy)}
        />
      );
    };

    return filterTemplate;
  };

  const itemTemplate = (writer: Writer) => {
    return (
      <div className="flex gap-4 px-2 py-1">
        <KAvatar
          size="normal"
          label={writer.name.substring(0, 2).toUpperCase()}
        ></KAvatar>
        <div className="items-center">
          <KText type="lead">{writer.name}</KText>
          <KText type="text-sm">{writer.country}</KText>
        </div>
      </div>
    );
  };

  const propsToForward = {
    dataKey,
    filterBy,
    sourceHeader,
    targetHeader,
    showSourceControls,
    showTargetControls,
  };

  return (
    <KPickList
      {...propsToForward}
      source={source}
      target={target}
      onChange={onChange}
      itemTemplate={itemTemplate}
      sourceFilterTemplate={getInputFilterTemplate(
        sourceFilterValue,
        setSourceFilterValue,
        filterBy
      )}
      targetFilterTemplate={getInputFilterTemplate(
        targetFilterValue,
        setTargetFilterValue,
        filterBy
      )}
    />
  );
}
