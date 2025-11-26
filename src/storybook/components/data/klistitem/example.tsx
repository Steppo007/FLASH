import KListItem from '@root/src/components/data/klistitem';
import { ExampleWrapper } from '@sbook/utils';
import writersJson from './writer.json';
import AccountFigureIcon from '@root/assets/svgs/icons/accountFigure.svg?react';
import ArrowRightIcon from '@root/assets/svgs/icons/arrowRight.svg?react';
import { KAvatar } from '@root/src/components/misc/kavatar';

export default function Example() {
  return (
    <ExampleWrapper className="flex items-center justify-center">
      <div className="flex h-160 w-80 flex-col overflow-auto">
        {writersJson.map((writer, index) => (
          <KListItem
            disabled={index % 3 === 0}
            key={writer.id}
            headline={writer.name}
            overline={writer.id}
            supportingText={writer.country}
            leadingItem={
              <KAvatar
                className={index % 3 === 0 ? 'bg-surface-disabled!' : ''}
              >
                <AccountFigureIcon />
              </KAvatar>
            }
            trailingItem={<ArrowRightIcon className="h-6 w-6" />}
          />
        ))}
      </div>
    </ExampleWrapper>
  );
}
